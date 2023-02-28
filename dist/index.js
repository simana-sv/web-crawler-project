"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
(0, node_fetch_1.default)("http://localhost:10000/about.html")
    .then((response) => response.text())
    .then((html) => console.log('html', html));
