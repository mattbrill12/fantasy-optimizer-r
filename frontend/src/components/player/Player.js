import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';


function Player(player) {

    const { id, name, salary, value, position, team, handleExclude } = player;
    const [isExcluded, setIsExcluded] = useState(false);

    function handleClick() {
        if (handleExclude && !isExcluded) {
            handleExclude(player);
            setIsExcluded(true);
        }
    };

    return (
        <Card border="dark" onClick={handleClick}>
            <Card.Body>
                <Card.Title>{name} </Card.Title>
                <div className="row">
                    <div className="col">
                        <Card.Text>{salary}</Card.Text>
                        <Card.Text>{value}</Card.Text>
                    </div>
                    <div className="col">
                        <Card.Text>{position}</Card.Text>
                        <Card.Text>{team}</Card.Text>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Player;