# Go (https://go.dev/)
Statically typed compiled language. Popular choice for high performance server-side application.  
Created in 2007 at Google, released v1.0 as opensource in 2012.

Go initial release: 2009-11-10 23:00:00 UTC

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
In VS Code, get extensions:
- `Go` by Google and update all via `> Go install/update tools`. 
- `Error Lens` for a better dev experience.
```bash
# Initialize Go module/project
go mod init github.com/rocketseat-education/semana-tech-go-react-server
```

# 2. Fundamentals in Go
|action | Description|
|---|---|
|go mod tidy | automatically add/remove modules|
|go fmt | format Go source code according to the Go standard style (Worth binding to a Shortcut) |
|go generate ./... | run all the `go:generate` directives in *.go files in the current and subdirectories|
|go get <github.repo>| install the package |
|go build | compiles the pkg or the binary <br> if run in a dir with a main pck, it produces an exec |
|go test| |
|go run <file.go> | compiles and runs the specified Go file. |

`:=`, the short assignment statement, only works inside functions

variables declared inside a if-statement are restricted to the block

# 3. Conventions in Go
Every Go program is made up of packages.

Programs start running in package `main`.

| dir | Description
|---|---|
|cmd/ | binaries internal to your package. <br> Functionalities you cannot use outside your module. <br> Typically each subdir is an executable|
|internal/| Contains code that can only be imported by the<br> parent dir or sibling dir, enforcing encapsulation.
|vendor/| `go mod vendor` copies all the project's dependencies into this directory <br> When sharing with others, everything is contained within the project directory |

How print works: https://gobyexample.com/string-formatting

`range` is like Python's `enumerate`  
`[n]T` is an array of len n; `[]T` is a slice and dinamically-sized.  
`[3]bool{true, true, false}` - array literal  
`[]bool{true, true, false}` - slice that references the array  
Slices have length (elements it contains) and capacity (elements of the unterdlying array counting from the 1st element in the slice)  

This is how to create dynamically-sized arrays.
`make([]int, len, cap)` allocated a zeroed array and returns a slice that refers to that array. Slices allow `append`

```go
package main

// Factored import
import (
    "fmt"
    "time"
    "math"
)

// Outside functions the ":=" for short var declaration is not available
//  thus, one must use the verbose way
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

// Go accept named returns
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return x, y
}

// Entry point is the main function
func main() {
    new_slice := make([]int, len(pow))

	for i, v := range pow {
        new_slice[i] = i + 3
		fmt.Printf("2**%d = %d\n", i, v)
	}
    fmt.Println(new_slice)
    fmt.Println("Pi is", math.Pi)  // only names with capital letters are exported
    fmt.Println("The time is", time.Now())
}
```

Basic types
```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

rune // alias for int32
     // represents a Unicode code point

float32 float64

complex64 complex128
```

---
Example
```go
package main

import (
    "fmt",
    "runtime",
    "string"
)

func main() {

    // Variables can be explicitly defined or type will be inferred at compile time.
    var name string = "John"
    other_name := "Other john"

    // Constants cannot be declared using the := syntax
    const Truth = true

    // Array - array slices are like references to arrays
    primes := [6]int{2, 3, 5, 7, 11, 13}
    myArray = [3]string
    myArray[0] = "Uno"
    myArray[1] = "Dos"
    myArray[2] = "Tres"

    // Map
	myMap := make(map[string]string)
    myMap["robot"] = "⭐"
    myMap["fire"] = "🔥"
    myMap["heart"] = "❤️"
	fmt.Println(myMap)

    // Control flow - for
    for x := 0; x < 10; x++ {
        fmt.println("Iteration!")
    }

    // Control flow - if
    animal := "dog"
    if animal == "dog" {
        fmt.println("I like it!")
    } else {
        fmt.println("I don't like it!")
    }

    // Control flow - switch-case
    switch os := runtime.GOOS; os {
	case "darwin":
		fmt.Println("OS X.")
	case "linux":
		fmt.Println("Linux.")
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.\n", os)
	}

    // Pointer - p is connected to year
    var year int = 2021;
    var p *int = &year;

    i, j := 42, 2701

	p := &i         // point to i
	fmt.Println(p) // read i through the pointer
	*p = 21         // set i through the pointer
	fmt.Println(i)  // see the new value of i

	p = &j         // point to j
	*p = *p / 37   // divide j through the pointer
	fmt.Println(j) // see the new value of j

    // Struct is a colleciton of fields
    type Vertex struct {
        X int
        Y int
    }

    vertex := Vertex{1, 2}

    fmt.Printf("His name is %s", strings.Join([]string{"John", "Wick"}, " "))
}

func defer_func() {
    // Deferred function calls are pushed onto a stack. When a function returns, its deferred calls are executed in last-in-first-out order.
    defer fmt.Println("!")

    defer fmt.Println("world")

    defer fmt.Println(", ")

	fmt.Println("hello")
}

```

Go also supports concurrency via **Goroutines** with the `go`-keyword which allows defining functions that can run at the same time of other functions by utilizing multiple threads in a CPU.

