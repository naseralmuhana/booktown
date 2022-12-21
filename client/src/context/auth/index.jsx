import axios from "axios"
import React, { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { errorHandler } from "../../utils"
import {
  removeFromLocalStorage,
  retrieveStoredUserData,
  saveToLocalStorage,
} from "./helper"

const AuthContext = createContext({
  token: null,
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: () => {},
})

const AuthProvider = ({ children }) => {
  const { storedToken, storedUser } = retrieveStoredUserData()
  const navigate = useNavigate()
  const [token, setToken] = useState(storedToken)
  const [user, setUser] = useState(storedUser)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = async (body) => {
    try {
      setIsLoading(true)
      setError(null)
      const { data } = await axios.post("/api/users/login", body, {
        "Content-Type": "application/json",
      })
      // store accessToken and user info in LocalStorage
      saveToLocalStorage({ user: data, token: data.token })
      setToken(data.token)
      setUser(data)
      navigate("/", { replace: true })
    } catch (error) {
      setError(errorHandler(error))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    removeFromLocalStorage()
    setToken(null)
    setUser(null)
    setIsLoading(false)
    setError(null)
  }

  const contextValue = {
    token,
    user,
    isLoading,
    error,
    login,
    logout,
  }
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
