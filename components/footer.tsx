import Container from './container'

const Footer = () => {
  return (
    <footer className="dark:bg-slate-900 dark:text-white bg-neutral-50 border-t border-none ">
      <Container>
        <div className="py-16">
          <h5 className="flex justify-center">
            <a className="underline underline-offset-4" href="https://github.com/peibolsang">Created with ❤️ by Pablo</a>
          </h5>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
