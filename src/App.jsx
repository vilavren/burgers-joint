import { Catalog } from './components/Catalog'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Navigation />
        <Catalog />
        <section></section>
      </main>
      <footer></footer>
    </>
  )
}
