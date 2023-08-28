# Vim - the ubiquitous text editor
Write code navigating with keyboard.

Based on the original Unix text editor Vi, which came about in 1976 by Bill Joy.

Vim (Vi improved) followed it in 1991 by Bram Moolenaar.

## Vim Modes
Toggle between modes:
- esc = Normal mode
- i = Insert mode
- : = Command mode
- v = Visual mode

### Sheetcode
|command | description|
|---|---|
|hjkl| navigation |
|I| start insert mode at the beginning of line|
|a| insert mode after the word|
|A| insert mode at the end of the line|
|R| replace the selected cursor|
|:q | quit an unmodified file|
|:q! | quit and discard changes|
|:wq | write the changes and quit|
|x | delete character|
|dd | delete line|
|u | undo it|
|:set number | add line numbers|
|:2 | goto line 2|
|+p | paste|
|:w | write/save|
|:!node hello.js | runs a shell command directly from Vim|

## Setup Vim in VSCode
- Add extension "vscodevim.vim"  
- Setup key-repeat  
On Google, search for "vscode vim github". Open repository "VSCodeVim/Vim"  
Scroll down to installation section, find your OS, perform the steps.  
Restart VSCode for changes to take effect: `>reload`  
Caret should be wider.  

- Remap "jh" to "ESC"  
```vim
" Add a recursive mapping "jh" only to Insert Mode
:inoremap jh <Esc>
" Remove the recursive mapping "jh"
:iunmap jh      
```