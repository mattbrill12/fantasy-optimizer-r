library(dplyr)
library(rjson)

hist_df<- read.csv("DK_avg_points.csv", sep = ';')

week_current <- hist_df %>% filter(Week == 7)

player_proj <- week_current %>% select(Name, Pos, Team, Games.Played, Average.DK.Points)

json_file <- 'https://api.draftkings.com/draftgroups/v1/draftgroups/58073/draftables?format=json'
json_data <- fromJSON(file=json_file)

draftables = json_data$draftables

LastName <- c()
FirstName <- c()
Position = c()
Salary = c()
Proj_Points = c()

for(i in 1:length(draftables)){
  FirstName[i] =  draftables[[i]]$firstName
  LastName[i] =  draftables[[i]]$lastName
  Position[i] =  draftables[[i]]$position
  Salary[i] =  draftables[[i]]$salary
  if (draftables[[i]]$draftStatAttributes[[1]]$id >= 0){ 
  Proj_Points[i] =  draftables[[i]]$draftStatAttributes[[1]]$value}
  else {Proj_Points[i] = NA}
}

DK_DF = data.frame(LastName=LastName, FirstName = FirstName, Position = Position, Salary = Salary, Proj_Points = Proj_Points)

DK_DF = unique(DK_DF)
