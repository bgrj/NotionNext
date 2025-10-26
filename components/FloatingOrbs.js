import { useEffect, useRef } from 'react'

// --- 特效配置 ---

// 您可以像FIREWORKS一样，用环境变量来控制开关
const FLOATING_ORBS_ENABLED = process.env.NEXT_PUBLIC_FLOATING_ORBS || true

// 颜色配置: 我从您的网页主题图片中提取了这些颜色
// 它们是柔和的、温暖的，像阳光和云彩
const ORB_COLORS = [
  '255, 248, 230', // 柔和的米白 (阳光)
  '255, 220, 180', // 温暖的桃色 (云彩)
  '251, 243, 140'  // 柔和的金色 (来自您的参考，很合适)
]
// --- 配置结束 ---

/**
 * 浮光微粒特效组件
 * 它不会渲染任何可见的HTML，只负责在全局添加鼠标特效
 */
const FloatingOrbs = () => {
  // 使用ref来存储粒子数组和动画帧ID，避免不必要的重渲染
  const particlesRef = useRef([])
  const animationFrameIdRef = useRef()

  useEffect(() => {
    // 检查开关是否打开，以及是否在浏览器环境中
    if (!FLOATING_ORBS_ENABLED || typeof window === 'undefined') {
      return
    }

    const particles = particlesRef.current

    // 动画循环
    const animateParticles = () => {
      // 倒序遍历，方便在循环中删除粒子
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]

        // 1. 更新粒子的属性
        p.opacity -= 0.015 // 缓慢消失
        p.y -= p.velocity  // 向上漂浮

        // 2. 如果粒子完全透明，则从DOM中移除并从数组中删除
        if (p.opacity <= 0) {
          p.element.remove()
          particles.splice(i, 1)
        } else {
          // 3. 更新粒子的CSS
          p.element.style.transform = `translate(${p.x}px, ${p.y}px)`
          p.element.style.opacity = p.opacity
        }
      }
      // 请求下一帧动画
      animationFrameIdRef.current = requestAnimationFrame(animateParticles)
    }

    // 鼠标移动事件处理
    const handleMouseMove = (e) => {
      // 随机节流，避免产生过多粒子
      if (Math.random() > 0.6) return // 只有40%的几率产生粒子

      const orb = document.createElement('div')
      document.body.appendChild(orb)

      const color = ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)]
      const size = Math.random() * 6 + 3 // 粒子大小 (3px 到 9px)
      const velocity = Math.random() * 0.5 + 0.2 // 漂浮速度

      // 设置粒子的样式
      orb.style.position = 'fixed' // 使用 fixed，不受页面滚动影响
      orb.style.width = `${size}px`
      orb.style.height = `${size}px`
      orb.style.backgroundColor = `rgba(${color}, 1)`
      orb.style.borderRadius = '50%'
      orb.style.pointerEvents = 'none' // 穿透鼠标事件
      orb.style.zIndex = '9999'
      orb.style.boxShadow = `0 0 8px 2px rgba(${color}, 0.7)` // 柔和的光晕

      // 存储粒子信息
      particles.push({
        element: orb,
        x: e.clientX - size / 2, // 初始X坐标 (居中)
        y: e.clientY - size / 2, // 初始Y坐标 (居中)
        opacity: 1,
        velocity: velocity
      })
    }

    // 启动动画循环
    animationFrameIdRef.current = requestAnimationFrame(animateParticles)
    // 监听鼠标移动
    window.addEventListener('mousemove', handleMouseMove)

    // React组件卸载时执行清理
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameIdRef.current)
      // 清理所有剩余的粒子
      particles.forEach(p => p.element.remove())
      particles.length = 0
    }
  }, []) // 空依赖数组，确保只在组件挂载时运行一次

  return null // 此组件不渲染任何内容
}

export default FloatingOrbs
