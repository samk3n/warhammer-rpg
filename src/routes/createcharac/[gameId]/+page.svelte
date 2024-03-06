<script>
    export let data;
    export let form;
</script>

<h1 class="text-3xl font-semibold">Créer un personnage</h1>

{#if form}
<p class="text-warning font-semibold mt-5">{form.message}</p>
{/if}

<form class="card bg-base-200 shadow-lg mt-10 w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6" method="POST">
    <section class="card-body">
        <div class="form-control">
            <label for="name">Nom</label>
            <input class="input input-bordered" type="text" name="name"/>
        </div>
        <div class="form-control">
            <label for="isPlayable">Jouable</label>
            <input class="checkbox checkbox-lg ml-2" type="checkbox" name="isPlayable"/>
        </div>
        <input type="hidden" name="game" value={data.gameId} />
    </section>

    <section class="card-actions justify-center">
        <button class="btn btn-neutral btn-wide">Créer</button>
    </section>
</form>