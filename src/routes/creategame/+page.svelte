<script>
    let passwordEnabled = false;
    export let form;
</script>

<h1 class="h1">Créer une partie</h1>

<section class="whiteCard">
    <form method="POST" action="?/creategame">
        <div>
            <label for="name">Nom</label>
            <input class="txt1" name="name" type="text"/>
        </div>
        <div>
            <label for="passwordEnabled">Activer mot de passe</label>
            <input type="checkbox" name="passwordEnabled" bind:checked={passwordEnabled}/>
        </div>
        {#if passwordEnabled}
        <div>
            <label for="password">Mot de passe</label>
            <input class="txt1" type="password" name="password"/>
        </div>
        {/if}
        
        <button class="btn2">Créer</button>
    </form>
</section>

{#if form}
    <p class="warning">{form.message}</p>
{/if}



<style lang="scss">
    h1, p {
        text-align: center;
    }

    section {
        width: 100%;

        padding: 20px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 30px;

        div {
            display: flex;
            flex-direction: column;
        }

        input:not([type="checkbox"]) {
            height: 50px;
        }

        input[type="checkbox"] {
            height: 30px;
            width: 30px;
            margin-right: 10px;
        }
    }
</style>