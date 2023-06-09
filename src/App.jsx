import { Provider } from 'react-redux'
import { Catalog } from './components/Catalog'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { store } from './redux/store'
import { ModalDelivery } from './components'

export const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <Navigation />
        <Catalog />
        <section></section>
      </main>
      <footer></footer>
      <ModalDelivery />
    </Provider>
  )
}
