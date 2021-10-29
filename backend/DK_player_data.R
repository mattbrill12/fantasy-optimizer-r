library(dplyr)
library(rjson)

hist_df<- read.csv("DK_avg_points.csv", sep = ';')


# Get the latest week that each player has played
max_week <- hist_df %>% group_by(Name) %>% summarise(Week = max(Week))

#Left join latest week player with the rest of the data
week_current <- left_join(max_week, hist_df, by = c("Week", "Name"))

player_proj <- week_current %>% select(Name, Pos, Team, Games.Played, roll_average_points)

# Split Name column into first and last name inorder to merge with DK dataframe later
lastname = sapply(strsplit(player_proj$Name, ','), function(x) x[1])
firstname = sapply(strsplit(player_proj$Name, ', '), function(x) x[length(x)])

# Remove name suffixes to avoid errors when joining data
lastname = gsub(' IV', '', lastname, fixed = T)
lastname = gsub(' III', '', lastname, fixed = T)
lastname = gsub(' II', '', lastname, fixed = T)
lastname = gsub(' I', '', lastname, fixed = T)

player_proj['firstname'] = firstname
player_proj['lastname'] = lastname

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

player_proj %>% select(Name, Pos, Team, Games.Played, roll_average_points)


json_file <- 'https://api.draftkings.com/draftgroups/v1/draftgroups/58073/draftables?format=json'
json_data <- fromJSON(file = json_file)

## Create empty vectors to fill with Json Data
LastName <- c()
FirstName <- c()
Position = c()
Salary = c()
Proj_Points = c()
Team = c()

## Loop through Json file to fill vector fields
for(i in 1:length(json_data$draftables)){
  
  FirstName[i] =  json_data$draftables[[i]]$firstName
  LastName[i] =  json_data$draftables[[i]]$lastName
  Position[i] =  json_data$draftables[[i]]$position
  Salary[i] =  json_data$draftables[[i]]$salary
  Team[i] =  tolower(json_data$draftables[[i]]$teamAbbreviation)
  Proj_Points[i] =  ifelse(json_data$draftables[[i]]$draftStatAttributes[[1]]$id >= 0, 
                           json_data$draftables[[i]]$draftStatAttributes[[1]]$value, 0)
}

## Create data frame from vector fields
DK_DF = data.frame(
  lastname=LastName, 
  firstname = FirstName, 
  Pos = Position, 
  Salary = Salary, 
  Proj_Points = Proj_Points, 
  Team = Team
  )

## DraftKings Json file list many players twice, remove duplicate rows
DK_DF = unique(DK_DF)

## The inclusion of name suffixes is inconsistent between the data sets
## Need to remove suffixes to merge data frames later

DK_DF$lastname = gsub(' IV', '', DK_DF$lastname, fixed = T)
DK_DF$lastname = gsub(' III', '', DK_DF$lastname, fixed = T)
DK_DF$lastname = gsub(' II', '', DK_DF$lastname, fixed = T)
DK_DF$lastname = gsub(' I', '', DK_DF$lastname, fixed = T)


# filter out DST for each data frame
def_player_filtered = player_proj %>%  filter(Pos == 'DST')
def_dk_filtered = DK_DF %>%  filter(Pos == 'DST')


# merge on Team into DK_DF
merged_def = left_join(def_dk_filtered, def_player_filtered, by='Team')

# select only relevant columns after merging tables
merged_def = merged_def %>% select(lastname.x, firstname.x, Team, Pos.x, Salary, Proj_Points, roll_average_points)

# Filter out defensive player data from main data frame in order to merge regulat player data
player_filtered = player_proj %>%  filter(Pos != 'DST')
dk_filtered = DK_DF %>%  filter(Pos != 'DST')

# Merge tables on Name and Position
merged = left_join(dk_filtered, player_filtered, by= c("lastname", "firstname", "Pos"))

merged = merged %>% select(lastname, firstname, Team.x, Pos, Salary, Proj_Points, roll_average_points)

colnames(merged)[colnames(merged) == 'Team.x'] = 'Team'
colnames(merged_def)[colnames(merged_def) == 'lastname.x'] = 'lastname'
colnames(merged_def)[colnames(merged_def) == 'firstname.x'] = 'firstname'
colnames(merged_def)[colnames(merged_def) == 'Pos.x'] = 'Pos'

df_full = rbind(merged, merged_def)

write.table(df_full, "df_full.csv", sep=",")
