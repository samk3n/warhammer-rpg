<script>
    import { page } from '$app/stores';
    import {pathsList} from "$lib/Stores/pathStore.js";

    const pageExcludeBackButton = ["/", "/login", "/register"];

    export let user;
    let lastPage = "/";

    pathsList.subscribe((value) => {
        const values = Object.values(value);
        lastPage = values[values.length-1];
    });

    let mobileMenuOpen = false;
</script>

<header class="bg-brown-500 h-20 flex px-5">
    <nav class="w-full flex justify-between items-center">
        <section class="basis-2/12 flex justify-center items-center">
        {#if !pageExcludeBackButton.includes($page.url.pathname) }
        <a href={lastPage}>
            <button class="hidden md:block bg-brown-600 p-3 font-semibold text-center hover:bg-brown-800 rounded-2xl" >Retour</button>
            <button class="md:hidden bg-brown-600 p-3 font-semibold text-center hover:bg-brown-800 rounded-2xl" >^</button>
        </a>
        {/if}
        </section>

        <section class="basis-4/12 flex justify-center items-center">
            <a href="/" class="text-3xl font-bold uppercase">Warhammer</a>
        </section>

        <section class="md:hidden basis-2/12 flex justify-center items-center">
            <button class="bg-brown-600 p-3 font-semibold text-center hover:bg-brown-800 rounded-full"  on:click={() => mobileMenuOpen = !mobileMenuOpen}>E</button>
        </section>

        <section class="basis-2/12 flex bg-brown-500 absolute z-10 top-20 right-0 h-screen w-2/5 flex-col justify-start items-center gap-5 pt-6 translate-x-96 transition-transform duration-1000 md:static md:h-auto md:flex-row md:justify-center md:p-0 md:translate-x-0" class:mobileMenuOpen>
            {#if user}
            <p class="text-lg">{user.username}</p>
            <form method="POST" action="/api/logout">
                <button class="text-sm bg-brown-600 p-3 font-semibold text-center hover:bg-brown-800 rounded-2xl">Déconnexion</button>
            </form>
            {/if}
        </section>
    </nav>
</header>

<style lang="scss">
    .mobileMenuOpen {
        transform: translateX(0px);
        transition: transform 600ms;
    }
</style>