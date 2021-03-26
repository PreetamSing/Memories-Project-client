import React, { useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

export default function PrivateRoute({ component: Component, otherPath, bool, setLoading, ...rest }) {
  const { currentUser } = useAuth();
  
  useEffect(() => {
    setLoading(false);
  }, [])

  return (
    <Route
      {...rest}
      render={props => {
        return (!currentUser != !bool) ? <Component {...props} /> : <Redirect to={otherPath} />
      }}
    ></Route>
  )
}
