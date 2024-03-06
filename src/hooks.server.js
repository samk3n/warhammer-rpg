import PocketBase from 'pocketbase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({event, resolve}) {
    event.locals.pb = new PocketBase('http://localhost:8090');
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
    

    try {
        event.locals.pb.authStore.isValid && await await event.locals.pb.collection("users").authRefresh();
        event.locals.user = event.locals.pb.authStore.model;
    }
    catch(_){
        event.locals.pb.authStore.clear();
    }

    const response = await resolve(event);

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}