"""On-demand neural speech. Streams MP3 bytes; never writes audio files."""
import asyncio
import logging
import os

import edge_tts
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import StreamingResponse

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
VOICES = {
    'xiaoxiao': 'zh-CN-XiaoxiaoNeural',
    'yunxi': 'zh-CN-YunxiNeural',
    'xiaoyi': 'zh-CN-XiaoyiNeural',
    'hsiaochen': 'zh-TW-HsiaoChenNeural',
    'hsiaoyu': 'zh-TW-HsiaoYuNeural',
    'xiaobei': 'zh-CN-liaoning-XiaobeiNeural',
    'yunyang': 'zh-CN-YunyangNeural',
    'yunjian': 'zh-CN-YunjianNeural',
    'yunxia': 'zh-CN-YunxiaNeural',
    'yunjhe': 'zh-TW-YunJheNeural',
}


@app.get('/api/dao-speech')
async def speech(request: Request, text: str = Query(min_length=1, max_length=360), voice: str = 'xiaoxiao'):
    if voice not in VOICES or not text.strip() or any(ord(char) < 32 and char not in '\n\t\r' for char in text):
        raise HTTPException(400, 'Invalid speech input')
    if request.headers.get('sec-fetch-site') == 'cross-site':
        raise HTTPException(403, 'Use the article reader')
    stream = edge_tts.Communicate(
        text, VOICES[voice], rate='-5%', connect_timeout=8, receive_timeout=20,
        # Local verification may use the system proxy; production connects directly.
        proxy=os.environ.get('HTTPS_PROXY') if not os.environ.get('VERCEL') else None,
    ).stream()
    try:
        async with asyncio.timeout(18):
            first = None
            async for packet in stream:
                if packet['type'] == 'audio':
                    first = packet['data']
                    break
            if not first:
                raise RuntimeError('No audio')
    except Exception as error:
        await stream.aclose()
        logging.warning('dao-speech upstream unavailable: %s', type(error).__name__)
        raise HTTPException(503, 'Speech is temporarily unavailable') from None

    async def audio():
        try:
            yield first
            async for packet in stream:
                if await request.is_disconnected():
                    break
                if packet['type'] == 'audio':
                    yield packet['data']
        finally:
            await stream.aclose()

    return StreamingResponse(audio(), media_type='audio/mpeg', headers={
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
        'Accept-Ranges': 'none',
    })
