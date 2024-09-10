"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayFormatter = arrayFormatter;
function arrayFormatter(json) {
    let list = [];
    for (const element of json) {
        let properties = Object.values(element);
        list.push(properties);
    }
    return list;
}
//# sourceMappingURL=jsonFormatter.js.map