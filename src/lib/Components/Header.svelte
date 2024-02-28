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

<header>
    <nav>
        <section class="backBtn">
        {#if !pageExcludeBackButton.includes($page.url.pathname) }
        <a href={lastPage}>
            <button class="pc" >Retour</button>
            <button class="mobile" >^</button>
        </a>
        {/if}
        </section>

        <section class="title">
            <a href="/" class="h2">Warhammer</a>
        </section>

        <section class="sandwich">
            <button on:click={() => mobileMenuOpen = !mobileMenuOpen}>E</button>
        </section>

        <section class="menu" class:mobileMenuOpen>
            <p>{user?.username ?? ''}</p>
            {#if user}
            <form method="POST" action="/logout">
                <button>Déconnexion</button>
            </form>
            {/if}
        </section>
    </nav>
</header>

<style lang="scss">
    header {
        --headerHeight: 70px;
        width: 100%;
        height: var(--headerHeight);

        display: flex;
        align-items: center;

        background-color: var(--primaryColor);
        color: white;

        nav {
            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;

            section {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        a {
            color: white;
            text-decoration: none;
        }
    }

    .title {
        flex: 2;
    }

    .sandwich {
        display: none;
    }

    .menu {
        gap: 30px;
    }

    .pc {
        display: block;
    }

    .mobile {
        display: none;
    }

    @media (max-width: 768px) {
        .sandwich {
            display: flex;
        }

        .menu {
            position: absolute;
            z-index: 2;
            top: var(--headerHeight);
            right: 0px;
            height: calc(100vh - var(--headerHeight));
            width: 40%;

            flex-direction: column;
            justify-content: flex-start;
            gap: 15px;

            background-color: var(--primaryColor);

            transform: translateX(500px);
            opacity: 0;
            transition: transform 600ms, opacity 2.5s;
        }

        .mobileMenuOpen {
            opacity: 1;
            transform: translateX(0px);
            transition: transform 600ms, opacity 300ms;
        }

        .pc {
            display: none;
        }

        .mobile {
            display: block;
        }
    }
</style>