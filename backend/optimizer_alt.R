
#The algorithm takes a csv of player names, positions, salaries, expected points provided by DraftKings, 
#and expected points scored (rolling average) and generates an optimal lineup 
#based on the constraints in the evaluation function.
#
#The algorithm can be used across a variety of similar linear optimization problems.

#Install.packages("lpsolve")

library(lpSolve)


#Read in dataset
dataset<-read.csv("df_full.csv", stringsAsFactors = FALSE)


#Change variables to appropriate types
dataset$Pos <- as.factor(dataset$Pos)
#dataset$Salary <-as.numeric(dataset$Salary)
#dataset$Proj_Points <-as.numeric(dataset$Proj_Points)
#dataset$Avg.DK.Points <-as.numeric(dataset$Avg.DK.Points)


#### Prepare constraint matrix of zeros #####
A <- matrix(0, nrow = 7, ncol = nrow(dataset))

#Designate the positions that are equivalent to each other when generating the optimal lineup
#There are 6 distinct positions and 1 constraint in which salary is < 50,000
#I.e. A player with the position WR/RB/TE can fill the FLEX position
#Add a "1" to all position that can fill that position slot


#Set QB parameters
j<-1
i<-1
for (i in 1:nrow(dataset)){
  if (dataset$Pos[i]=="QB")
    A[j,i]<-1
}
#RB
j<-2
i<-1
for (i in 1:nrow(dataset)){
  if (dataset$Pos[i]=="RB")
    A[j,i]<-1
}
#WR
j<-3
i<-1
for (i in 1:nrow(dataset)){
  if (dataset$Pos[i]=="WR")
    A[j,i]<-1
}
#TE
j<-4
i<-1
for (i in 1:nrow(dataset)){
  if (dataset$Pos[i]=="TE")
    A[j,i]<-1
}
#FLEX
j<-5
i<-1
for (i in 1:nrow(dataset)){
  if (dataset$Pos[i]=="RB" || 
      dataset$Pos[i]=="WR" || 
      dataset$Pos[i]== "TE")
    A[j,i]<-1
}
#DST
j<-6
i<-1
for (i in 1:nrow(dataset)){
  if (dataset$Pos[i]=="DST") 
    A[j,i]<-1
}



A[7, ] <- dataset$Salary                # salary <= 50000




# Prepare input for LP solver
objective.in <- dataset$roll_average_points
const.mat <- A
const.dir <- c('==', '>=','>=', '>=','==','==', '<=')
const.rhs <- c(1, 2, 3, 1, 7, 1, 50000)



# Generate optimal lineup with lp solve
require(lpSolve)
sol <- lp(direction = "max", objective.in, # maximize objective function
          const.mat, const.dir, const.rhs,   # constraints
          all.bin = TRUE)                    # use binary variables only

### View the solution
inds <- which(sol$solution == 1)
sum(dataset$Salary[inds])

solution<-dataset[inds, ]

#Print players in optimal lineup
solution

#Write csv file of the optimal lineup
#write.table(solution, "mydata.csv", sep=",")



