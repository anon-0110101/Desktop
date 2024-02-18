"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMsg = void 0;
var kujira_js_1 = require("../kujira.js/");
function sendMsg(fromAddress, toAddress, denom, amount) {
    var send = kujira_js_1.msg.bank.msgSend({
        fromAddress: fromAddress,
        toAddress: toAddress,
        amount: [{
                denom: denom,
                amount: amount
            }]
    });
}
exports.sendMsg = sendMsg;
