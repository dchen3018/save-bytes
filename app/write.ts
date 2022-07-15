import * as anchor from "@project-serum/anchor";
import { Program  } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Basic1  } from "../target/types/basic1";
import { PublicKey, SystemProgram, Transaction, Connection, Commitment, LAMPORTS_PER_SOL, Keypair } from "@solana/web3.js"
//import account_file from '../account.json'
import fs from 'fs';

require('dotenv').config();  
//inject ANCHOR_WALLET=~/.config/solana/id.json
//inject ANCHOR_PROVIDER_URL=https://api.devnet.solana.com


const update_data = async () => {
    //configure the client to use solana devnet cluster
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.Basic1;

    const account_file_string = fs.readFileSync('./new_account.json', 'utf-8');
    const account_file = JSON.parse(account_file_string);
    const secret = new Uint8Array(Object.values(account_file._keypair.secretKey));
    const kpair = anchor.web3.Keypair.fromSecretKey(secret);

    await program.rpc.update(new anchor.BN(4321), {
        accounts: {
            myAccount: kpair.publicKey
        },
        signers: [kpair]
    })

}

update_data();