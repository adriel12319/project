import './App.css'
import { Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet'
import reactLogo from './assets/react.svg'

const Card = lazy(() => import('./Card'))

function App() {
  return (
    <>
      <Helmet>
        <title>Vite ++ React Application</title>
        <meta name="description" content="A modern web application built with Vite and React" />
        <meta name="keywords" content="react, vite, javascript, frontend" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="Vite + React Application" />
        <meta property="og:description" content="A modern web application built with Vite and React" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <Suspense fallback={<p>Loading card component...</p>}>
        <Card />
      </Suspense>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App