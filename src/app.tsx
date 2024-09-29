import { Analytics } from "@vercel/analytics/react"
import { Terminal } from "./components/terminal"
import { ToolBar } from "./components/tool-bar"

function App() {

  return (
    <>
      <ToolBar/>
      <Terminal/>
      <Analytics/>
    </>
  )
}

export default App
