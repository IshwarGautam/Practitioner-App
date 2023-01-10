"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const practitioner_route_1 = __importDefault(require("./routes/practitioner.route"));
const apiConfig_1 = require("./apiConfig");
const app = (0, express_1.default)();
const port = (apiConfig_1.PORT && parseInt(apiConfig_1.PORT)) || 8000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
};
app.use((0, cors_1.default)(corsOptions));
app.use("/users", user_route_1.default);
app.use("/practitioner", practitioner_route_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/dist/index.html"));
});
mongoose_1.default
    .connect(`mongodb+srv://${apiConfig_1.DB_USERNAME}:${apiConfig_1.DB_PASSWORD}@cluster0.s4zjjod.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
    app.listen(port, () => {
        (0, swagger_1.default)(app, port);
        console.log(`Connected successfully on port ${port}`);
    });
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=app.js.map