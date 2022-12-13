import { lazy, Suspense } from 'react'
import './App.css'


const Todo = lazy(() => import("./components/todos"))
function App() {

  return (
    <Suspense fallback={ <p>Loading...</p> }>
      <Todo />
    </Suspense>
  )
}

export default App
