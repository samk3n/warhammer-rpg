import { redirect } from '@sveltejs/kit';

export function POST({locals}){
    try {
        locals.pb.authStore.clear();
        locals.user = undefined;
    }
    catch(err) {
        console.log("Error: " + err);
        return {
            error: true,
            message: "Un problème est apparu lors de la déconnexion."
        }
    }

    throw redirect(303, "/login");
}