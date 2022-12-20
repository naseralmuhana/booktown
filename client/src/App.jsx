import React from "react"
import GlobalStyle from "./GlobalStyle"
import { ReactQueryDevtools } from "react-query/devtools"
import { Header } from "./components"
import { Route, Routes } from "react-router-dom"
import { Home, Login } from "./pages"

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  )
}

export default App
