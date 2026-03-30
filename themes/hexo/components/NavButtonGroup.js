import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * 首页导航大按钮组件
 * @param {*} props
 * @returns
 */
const NavButtonGroup = (props) => {
  const { categoryOptions } = props
  const router = useRouter()
  
  if (!categoryOptions || categoryOptions.length === 0) {
    return <></>
  }

  // 判断当前是否在分类页面，以及是哪个分类
  const isCategory = router.route === '/category/[name]'
  const currentCategory = router.query.name

  return (
    <nav id='home-nav-button' className={'w-full z-10 md:h-72 md:mt-6 xl:mt-32 px-5 py-2 mt-8 flex flex-wrap space-y-2 md:space-y-0 md:flex justify-center md:justify-between md:px-12 lg:px-20 max-h-80 overflow-auto'}>
      {categoryOptions?.map(category => {
        // 判断是否是当前活跃分类
        const isActive = isCategory && currentCategory === category.name
        
        return (
          <SmartLink
            key={`${category.name}`}
            title={`${category.name}`}
            href={`/category/${category.name}`}
            passHref
            className={`text-center shadow-text w-full sm:w-1/2 md:w-96 lg:w-2/5 md:h-28 lg:h-32 h-28 justify-center items-center flex border-2 cursor-pointer rounded-xl duration-200 hover:scale-105 transform text-2xl md:text-3xl lg:text-4xl font-semibold transition-all ${
              isActive 
                ? 'bg-[#C18A62] text-white border-[#C18A62] hover:bg-[#D19A72] hover:text-white' 
                : 'glassmorphism hover:bg-white hover:text-indigo-800 border-white/30'
            }`}>
               {category.name}
            </SmartLink>
        )
      })}
    </nav>
  )
}
export default NavButtonGroup
