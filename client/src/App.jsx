import React from "react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const App = () => {
  return (
    <>
      <div>App</div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App
