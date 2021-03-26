"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem'),
};
// https.createServer(httpsOptions, expressApp).listen(process.env.PORT, () => {
// 	console.log('Express server listening on port ' + process.env.PORT);
// });
//# sourceMappingURL=indexHttps.js.map