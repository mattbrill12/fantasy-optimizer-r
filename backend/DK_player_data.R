library(dplyr)
library(rjson)

hist_df<- read.csv("DK_avg_points.csv", sep = ';')

week_current <- hist_df %>% filter(Week == 7)

player_proj <- week_current %>% select(Name, Pos, Team, Games.Played, Average.DK.Points)


# Split Name column into first and last name inorder to merge with DK dataframe later
lastname = sapply(strsplit(player_proj$Name, ','), function(x) x[1])
firstname = sapply(strsplit(player_proj$Name, ','), function(x) x[length(x)])

# Remove name suffixes to avoid errors when joining data
lastname = gsub(' IV', '', lastname, fixed = T)
lastname = gsub(' III', '', lastname, fixed = T)
lastname = gsub(' II', '', lastname, fixed = T)
lastname = gsub(' I', '', lastname, fixed = T)

player_proj['Firstname'] = firstname
player_proj['Lastname'] = lastname

#Rename Def positions to DST in order to match DK data frame
player_proj$Pos = gsub('Def', 'DST', player_proj$Pos, fixed = T)

#Rename team abbr. in order to match DK data frame
player_proj$Team = gsub('gnb', 'gb', player_proj$Team, fixed = T)
player_proj$Team = gsub('kan', 'kc', player_proj$Team, fixed = T)
player_proj$Team = gsub('nwe', 'ne', player_proj$Team, fixed = T)
player_proj$Team = gsub('nor', 'no', player_proj$Team, fixed = T)
player_proj$Team = gsub('sfo', 'sf', player_proj$Team, fixed = T)
player_proj$Team = gsub('tam', 'tb', player_proj$Team, fixed = T)
player_proj$Team = gsub('jac', 'jax', player_proj$Team, fixed = T)


player_proj

json_file <- 'https://api.draftkings.com/draftgroups/v1/draftgroups/58073/draftables?format=json'
json_data <- fromJSON(file=json_file)

draftables = json_data$draftables

LastName <- c()
FirstName <- c()
Position = c()
Salary = c()
Proj_Points = c()
Team = c()

for(i in 1:length(draftables)){
  
  player = draftables[[i]]
  
  FirstName[i] =  player$firstName
  LastName[i] =  player$lastName
  Position[i] =  player$position
  Salary[i] =  player$salary
  Team[i] =  tolower(player$teamAbbreviation)
  Proj_Points[i] =  ifelse(player$draftStatAttributes[[1]]$id >= 0, 
                           player$draftStatAttributes[[1]]$value, -9999)
}

DK_DF = data.frame(
  LastName=LastName, 
  FirstName = FirstName, 
  Position = Position, 
  Salary = Salary, 
  Proj_Points = Proj_Points, 
  Team = Team
  )

DK_DF = unique(DK_DF)

gsub(' IV', '', DK_DF$LastName, fixed = T)
gsub(' III', '', DK_DF$LastName, fixed = T)
gsub(' II', '', DK_DF$LastName = T)
gsub(' I', '', DK_DF$LastName = T)


# filter out DST for each data frame
def_player_filtered = player_proj %>%  filter(Pos == 'DST')
def_dk_filtered = DK_DF %>%  filter(Position == 'DST')

#
# merge on Team into DK_DF
#
merged = left_join(dk_filtered, player_filtered, on=Team)


write.table(DK_DF, "DK_test.csv", sep=",")


library(rjson)
dataset <- read.csv("mydata.csv")
df = data.frame(dataset)
df
x = toJSON(df)
x
