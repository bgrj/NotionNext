import { useActivityLanguage } from './language'
import styles from './being-surface.module.css'

export default function BeingMasthead({ personal = false }) {
  const { t } = useActivityLanguage()
  return (
    <header className={styles.masthead}>
      <p className={styles.eyebrow}>{personal ? 'MY BEING' : 'OUR BEING'}</p>
      <h1>{personal ? t('我的空间') : t('我们的存在')}</h1>
      <p className={styles.slogan}>
        {t(personal ? '与自我疏离' : '与世界同在')}
      </p>
    </header>
  )
}
