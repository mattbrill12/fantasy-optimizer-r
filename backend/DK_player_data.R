library(dplyr)
library(rjson)

hist_df<- read.csv("DK_avg_points.csv", sep = ';')

week_current <- hist_df %>% filter(Week == 7)

player_proj <- week_current %>% select(Name, Pos, Team, Games.Played, Average.DK.Points)

json_file <- 'https://api.draftkings.com/draftgroups/v1/draftgroups/58074/draftables?format=json'
json_data <- fromJSON(file=json_file)

draftables = json_data$draftables



for (i in 1:length(draftables)){
  print(draftables[i])
}
l <-c()
for(i in 1:length(draftables)){
 
  l[i] =  draftables[[i]]$firstName
}
l

