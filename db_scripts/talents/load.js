import { open } from 'node:fs/promises';

const file = await open("data.txt");
for await (const line of file.readLines()) {
    console.log(line.split(';'))
}