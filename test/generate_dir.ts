// @ts-ignore
// @ts-ignore
(async () => {
    interface Node {
        text: string;
        children: Node[];
    }

    let iRootNode: Node = {} as Node;
    let Separator = "/"
    let Paths: string[] = []

    const loadJSON = () => {
        return new Promise((resolve, _) => {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', 'content.json', true)
            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) {
                    return
                }
                if (xhr.status != 200) {
                    throw "load JSON error."
                }

                iRootNode = JSON.parse(xhr.responseText)
                // resolve  操作成功!
                // reject  操作失败!
                resolve('')
            }
            xhr.send(null)
        })
    }
    const parseNode = (iNode: Node, parentDir: string) => {
        if (iNode.text) {
            createDir(iNode, parentDir)
        }

        if (parentDir) {
            parentDir += Separator
        }
        iNode.text && (parentDir += iNode.text)
        // 递归函数
        if (!iNode.children) {
            return
        }
        for (const iChildNode of iNode.children) {
            parseNode(iChildNode, parentDir)
        }
    }

    const createDir = (iNode: Node, parentDir: string) => {
        let path = iNode.text
        if (parentDir) {
            path = parentDir + Separator + path
        }
        Paths.push(path)
    }
    const generateFile = () => {
        let result = ""
        for (const path of Paths) {
            result += `md ${path} \r\n`
        }
        const url: string = URL.createObjectURL(new Blob([result], {type: "text/plain"}))
        const DomA: HTMLElement = document.createElement("a")
        DomA.setAttribute("href", url)
        DomA.setAttribute("download", "generate_dir.bat")
        DomA.setAttribute("target", "_blank")
        document.body.appendChild(DomA)
        DomA.click()
        setTimeout(() => {
            document.body.removeChild(DomA)
            URL.revokeObjectURL(url)
        }, 1000)
    }
    await loadJSON()
    parseNode(iRootNode, "")
    generateFile()
    console.log(Paths)
})()