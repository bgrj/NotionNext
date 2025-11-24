import Card from './Card'
import { useGlobal } from '@/lib/global' // 1. 引入这个

export function AnalyticsCard (props) {
  const { postCount } = props
  const { locale } = useGlobal() // 2. 获取语言包

  return <Card>
    <div className='ml-2 mb-3 '>
      {/* 3. 使用变量替换写死的汉字 */}
      <i className='fas fa-chart-area' /> {locale.COMMON.ANALYTICS}
    </div>
    <div className='text-xs  font-light justify-center mx-7'>
      <div className='inline'>
        <div className='flex justify-between'>
          <div>文章数:</div>
          <div>{postCount}</div>
        </div>
      </div>
      <div className='hidden busuanzi_container_page_pv ml-2'>
        <div className='flex justify-between'>
          <div>访问量:</div>
          <div className='busuanzi_value_page_pv' />
        </div>
      </div>
      <div className='hidden busuanzi_container_site_uv ml-2'>
        <div className='flex justify-between'>
          <div>访客数:</div>
          <div className='busuanzi_value_site_uv' />
        </div>
      </div>
    </div>
  </Card>
}
