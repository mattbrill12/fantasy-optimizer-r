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
#* @get /season
function() {
  load(url('https://s3.amazonaws.com/graderdata/Knicks.rda'))
  
  dataSummary <- data %>%
    group_by(visiting, season) %>%
    summarise(ratio = sum(win == 'W')/n())

  x <- toJSON(dataSummary)
  return(x)
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /team/<id>
function(id) {
  return(tolower(as.character(id)))
}

#* @preempt cors
#* @param The text to be echoed in the response
#* @get /lineup
function() {
  json_file <- "https://api.draftkings.com/draftgroups/v1/draftgroups/58257/draftables?format=json"
  json_data <- fromJSON(paste(readLines(json_file), collapse=""))
  return(json_data)
}


print(c('api started'))


