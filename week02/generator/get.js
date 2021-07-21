const get = (path, data) => {
    let v = data;
    while(path.length && v) {
        const p = path.shift();
        v = v[p];
        
    }
    return v;
}