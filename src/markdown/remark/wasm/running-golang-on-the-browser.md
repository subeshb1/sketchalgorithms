---
title: Image to ascii converter on the browser written in Golang
date: '2020-08-13T23:46:37.121Z'
description: With the rise of WebAssembly importing a program written in Languages like C/C++, Rust and Golang to the browser has been made possible. This blog will look at how we can run a program written in Golang on the browser by importing it to WebAssembly.
---

> **TL;DR** This blog illustrates how you can import your existing go code to Wasm, and run it in the browser. In this blog I will show you how I made a tool to convert Image to Ascii characters on the browser that was written in Go. Link to the **Github repo:** [wasm-go-image-to-ascii](https://github.com/subeshb1/wasm-go-image-to-ascii). Here is the **Demo:** [Image to Ascii](https://subeshbhandari.com/app/wasm/image-to-ascii/)

## What is WebAssembly?

Before moving on to writing the code, let's first understand what WebAssembly is. WebAssembly or WASM is an assembly-like language that can run in near native performance in the browser. It is not to be written manually but to be treated as a compilation target for languages such as C/C++, Golang, Rust, .Net etc. This means first we write a program in a language, then convert it to WASM and then run it in the browser. This will allow the program to run in near native speed and give the ability to run program written in any language to run on the browser. You can create web applications in the language you are familiar with. The list of languages that support WASM compilation are in [awesome-wasm-langs](https://github.com/appcypher/awesome-wasm-langs) and more info on WebAssembly: https://webassembly.org/

## Running go on the browser

Now, let's get our hands dirty with some basic WASM and Golang.

### Writing Go Code

Let's write our first hello world program.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hi from the browser console!!")
}
```

### Compiling to WebAssembly

```sh
GOOS=js GOARCH=wasm go build -o main.wasm main.go
```

### Integrating with javascript

```sh
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
```

## Accessing Web APIs

## Passing Values to WebAssembly

## Passing Values to WebAssembly

## Conclusion
