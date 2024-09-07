## Linux, Unix and POSIX:
UNIX was a proprietary OS in the 60-70s. Over time it became a standard to which some OS are compliant. The desire for more liberal OS licenses that operate in a similar principle is what prompted the creation of GNU General Public License (GPL) v2 and LINUX.

LINUX is a FOSS derivative of UNIX, mainly defined by the kernel (which controls hardware allocation and management regarding software). GNU GPL states "*end users have the freedom to **run**, **study**, **share** and **modify** the program*". Derivatives of a GPL must remain GPL licensed.

POSIX (maintained by IEEE) and SUS are standards. Standards are meant to guarantee compatibility.

## Running .sh scripts
chmod +x script.sh
sh script.sh
bash script.sh

---
## Sheetcode
| Command         | Action                                                     |
|-----------------|------------------------------------------------------------|
| lsb_release -a  | get the version                                            |
| ls              | list files                                                 |
| ll              | alias defined in ".bashrc" in home/<username> for ls -alF  |
| touch           | create file                                                |
| cat             | read file                                                  |
| mv asd* folder/ | move all files that start with asd into folder             |       
| mkdir           | create directory                                           |
| rm              | remove file (-r for dirs)                                  |
| cd              | change directory (`cd /` cd to root; `cd ~` cd to home usr)|
| pwd             | print working directory                                    |
| grep            | search and match pattern                                   |
| wc              | counts                                                     |
| history         | display bash cmd history                                   |
| chmod           | modify permissions                                         |


### GREP - Global Regular Expression Print
`grep` is a command line utility used for searching plain-text data for lines that match a regular expression or pattern. 

`grep error file.txt`

`-i` ignores upper/lowercase,  
`-v` inverts the command,  
`-F` permits a file as input for the patterns to search,  
`-n` adds line count,  
`-c` counts the number of occurences.  
`-rl` makes it recursive, showing subdirs occurences.  
`-rL` shows the archives where it happens, but ommits the occurence itself. 

`egrep "^09|^10|^11|^12"` gets only those that start with 09, or 10, or 11 or 12. In REGEX, ^ means "the start of line"; while $ means "the end of line".
**grep** means Global RegEx Print

`grep "^[co]" -i -n vim.md` - ignoring case, get lines that start with O or C.

`cat <file> | awk -F " " '{print $3, $6}`  
This split every line considering space as delimiter and prints the 3rd and 6th element of each line.

`| sort` sorts the output; `| uniq` shows only uniques; `wc -l` counts the number of lines.

Substitute leading "./" for "" in a path. `"././string" | sed 's/^.\///g'`. **sed** works in the format 's/regex/regex/g'. The regex for getting the leading "./" is:
- `^` (at the start)
- `.\/` (slash must be escaped with back slash)
- then nothing is kept between the last two slashs to precisely erase it.

## Utils
`tree` is a package that print the file structure being used


## Linux's directories - [Fireship YouTube Video](https://youtu.be/42iQKuQodW4)
All the binaries are mapped together with the `$PATH` env variable. Find out where a binary lives by `which curl`

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



## [Arch Linux](https://archlinux.org/)
A simple, lightweight distribution that tries to Keep It Simple. 

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

[AUR](https://wiki.archlinux.org/title/Arch_User_Repository) has packages descriptions (PKGBUILDs) that can be compiled from source with makepkg and installed via pacman. There are wrappers/helpers around **pacman** to handle packages from AUR. A prominent helper is [AUR Helper yay](https://aur.archlinux.org/packages/yay), more infos in [yay's GitHub](https://github.com/Jguer/yay?tab=readme-ov-file#installation).

```bash
# Install yay
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

# Use yay to update
yay -Syu
```
### Installation
I followed step-by-step the [Installation Guide](https://wiki.archlinux.org/title/Installation_guide) the first time; it took almost 2 hours. Further on, I followed [NVIDIA Drivers Installation Guide](https://github.com/korvahannu/arch-nvidia-drivers-installation-guide?tab=readme-ov-file).

`archinstall` is a new method based on a python script that helps through the steps. The second time I installed, I followed this straightforward video by [Learn Linux TV](https://youtu.be/FxeriGuJKTM). I liked it the best.

These steps are few of the steps taken when installing Arch Linux. They are also relevant when booting from a live media.
```bash
# Stop audit messages
auditctl -e0

# List disk paritioning
fdisk -l

# Mount partition to directory /mnt
mount partition /mnt

# Ensure Internet connection
rfkill (see devices)
rfkill unblock wlan # if blocked
iwctl
device list
station name scan  # name is the device name
station name get-networks
station name connect (name of the wifi)
# >> it prompts for the password

# Add sudo capability to the user
useradd -m -g users -G wheel <username>

# Before umount, run 
pacman -Syu

# Umount
umount -R /mnt

# Afterward access to wheel group must be given
nano /etc/sudoers
# uncomment the "wheel group" line
```
## Multimedia
For Bluetooth to work, bluez bluez-utils, load kernel module btusb and systemctl enable bluetooth [source](https://wiki.archlinux.org/title/bluetooth).

For audio to work, linux-firmware was not enough in my laptop; I needed sof-firmware. 
> Specific firmware for other devices not included in linux-firmware (e.g. sof-firmware for onboard audio, linux-firmware-marvell for Marvell wireless and any of the multiple firmware packages for Broadcom wireless) [source](https://wiki.archlinux.org/title/Installation_guide#Install_essential_packages)



## Bootloader - GRUB
**Main partition** should be mount in `/mnt` and **EFI Partition** in
`/mnt/boot`. To install grub under the name "GRUB" after getting it with pacman, `grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB`. 

(optional) If you intend to permit dual-boot via GRUB, get **os-prober** with pacman. Run it `os-prober` and uncomment the last line in `sudo nano /etc/default/grub`

Make the configuration file with `grub-mkconfig -o /boot/grub/grub.cfg`


`pacman -Syu` may crash mid-update while updating the boot files [reddit post](https://www.reddit.com/r/archlinux/comments/vaz14l/you_can_end_up_without_any_kernel_to_boot_if_your/). I keep copies at `/var/backup/boot` just in case. 
```bash
# Backup /boot
sudo mkdir -p /var/backup/boot & sudo cp -R /boot /var/backup/

# Get size of it
du -sh /var/backup/boot/
```

## Terminal
```bash
# Update package manager & get packages
pacman -Syu
pacman -S gnome-terminal nu starship

# Get font
# Install necessary packages
sudo pacman -S curl unzip --noconfirm
curl -L -o CascadiaCode.zip https://github.com/ryanoasis/nerd-fonts/releases/download/v3.2.1/CascadiaCode.zip
unzip CascadiaCode.zip -d CascadiaCode
mkdir -p ~/.local/share/fonts
mv CascadiaCode/*.ttf ~/.local/share/fonts/

# Update the font cache
fc-cache -fv

# Clean up
rm -rf CascadiaCode.zip CascadiaCode
echo "Cascadia Code Nerd Font installed successfully."

# Open gnome-terminal
gnome-terminal
# Preferences > Profile > Command > Custom command: nu 

# Config nu to use starship
nu
"mkdir ~/.cache/starship" | save $nu.env-path --append
"starship init nu | save -f ~/.cache/starship/init.nu" | save $nu.env-path --append
"use ~/.cache/starship/init.nu" | save $nu.config-path --append

# Add preset to starship
starship preset pastel-powerline -o ~/.config/starship.toml

# Restart terminal
```