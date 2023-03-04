import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Link} from 'react-router-dom'
import Logo from '../logo/logo.png'
import {useDispatch} from 'react-redux'
import {setLogoutSlice } from '../redux/UserSlice'
import {useState} from 'react'

function Header() {

  const [login, setLogin] = useState(sessionStorage.getItem('login'))
  const dispatch = useDispatch()
  const handleLogout=()=>{
    sessionStorage.clear()
    dispatch(setLogoutSlice())
    setLogin(null)
  }

 
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Container fluid>
    <Link style={{textDecoration: 'none'}} to="/">
      <Navbar.Brand>
      <img
              alt=""
              src={Logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
      />{' '}           
      </Navbar.Brand>
      </Link >
      <Link style={{textDecoration: 'none'}} to="/">
      <Navbar.Brand>
      TrainToGain
      </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/exercises/"> Exercises </Nav.Link>
          <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/workouts/"> Workouts </Nav.Link>
        </Nav>
        <Nav>
          {login !== null ? 
          <>
           <NavDropdown title={login} id="base-dropdown" drop="down" align="end">
              <NavDropdown.Item as={Link} style={{textDecoration: 'none'}} to="/myAccount">My account</NavDropdown.Item>
              <NavDropdown.Item as={Link} style={{textDecoration: 'none'}} to="/myWorkouts">My workouts</NavDropdown.Item>
              <NavDropdown.Item as={Link} style={{textDecoration: 'none'}} to="/createWorkout">Create new workout</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  as={Link} onClick={handleLogout} style={{textDecoration: 'none'}} to="/"> Logout</NavDropdown.Item>
            </NavDropdown>
            <Image alt=""
              src={sessionStorage.getItem('picture')}
              width="40"
              height="40"
              className="d-inline-block align-top" roundedCircle={true} >

            </Image>
            
          </>
          :
          <>
          <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/login/"> Login </Nav.Link>
          <Nav.Link as={Link} style={{textDecoration: 'none'}} to="/register/"> Register </Nav.Link>

          </>        
          } 
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header