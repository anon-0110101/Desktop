import { msg } from "../kujira.js/";
export function sendMsg(fromAddress, toAddress, denom, amount) {
const send = msg.bank.msgSend({
    fromAddress: fromAddress,
    toAddress: toAddress,
    amount: [{
        denom: denom,
        amount: amount
    }]

});

}