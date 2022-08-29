DOWNLOAD: https://git-scm.com/download/win
Selected Components during Installation: default

	Git - Ferramenta de versionamento de arquivos
    _____________________________________________________
     
      FUNDAMENTALS

             UPLOAD - UPDATE ONLINE REPOSITORY
       > Adds to box, commits/closes the box, pushes the box through
git add .gitignore
git add .
git commit -m "First commit"
git push origin main
			.gitignore is used to ignore certain dev files

             DOWNLOAD - UPDATE LOCAL REPOSITORY
       > Pulls
git pull origin main

    _____________________________________________________

      GLOSSARY

         remote repository   online
         local repository    local

         branch              when main bifurcates to a new line
         fork	             a clone of a project/repo. Like a replica of someone else's warehouse

       > brzrkr ANALOGY
         stage               puts stuff in a box
         committing          closing a box and sticking a label on it
         push [-u]           sends all closed boxes off to the warehouse (remote), 
                             where they're out of your control [-u sets branch as default, allowing git push]
         pull                asks the warehouse to bring the new boxes
         clone <URL>         allows pulling someone's else repo
         pull request        when I make a change and want to suggest the owner

         clear               clear terminal
         status              presents git actual state
         branch -M "name"    renames the actual branch to name

         rm --cache -r file  removes file from cache (from the boxes)

         checkout -b "name"  creates and ch to a new branch one is about to start working with
         merge "branchname"  merges the branch to the connected one
                  

    _____________________________________________________

             CREATE LOCAL

ADDING LOCALLY HOSTED CODE TO GITHUB
Source: https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github

> Adding a local repository to GitHub using Git
1. Create a new repository on GitHub.com. To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.
2. Open Git Bash.
3. Change the current working directory to your local project.
4. Initialize the local directory as a Git repository.
	$ git init -b main
5. Add the files in your new local repository. This stages them for the first commit.
	$ git add .
	# Adds the files in the local repository and stages them for commit. To unstage a file, use 'git reset HEAD YOUR-FILE'.
6. Commit the files that you've staged in your local repository.
	$ git commit -m "First commit"
	# Commits the tracked changes and prepares them to be pushed to a remote repository. To remove this commit and modify the file, use 'git reset --soft HEAD~1' and commit and add the file again.
7. At the top of your repository on GitHub.com's Quick Setup page, click  to copy the remote repository URL.
Copy remote repository URL field
8. In the Command prompt, add the URL for the remote repository where your local repository will be pushed.
	$ git remote add origin  REMOTE_URL
	# Sets the new remote
	$ git remote -v
	# Verifies the new remote URL
9. Push the changes in your local repository to GitHub.com.
	$ git push origin main
# Pushes the changes in your local repository up to the remote repository you specified as th

    _____________________________________________________

      Main Settings

       > Add Your Name and Email

git config --global user.name "My Name"
git config --global user.email "myemail@example.com"

       > Change Your Text Editor
git config --global core.editor "atom --wait"

       > Remove a file from cache

    _____________________________________________________

      Errors

warning: LF will be replaced by CRLF
fix:     git config --global core.autocrlf false
source:  https://stackoverflow.com/questions/17628305/windows-git-warning-lf-will-be-replaced-by-crlf-is-that-warning-tail-backwar


File created at: August 12th, 2022.
