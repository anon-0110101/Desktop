import { DirectSecp256k1HdWallet } from "../kujira.js/node_modules/@cosmjs/proto-signing"


export async function getSigner(fromMnemonic, chainPrefix) {

    const signer = await DirectSecp256k1HdWallet.fromMnemonic(fromMnemonic, {
        prefix: chainPrefix,
    });

    return signer

}

export async function getWalletAddress(fromMnemonic, chainPrefix) {

    const signer = await DirectSecp256k1HdWallet.fromMnemonic(fromMnemonic, {
        prefix: chainPrefix,
    });

    const response = await signer.getAccounts();
    const walletAddr = await response[0].address

    return walletAddr

}


export async function getWalletBalance(walletAPI, tokenDenom) {

    const response = await fetch(walletAPI);
    const data = await response.json();
    const balance = data.balances

    const amount = balance.find(findDenom).amount;

    function findDenom(balance) {
        return balance.denom === tokenDenom;

    }

    return amount
}

