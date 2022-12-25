import React, { createContext, useContext } from "react"
import { useState } from "react"

const AuthContext = createContext({
  isLoading: false,
  error: null,
  userInfo: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: "naser",
    email: "naser@gmail.com",
    password: "password",
  })

  const register = async () => {
    console.log("Register Context")
  }
  const login = async () => {
    console.log("Login Context")
  }
  const logout = () => {
    console.log("Logout Context")
  }

  const value = { userInfo, register, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
