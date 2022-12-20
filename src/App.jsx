import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(route => <Route path={route.path} element={route.element} key={route.path} />)}
      </Routes>
    </Router>
  )
}

export default App
