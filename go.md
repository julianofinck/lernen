# Go (https://go.dev/)
Statically typed compiled language. Popular choice for high performance server-side application.  
Created at Google in 2007, released v1.0 as opensource in 2012.

Design Motto: **Simplicity** & **Efficiency**

Standard libraries: https://pkg.go.dev/std  
(like `math`, `net` and `fmt`)

Tutorial: https://go.dev/tour/list

# 1. Install Go (https://go.dev/doc/install)
```bash
export GOLANG_VERSION=go1.22.5
wget https://go.dev/dl/$GOLANG_VERSION.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf $GOLANG_VERSION.linux-amd64.tar.gz
rm $GOLANG_VERSION.linux-amd64.tar.gz

# Add to bashrc
export PATH=$PATH:/usr/local/go/bin
source ~/.profile
```
In VS Code, get `Go` extension by Google and update all via `> Go install/update tools`.  
Additionally, get `Error Lens` for a better dev experience.
```bash
# Initialize Go module
go mod init github.com/rocketseat-education/semana-tech-go-react-server
```

# 2. Fundamentals in Go
|action | Description|
|---|---|
|go mod tidy | auto-add/remove modules|
|go generate ./... | run all the `go:generate` directives in *.go files in the current and subdirectories|
|go get <github.repo>| install the package |
|go build | compiles the pkg or the binary <br> if run in a dir with a main pck, it produces an exec |
|go test| |
|go run <file.go> | compiles and runs the specified Go file. |
|go fmt | formats Go source code according to the Go standard style |

# 3. Conventions in Go
| dir | Description
|---|---|
|cmd/ | binaries internal to your package. <br> Functionalities you cannot use outside your module. <br> Typically each subdir is an executable|
|internal/| Contains code that can only be imported by the<br> parent dir or sibling dir, enforcing encapsulation.
|vendor/| `go mod vendor` copies all the project's dependencies into this directory <br> When sharing with others, everything is contained within the project directory |

---
Example
```go
package main

import "fmt"

func main() {

    // Variables can be explicitly defined or type will be inferred at compile time.
    var name string = "John"
    other_name := "Other john"

    // Array
    myArray = [3]string
    myArray[0] = "Uno"
    myArray[1] = "Dos"
    myArray[2] = "Tres"

    // Map
    myMap = map[string]string
    myMap["robot"] = "⭐"
    myMap["fire"] = "🔥"️
    myMap["heart"] = "❤️"

    // Control flow
    for x := 0; x < 10; x++ {
        fmt.println("Iteration!")
    }

    animal := "dog"
    if animal == "dog" {
        fmt.println("I like it!")
    } else {
        fmt.println("I don't like it!")
    }

    // Pointer
    var year int = 2021;
    var p *int = &year;
}
```

Go also supports concurrency via **Goroutines** with the `go`-keyword which allows defining functions that can run at the same time of other functions by utilizing multiple threads in a CPU.