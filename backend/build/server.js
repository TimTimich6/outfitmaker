"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const remove_bg_1 = require("remove.bg");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
const port = process.env.port || 3080;
app.post("/api/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("request rreceived");
    console.log(req.files);
    const outputDate = Date.now();
    const name = `${req.files.photo.name}${outputDate}.png`;
    fs_1.default.writeFileSync(`src/uploads/${name}`, req.files.photo.data);
    console.log("The file was saved!");
    try {
        const result = yield (0, remove_bg_1.removeBackgroundFromImageFile)({
            path: `src/uploads/${name}`,
            apiKey: process.env.APIKEY,
            size: "preview",
            type: "product",
            crop: true,
            outputFile: `${__dirname}/uploads/${name}`,
        }).catch((err) => {
            console.log("error occured", err);
            res.status(500).send("failed to remove background");
            return;
        });
        console.log(result);
        if (result === null || result === void 0 ? void 0 : result.base64img) {
            res.send(result.base64img);
            fs_1.default.unlinkSync(`${__dirname}/uploads/${name}`);
            console.log("successfuly removed background");
        }
    }
    catch (error) {
        res.status(500).send("fail to remove background");
    }
}));
app.listen(port, () => {
    console.log("listening on port", port);
});
