const container = document.getElementById("container")

const buildVirtualDom = (map, root, data) => {
    const fragment = document.createDocumentFragment();

    const ROOT = map.get(root);
    if (ROOT) {
        let dc = document.createElement(ROOT.tag);
        for(let attribute of Object.keys(ROOT.attributes)) {
            if (attribute.includes("v-if")) {
                if (get([...ROOT.attributes[attribute]], data)) {
                    continue;
                } else {
                    return fragment;
                }
            } else {
                dc.setAttribute(attribute, ROOT.attributes[attribute])
            }
        }
        let temp = ROOT.children;
        const dynamic = /\w*(?:[{]{2}([^{}]+)[}]{2})\w*/g;
        while(dynamic.test(temp)) {
            temp = temp.replace(dynamic, (_, text, last) => {
                if (text) {
                    const v = get(text.split('.'), data)
                    if (v) {
                        return v;
                    }
                    return text;
                }
                return last;
            })
        }
        const children = [];
        const checkUuid = /([0-9]+)\s*(.*)/g;
        while(checkUuid.test(temp)) {
            temp = temp.replace(checkUuid, (_, text, last) => {
                if (text) {
                    if (map.has(text)) {
                        children.push(buildVirtualDom(map, text, data))
                    } else {
                        children.push(document.createTextNode(text));
                    }
                }
                return last;
            })
        }
        children.forEach((i) => {
            dc.appendChild(i);
        })
        if (temp) {
            dc.appendChild(document.createTextNode(temp));
        }
        fragment.appendChild(dc);
    }
    return fragment;
}

const render = (template, data) => {
    const record = new Map();
    // 解析标签模板为可执行函数
    const root = complier(template, record);
    // 根据 当前 data 对 vdom 进行 渲染
    const vdom = buildVirtualDom(record, root, data);
    // 添加 渲染后的内容 至 dom 上
    container.appendChild(vdom);
}