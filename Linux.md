| Command | Action                     |
|---------|----------------------------|
| touch   | create file                |
| cat     | read file                  |
| mkdir   | create directory           |
| rm      | remove file (-r for dirs)  |
| cd      | change directory           |
| pwd     | print working directory    |
| grep    | search and match pattern   |
| wc      | counts                     |

`grep` is powerful. `-i` ignores upper/lowercase, `-v` inverts the command, `-F` permits a file as input for the patterns to search, `-n` adds line count, `-c` counts the number of occurences. `-rl` makes it recursive, showing subdirs occurences. `-rL` shows the archives where it happens, but ommits the occurence itself. `egrep "^09|^10|^11|^12"` gets only those that start with 09, or 10, or 11 or 12. In REGEX, ^ means "the start of line"; while $ means "the end of line".
**grep** means Global RegEx Print

`cat <file> | awk -F " " '{print $3, $6}`  
This split every line considering space as delimiter and prints the 3rd and 6th element of each line.

`| sort` sorts the output; `| uniq` shows only uniques; `wc -l` counts the number of lines.

