#!/bin/bash

shopt -s extglob

staging="/home/julianofinck/Lernen/javascript/course/curso_em_video/exercises01/clock_page"
production="/home/julianofinck/jsf-tree.github.io/"

echo "Copying Staging files and folders to $production"

# Copy all files and folders, excluding "expose.sh"
cp -rf !(expose.sh) "$production"

echo "Copy to Production completed"

# Deploy by git pushing to GitHub Pages
echo "Deploying..."
echo 


cd $production

git add .
git commit -m "auto-deploy"
git push

echo "Deployed!"
cd $staging
