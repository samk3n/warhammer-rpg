import { open } from 'node:fs/promises';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://warhammer.line.pm:3003');
await pb.admins.authWithPassword('neubeck.theo@gmail.com', 'A10t30&3119');

const file = await open("data.txt");
for await (const line of file.readLines()) {
    const split = line.split(';');
    console.log(split[1]);

    const record = await pb.collection('talents').create({
        id: split[0],
        name: split[1],
        maxi: split[2],
        test: split[3],
        description: split[4],
    });   
}