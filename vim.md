# Vim - the ubiquitous text editor
Write code navigating with keyboard.

Based on the original Unix text editor Vi, which came about in 1976 by Bill Joy.

Vim (Vi improved) followed it in 1991 by Bram Moolenaar.

<div align="center">
  <img src="./images/vim_sheetcode.png" style='background-color: rgb(250, 250, 250)'>
</div>

## Vim Modes
Enter Normal mode: `ESC` or `Ctrl + C`  
Enter Command mode with `:`

|Insert Mode||
|---|---|
|i|before caret|
|shift + i| beginning of line|
|a|after caret|
|shift + a| end of the line |
|o|insert in next line|
|shift + o | insert in line above|

|Visual Mode||
|---|---|
|v|visual|
|ctrl + v| visual block|
|shift + v|visual line|

Commands: D C Y V  
(`.` repeats any operation done in Normal Mode)

DELETE
- word: `d i w`
- sentence: `d i s`
- paragraph: `d i p`

CHANGE
- word: `c w` + "new word"

YANK
- all inside (, [, or a {: `y + i + ( [ {`
- all inside incuding braces: `y + i + ( [ {`


VERTICAL NAVIGATION
- sentence: `(` & `)`
- paragraph: `{` & `}`  (next block of blank line)
- half-page: ctrl + d/u
- full-age: ctrl + f/b
- go to beginning of the page: gg
- go to end of the page:G

undo - U  
redo - ctrl + R

MARK (normal mode)
- mark-current-position with a: `m a`
- jump-to mark-a: `~a`
- toggle last cursor position: `~~`
- go-to last edit position: `~.`

SEARCH
- `/pattern` (iterate by typing `n`/`N`)
- search for the next word like the current word `*` (`#`, backwards)


# change in a word
c i w

Then, if I go to any word and click ".", the last operation will run again


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

## Setup Vim in VS Code
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