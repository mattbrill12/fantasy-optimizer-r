library(plumber)
library(tidyverse)
library(jsonlite)
library(rjson)


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
#* @get /optimized-lineup
function(req) {
  dataset <- read.csv("mydata.csv", stringsAsFactors = FALSE)
  df = data.frame(dataset)
  return(toJSON(df))
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /generated-lineup/<numTrials>
function(req) {
  dataset <- read.csv("randomwalk", stringsAsFactors = FALSE)
  df = data.frame(dataset)
  return(toJSON(df))
}

print(c('.......api started..........'))




