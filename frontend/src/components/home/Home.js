import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function Home() {
    return (
        <Container>
            <Card className="m-2 p-4" border="dark" bg="light">
                <Card.Title>Fantasy Lineup Optimzer</Card.Title>
                <Card.Text as="p">This project analyzes weekly fantasy football data for the DraftKings platform.Weekly fantasy football consists of online contests in which you play against friends or get paired with random other competitors on the host website.The goal of the contest is to score the most points among your competitors.Points are scored based on a points system corresponding to the accrual of stats by individual players during NFL games.For each contest, competitors draft a team of players filling specific position types.In the classic format each team is required to have 1 Quarterback, 2 Running Backs, 3 Wide Receivers, 1 Tight End,, 1 Defense, and 1 FLEX.FLEX consists of any player in the position groups Running Back, Wide Reciever, or Tight End.Each NFL player has a salary in virtual dollars required to be paid to draft the player for the week.Each competitor has a budget of $50,000 virtual dollars used to fill the team for the contest.Better players (who are anticipated to score a large number of points) have a higher salary cost associated with them.Contests are played on a weekly basis corresponding to a week of the NFL season.Once all NFL games for the week are played, the player who's team scored the most points is named the winner.</Card.Text>
                <Card.Text as="p">This project seeks to optimize lineup selection in order to maximize points for a future contest.Forecasts for points are done in 2 ways.The first is a rolling average of points for each player, taking the total points for the season divided by games played.This method assumes a player is most likely to perform at their average in future weeks.The second method takes the points projection for each player from the DraftKings platform.</Card.Text>
            </Card>
        </Container>
    )
}

export default Home;