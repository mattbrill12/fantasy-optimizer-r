import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

import nflLogo from '../../assets/nfl_logo.png';
import nbaLogo from '../../assets/nba_logo.png';


function Home() {

    const history = useHistory();

    function handleClick(sport) {
        history.push(`/solutions/${sport}`)
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card className="m-2 p-4" border="light" bg="light">
                        <Card.Title>Fantasy Lineup Optimzer</Card.Title>
                        <Card.Text as="p">
                            This project analyzes weekly fantasy football data for the DraftKings platform.
                            Weekly fantasy football consists of online contests in which you play against friends or get
                            paired with random other competitors on the host website. The goal of the contest is to score the
                            most points among your competitors.Points are scored based on a points system corresponding to
                            the accrual of stats by individual players during NFL games.For each contest, competitors draft a
                            team of players filling specific position types.In the classic format each team is required to have:
                            <ul>
                                <li><b>1 Quarterback</b></li>
                                <li><b>2 Running Backs</b></li>
                                <li><b>3 Wide Receivers</b></li>
                                <li><b>1 Tight End</b></li>
                                <li><b>1 Defense</b></li>
                                <li><b>1 FLEX</b></li>
                            </ul>
                            FLEX consists of any player in the position groups Running Back, Wide Reciever, or Tight End.
                            Each NFL player has a salary in virtual dollars required to be paid to draft the player for the week.
                            Each competitor has a budget of <b>$50,000</b> virtual dollars used to fill the team for the contest.
                            Better players (who are anticipated to score a large number of points) have a higher salary cost
                            associated with them.Contests are played on a weekly basis corresponding to a week of the NFL season.
                            Once all NFL games for the week are played, the player who's team scored the most points is named the winner.
                        </Card.Text>
                        <Card.Text as="p">
                            This project seeks to optimize lineup selection in order to maximize points for a future contest.
                            Forecasts for points are done in 2 ways. The first is a rolling average of points for each player,
                            taking the total points for the season divided by games played. This method assumes a player is most
                            likely to perform at their average in future weeks. The second method takes the points projection for
                            each player from the DraftKings platform.
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="mt-5 d-flex justify-content-around" >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img className="sport-logo" variant="top" src={nflLogo} />
                            <Card.Body>
                                <div className="d-flex justify-content-center" >
                                    <Button variant="primary" onClick={() => handleClick('NFL')}>Create Fantasy Lineup</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img className="sport-logo" variant="top" src={nbaLogo} />
                            <Card.Body>
                                <div className="d-flex justify-content-center">
                                    <Button variant="primary" onClick={() => handleClick('NBA')}>Create Fantasy Lineup</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default Home;