import * as anchor from "@project-serum/anchor";
import { Program  } from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { Basic1  } from "../target/types/basic1";
import { PublicKey, SystemProgram, Transaction, Connection, Commitment, LAMPORTS_PER_SOL, Keypair } from "@solana/web3.js"
import fs from 'fs';

require('dotenv').config();  
//inject ANCHOR_WALLET=~/.config/solana/id.json
//inject ANCHOR_PROVIDER_URL=https://api.devnet.solana.com

const setup = async () => {
     //configure the client to use solana devnet cluster
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.Basic1; 
    const new_account = anchor.web3.Keypair.generate();
    console.log('new_account_pubkey ', new_account.publicKey.toString());

    fs.writeFileSync('./new_account.json', JSON.stringify(new_account));
    

    await program.rpc.initialize(new anchor.BN(1234),{
        accounts: {
            myAccount: new_account.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId, 
        },
        signers: [new_account]
    });
 
}

setup();