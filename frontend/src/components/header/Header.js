import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Header() {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="#home">Fantasy Lineup Optimizer</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">NFL</Nav.Link>
                    <Nav.Link href="#features">NBA</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;