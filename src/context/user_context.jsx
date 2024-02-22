import React, { useContext, useEffect, useReducer, useState } from 'react'

import axios from 'axios'
import user_reducer from '../reducers/user_reducer'
const UserContext = React.createContext()
// UserProvider.js

import {
  MY_USER,
  SET_USER,
  LOGOUT,
  USER_ERROR,
  SAVE_USER_LOCALLY,
} from '../actions'

const initialState = {
  myUser: {},
  isUserLoading: true,
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(user_reducer, initialState)

  const saveUser = (user) => {
    dispatch({
      type: SAVE_USER_LOCALLY,
      payload: user,
    })
  }

  const getUser = async () => {
    dispatch({ type: MY_USER })
    try {
      const { data } = await axios.get('/api/v1/user/showme', {
        withCredentials: true,
      })
      dispatch({ type: SET_USER, payload: data.user })
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error.message })
    }
  }

  const logout = async () => {
    dispatch({ type: LOGOUT })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser()
      } finally {
        // Log state after the API call is complete
        // console.log(state.myUser)
      }
    }

    fetchData()
  }, [])

  return (
    <UserContext.Provider value={{ ...state, saveUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
