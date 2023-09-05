- Keep old windows context menu
```bash
reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

## Windows Subsystem for Linux

_User must first enable "Virtual Machine Platform" and "Windows-Subsystem for Linux" under Windows Feature in Control Panel_ and then type in PowerShell `wsl --install`. Furthermore, find a Linux distribution, which is available in Microsoft Store (I got Ubuntu 22.04).

The following PowerShell commands control the WSL furthermore
```ps
# Lists the verions os WSL installed and their status
wsl -l -v

# Set version of a distro
wsl --set-version <NAME> 2

# Set default version
wsl --set-default-version 2
```

## WSL in Windows VS Code - [Tutorial](https://code.visualstudio.com/docs/remote/wsl-tutorial)
To allow WSL Terminal in VS Code, add the VS Code extension "WSL".
Click then on the bottom left, select "Connect to WSL using distro...".
Moreover, VS Code installation adds itself into PATH, permiting `cd` to a give 
dir and run `code .` to open in VS Code.