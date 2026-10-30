import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { authHref } from '@/lib/beings/authNavigation'
import {
  DEMO_ACTORS,
  demoCommunityClient,
  liveCommunityClient
} from '@/lib/beings/community/demo'
import { isClerkEnabled } from '../../beings'
import BeingDesk from '../BeingDesk'
import { OurBeingsAccountPending } from '../OurBeingsAuth'
import OurBeingsSignOut from '../OurBeingsSignOut'
import { CommunityContext, useCommunity, useCommunityData } from './context'
import { AppLink, Empty, LoadState, PlainBody, SectionHeading } from './Shared'
import {
  CollectionPage,
  ContentEditor,
  PersonalRecords,
  ReviewPage,
  SettingsPage,
  WorkspaceHome
} from './Workspace'
import {
  EventEditor,
  EventPage,
  ExchangePage,
  ExchangesPage,
  ManageEvent,
  NewExchange,
  ReaderPage,
  ReadingCatalog
} from './PublicPages'
import CommunityTools from './CommunityTools'
import s from './Community.module.css'

const PUBLIC_VIEWS = new Set([
  'public',
  'dao',
  'shu',
  'events',
  'event',
  'reading',
  'exchanges',
  'exchange',
  'tools',
  'about',
  'policies',
  'profile'
])
const NAMES = {
  workspace: '我的存在',
  public: '我们的存在',
  dao: '道',
  shu: '术',
  events: '阅读活动',
  event: '共读安排',
  reading: '阅读室',
  exchanges: '物物交换',
  exchange: '交换约定',
  tools: '本地工具室',
  about: '关于 Our beings',
  policies: '使用与隐私说明',
  profile: '公开主页',
  journal: '生命日志',
  book: '个人图书馆',
  image: '影像馆',
  audio: '音频馆',
  collection: '我的记录',
  new: '写下一段',
  edit: '继续编辑',
  'create-event': '发起共读',
  'event-edit': '编辑共读',
  manage: '报名管理',
  notifications: '站内来信',
  bookmarks: '我的收藏',
  registrations: '我的报名',
  'my-events': '我发起的共读',
  'my-exchanges': '我的交换',
  settings: '设置与导出',
  review: '公开审核',
  legacy: '原档案',
  trash: '最近删除',
  'new-exchange': '发布交换'
}

function viewFromRoute(router, defaultView) {
  const path = Array.isArray(router.query?.screen) ? router.query.screen : []
  const first = path[0]
  if (!first || first === 'demo')
    return { view: defaultView || 'workspace', id: path[1] }
  if (first === 'events' && path[1]) return { view: 'event', id: path[1] }
  if (first === 'exchanges' && path[1]) return { view: 'exchange', id: path[1] }
  return { view: NAMES[first] ? first : 'about', id: path[1] }
}

export default function CommunityApp(props) {
  const router = useRouter()
  const parts = Array.isArray(router.query?.screen) ? router.query.screen : []
  const demo = parts[0] === 'demo' || router.query?.demo === '1'
  if (demo) return <DemoBridge {...props} />
  return isClerkEnabled() ? (
    <ClerkBridge {...props} />
  ) : (
    <AppSession {...props} actor={null} ready />
  )
}

function ClerkBridge(props) {
  const { isLoaded, isSignedIn, user } = useUser()
  const actor = useMemo(
    () => (isSignedIn && user?.id ? { id: user.id } : null),
    [isSignedIn, user?.id]
  )
  return (
    <AppSession
      {...props}
      key={actor?.id || 'guest'}
      actor={actor}
      ready={isLoaded}
    />
  )
}

function DemoBridge(props) {
  const [client, setClient] = useState(null),
    [index, setIndex] = useState(0)
  useEffect(() => {
    setClient(demoCommunityClient())
  }, [])
  if (!client)
    return (
      <div className={s.product}>
        <p role='status'>正在准备标注清楚的示例导览…</p>
      </div>
    )
  return (
    <AppSession
      {...props}
      key={DEMO_ACTORS[index].id}
      demo
      actor={DEMO_ACTORS[index]}
      ready
      clientOverride={client}
      selectActor={setIndex}
      selectedActor={index}
    />
  )
}

