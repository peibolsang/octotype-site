import Link from 'next/link'
import DarkModeButton from './dark-mode-button'


type Props = {
  username: string
}

const Header = ( {username}: Props) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between pt-6 mb-12 md:mb-20">
    <h2 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
      <div className="flex items-center gap-x-1">
      <Link href={`/`} className="hover:underline">
        octotype
      </Link>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mt-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
      </svg>
      <Link href={`/${username}`} className="hover:underline">
        {username}.
      </Link>
      </div>
    </h2>
    <DarkModeButton/>
    </section>
  )
}

export default Header
