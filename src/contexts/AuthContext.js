import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import firebase from '../firebase';

let googleProvider = new firebase.auth.GoogleAuthProvider();

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(formData, setError, setLoading, history) {
    const { email, password } = formData;
    try {
      setError("")
      setLoading(true)
      await auth.createUserWithEmailAndPassword(email, password)
      history.push("/memories")
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    }
  }

  async function login(formData, setError, setLoading, history) {
    const { email, password } = formData;
    try {
      setError("")
      setLoading(true)
      await auth.signInWithEmailAndPassword(email, password)
      history.push("/memories")
    } catch (error) {
      setError(error?.message)
      setLoading(false)
    }
  }

  async function logout(setError, history) {
    setError("")

        try {
            await auth.signOut();
            history.push("/auth")
        } catch (error) {
            setError(error?.message)
        }
  }

  async function resetPassword(email, setSuccess, setError, setLoading) {
    try {
      setSuccess("")
      setError("")
      setLoading(true)
      await auth.sendPasswordResetEmail(email)
      setSuccess("Check your inbox for further instructions")
    } catch (error) {
      setError(error?.message)
    }

    setLoading(false)
  }

  async function googleSignIn(setError, setLoading, history) {
    try {
      setError("")
      setLoading(true)
      await auth.signInWithPopup(googleProvider);
      history.push("/memories")
    } catch (error) {
      setError(error?.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    googleSignIn
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
