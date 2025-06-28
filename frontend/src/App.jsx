import './App.css'
import ApiTest from "./components/test/ApiTest.jsx"
import "./components/test/ApiTest.css"

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend <-> Backend 연동 테스트</h1>
      </header>

      <main>
        <ApiTest />
      </main>
    </div>
  )
}

export default App
