<script>
    export let data;
    export let form;
</script>

<h1 class="text-3xl font-semibold">Créer un personnage</h1>

{#if form}
<p class="text-warning font-semibold mt-5">{form.message}</p>
{/if}

<form class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6 xl:w-2/6" method="POST" action="?/createCharac">
    
    <section class="card gap-10 bg-base-300 w-full">
        <div class="card-body">
            <div class="form-control">
                <label for="name">Nom</label>
                <input class="input input-bordered" type="text" name="name" value={form?.data?.name ?? ""}/>
            </div>

            <div class="form-control">
                <label for="isPlayable">Jouable</label>
                <input class="checkbox checkbox-lg ml-2 mt-2" type="checkbox" name="isPlayable"/>
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
        </div>
    </section>

    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Destin</h2>

            <section class="grid gap-5 grid-cols-1 xs:grid-cols-2">
                <div class="form-control items-center">
                    <label for="destin">Destin</label>
                    <input class="input input-bordered w-3/4" type="number" name="destin" value={form?.data?.destin ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="chance">Chance</label>
                    <input class="input input-bordered w-3/4" type="number" name="chance" value={form?.data?.chance ?? ""}/>
                </div>
            </section>
        </section>
    </section>

    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Résilience</h2>

            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label for="resilience">Résilience</label>
                    <input class="input input-bordered w-3/4" type="number" name="resilience" value={form?.data?.resilience ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="determination">Détermination</label>
                    <input class="input input-bordered w-3/4" type="number" name="determination" value={form?.data?.determination ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="motivation">Motivation</label>
                    <input class="input input-bordered w-3/4" type="number" name="motivation" value={form?.data?.motivation ?? ""}/>
                </div>
            </section>
        </section>
    </section>

    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Mouvement</h2>

            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label for="mouvement">Mouvement</label>
                    <input class="input input-bordered w-3/4" type="number" name="mouvement" value={form?.data?.mouvement ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="marche">Marche</label>
                    <input class="input input-bordered w-3/4" type="number" name="marche" value={form?.data?.marche ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="course">Course</label>
                    <input class="input input-bordered w-3/4" type="number" name="course" value={form?.data?.course ?? ""}/>
                </div>
            </section>
        </section>
    </section>

    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Caractéristiques</h2>

            <section class="grid grid-cols-2 gap-5">
                <div class="form-control items-center">
                    <label for="capCombat">CC</label>
                    <input class="input input-bordered w-3/4" type="number" name="capCombat" value={form?.data?.capCombat ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="capTir">CT</label>
                    <input class="input input-bordered w-3/4" type="number" name="capTir" value={form?.data?.capTir ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="force">F</label>
                    <input class="input input-bordered w-3/4" type="number" name="force" value={form?.data?.force ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="endurance">E</label>
                    <input class="input input-bordered w-3/4" type="number" name="endurance" value={form?.data?.endurance ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="initiative">I</label>
                    <input class="input input-bordered w-3/4" type="number" name="initiative" value={form?.data?.initiative ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="agilite">Ag</label>
                    <input class="input input-bordered w-3/4" type="number" name="agilite" value={form?.data?.agilite ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="dexterite">Dex</label>
                    <input class="input input-bordered w-3/4" type="number" name="dexterite" value={form?.data?.dexterite ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="intelligence">Int</label>
                    <input class="input input-bordered w-3/4" type="number" name="intelligence" value={form?.data?.intelligence ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="forceMentale">FM</label>
                    <input class="input input-bordered w-3/4" type="number" name="forceMentale" value={form?.data?.forceMentale ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="sociabilite">Soc</label>
                    <input class="input input-bordered w-3/4" type="number" name="sociabilite" value={form?.data?.sociabilite ?? ""}/>
                </div>
            </section>
        </section>
    </section>
        

    <input type="hidden" name="game" value={data.gameId} />
    <section class="card-actions justify-center">
        <button class="btn btn-neutral btn-wide">Créer</button>
    </section>
</form>