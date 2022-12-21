import axios from "axios"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useAuth } from "../../context"
import { errorHandler } from "../../utils"

const Profile = () => {
  const { token } = useAuth()
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const profileApi = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const { data } = await axios.get("/api/users/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        setData(data)
      } catch (error) {
        setError(errorHandler(error))
      } finally {
        setIsLoading(false)
      }
    }
    profileApi()
  }, [])

  if (isLoading) return "Loading...."

  if (error) return `${error}`

  if (data)
    return (
      <ul>
        <li>Id: {data._id}</li>
        <li>Name: {data.name}</li>
        <li>Email: {data.email}</li>
        <li>isAdmin: {data.isAdmin ? "true" : "false"}</li>
        <li>Slug: {data.slug}</li>
      </ul>
    )
}

export default Profile
