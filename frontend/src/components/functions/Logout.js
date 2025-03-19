const logOut = (setAuth) => {
  localStorage.removeItem("role")
  localStorage.removeItem("token")
  setAuth(false)
}

export default logOut