## Create a script to randomly generate lineups given the team and salary constraints

library(dplyr)
data<-read.csv("df_full.csv", stringsAsFactors = FALSE)

max_val_team = data.frame(matrix(rep(0, 45),nrow = 9, ncol = 5)) ## initiate date frame of empty lineup
colnames(max_val_team) <- c('LastName', 'FirstName', 'Position', 
                                 'Salary', 'Proj_Points')


random_walk <- function(x, trials) {
  
  for (i in 1:trials){
      qb <- x %>% filter(Pos == "QB") %>% sample_n(1)
      rb <- x %>% filter(Pos == "RB") %>% sample_n(2)
      wr <- x %>% filter(Pos == "WR") %>% sample_n(3)
      te <- x %>% filter(Pos == "TE") %>% sample_n(1)
      dst <- x%>% filter(Pos == "DST") %>% sample_n(1)
      flex <- x %>% filter(Pos %in% c("RB", "WR", "TE")) %>% sample_n(1)
  
      team = rbind(qb, rb, wr, te, dst, flex)
  
      team_total = sum(team$Proj_Points)
      max_total = sum(max_val_team$Proj_Points)
  
      if (team_total > max_total) {
        max_val_team = team
      }
  }
  return(max_val_team)
}


