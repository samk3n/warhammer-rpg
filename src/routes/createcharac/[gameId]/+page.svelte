<script>
    export let data;
    export let form;
</script>

<h1 class="h1">Créer un personnage</h1>

{#if form}
<p class="warning">{form.message}</p>
{/if}

<form class="whiteCard" method="POST">
    <div>
        <label for="name">Nom</label>
        <input class="txt1" type="text" name="name"/>
    </div>
    <div>
        <label for="isPlayable">Jouable</label>
        <input class="txt1" type="checkbox" name="isPlayable"/>
    </div>
    <input type="hidden" name="game" value={data.gameId} />

    <button class="btn1">Créer</button>
</form>

<style lang="scss">
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 30px;

        padding: 10px;

        div {
            display: flex;
            flex-direction: column;

            input[type="checkbox"] {
                width: 25px;
                height: 25px;
            }
        }

    }

</style>