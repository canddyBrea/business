package test

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"testing"
)

type Node struct {
	Text     string `json:"text"`
	Children []Node `json:"children"`
}

var rootPath string
var nowPath string
var err error
var separator string
var contentNode Node

const fileName string = "content.json"

func loadJSON() {
	separator = string(os.PathSeparator)
	nowPath, err = os.Getwd()
	if err != nil {
		panic("get work dir err:" + err.Error())
	}
	rootPath = nowPath[:strings.LastIndex(nowPath, "/test")]

	contentBytes, err := os.ReadFile(nowPath + separator + fileName)
	if err != nil {
		panic("read file err:" + err.Error())
	}
	err = json.Unmarshal(contentBytes, &contentNode)
	if err != nil {
		panic("load json data failed err:" + err.Error())
	}
}

func parseNode(iNode Node, parentDir string) {
	if iNode.Text != "" {
		createDir(iNode, parentDir)
	}

	if parentDir != "" {
		parentDir = parentDir + separator
	}

	if iNode.Text != "" {
		parentDir = parentDir + iNode.Text
	}

	for _, v := range iNode.Children {
		parseNode(v, parentDir)
	}
}

func createDir(iNode Node, parentDir string) {
	path := rootPath + separator
	if parentDir != "" {
		path = path + parentDir + separator
	}
	path = path + iNode.Text
	fmt.Println(path)
	err = os.MkdirAll(path, os.ModePerm)
	if err != nil {
		panic("create dir err:" + err.Error())
	}
}

func TestGenerate(t *testing.T) {
	loadJSON()
	parseNode(contentNode, "")
}
