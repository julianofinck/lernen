## Linux, Unix and POSIX:
UNIX was a proprietary OS in the 60-70s. Over time it became a standard to which some OS are compliant. The desire for more liberal OS licenses that operate in a similar principle is what prompted the creation of GNU General Public License (GPL) v2 and LINUX.

LINUX is a FOSS derivative of UNIX, mainly defined by the kernel (which controls hardware allocation and management regarding software). GNU GPL states "*end users have the freedom to **run**, **study**, **share** and **modify** the program*". Derivatives of a GPL must remain GPL licensed.

POSIX (maintained by IEEE) and SUS are standards. Standards are meant to guarantee compatibility.

---
## Sheetcode
| Command         | Action                                                     |
|-----------------|------------------------------------------------------------|
| lsb_release -a  | get the version                                            |
| ls              | list files                                                 |
| ll              | alias defined in ".bashrc" in home/<username> for ls -alF  |
| touch           | create file                                                |
| cat             | read file                                                  |
| mkdir           | create directory                                           |
| rm              | remove file (-r for dirs)                                  |
| cd              | change directory (`cd /` cd to root; `cd ~` cd to home usr)|
| pwd             | print working directory                                    |
| grep            | search and match pattern                                   |
| wc              | counts                                                     |
| history         | display bash cmd history                                   |
| chmod           | modify permissions                                         |

`grep` is powerful. `-i` ignores upper/lowercase, `-v` inverts the command, `-F` permits a file as input for the patterns to search, `-n` adds line count, `-c` counts the number of occurences. `-rl` makes it recursive, showing subdirs occurences. `-rL` shows the archives where it happens, but ommits the occurence itself. 

`egrep "^09|^10|^11|^12"` gets only those that start with 09, or 10, or 11 or 12. In REGEX, ^ means "the start of line"; while $ means "the end of line".
**grep** means Global RegEx Print

`grep "^[co]" -i -n vim.md` - ignoring case, get lines that start with O or C.

`cat <file> | awk -F " " '{print $3, $6}`  
This split every line considering space as delimiter and prints the 3rd and 6th element of each line.

`| sort` sorts the output; `| uniq` shows only uniques; `wc -l` counts the number of lines.


## Linux's directories - [Fireship YouTube Video](https://youtu.be/42iQKuQodW4)
| Directory | Description                                                          |
|-----------|----------------------------------------------------------------------|
|/bin       | binaries/executables (gzip, curl, ls) that can run from the terminal |
|/sbin      | system binaries (mount, deluser) only to be executed by the root user|
|/lib       | the binaries may share common libraries that are stored in lib|
|/usr       | its /bin and /sbin are not essential to the OS itself and are intended to the enduser|
|/usr/local/bin| locally compiled 
|/etc       | editable text configuration to customize your OS |
|/home      | keep the user data
|/boot      | files to boot the system, like the Linux kernel |
|/dev       | for device files - interface with hardware or drivers as if they were regular files (like create disk partitions)
|/opt       | optional or add-on files
|/var       | variable files that change when the OS is being used like logs and cache files |
|/tmp       | temporary files -- arent persistent between reboots |
|/proc      | illusionary filesystem that is created on memory on the fly by the kernel to keep track of running processes|

All the binaries are mapped together with the `$PATH` env variable. Find out where a binary lives by `which curl`


## [Arch Linux](https://archlinux.org/)
A simple, lightweight distribution that tries to Keep It Simple. 

[Installation Guide](https://wiki.archlinux.org/title/Installation_guide) & [NVIDIA Drivers Installation Guide](https://github.com/korvahannu/arch-nvidia-drivers-installation-guide?tab=readme-ov-file)  

It has official packages optimized for x86-64 architecture. 
This gets complemented with AUR - Arch User Repository, a community-operated package repository.  

[pacman](https://wiki.archlinux.org/title/Pacman) is Arch's package manager. Its aim is to easily manage packages, be it from official repositorties or user's own build. 

```bash
pacman -Syu           # pacman upgrade (Standard)
pacman -Syyu          # pacman upgrade --force
pacman -Su            # pacman system_upgrade
pacman -S <package>   # pacman install
pacman -R <package>   # pacman remove

# Query (-i more info) 
pacman -Qi [code]  # local package database
pacman -Si         # sync package database
```

[AUR](https://wiki.archlinux.org/title/Arch_User_Repository) has packages descriptions (PKGBUILDs) that can be compiled from source with makepkg and installed via pacman. There are wrappers/helpers around **pacman** to handle packages from AUR. A prominent helper is [yay](https://aur.archlinux.org/packages/yay).

```bash
# Install yay
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

# Use yay to update
yay -Syu
```
