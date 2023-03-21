"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-ignore
// @ts-ignore
(() => __awaiter(void 0, void 0, void 0, function* () {
    let iRootNode = {};
    let Separator = "/";
    let Paths = [];
    const loadJSON = () => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'content.json', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) {
                    return;
                }
                if (xhr.status != 200) {
                    throw "load JSON error.";
                }
                iRootNode = JSON.parse(xhr.responseText);
                resolve('');
            };
            xhr.send(null);
        });
    };
    const parseNode = (iNode, parentDir) => {
        if (iNode.text) {
            createDir(iNode, parentDir);
        }
        if (parentDir) {
            parentDir += Separator;
        }
        iNode.text && (parentDir += iNode.text);
        // 递归函数
        if (!iNode.children) {
            return;
        }
        for (const ichildNode of iNode.children) {
            parseNode(ichildNode, parentDir);
        }
    };
    const createDir = (iNode, parentDir) => {
        let path = iNode.text;
        if (parentDir) {
            path = parentDir + Separator + path;
        }
        Paths.push(path);
    };
    const generateFile = () => {
        let result = "";
        for (const path of Paths) {
            result += `md ${path} \r\n`;
        }
        const url = URL.createObjectURL(new Blob([result], { type: "text/plain" }));
        const DomA = document.createElement("a");
        DomA.setAttribute("href", url);
        DomA.setAttribute("download", "generate_dir.bat");
        DomA.setAttribute("target", "_blank");
        document.body.appendChild(DomA);
        DomA.click();
        setTimeout(() => {
            document.body.removeChild(DomA);
            URL.revokeObjectURL(url);
        }, 1000);
    };
    yield loadJSON();
    parseNode(iRootNode, "");
    generateFile();
    console.log(Paths);
}))();
