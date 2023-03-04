import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import Row from 'react-bootstrap/Row'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UseSnackbarQueue from '../components/snackbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setLoginSlice} from '../redux/UserSlice'
import axios from '../services/URL'

function Login() {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)
  const showSuccess = UseSnackbarQueue('success')
  const showError = UseSnackbarQueue('error')
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleLogin= () =>{
    if (login === '' || password === ''){
      setValidated(true)
    }else{
    const json = JSON.stringify({
      login,
      password
    })
     axios.post('token/', json, {
      headers:{
        'Content-type': "application/json"
      }}).then(res =>{
        showSuccess('Succesfull action')    
        dispatch(setLoginSlice(
          {login: login, token: res.data.access}
          ))
        sessionStorage.setItem('login', login)
        sessionStorage.setItem('token',res.data.access )
        axios.get(`users/${login}/`).then(res=>{
          sessionStorage.setItem('picture', res.data.user_details.picture)
        }).catch(err =>{
          showError(err.response.data.message)
        })
          navigate("/")
      }).catch(err =>{
        showError(err.response.data.message)
      })}
  }


  return (
    <>
      <Header/>
      <Form
        noValidate      
        validated={validated}>
      <Row sm='auto' style={{justifyContent:'center'}} className='mt-5 mx-5'>
        <FloatingLabel label='Login'>
          <Form.Control 
          type="text" 
          placeholder="jkowalski"              
          value={login}
          onChange={event => {
              setLogin(event.target.value)
          }}
          required />
          <Form.Control.Feedback type="invalid" >
            login is required
          </Form.Control.Feedback>
        </FloatingLabel>
      </Row>
      <Row sm='auto' style={{justifyContent:'center'}} className="mt-3">
        <FloatingLabel label="Password">
          <Form.Control 
            type="password"
            placeholder="Password"
            value={password}
            onChange={event => {
                setPassword(event.target.value)
            }}
            required />
            <Form.Control.Feedback type="invalid">
            Password is required
          </Form.Control.Feedback>
        </FloatingLabel>
      </Row>
      <Row sm='auto' style={{justifyContent:'center'}} className='mt-2'>
      <Button variant="primary"  onClick={handleLogin} size='lg' >
        Login
      </Button>
      </Row>
      </Form>
    </>
  )
}

export default Login