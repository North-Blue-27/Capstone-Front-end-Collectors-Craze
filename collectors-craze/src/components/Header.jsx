import React, { useState } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

function Header() {
  const [dropdownOpen] = useState(false);

   return (
    <Navbar className='navbar-style bg-dark'variant="dark" expand="lg">
      <Navbar.Brand href="/#home" id='brand-style'>Collector's Craze</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Form className={`d-md-flex ${dropdownOpen ? 'flex-column' : 'align-items-center'}`}>
          <FormControl type="text" placeholder="Username" className="m-1 responsive-width" />
          <FormControl type="password" placeholder="Password" className="m-1 responsive-width" />
          <Button variant="outline-info" className="mr-2 m-1">
            Login
          </Button>
          <Button variant="outline-danger" className="m-1">
            Register
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;