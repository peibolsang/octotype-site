import Cursor from '../components/input-cursor'
import MainHeader from './main-header'

const MainIntro = () => {
  return (
  <>
    <MainHeader />
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-6 mb-12 md:mb-6">
      <h1 className="text-4xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-center">
      The content discovery platform from developers to <Cursor text="developers" />
      </h1>
    </section>
  </>
  )
}

export default MainIntro
