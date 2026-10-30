import busuanzi from '@/lib/plugins/busuanzi'
import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import { useEffect } from 'react'

export default function Busuanzi() {
  const { theme } = useGlobal()
  const router = useRouter()

  useEffect(() => {
    busuanzi.fetch()
    const onChange = () => busuanzi.fetch()
    router.events.on('routeChangeComplete', onChange)
    return () => {
      router.events.off('routeChangeComplete', onChange)
    }
  }, [router.events, theme])

  return null
}
