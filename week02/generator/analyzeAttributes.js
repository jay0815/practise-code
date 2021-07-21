const analyzeAttributes = (attributes) => {
    const attr = Object.create(null);
    const dynamicAttribute = /(\w+)=(?:\"[{]{2}(.*)[}]{2}\").*/g;
    while(dynamicAttribute.test(attributes)) {
        attributes = attributes.replace(dynamicAttribute, (s, key, value) => {
            attr[key] = value.split(".");
            return "";
        });
    }
    const instructionIF = /v-if=["']?([^"']+)["']?/g;
    while(instructionIF.test(attributes)) {
        attributes = attributes.replace(instructionIF, (s, value) => {
            attr["v-if"] = value.split(".");
            return "";
        });
    }
    const attributesA = /([^=]+)=\"(.*)\"\s/g;
    const attributesB = /\s([^=]+)=\"(.*)\"\s/g;
    const attributesC = /\s([^=]+)=\"(.*)\"/g;
    const attributesD = /([^=]+)=\"(.*)\"/g;
    while(attributesA.test(attributes) || attributesB.test(attributes) || attributesC.test(attributes) || attributesD.test(attributes)) {
        attributes = attributes.replace(attributesA, (s, key, value) => {
            attr[key] = value;
            return "";
        });
        attributes = attributes.replace(attributesB, (s, key, value) => {
            attr[key] = value;
            return "";
        });
        attributes = attributes.replace(attributesC, (s, key, value) => {
            attr[key] = value;
            return "";
        });
        attributes = attributes.replace(attributesD, (s, key, value) => {
            attr[key] = value;
            return "";
        });
    }
    return attr;
}