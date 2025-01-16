## Windows directory structure
|||
|---|---|
|Program Files | basic files needed to run the program|
|ProgramData | files that are used by any user, but is not in the base installation|
|AppData | files needed to config the program specifically for the User|
| AppData/Local | meant to be kept in the local machine|
| AppData/LocalLow |  |
| AppData/Roaming | meant to be sync-shared when in the domain |


## Windows Integrity Level: 
The trustworthiness or privilege of an object or program
- Untrusted: even more restricted
- Low: very restricted read and write (for instance, browser might run in low as a security)
- Medium: regular user rights
- High: admin privileges
- System: like "root", can do whatever
- Installer: ...


## Tweaks in Windows
- Keep W10 context menu over W11  
`reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve`
- Set seconds in clock  
`reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v ShowSecondsInSystemClock /t REG_DWORD /d 1 /f`



## Windows Subsystem for Linux
_User must first enable "Virtual Machine Platform" (in German, "VM-Platform") and "Windows-Subsystem for Linux" under Windows Feature in Control Panel_ and then type in PowerShell `wsl --install`. Furthermore, find a Linux distribution, which is available in Microsoft Store (I got Ubuntu 22.04).

The following PowerShell commands control the WSL furthermore
```ps
# Lists the verions os WSL installed and their status
wsl -l -v

# Set version of a distro
wsl --set-version <NAME> 2

# Set default version
wsl --set-default-version 2
```

If you try to open Ubuntu right off the bat without restarting your computador, you might get an error:
> Installing, this may take a few minutes...  
> WslRegisterDistribution failed with error: 0x8004032d  
> Error: 0x8004032d (null)  
> Press any key to continue...

### Port forwarding from WSL to Windows
```ps
# 1. Add Port Forwarding
netsh interface portproxy add v4tov4 listenport=8050 listenaddress=0.0.0.0 connectport=8050 connectaddress=$($(wsl hostname -I).Trim());

# Check that it got added
netsh interface portproxy show v4tov4

# Delete if necessary
netsh interface portproxy delete v4tov4 listenport=8050 listenaddress=0.0.0.0


# 2. Add a new firewall rule to allow inbound traffic on port 8050
New-NetFirewallRule -DisplayName "Allow Port 8050" `
    -Direction Inbound `
    -LocalPort 8050 `
    -Protocol TCP `
    -Action Allow `
    -Profile Any
```

## WSL in Windows VS Code - [Tutorial](https://code.visualstudio.com/docs/remote/wsl-tutorial)
To allow WSL Terminal in VS Code, add the VS Code extension "WSL".
Click then on the bottom left, select "Connect to WSL using distro...".
Moreover, VS Code installation adds itself into PATH, permiting `cd` to a give 
dir and run `code .` to open in VS Code.