# fantasy-optimizer-r

### Project Introduction
This project analyzes weekly fantasy football data for the DraftKings platform. Weekly fantasy football consists of online contests in which you play against friends or get paired with random other competitors on the host website. The goal of the contest is to score the most points among your competitors. Points are scored based on a points system corresponding to the accrual of stats by individual players during NFL games. For each contest, competitors draft a team of players filling specific position types. In the classic format each team is required to have 1 Quarterback, 2 Running Backs, 3 Wide Receivers, 1 Tight End, , 1 Defense, and 1 FLEX. FLEX consists of any player in the position groups Running Back, Wide Reciever, or Tight End. Each NFL player has a salary in virtual dollars required to be paid to draft the player for the week. Each competitor has a budget of $50,000 virtual dollars used to fill the team for the contest. Better players (who are anticipated to score a large number of points) have a higher salary cost associated with them. Contests are played on a weekly basis corresponding to a week of the NFL season. Once all NFL games for the week are played, the player who's team scored the most points is named the winner.

This project seeks to optimize lineup selection in order to maximize points for a future contest. Forecasts for points are done in 2 ways. The first is a rolling average of points for each player, taking the total points for the season divided by games played. This method assumes a player is most likely to perform at their average in future weeks. The second method takes the points projection for each player from the DraftKings platform. 

## Backend 
- Python for scraping
- R as REST API and for EDA
- Nodejs Express server as middleware to solve for CORS issue

## Frontend
- ReactJS web app
- Bootstrap css library

## TODO
- dockerize R api to run on static port instead

## NICE TO HAVE
- NBA tab

## FUTURE WORK
- gather past fantasy line ups to train data
- generic optimizer for any sport

## File Description and Instructions (pre-setup)

Step #1 - run rotoscrape_football.py : File used to webscrape data and export data to csv

Step #2 - run nfl_value_forecast.py : File used to read in raw webscrape data and assign average points values to each player exports csv

Step #3 DK_player_data.R : File used to read in and clean data from DraftKings API. File also reads in web scraped and reformats both data sources into a single data frame

## Files used by front end app 
optimizer.R : Script for linear programing solver. Accepts data frame of all player data and outputs the optimal lineup

random_walk.R : Script for random lineup generation. Randomly picks players from inputted data frame to generate lineups. Trials are manually input by the user and best result from all trials is returned.


## App Startup
- go into backend folder
    - `cd /backend`
- run api.R and `run api`
    - IMPORTANT - get port number of R server to forward from Express server and assign it to `apiPort` variable in `proxy-api.js`
- run `npm install`
- run `node proxy-api`
- go into frontend folder
    - `cd ../frontend`
    - run `npm install`
    - run `npm start`


### Dataset

firstname: First name of NFL player recording points in the contest

lastname: Last name of NFL player recording points in the contest

Pos: Position of the NFL player recording points in the contest

Team: NFL team the player recording points belongs to

salary: Virtual dollars required to draft a player for a contest, salaries set by DraftKings

Proj_Points: Points projections for each player provided by DraftKings for each contest

Average.DK.Points: Average points for each player taking their total points for the season divided by games played. Historical data from past performances was web scraped from a third party website http://rotoguru1.com/cgi-bin/fyday.pl?game=fd