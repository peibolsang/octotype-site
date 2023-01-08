import Link from "next/link"
import DarkModeButton from "./dark-mode-button"

const MainHeader = () => {

  return (
  <>
    <section className="flex-col md:flex-row flex items-center md:justify-between pt-6 mb-12 md:mb-20">
      <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
      <Link href={`/`} className="hover:underline">
        octotype.
      </Link>
      </h1>
      <DarkModeButton/>
    </section>
    
  </>
  )
}

export default MainHeader