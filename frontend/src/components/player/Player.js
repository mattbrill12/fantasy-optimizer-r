import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Skeleton from 'react-loading-skeleton';

function Player(player) {

    const {
        id,
        name,
        salary,
        value,
        position,
        team,
        image,
        handleExclude,
        isLoading
    } = player;
    const [isExcluded, setIsExcluded] = useState(false);

    function handleClick() {
        if (handleExclude && !isExcluded) {
            handleExclude(player);
            setIsExcluded(true);
        }
    };

    return (
        <div className="player-card">
            {!isLoading ?
                <Card className="m-2" border="light" bg="#info" onClick={handleClick}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <div className="d-flex mb-2">
                            <div className="">
                                <Card.Title>{name}</Card.Title>
                                <Card.Subtitle>{team.toUpperCase()} | {position}</Card.Subtitle>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="">
                                <Card.Subtitle as="label">Salary</Card.Subtitle>
                                <Card.Text as="p">${salary}</Card.Text>
                            </div>
                            <div className="">
                                <Card.Subtitle as="label">FPPG</Card.Subtitle>
                                <Card.Text as="p">{value.toFixed(2)}</Card.Text>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                :
                <Skeleton count={5} />
            }

        </div>

    )
}

export default Player;