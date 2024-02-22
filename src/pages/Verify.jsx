import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'

import axios from 'axios'
import { useUserContext } from '../context/user_context'
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const VerifyPage = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { isLoading } = useUserContext()

  const query = useQuery()
  const verifyToken = async () => {
    setLoading(true)

    try {
      // Make a POST request to verify email
      const response = await axios.post('/api/v1/auth/verify-email', {
        verificationToken: query.get('token'),
        email: query.get('email'),
      })
    } catch (error) {
      // Handle errors more effectively
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with an error:', error.response.data)
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server')
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message)
      }

      // Set error state or show error message in UI
      setError(true)
    } finally {
      // Ensure that loading state is set to false regardless of success or error
      setLoading(false)
    }
  }

  const fetchData = async () => {
    if (!isLoading) {
      try {
        await verifyToken()
      } catch (error) {
        // Handle any errors if needed
        console.error('Error in useEffect:', error)
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <Wrapper className="page-login">
        <h2 className="section-center">Loading...</h2>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper className="page-login">
        <h4 className="section-center">
          There was an error, please double check your verification link{' '}
        </h4>
      </Wrapper>
    )
  }

  return (
    <Wrapper className="page-login ">
      <div className="div section-center">
        <h2>Account Confirmed</h2>
        <Link to="/login" className="btn">
          Please login
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section``

export default VerifyPage
