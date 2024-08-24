export function arrayFormatter(json){
    let list = [];
    for (const element of json) {
        let properties = Object.values(element);
        list.push(properties.slice(1, properties.length));
    }
   // console.log(list);
    return list;
}