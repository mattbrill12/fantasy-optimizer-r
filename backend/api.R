library(plumber)
library(tidyverse)
library(jsonlite)
library(rjson)
source('optimizer_alt.R')
source('optimizer.R')
source('random_walk.R')
source('random_walk_alt.R')


#* @apiTitle Plumber Example API
#* @apiDescription Plumber example description.

#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /draftables
function() {
  json_file <- "https://api.draftkings.com/draftgroups/v1/draftgroups/58073/draftables?format=json"
  json_data <- fromJSON(paste(readLines(json_file), collapse=""))
  return(toJSON(json_data$draftables))
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /optimized-lineup/dk
function(req) {
  print(c('.......optimized-lineup/dk started..........'))
  df <- runOptimizer()
  print(c('.......optimized-lineup/dk finished..........'))
  return(toJSON(df))
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /optimized-lineup/runAvg
function(req) {
  print(c('.......optimized-lineup/runAvg started..........'))
  df <- runOptimizerRunAvg()
  print(c('.......optimized-lineup/runAvg finished..........'))
  return(toJSON(df))
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /generated-lineup/dk
function(req) {
  print(c('.......generated-lineup started..........'))
  dataset <- read.csv("df_full.csv", stringsAsFactors = FALSE)
  lineup <- random_walk(dataset, 100)
  df = data.frame(lineup)
  print(c('.......generated-lineup finished..........'))
  return(toJSON(df))
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /generated-lineup/runAvg
function(req) {
  print(c('.......generated-lineup random walk alt started..........'))
  dataset <- read.csv("df_full.csv", stringsAsFactors = FALSE)
  lineup <- random_walk_alt(dataset, 100)
  df = data.frame(lineup)
  print(c('.......generated-lineup random walk alt finished.........'))
  return(toJSON(df))
}
print(c('.......api started..........'))




