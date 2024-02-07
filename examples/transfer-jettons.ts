import { Address } from "@ton/core";
import { AssetsSDK, createWalletV4 } from "../src/index";

async function main() {
    const sdk = await AssetsSDK.create({
        storage: {
            pinataApiKey: process.env.PINATA_API!,
            pinataSecretKey: process.env.PINATA_SECRET!,
        },
        api: 'testnet',
        wallet: await createWalletV4(process.env.MNEMONIC!),
    });

    console.log('Using wallet', sdk.sender?.address);

    const jetton = await sdk.openJetton(Address.parse('my-jetton-address'));
    const myWallet = await jetton.getWallet(sdk.sender!.address!);
    await myWallet.sendTransfer({
        to: Address.parse('any-address'),
        amount: 10n,
    })
}

main();
