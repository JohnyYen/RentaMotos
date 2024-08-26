export function arrayFormatter(json){
    let list = [];
    for (const element of json) {
        let properties = Object.values(element);
        list.push(properties);
    }
   // console.log(list);
    return list;
}