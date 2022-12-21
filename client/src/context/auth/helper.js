export const retrieveStoredUserData = () => {
  // retrieve the stored stored Token, if not found clear the localStorage
  const storedToken = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : removeFromLocalStorage()

  // retrieve the stored user data, if not found clear the localStorage
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))[0]
    : removeFromLocalStorage()

  return { storedToken, storedUser }
}

export const saveToLocalStorage = ({ user, token }) => {
  // store accessToken and user info into LocalStorage
  localStorage.setItem("user", JSON.stringify(user))
  localStorage.setItem("token", JSON.stringify(token))
}

export const removeFromLocalStorage = () => {
  // remove accessToken and user info from LocalStorage
  localStorage.removeItem("user")
  localStorage.removeItem("token")
}
