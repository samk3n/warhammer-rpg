import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const data = {
    "username": "adele",
};

const authData = await pb.admins.authWithPassword('neubeck.theo@gmail.com', 'A10t30&3119');
// const userData = await pb.collection('users').authWithPassword('samken', 'aaaaaaaa');
// const userData = await pb.collection('users').authWithPassword('adele', 'bbbbbbbb');
// await pb.collection('characters').create(data);
// console.log(pb.authStore.model.email);
// const character = await pb.collection('characters').getFirstListItem('username="' + pb.authStore.model.username + '"');
// const character = await pb.collection('characters').getFirstListItem('username="adele"');
// console.log(character);
const character = await pb.collection('characters').update('x3kmpi6qenot9ra', {username: "samken"});