import React from "react"
import GlobalStyle from "./GlobalStyle"
import { ReactQueryDevtools } from "react-query/devtools"
import { Header } from "./components"
import { Route, Routes } from "react-router-dom"
import { Home, Login, Profile } from "./pages"
import { ProtectedRoute } from "./utils"

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  )
}

export default App
