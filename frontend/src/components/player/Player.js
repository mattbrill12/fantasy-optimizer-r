import Card from 'react-bootstrap/Card'


function Player({ name, salary, value, position, team }) {
    return (
        <Card border="dark">
            <Card.Body>
                <Card.Title>{name} {position} {team}</Card.Title>
                <Card.Text>
                    <ul>
                        <li>{salary}</li>
                        <li>{value}</li>
                    </ul>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Player;