# Vim - the ubiquitous text editor
Vim is a modal key-board oriented editor: .

In 1976, Vi came about by Bill Joy, based on the original Unix text editor Vi.  
In 1991, Vi got improved as Vim by Bram Moolenaar.  
In 2014, Neovim came along [Neovim in 100 seconds](https://youtu.be/c4OyfL5o7DU).

## Install

In Ubuntu, `sudo apt get neovim` ([doc](https://github.com/neovim/neovim/blob/master/INSTALL.md)).

In Windows via PS, `winget install neovim` and `Set-Alias -Name nvim -Value "C:\Program Files\Neovim\bin\nvim.exe"`
winget install microsoft.powershell  # This powershell is better
https://www.nerdfonts.com/font-downloads download CaskaydiaCove NF

## Getting started
Neovim config files are written in `vim` or `lua`. On Linux, they are stored in `~/.config/nvim`.  
Setup example by **Primeagen**: [0 to LSP: Neovim RC From Scratch](https://youtu.be/w7i4amO_zaE).  
While he uses the not more supported Packer, I use [Lazy Vim](https://github.com/folke/lazy.nvim) as plugin manager in view of [Packer](https://github.com/wbthomason/packer.nvim)'s discontinuation and its README recommendation .

Lazy-Vim expected plugins to be inside a plugins folder and are therefrom automatically loaded.
LazyVim does not typically uses "after". It uses its modular structure.

```bash
# Any dir inside lua/ can be loaded by lua via `require`
#  "init.lua" are like index.html or __init__.py
.config/neovim/init.lua
.config/neovim/lua/config/init.lua
.config/neovim/lua/config/lazy.lua
.config/neovim/lua/config/remap.lua
.config/neovim/lua/config/set.lua
.config/neovim/lua/plugins/all.lua
.config/neovim/lua/plugins/dap-python.lua
```


## Plugins
> Neovim is after all about Plugins and customization

| Plugin | Usage |
| ------ | ----- |
| Telescope | fuzzy finder to search through your system |
| Treesitter | Parser + linter |
| Harpoon | navigate between files |
| Undotree | |
| Fugitive | git integration (- to stage, :Git commit -m <msg>) |
| LSP-Zero | |

## Neovim Editor 
Check Primeagen's [Vim As Your Editor](https://www.youtube.com/watch?v=X6AR2RMB5tE&list=PLm323Lc7iSW_wuxqmKx_xxNtJC_hJbQ7R&index=1) playlist.
### Explorer
| Description | Cmd |
|---|---|
| New file | `%` |
| New dir | `d` |
| To explorer | `:Ex` (remap, `<leader>pv`)|
| Open file (buffer) | `o` |

||||
|---|---|---|
||k||
|h|j|l|

### Commands
4 modes: Normal, Insert, Visual, Command


Visual Line + `=` -> aligns text

## Check out
Telescope keybindings (C-p is CTRL+P)  
Harpoon keybinds and how it works  
Undotree: `<leader>u`  
Fugitive: `<leader>gs` (go to git control, s to save, cc to commit, :wq, dv while on main to open the git conflict solving windows, gh (select ))  
TMUX

LSP provides autocompletion (C-n and C-p to navigate; C-y to accept; C-e to cancel)  
LSP-zero has 3 dependencies, and each desired LSP server must be download separate and a `require('lspconfig').example_server.setup({})` must be added to LazyVim's plugin spec.


%s/pattern/new_pattern  ("\1" in new-pattern gets the first character from pattern)
```
leader<y>
leader<p>
leader<d>
leader<s> - substitute globally the word you are on
leader<x> - runs chmod on the file (make it executable)
```

DAB - Debug Adapter
https://github.com/mfussenegger/nvim-dap-python

```bash
pip install debugpy
```

<div align="center">
  <img src="./images/vim_sheetcode.png" style='background-color: rgb(250, 250, 250)'>
</div>

= indent code

## Vim Modes
Enter Normal mode: `ESC` or `Ctrl + C`  
Enter Command mode with `:`

|Insert Mode||
|---|---|
|i| before caret|
|I| line beginning|
|a| after caret|
|A| line end |
|o| insert in next line|
|O| insert in line above|

|Visual Mode||
|---|---|
|v|visual|
|ctrl + v/q| visual block (allegedly "shirt + i" would then start insert block mode)|
|shift + v|visual line|
|% | extend selection to include the matching parenthesis, bracket, or brace |
|o | change your cursor to the other side of the selection |
|g C-a C-a | increment the numbers in order the selected lines 0, 1, 2, 3, 4 ...|

### Anatomy of [Command] + [count] + [Motion]
| Commands | Effect |
| -------- | ------ |
| `vi(` | select all inside parenthesis |
| `vi{` | select all inside curly braces |
| `va{` | select all inclusive curly braces |
| `dt(` | delete all up to the next `(` |
| `ya{` | yank all in the [next] curly braces |
| `viw` | select all current word |
| `=ap` | indent the who paragraph |

Commands: D C Y V  
(`.` repeats any operation done in Normal Mode)

DELETE
- word: `d i w`
- sentence: `d i s`
- paragraph: `d i p`
- line: `dd` or `Vd`

CHANGE
- word: `c w` + "new word"
- word: `c i w`

Repeat last operation: `.`

YANK
- all inside (, [, or a {: `y + i + ( [ {`
- all inside incuding braces: `y + i + ( [ {`
- line: `yy` or `Vy`

VERTICAL NAVIGATION
- half-page: ctrl + d/u (**Primeagen suggestion**)
- full-page: ctrl + f/b
- File beginning: gg
- File end: G
- sentence: `(` & `)`
- paragraph: `{` & `}`  (next block of blank line)
- :4 goto line 4

SEARCH
- `f` + character (`;` forward, `,` backward) _(inverse `F`)_
- `t` + character (jumps to but not on top) _(inverse `T`)_
- SearchDown `/pattern` (iterate by typing `n`/`N`)
- SearchUp `?pattern`
- Search the next occurrence of the current word `*` (`#`, backwards)
- undo - U  
- redo - ctrl + R

MARK (normal mode)
- mark-current-position with a: `m a`
- jump-to mark-a: `~a`
- toggle last cursor position: `~~`
- go-to last edit position: `~.`


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
|ctrl + a | increases the number of the line by 1 |
| * | goes to the next occurrence of the current word |
| C-w o| close all the windows |
| C-w h/j/k/l| change window in direction |
| C-w = | equal all the windows |
|:terminal | leave insert mode `C-\ C-n`


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
