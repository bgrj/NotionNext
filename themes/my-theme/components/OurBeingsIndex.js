import dynamic from 'next/dynamic'
const CommunityApp = dynamic(() => import('./community/CommunityApp'))
const LegacyOurBeingsIndex = dynamic(() => import('./LegacyOurBeingsIndex'))

export default function OurBeingsIndex(props) {
  return (
    <CommunityApp
      defaultView='public'
      publicHub={props.publicHub}
      legacyDirectory={<LegacyOurBeingsIndex {...props} />}
    />
  )
}
