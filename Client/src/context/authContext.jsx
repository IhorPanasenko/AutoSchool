import { createContext, useEffect, useReducer } from "react"

const userFromLocalStorage = localStorage.getItem("user")
const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  // user: null,
  loading: false,
  error: null
}
console.log(JSON.parse(localStorage.getItem("user")))
// console.log("JSON.parse(localStorage.getItem" + JSON.parse(localStorage.getItem("user")) || null);

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null
      }
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null
      }
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload
      }
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
