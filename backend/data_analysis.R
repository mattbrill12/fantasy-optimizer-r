library(ggplot2)
library(dplyr)

df <-read.csv("df_full.csv", stringsAsFactors = FALSE)

df <- as.data.frame(df)
sapply(df, class)

df %>% filter(Proj_Points > 5) %>% ggplot(aes(x = Proj_Points, y = Salary)) + geom_point() +geom_smooth()
 
summary(lm(Proj_Points ~ Salary, data = df))

round(df$roll_average_points, 1)

residuals = abs(df$roll_average_points - df$Proj_Points)

df_res = df

df_res['difference_in_prediction'] = residuals

df_res %>% filter(Proj_Points > 5) %>% ggplot(aes(x = difference_in_prediction)) + geom_histogram(binwidth = 0.5) 

df_res %>% filter(Proj_Points > 10) %>% ggplot(aes(x = difference_in_prediction)) + geom_histogram(binwidth = 0.1)

df_res %>% filter(Proj_Points > 15) %>% ggplot(aes(x = difference_in_prediction)) + geom_histogram(binwidth = 0.01)

source('random_walk.R')

for (x in c(1,10, 100,1000, 10000)){
  iter = random_walk(df, x)
  print(sum(iter$Proj_Points))
}

trials = c(1, 10, 100, 1000, 10000)
results = c(67.3, 74.2, 107, 96.2, 136.4)

trial_test <- data.frame(trials = trials, team_points = results)

trial_test %>% ggplot(aes(x = trials, y = team_points)) + geom_line() + scale_x_log10() + scale_y_continuous(breaks = seq(0,140,10))

library(ggcorrplot)

df %>% select(Salary, Proj_Points) %>% cor() %>% ggcorrplot(lab = TRUE)
