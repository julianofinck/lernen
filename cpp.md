[Learn Cpp](https://www.learncpp.com/)

## Configure VS Code
Use GCC C++ compiler (g++) and GDB debugger from **mingw-w64**.

Add the extension **C/C++**.

Get the [latest version of MinGW-w64 via MSYS2](https://code.visualstudio.com/docs/cpp/config-mingw). Ensure **Run MSYS2** is checked. On the MSYS2 Terminal, run `pacman -S --needed base-devel mingw-w64-x86_64-toolchain` and accept the prompts. Add to PATH your MinGW-w64 bin folder (default: `C:\msys64\mingw64\bin`).
The Following commands should now work:
```bat
gcc --version
g++ --version
gdb --version
```

