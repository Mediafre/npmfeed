"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const telegraf_1 = require("telegraf");
dotenv.config();
const tekon = process.env.BOT_TOKEN;
const groupId = process.env.GROUP_ID;
if (typeof tekon !== "string")
    throw new Error("Need a token").message;
if (typeof groupId !== "string")
    throw new Error("Need a group id").message;
const welcomeMessage = 'Hi, ada yang bisa admin bantu ? /start                                        𝐏𝐑𝐈𝐂𝐄 𝐋𝐈𝐒𝐓 𝐕𝐈𝐏 https://t.me/smpviralterbaru/18';
const messageAfter = "✅ pesan terkirim                                                                   Tunggu admin, akan segera membalas.. ";
const bot = new telegraf_1.Telegraf(tekon);
const sendMessageInGroup = (message) => bot.telegram.sendMessage(groupId, message);
const onMessage = (ctx) => {
    if (ctx.message.reply_to_message) {
        ctx.telegram.sendMessage(ctx.message.reply_to_message.text.split('<')[1].split('>')[0], ctx.message.text);
    }
    else {
        const message = `User @${ctx.message.chat.username} \n${ctx.message.text}`;
        ctx.telegram.sendMessage(ctx.message.chat.id, messageAfter);
        sendMessageInGroup(message);
    }
};
bot.start((ctx) => ctx.reply(welcomeMessage));
bot.on('text', onMessage);
bot.launch();
