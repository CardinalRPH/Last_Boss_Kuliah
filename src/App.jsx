import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './routes/router'
import store from './stores'

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  )
}

export default App
