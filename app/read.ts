
import * as anchor from "@project-serum/anchor";
import fs from 'fs'

require('dotenv').config();  
//inject ANCHOR_WALLET=~/.config/solana/id.json
//inject ANCHOR_PROVIDER_URL=https://api.devnet.solana.com

const fetch_data = async () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.Basic1;

    const account_file_string = fs.readFileSync('./new_account.json', 'utf-8');
    const account_file = JSON.parse(account_file_string);
    const secret = new Uint8Array(Object.values(account_file._keypair.secretKey));
    const kpair = anchor.web3.Keypair.fromSecretKey(secret);

    console.log('new_account_pubkek_read ', kpair.publicKey.toString())

    const account_data = await program.account.myAccount.fetch(kpair.publicKey);

    console.log("saved data: ", account_data.data.toNumber());
}

fetch_data();