function AppSession({
  actor,
  ready,
  demo = false,
  clientOverride,
  selectActor,
  selectedActor,
  defaultView,
  publicHub,
  legacyDirectory
}) {
  const router = useRouter(),
    client = clientOverride || liveCommunityClient
  const route = viewFromRoute(router, defaultView)
  const [tick, setTick] = useState(0),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [note, setNote] = useState(''),
    [status, setStatus] = useState(null),
    [legacyOpen, setLegacyOpen] = useState(false)
  useEffect(() => {
    let cancelled = false
    if (demo) {
      setStatus({ storage: true, moderator: actor.moderator })
      return undefined
    }
    client
      .query(actor, 'status')
      .then(data => {
        if (!cancelled) setStatus(data)
      })
      .catch(() => {
        if (!cancelled) setStatus({ storage: false })
      })
    return () => {
      cancelled = true
    }
  }, [client, actor?.id, demo])
  const href = value => {
    if (!demo) return value
    const [base, hash] = value.split('#')
    return `${base}${base.includes('?') ? '&' : '?'}demo=1${hash ? `#${hash}` : ''}`
  }
  const navigate = value => router.push(href(value))
  const run = async (type, input, success = '已更新。') => {
    if (busy) return null
    setBusy(true)
    setError('')
    setNote('')
    try {
      const result = await client.command(actor, type, input)
      setNote(demo ? `导览数据：${success}` : success)
      setTick(x => x + 1)
      return result
    } catch (err) {
      setError(err.message || '网络暂时中断。输入仍保留，请稍后再试。')
      return null
    } finally {
      setBusy(false)
    }
  }
  const privateView = !PUBLIC_VIEWS.has(route.view)
  const value = {
    actor,
    client,
    demo,
    tick,
    run,
    busy,
    navigate,
    href,
    storage: status?.storage === true
  }
  return (
    <CommunityContext.Provider value={value}>
      <section className={s.product} aria-labelledby='community-title'>
        <Head>
          <title>{NAMES[route.view] || 'Our beings'} · Our beings</title>
          {privateView || demo ? (
            <meta name='robots' content='noindex,nofollow' />
          ) : null}
        </Head>
        {demo ? (
          <div className={s.demoBanner}>
            <div>
              <strong>功能导览 · 示例数据</strong>
              <p>
                不是实际账号或活动。改动只保存在当前浏览器，请勿填真实联系方式；可在示例角色间切换，走完私密、公开、审核、报名与交换流程。
              </p>
            </div>
            <label>
              体验角色
              <select
                value={selectedActor}
                onChange={e => selectActor(Number(e.target.value))}
              >
                {DEMO_ACTORS.map((a, i) => (
                  <option key={a.id} value={i}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              className={s.quiet}
              onClick={async () => {
                if (
                  !window.confirm('重置将清空当前浏览器的导览数据，恢复示例。')
                )
                  return
                await client.reset()
                window.location.reload()
              }}
            >
              重置导览
            </button>
            <Link href='/our-beings'>退出导览 ↗</Link>
          </div>
        ) : (
          status?.storage === false && (
            <div className={s.storageBanner}>
              <p>
                新版云端保存暂未开放。可以使用原档案，或先体验交互导览；本地工具可直接使用。
              </p>
              <Link href='/our-beings/app/demo'>打开功能导览 ↗</Link>
              {actor && (
                <AppLink href='/our-beings/app/legacy'>原档案 ↗</AppLink>
              )}
            </div>
          )
        )}
        <div className={s.topline}>
          <Link href='/'>
            Our beings <span>／ 吾在</span>
          </Link>
          <div>
            {demo ? (
              <span className={s.badge}>演示隔离</span>
            ) : actor ? (
              <>
                <AppLink href='/our-beings/app/settings'>自己的边界 ↗</AppLink>
                <OurBeingsSignOut />
              </>
            ) : (
              <Link href={authHref('in', router.asPath)}>登录我的空间 ↗</Link>
            )}
          </div>
        </div>
        <div className={s.layout}>
          <aside className={s.sidebar}>
            <nav aria-label='Our beings 内容导航'>
              {[
                ['public', '我们的存在', '/our-beings'],
                ['workspace', '我的存在', '/our-beings/me'],
                ['dao', '道', '/category/道'],
                ['shu', '术', '/category/术']
              ].map(([id, name, path], i) => (
                <AppLink
                  key={id}
                  href={path}
                  aria-current={route.view === id ? 'page' : undefined}
                >
                  <small>0{i + 1}</small>
                  <span>{name}</span>
                  <span aria-hidden='true'>↗</span>
                </AppLink>
              ))}
            </nav>
            <details className={s.sidebarDetails}>
              <summary>记录、工具与设置</summary>
              <div className={s.secondaryNav}>
                <AppLink href='/our-beings/app/events'>阅读活动</AppLink>
                <AppLink href='/our-beings/app/tools'>本地工具室</AppLink>
                <AppLink href='/our-beings/app/exchanges'>物物交换</AppLink>
                {actor && (
                  <>
                    <AppLink href='/our-beings/app/collection'>
                      全部私人记录
                    </AppLink>
                    <AppLink href='/our-beings/app/bookmarks'>我的收藏</AppLink>
                    <AppLink href='/our-beings/app/registrations'>
                      我的报名
                    </AppLink>
                    <AppLink href='/our-beings/app/my-events'>
                      我发起的共读
                    </AppLink>
                    <AppLink href='/our-beings/app/my-exchanges'>
                      我的交换
                    </AppLink>
                    <AppLink href='/our-beings/app/notifications'>
                      站内来信
                    </AppLink>
                    <AppLink href='/our-beings/app/settings'>
                      设置与导出
                    </AppLink>
                  </>
                )}
                {(actor?.moderator || status?.moderator) && (
                  <AppLink href='/our-beings/app/review'>公开版本审核</AppLink>
                )}
                <AppLink href='/our-beings/app/about'>关于这里</AppLink>
                <AppLink href='/our-beings/app/policies'>使用与隐私</AppLink>
                {!demo && <Link href='/our-beings/app/demo'>功能导览 ↗</Link>}
              </div>
            </details>
            <p className={s.sidebarNote}>
              与自己周旋，
              <br />
              也与世界相遇。
            </p>
          </aside>
          <div className={s.main}>
            {error && (
              <div className={s.error} role='alert'>
                {error}
                <button className={s.quiet} onClick={() => setError('')}>
                  收起提示
                </button>
              </div>
            )}
            {note && (
              <p className={s.notice} role='status'>
                {note}
              </p>
            )}
            {privateView && !ready ? (
              <OurBeingsAccountPending />
            ) : privateView && !actor ? (
              <GuestPrompt />
            ) : (
              <ViewRouter
                key={`${route.view}-${route.id || ''}-${actor?.id || 'guest'}`}
                view={route.view}
                id={route.id}
                publicHub={publicHub}
              />
            )}
          </div>
        </div>
        {legacyDirectory && !demo && (
          <details
            className={s.legacy}
            onToggle={e => setLegacyOpen(e.currentTarget.open)}
          >
            <summary>原存在者名录、席位与加入说明</summary>
            {legacyOpen && legacyDirectory}
          </details>
        )}
        <footer className={s.footer}>
          <span>OUR BEINGS / STILL BECOMING</span>
          <p>愿我们在众声喧哗里，听见自己的回声。</p>
          <AppLink href='/our-beings/app/policies'>使用与隐私 ↗</AppLink>
        </footer>
      </section>
    </CommunityContext.Provider>
  )
}

function GuestPrompt() {
  const router = useRouter()
  return (
    <>
      <SectionHeading
        eyebrow='A ROOM OF YOUR OWN / 向内安放'
        title='这是你的私人空间'
        description='登录后，保存生命日志、书页、影像与声音。新记录默认私密，是否公开由你选择。'
      />
      <div className={s.callout}>
        <div>
          <h2>先回到自己，再决定如何相遇。</h2>
          <p>已有账号直接登录；第一次来，可以创建自己的账号。</p>
        </div>
        <div className={s.actions}>
          <Link className={s.button} href={authHref('in', router.asPath)}>
            登录我的空间
          </Link>
          <Link className={s.quietButton} href={authHref('up', router.asPath)}>
            第一次来，创建账号
          </Link>
        </div>
      </div>
      <p className={s.muted}>
        还想先看看？
        <Link href='/our-beings/app/demo'>打开明确标注的功能导览 ↗</Link>
      </p>
    </>
  )
}

function ViewRouter({ view, id, publicHub }) {
  const router = useRouter()
  const { demo } = useCommunity()
  if (view === 'workspace') return <WorkspaceHome />
  if (view === 'public')
    return <ReadingCatalog showEvents publicHub={publicHub} />
  if (view === 'dao' || view === 'shu')
    return <ReadingCatalog domain={view} publicHub={publicHub} />
  if (view === 'events') return <ReadingCatalog showEvents />
  if (['journal', 'book', 'image', 'audio'].includes(view))
    return <CollectionPage kind={view} />
  if (view === 'collection') return <CollectionPage />
  if (view === 'trash') return <CollectionPage trash />
  if (view === 'new' || view === 'edit')
    return (
      <ContentEditor
        id={view === 'edit' ? id : undefined}
        initialKind={router.query.kind}
        initialDomain={router.query.domain}
      />
    )
  if (view === 'reading') return <ReaderPage id={id} />
  if (view === 'create-event' || view === 'event-edit')
    return <EventEditor id={view === 'event-edit' ? id : undefined} />
  if (view === 'event') return <EventPage id={id} />
  if (view === 'manage') return <ManageEvent id={id} />
  if (
    [
      'notifications',
      'bookmarks',
      'registrations',
      'my-events',
      'my-exchanges'
    ].includes(view)
  )
    return <PersonalRecords type={view} />
  if (view === 'exchanges') return <ExchangesPage />
  if (view === 'exchange') return <ExchangePage id={id} />
  if (view === 'new-exchange') return <NewExchange />
  if (view === 'settings') return <SettingsPage />
  if (view === 'review') return <ReviewPage />
  if (view === 'tools')
    return (
      <>
        <SectionHeading
          eyebrow='SHU / LOCAL TOOLS'
          title='把工具，放在手边'
          description='解决具体的小问题。文件留在本地，方法写清边界。'
        />
        <CommunityTools />
      </>
    )
  if (view === 'legacy')
    return demo ? (
      <Empty title='原档案连接真实账号'>
        <p>
          功能导览不读取或修改真实档案。离开导览后，可以使用原账号查看生命钟与历史内容。
        </p>
        <Link href='/our-beings/app/legacy'>退出导览，进入原档案 ↗</Link>
      </Empty>
    ) : (
      <BeingDesk />
    )
  if (view === 'profile') return <PublicProfile handle={id} />
  if (view === 'policies') return <Policies />
  return <About />
}

function PublicProfile({ handle }) {
  const resource = useCommunityData('profile', { handle })
  return (
    <LoadState resource={resource}>
      {data => (
        <>
          <SectionHeading
            eyebrow='A PUBLIC ROOM / 愿意分享的部分'
            title={data.name}
            description={data.bio}
          />
          {data.items.length ? (
            data.items.map(x => (
              <article key={x.id} className={s.listRow}>
                <AppLink href={x.href}>
                  <h2>{x.title}</h2>
                  <p>{x.summary}</p>
                </AppLink>
              </article>
            ))
          ) : (
            <Empty title='这位作者还没有公开内容' />
          )}
        </>
      )}
    </LoadState>
  )
}
function About() {
  return (
    <>
      <SectionHeading
        eyebrow='OUR BEINGS / 我们在这里'
        title='一个人，也慢慢学会共在'
        description='与自己周旋，与他人相处，在世界里慢慢安放自己。'
      />
      <div className={s.about}>
        <p className={s.largeStatement}>
          把生活读慢一点，
          <br />
          把问题想深一点。
        </p>
        <PlainBody
          text={
            '一个人活着，先要与自己周旋，随后与他人相处，再慢慢学会如何安放自己在世界中的位置。Our beings 想写的，正是这件事。\n\n这里是一个缓慢生长的内容站：一边保留自己的写作、思考与创作，一边收集值得反复进入、反复阅读、反复使用的资源。\n\n## 四个入口，一条脉络\n我们的存在，让阅读活动与公开分享相遇。我的存在，安放每个人自己的生命日志、图书馆、影像馆与音频馆。道，追问人是什么、如何理解人的处境。术，整理眼前有用的方法，也承认它们会过时。\n\n## 分享可以自愿，边界也可以清楚\n先私密保存，再决定是否公开。支持创作者可以是打赏、交换，也可以是一句具体的回应。它们不成为基本阅读与免费报名的门槛。'
          }
        />
        <div className={s.actions}>
          <AppLink className={s.button} href='/our-beings'>
            从公开阅读开始 ↗
          </AppLink>
          <AppLink className={s.quietButton} href='/our-beings/me'>
            回到自己的空间 ↗
          </AppLink>
        </div>
      </div>
    </>
  )
}
function Policies() {
  return (
    <>
      <SectionHeading
        eyebrow='BOUNDARIES / 让选择有依据'
        title='使用与隐私说明'
        description='这是实验版本的实际边界。能力接通与规则变化会更新说明，不以规划代替承诺。'
      />
      <div className={s.about}>
        <PlainBody
          text={
            '## 数据与身份\n登录沿用 Clerk。新的内容服务只接受服务器验证的用户身份；普通用户只能管理自己的私人记录。站主的 Notion 内容和历史档案独立保留，不批量迁移、不自动公开。\n\n## 保存与导出\n新版云端保存的可用状态会在页面明确提示。未接通时，失败操作不会显示为已保存。功能导览使用虚构身份与示例数据，只保存在当前浏览器，清除浏览器数据会丢失；不要填写真实联系方式。可通过导出保留自己的试用副本。四馆首版管理目录、文字、来源和笔记，当前不提供大文件上传或云端影音托管。\n\n## 公开、撤回与删除\n新记录默认私密。主动提交并审核通过后才出现公开版本；普通编辑保留原有公开版本。撤回或删除后，后续公开请求不可读取；已经被他人下载或第三方保存的公开副本不能保证追回。删除是软删除，可在最近删除恢复为私密，试用版暂不自动永久清理。\n\n## 活动与联系信息\n报名由服务器检查截止、容量与唯一身份。联系人只对本人和该场活动组织者可见；私有会议安排仅在确认报名后提供。活动变化和结果先通过站内来信通知，不擅自发送站外消息。取消报名后移除该报名中的联系字段。\n\n## 支持与交换\n外部支持完全自愿，链接需审核；本站不核验外部到账，不提供余额、提现、分账或资金托管。物品交换保留约定与双方状态，单方确认不等于双方完成；本站不提供鉴定或交付担保。广告仅保留用户自愿参与意向，当前没有投放或收益结算。\n\n## 本地工具\n聊天整理与视频截图直接在浏览器处理你选择的文件。它们不上传原件，不访问聊天数据库；支持范围和格式在各工具旁列明。导出内容由你决定如何保存与分享。\n\n## 治理与反馈\n公开版本、回应和支持链接按提交范围审核。审核异常保留草稿；修改意见、举报处理可通过站内来信查询。管理入口不提供私人日志浏览功能。请只分享有权公开的内容，并避免在公开条目中留下详细地址、私人联系方式或他人未经同意的信息。'
          }
        />
      </div>
    </>
  )
}
