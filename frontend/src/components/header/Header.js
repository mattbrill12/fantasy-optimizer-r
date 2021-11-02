import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function Header() {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">Fantasy Lineup Optimizer</Navbar.Brand>
                <Nav className="me-auto justify-content-end">

                    <Nav.Link href="/solutions/NFL">NFL</Nav.Link>
                    <Nav.Link href="/solutions/NBA">NBA</Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;