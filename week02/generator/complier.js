const complier = (template, record) => {
    const doubleClose = /<(\w+)\s*([^>]*)>([^<]*)<\/\1>/gm; //匹配<div class="a">XXX</div>
    const selfClose = /<(\w+)\s*([^(/>)]*)\/>/gm; //匹配<img src="a"/>
    let times = 0;
    while (doubleClose.test(template) || selfClose.test(template)) {
        template = template.replace(doubleClose, (_, tag, attr, children) => {
            const uuid = getUuid(times);
            let node = {
                tag, attributes: analyzeAttributes(attr), children,
                uuid
            };
            times++;
            record.set(uuid, node)
            return uuid;
        });

        template = template.replace(selfClose, (_, tag, attr) => {
            const uuid = getUuid(times);
            let node = {
                tag, attributes: analyzeAttributes(attr), children: "",
                uuid
            };
            times++;
            record.set(uuid, node)
            return uuid;
        });
    }
    return template;
}