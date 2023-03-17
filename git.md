# Git - File versioning tool
* [Download Git for Windows](https://git-scm.com/download/win) 
(On installation, always select the default)
* Set the main settings

### Main Settings - Who are you?
```
# Add Your Name and Email
	git config --global user.name "My Name"
	git config --global user.email "myemail@example.com"
```

### Introduction - brzrkr's analogy:
While **stage** puts stuff in a box, **commit** closes the box and stick a label on it. 
Further, **push** sends all the closed boxes off to the warehouse (remote), 
there they're out of your control. **pull** asks the warehouse to bring the new boxes to an existing location; 
**clone** makes a copy of the entire warehouse and bring it to a new location. 

## Glossary
| Concept           | Description                              |
|-------------------|------------------------------------------|
 | remote repository | online (like a warehouse)                |
 | local repository  | local (like a storage room)              |
 | branch            | when main bifurcates to a new line       |
 | fork              | a replica of someone else's project/repo | 

## Recurrent tasks
#### **When local already exists**
```
# "PULL the box back from the warehouse to the storage room" 
	git pull origin main

# "PUSH the box from the storage room into the warehouse (remote)"
# .gitignore is used to ignore certain dev files
	git add .gitignore
	git add .
	git commit -m "<summarizing commit name>"
	git push origin main
```

#### **When local does not exist**
```
# "PULL the box from the warehouse (remote) to a brand new storage room"
	git clone <LINK>
```

#### **Create new local from scratch** - The steps below come from [this source](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github)
```
# 1) Create a new repository on GitHub.com. To avoid errors, 
do not initialize the new repository with README, license, 
or gitignore files. You can add these files after your 
project has been pushed to GitHub

# 2) Open Git Bash

# 3) Change the current working directory to your local project

# 4) Initialize the local directory as a Git repository with main branch named 'main'
	git init -b main

# 5) Add .gitignore to signalize files that must not go to remote
	git add .gitignore

# 6) Add the files to be sent to remote. This stages everything bar the ones in gitignore for the first commit 
	git add .

# To unstage a file, use 'git reset HEAD <YOUR-FILE>'

# 7) Commit the files that you've staged in your local repository.
	git commit -m "<A name for your commit (typical names: first commit, fixed X, implemented Y)"

# This commits the tracked changes and prepares them to be pushed to a remote repository.
# To remove a commit and modify the file, use 'git reset --soft HEAD~1', and commit and add the file again.

# 8) At the top of your repository on GitHub.com's Quick Setup page, click to copy the remote repository URL.
Copy remote repository URL field

# 9) In the Command prompt, add the URL for the remote repository where your local repository will be pushed.
   	# Sets a remote called origin via its URL
	git remote add origin  REMOTE_URL

	# Verifies the remotes	
	git remote -v

# 10) Push the changes in your local repository up to the remote repository you specified as "origin"
	git push origin main
```


#### **Change commit messages**
```
# Edit commit messages
	git commit --amend

# Change your text editor (example with atom and wait git until editor closes)
	git config --global core.editor "atom --wait"
```


## Sheetcode - Fundamentals

| Command                      | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| clear                        | clear the terminal                                                  | 
| git status                   | presents git actual state                                           | 
| git branch -M "name"         | renames the actual branch to name                                   | 
| checkout -b "name"           | creates and ch to a new branch one is about to start working with   | 
| pull request                 | when I make a change and want to suggest the owner                  | 
| merge "branchname"           | merges the branch to the connected one                              | 
| git rm --cache -r <file/dir> | removes the file/dir from cache (from the boxes) but not from local | 

### Known Errors
| Warning                     | Fix                                     | Source                                                                                                                    |
|-----------------------------|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| LF will be replaced by CRLF | git config --global core.autocrlf false | https://stackoverflow.com/questions/17628305/windows-git-warning-lf-will-be-replaced-by-crlf-is-that-warning-tail-backwar |


### File history
| Action    | Date              |
| :--       | :--               |
| Creation  | August 12th, 2022 |
| Modified  | March 17th, 2023  |


| Column 1 | Column 2 | Column 3 |
| :--      | :--      | :--      |
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

