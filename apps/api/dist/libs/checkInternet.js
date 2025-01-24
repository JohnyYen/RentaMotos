"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInternetConnection = checkInternetConnection;
const http = require("http");
async function checkInternetConnection() {
    return new Promise((resolve) => {
        const request = http.get('http://www.google.com', (response) => {
            resolve(response.statusCode === 200);
        });
        request.on('error', () => {
            resolve(false);
        });
        request.setTimeout(5000, () => {
            request.destroy();
            resolve(false);
        });
    });
}
//# sourceMappingURL=checkInternet.js.map