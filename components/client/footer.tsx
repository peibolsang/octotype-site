import Container from '@/components/ui/container'

const Footer = () => {
  return (
    <footer className="dark:bg-slate-900 dark:text-white bg-[#f4f1ea] bg-opacity-70 border-t border-none ">
      <Container>
      <div className="py-16 flex flex-col items-center justify-center">
    <h5 className="flex justify-center">
        Created with ❤️ by&nbsp;<a className="underline underline-offset-4" href="https://twitter.com/peibolsang">Pablo</a>. 
    </h5>
    <h5 className="flex justify-center">
        Designed with 🪄 by&nbsp;<a className="underline underline-offset-4" href="https://twitter.com/aweelllll">Alex</a>
    </h5>
</div>

      </Container>
    </footer>
  )
}

export default Footer
