"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Server_config_1 = require("./config/Server.config");
const Routes_1 = __importDefault(require("./Routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/api', Routes_1.default);
console.log(path_1.default.join(__dirname, '../output'));
app.use('/output', express_1.default.static(path_1.default.join(__dirname, '../output')));
app.listen(Server_config_1.PORT, () => {
    console.log(`server started at ${Server_config_1.PORT}`);
});
