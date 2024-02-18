import { kujiraEndPoint1 } from "./MyLibs/KujiraEps";
import { getWalletAddress, getWalletBalance, getSigner } from "./MyLibs/Walletinfo"
import { Mnemonic } from "./MyLibs/private"
import { Mnemonic2 } from "./MyLibs/private";
import { SigningStargateClient, GasPrice } from "./kujira.js/node_modules/@cosmjs/stargate"
import { msg, registry } from "./kujira.js/lib/cjs/index"
import { kujiraWalletApi } from "./MyLibs/WalletAPI";
import { kujiraWallet2Api } from "./MyLibs/WalletAPI";
import { myKuji } from "./MyLibs/denoms";
import { sendMsg } from "./MyLibs/Messages";





async function main() {

    const signer = await getSigner(Mnemonic, "kujira");
    const walletAddr = await getWalletAddress(Mnemonic, "kujira")



    const signer2 = await getSigner(Mnemonic2, "kujira");
    const walletAddr2 = await getWalletAddress(Mnemonic2, "kujira")




    const client = await SigningStargateClient.connectWithSigner(kujiraEndPoint1, signer2, {

        registry,
        gasPrice: GasPrice.fromString("0.00125kuji")

    });
    const wallet1 = await getWalletBalance(kujiraWalletApi, myKuji)
    const wallet2 = await getWalletBalance(kujiraWallet2Api, myKuji)

    console.log("wallet 1 Kuji balance", Number(wallet1)/1000000)
    console.log("wallet 2 Kuji balance", Number(wallet1)/1000000)

    const send = sendMsg(walletAddr2, walletAddr, myKuji, "1000000")

    await client.signAndBroadcast(walletAddr2, [], "auto")

    const wallet3 = await getWalletBalance(kujiraWalletApi, myKuji);
    const wallet4 = await getWalletBalance(kujiraWallet2Api, myKuji);

    console.log("wallet 1 Kuji balance", Number(wallet3)/1000000)
    console.log("wallet 2 Kuji balance", Number(wallet4)/1000000)


}

main()