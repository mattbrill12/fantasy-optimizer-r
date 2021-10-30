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
  df <- runOptimizer()
  return(toJSON(df))
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /optimized-lineup/runAvg
function(req) {
  df <- runOptimizerRunAvg()
  return(toJSON(df))
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /generated-lineup/dk
function(numTrials=10) {
  print(numTrials)
  dataset <- read.csv("df_full.csv", stringsAsFactors = FALSE)
  lineup <- random_walk(dataset, numTrials)
  df = data.frame(lineup)
  return(toJSON(df))
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /generated-lineup/runAvg
function(numTrials=10) {
  print(numTrials)
  dataset <- read.csv("df_full.csv", stringsAsFactors = FALSE)
  lineup <- random_walk_alt(dataset, numTrials)
  df = data.frame(lineup)
  return(toJSON(df))
}
print(c('.......api started..........'))




