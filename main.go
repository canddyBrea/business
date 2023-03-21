package main

import "business/cmd"

func main() {
	defer cmd.Clear()
	cmd.Start()
}
