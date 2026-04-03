import { Navbar, Nav, Container } from "react-bootstrap";

export default function AppHeader() {
  return (
    <Navbar className="navbar-custom" expand="lg" variant="dark" sticky="top">
      <Container fluid>
        <Navbar.Brand className="brand-text">
          Member<span className="brand-dot">Hub</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link className="nav-link-custom">Dashboard</Nav.Link>
            <Nav.Link className="nav-link-custom">Reports</Nav.Link>
            <Nav.Link className="nav-link-custom">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
