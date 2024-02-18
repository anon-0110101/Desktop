import { myKuji, myUSDC } from "./MyLibs/denoms";
import { Mnemonic } from "./MyLibs/private";
import { kujiraWalletApi } from "./MyLibs/WalletAPI";
import { getWalletBalance, getSigner } from "./MyLibs/Walletinfo";




async function test() {

    const signer = await getSigner(Mnemonic, "kujira")

    const response = await signer.getAccounts()

    const walletAddr = response[0].address

    const data = await fetch(kujiraWalletApi)
    const newdata = await data.json()

    const amount = await getWalletBalance(kujiraWalletApi, myUSDC)

    console.log(amount)



}
test()