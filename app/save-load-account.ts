import * as anchor from '@project-serum/anchor';
import fs from 'fs';


const save_and_load = async () => {
    const new_account = anchor.web3.Keypair.generate();

    console.log('pubkey ', new_account.publicKey.toString());

    fs.writeFileSync('./account.json', JSON.stringify(new_account));

    const account_file_string = fs.readFileSync('../account.json', 'utf-8');
    const account_file = JSON.parse(account_file_string);
    const secret = new Uint8Array(Object.values(account_file._keypair.secretKey));
    const kpair = anchor.web3.Keypair.fromSecretKey(secret);

    console.log('pubkey ', kpair.publicKey.toString());


}

save_and_load();