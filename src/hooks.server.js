import PocketBase from 'pocketbase';
import { PUBLIC_DB_ADDRESS } from '$env/static/public'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}) {
    event.locals.pb = new PocketBase(PUBLIC_DB_ADDRESS);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    

    try {
        event.locals.pb.authStore.isValid && await event.locals.pb.collection("users").authRefresh();
        event.locals.user = event.locals.pb.authStore.model;
    }
    catch(_){
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}