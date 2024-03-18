<script>
    let passwordEnabled = false;
    export let form;
</script>

<section class="flex flex-col gap-5 w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6">

    <h1 class="text-3xl font-semibold text-center">Créer une partie</h1>

    <form class="card bg-base-300 shadow-lg mt-10 w-full" method="POST" action="?/creategame">
        <section class="card-body">
            <div class="form-control">
                <label class="label" for="name">Nom</label>
                <input class="input input-bordered" name="name" type="text"/>
            </div>
            <div class="form-control">
                <label class="label" for="passwordEnabled">Activer mot de passe</label>
                <input class="checkbox checkbox-lg ml-2" type="checkbox" name="passwordEnabled" bind:checked={passwordEnabled}/>
            </div>
            {#if passwordEnabled}
            <div class="form-control">
                <label class="label" for="password">Mot de passe</label>
                <input class="input input-bordered" type="password" name="password"/>
            </div>
            {/if}
        </section>

        <section class="card-actions justify-center">
            <button class="btn btn-neutral xs:btn-wide">Créer</button>
        </section>
    </form>

    {#if form}
        <p class="mt-5 font-semibold text-warning">{form.message}</p>
    {/if}

</section>