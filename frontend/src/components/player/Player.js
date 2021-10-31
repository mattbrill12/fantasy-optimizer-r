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
        <>
            <Skeleton />
            <Card className="m-2" border="light" onClick={handleClick}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-start">
                                <div className="">
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Subtitle>{team.toUpperCase()} | {position}</Card.Subtitle>
                                    <Card.Text>Salary: ${salary}</Card.Text>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex justify-content-start">
                                <div className="">
                                    <Card.Subtitle as="h5">FPPG</Card.Subtitle>
                                    <Card.Text as="h3">{value.toFixed(2)}</Card.Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>

    )
}

export default Player;