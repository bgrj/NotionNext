import { useGlobal } from '@/lib/global'

/**
 * 空白博客 列表
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListEmpty = ({ currentSearch }) => {
  const { locale } = useGlobal()
  return <div className='flex w-full items-center justify-center min-h-screen mx-auto md:-mt-20'>
        <div className='text-center'>
          <div className='text-lg font-medium text-gray-600 dark:text-gray-400 mb-2'>{locale.COMMON.NO_MORE}</div>
          {currentSearch && <div className='text-sm text-gray-500 dark:text-gray-500'>{currentSearch}</div>}
        </div>
  </div>
}
export default BlogPostListEmpty
