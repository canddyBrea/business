package cmd

import (
	"fmt"

	"business/conf"
)

func Start() {
	fmt.Println("=========Start=========")
	// 	调用
	conf.InitConfig()
}

func Clear() {
	fmt.Println("=========Clear=========")

}
