// user_reducer.js
import {
  MY_USER,
  SET_USER,
  LOGOUT,
  USER_ERROR,
  SAVE_USER_LOCALLY,
} from '../actions'

const user_reducer = (state, action) => {
  switch (action.type) {
    case MY_USER: {
      return { ...state, isUserLoading: true }
    }
    case SET_USER: {
      const user = action.payload
      return { ...state, myUser: user, isUserLoading: false }
    }
    case LOGOUT: {
      // Handle logout logic, clear user data or perform any necessary cleanup
      return { ...state, myUser: null, isUserLoading: false }
    }
    case USER_ERROR: {
      // Handle error state, you might want to log or notify the user
      return {
        ...state,
        isUserLoading: false,
        myUser: null,
        error: action.payload,
      }
    }
    case SAVE_USER_LOCALLY: {
      const user = action.payload
      return { ...state, myUser: user, isUserLoading: false }
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default user_reducer
