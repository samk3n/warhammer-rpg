<script>
    import { enhance } from '$app/forms';

    export let data;
    export let form;
</script>

<h1 class="text-3xl font-semibold">Créer un personnage</h1>

<form class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6 xl:w-2/6" method="POST" action="?/createCharac" use:enhance>
    
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
                    <input class="input input-bordered w-3/4" type="text" name="motivation" value={form?.data?.motivation ?? ""}/>
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
                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="capCombat" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        CC
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="capCombatEditable" checked={form?.data?.capCombatEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="capCombat" value={form?.data?.capCombat ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="capCombatAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="capCombatAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="capCombatAug" type="number" value={form?.data?.capCombatAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="capTir" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        CT
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="capTirEditable" checked={form?.data?.capTirEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="capTir" value={form?.data?.capTir ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="capTirAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="capTirAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="capTirAug" type="number" value={form?.data?.capTirAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="force" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        F
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="forceEditable" checked={form?.data?.forceEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="force" value={form?.data?.force ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="forceAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="forceAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="forceAug" type="number" value={form?.data?.forceAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="endurance" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        E
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="enduranceEditable" checked={form?.data?.enduranceEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="endurance" value={form?.data?.endurance ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="enduranceAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="enduranceAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="enduranceAug" type="number" value={form?.data?.enduranceAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="initiative" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        I
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="initiativeEditable" checked={form?.data?.initiativeEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="initiative" value={form?.data?.initiative ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="initiativeAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="initiativeAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="initiativeAug" type="number" value={form?.data?.initiativeAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="agilite" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Ag
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="agiliteEditable" checked={form?.data?.agiliteEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="agilite" value={form?.data?.agilite ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="agiliteAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="agiliteAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="agiliteAug" type="number" value={form?.data?.agiliteAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="dexterite" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Dex
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="dexteriteEditable" checked={form?.data?.dexteriteEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="dexterite" value={form?.data?.dexterite ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="dexteriteAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="dexteriteAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="dexteriteAug" type="number" value={form?.data?.dexteriteAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="intelligence" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Int
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="intelligenceEditable" checked={form?.data?.intelligenceEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="intelligence" value={form?.data?.intelligence ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="intelligenceAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="intelligenceAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="intelligenceAug" type="number" value={form?.data?.intelligenceAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="forceMentale" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        FM
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="forceMentaleEditable" checked={form?.data?.forceMentaleEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="forceMentale" value={form?.data?.forceMentale ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="forceMentaleAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="forceMentaleAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="forceMentaleAug" type="number" value={form?.data?.forceMentaleAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="sociabilite" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Soc
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="sociabiliteEditable" checked={form?.data?.sociabiliteEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="sociabilite" value={form?.data?.sociabilite ?? ""}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="sociabiliteAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="sociabiliteAug">Aug.</label>
                        <input class="input input-bordered w-1/2" name="sociabiliteAug" type="number" value={form?.data?.sociabiliteAug ?? 0} />
                    </div>
                </div>
            </section>
        </section>
    </section>

    {#if form && form.message}
        <p class="text-warning font-semibold mt-5">{form.message}</p>
    {/if}
        

    <input type="hidden" name="game" value={data.gameId} />
    <section class="card-actions justify-center">
        <button class="btn btn-neutral btn-wide">Créer</button>
    </section>
</form>