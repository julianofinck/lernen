# [R](https://www.r-project.org/)
R ([INTRO DOC](https://cran.r-project.org/doc/manuals/r-patched/R-intro.html))
is interpreted, follow Scheme's lexical scoping (the scope of variables is defined by placement in the source code), optimized for statistical analysis and data visualization, released in 1992.

R can be regarded as an implementation of the S language which was developed at Bell Laboratories by Rick Becker, John Chambers and Allan Wilks, and also forms the basis of the S-PLUS systems.

Packages available in the r-archive network, known as CRAN.

R is commonly used with the IDE [RStudio](https://posit.co/download/rstudio-desktop/).



## R-Terminal
Call `R.exe` to enter. Call `q()` to quit it.



setwd() | sets working directory in R


```R
# Create a text file using writeLines
text_content <- c("Hello, this is a test file.", "Line 2: Adding some content.")
writeLines(text_content, "test.txt")
```

## renv
R also supports Virtal Environments via the renv library. Similar to other packages in R, it requires Rtools installed (get the [Rtools43 installer](https://cran.rstudio.com/bin/windows/Rtools/rtools43/rtools.html)).

Once **Rtools** is installed, one can create the virtual environment with shiny and postgresql connectivity like this:
```R
# Install "renv" (this get installed in the root interpreter)
install.packages("renv")

# Set working directory
setwd("~/Rshiny")

# Calls the renv
library(renv)

# Start it in the workdir
renv::init()

# Install libraries one at a time, answering Y in the prompt.
renv::install("shiny")
renv::install("RPostgreSQL")

# Update the .lock file
renv::snapshot()
```

