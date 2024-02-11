import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavbarComponent({login, setLogin}) {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="p-4 nav-comp">
      <Container>
        <Navbar.Brand href="/"  className="fw-bold" style={{
          fontStyle:"italic", fontSize:"24px", textShadow:"revert-layer"
        }}>AUTO GALERY</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cars">Cars</Nav.Link>
            {login && <Nav.Link href="/rented-car">Rents</Nav.Link> }
            {login ? <div className="nav-link" onClick={() => {setLogin(false); localStorage.removeItem('rentUser')}}>Logout</div> : <Nav.Link href="/login">Login</Nav.Link> }
            
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
