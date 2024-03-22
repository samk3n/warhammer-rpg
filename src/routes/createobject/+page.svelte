<script>
    export let form;
</script>

<h1 class="text-3xl font-semibold text-center">Créer un objet</h1>

<form class="card bg-base-300 shadow-lg mt-10 w-11/12 sm:w-4/5 md:w-3/5 lg:w-2/6" method="POST" action="?/createobject">
    <section class="card-body">
        <div class="form-control">
            <label class="label" for="name">Nom</label>
            <input class="input input-bordered" name="name" type="text"/>
        </div>
        <div class="form-control">
            <label class="label" for="encombrement">Encombrement</label>
            <input class="input input-bordered" type="number" name="encombrement"/>
        </div>
    </section>

    <section class="card-actions justify-center">
        <button class="btn btn-neutral xs:btn-wide">Créer</button>
    </section>
</form>

{#if form}
    <p class="mt-5 font-semibold text-warning">{form.message}</p>
{/if}