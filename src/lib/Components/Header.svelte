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

<header class="bg-base-300 h-20 flex px-5">
    <nav class="w-full flex justify-between items-center">
        <section class="basis-2/12 flex justify-center items-center">
        {#if !pageExcludeBackButton.includes($page.url.pathname) }
        <a href={lastPage}>
            <button class="btn btn-neutral hidden md:block font-semibold " >Retour</button>
            <button class="btn btn-neutral md:hidden font-semibold " >^</button>
        </a>
        {/if}
        </section>

        <section class="basis-4/12 flex justify-center items-center">
            <a href="/" class="text-base-content text-3xl font-bold uppercase">Warhammer</a>
        </section>

        <section class="md:hidden basis-2/12 flex justify-center items-center">
            <button class="btn btn-neutral font-semibold "  on:click={() => mobileMenuOpen = !mobileMenuOpen}>E</button>
        </section>

        <section class="basis-2/12 flex bg-base-300 absolute z-10 top-20 right-0 h-screen w-2/5 flex-col justify-start items-center gap-5 pt-6 translate-x-96 transition-transform duration-1000 md:static md:h-auto md:flex-row md:justify-center md:p-0 md:translate-x-0" class:mobileMenuOpen>
            {#if user}
            <p class="text-lg text-base-content">{user.username}</p>
            <form method="POST" action="/api/logout">
                <button class="btn btn-warning btn-xs rounded-2xl font-semibold">Déconnexion</button>
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