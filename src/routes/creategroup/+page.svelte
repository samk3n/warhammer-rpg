<script>
    export let data;
    export let form;
</script>

<h1 class="text-3xl font-semibold text-center">Créer un groupe</h1>

<form class="card bg-base-200 shadow-lg mt-10 w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6" method="POST" action="?/creategroup">
    <section class="card-body">
        <div class="form-control">
            <label class="label" for="name">Nom</label>
            <input class="input input-bordered" name="name" type="text"/>
        </div>
        <div class="form-control">
            <label class="label" for="join">Rejoindre</label>
            <input class="checkbox checkbox-lg ml-2" type="checkbox" name="join"/>
        </div>
    </section>

    <input type="hidden" name="characId" value={data?.characId} />

    <section class="card-actions justify-center">
        <button class="btn btn-neutral xs:btn-wide">Créer</button>
    </section>
</form>

{#if form}
    <p class="mt-5 font-semibold text-warning">{form.message}</p>
{/if}