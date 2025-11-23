import { siteConfig } from '@/lib/config'

/**
 * 驱动版权（改为了如下"内容写作"）
 * @returns
 */
export default function PoweredBy(props) {
  return (
    <div className={`inline text-sm font-serif ${props.className || ''}`}>
      <span className='mr-1'>Written by</span>
      
      {/* 修改点：
          1. 把 <a> 改成了 <span>
          2. 删掉了 href="..."
          3. 删掉了 className 里的 'underline' (下划线)
      */}
      <span className='justify-start'>
        不过人间·EのT
      </span>
      .
    </div>
  )
}
