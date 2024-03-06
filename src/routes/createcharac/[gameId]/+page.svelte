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
            <input class="input input-bordered" type="text" name="name" value={form?.data?.name ?? ""}/>
        </div>

        <div class="form-control">
            <label for="isPlayable">Jouable</label>
            <input class="checkbox checkbox-lg ml-2" type="checkbox" name="isPlayable"/>
        </div>

        <div class="form-control">
            <label for="race">Race</label>
            <input class="input input-bordered" type="text" name="race" value={form?.data?.race ?? ""}/>
        </div>

        <div class="form-control">
            <label for="classe">Classe</label>
            <input class="input input-bordered" type="text" name="classe" value={form?.data?.classe ?? ""}/>
        </div>

        <div class="form-control">
            <label for="carriere">Carrière</label>
            <input class="input input-bordered" type="text" name="carriere" value={form?.data?.carriere ?? ""}/>
        </div>

        <div class="form-control">
            <label for="echelon">Échelon</label>
            <input class="input input-bordered" type="text" name="echelon" value={form?.data?.echelon ?? ""}/>
        </div>

        <div class="form-control">
            <label for="schemaCarriere">Schéma de carrière</label>
            <input class="input input-bordered" type="text" name="schemaCarriere" value={form?.data?.schemaCarriere ?? ""}/>
        </div>

        <div class="form-control">
            <label for="statut">Statut</label>
            <input class="input input-bordered" type="text" name="statut" value={form?.data?.statut ?? ""}/>
        </div>

        <div class="form-control">
            <label for="age">Âge</label>
            <input class="input input-bordered" type="number" name="age" value={form?.data?.age ?? ""}/>
        </div>

        <div class="form-control">
            <label for="taille">Taille (en cm)</label>
            <input class="input input-bordered" type="number" name="taille" value={form?.data?.taille ?? ""}/>
        </div>

        <div class="form-control">
            <label for="cheveux">Cheveux</label>
            <input class="input input-bordered" type="text" name="cheveux" value={form?.data?.cheveux ?? ""}/>
        </div>

        <div class="form-control">
            <label for="yeux">Yeux</label>
            <input class="input input-bordered" type="text" name="yeux" value={form?.data?.yeux ?? ""}/>
        </div>

        <h2 class="text-xl font-semibold" >Destin</h2>

        <div class="form-control">
            <label for="destin">Destin</label>
            <input class="input input-bordered" type="number" name="destin" value={form?.data?.destin ?? ""}/>
        </div>

        <div class="form-control">
            <label for="chance">Chance</label>
            <input class="input input-bordered" type="number" name="chance" value={form?.data?.chance ?? ""}/>
        </div>

        <h2 class="text-xl font-semibold" >Résilience</h2>

        <div class="form-control">
            <label for="resilience">Résilience</label>
            <input class="input input-bordered" type="number" name="resilience" value={form?.data?.resilience ?? ""}/>
        </div>

        <div class="form-control">
            <label for="determination">Détermination</label>
            <input class="input input-bordered" type="number" name="determination" value={form?.data?.determination ?? ""}/>
        </div>

        <div class="form-control">
            <label for="motivation">Motivation</label>
            <input class="input input-bordered" type="number" name="motivation" value={form?.data?.motivation ?? ""}/>
        </div>

        <h2 class="text-xl font-semibold" >Mouvement</h2>

        <div class="form-control">
            <label for="mouvement">Mouvement</label>
            <input class="input input-bordered" type="number" name="mouvement" value={form?.data?.mouvement ?? ""}/>
        </div>

        <div class="form-control">
            <label for="marche">Marche</label>
            <input class="input input-bordered" type="number" name="marche" value={form?.data?.marche ?? ""}/>
        </div>

        <div class="form-control">
            <label for="course">Course</label>
            <input class="input input-bordered" type="number" name="course" value={form?.data?.course ?? ""}/>
        </div>




        <input type="hidden" name="game" value={data.gameId} />
    </section>

    <section class="card-actions justify-center">
        <button class="btn btn-neutral btn-wide">Créer</button>
    </section>
</form>