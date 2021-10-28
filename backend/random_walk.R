## Create a script to randomly generate lineups given the team and salary constraints

library(dplyr)
data<-read.csv("DK_test.csv", stringsAsFactors = FALSE)

max_val_team = data.frame(matrix(rep(0, 45),nrow = 9, ncol = 5))
colnames(max_val_team) <- c('LastName', 'FirstName', 'Position', 
                                 'Salary', 'Proj_Points')


random_walk <- function(x, trials) {
  
  for (i in 1:trials){
      qb <- x %>% filter(Position == "QB") %>% sample_n(1)
      rb <- x %>% filter(Position == "RB") %>% sample_n(2)
      wr <- x %>% filter(Position == "WR") %>% sample_n(3)
      te <- x %>% filter(Position == "TE") %>% sample_n(1)
      dst <- x%>% filter(Position == "DST") %>% sample_n(1)
      flex <- x %>% filter(Position %in% c("RB", "WR", "TE")) %>% sample_n(1)
  
      team = rbind(qb, rb, wr, te, dst, flex)
  
      team_total = sum(team$Proj_Points)
      max_total = sum(max_val_team$Proj_Points)
  
      if (team_total > max_total) {
        max_val_team = team
      }
  }
  return(max_val_team)
}

random_walk(data, 10)
