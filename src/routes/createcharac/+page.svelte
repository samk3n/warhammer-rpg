<script>
    import { enhance } from '$app/forms';

    export let data;
    export let form;

    let talents = data.talents;

    let selectedTalents = [];

    function selectTalent(talent) {
        if(!selectedTalents.includes(talent.id)) {
            selectedTalents = [...selectedTalents, talent.id];
        }
    }

    function unselectTalent(talent) {
        selectedTalents = selectedTalents.filter((e) => e != talent.id);
    }

    $: capCombat = form?.data?.capCombat ?? "";
    $: capTir = form?.data?.capTir ?? "";
    $: force = form?.data?.force ?? "";
    $: endurance = form?.data?.endurance ?? "";
    $: initiative = form?.data?.initiative ?? "";
    $: agilite = form?.data?.agilite ?? "";
    $: dexterite = form?.data?.dexterite ?? "";
    $: intelligence = form?.data?.intelligence ?? "";
    $: forceMentale = form?.data?.forceMentale ?? "";
    $: sociabilite = form?.data?.sociabilite ?? "";

    $: map = new Map([
        ["crochetage", {selected: false, grouped: false, charac: "dexterite", value: dexterite}],
        ["dressage", {selected: false, grouped: true, charac: "intelligence", value: intelligence}],
    ]);

    let advancedSkills = {};
    $: advancedSkillsMap = new Map(Object.entries(advancedSkills));

    function addAdvancedSkill(skill, prop) {
        advancedSkills[skill] = {aug: 0, editable: false, charac: prop.charac}
        advancedSkills = advancedSkills;
    }

    function removeAdvancedSkill(skill) {
        delete advancedSkills[skill];
        advancedSkills = advancedSkills;
    }

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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="capCombat" bind:value={capCombat}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="capCombatAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="capCombatAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="capCombatAug" type="number" value={form?.data?.capCombatAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="capTir" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        CT
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="capTirEditable" checked={form?.data?.capTirEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="capTir" bind:value={capTir}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="capTirAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="capTirAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="capTirAug" type="number" value={form?.data?.capTirAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="force" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        F
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="forceEditable" checked={form?.data?.forceEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="force" bind:value={force}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="forceAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="forceAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="forceAug" type="number" value={form?.data?.forceAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="endurance" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        E
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="enduranceEditable" checked={form?.data?.enduranceEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="endurance" bind:value={endurance}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="enduranceAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="enduranceAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="enduranceAug" type="number" value={form?.data?.enduranceAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="initiative" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        I
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="initiativeEditable" checked={form?.data?.initiativeEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="initiative" bind:value={initiative}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="initiativeAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="initiativeAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="initiativeAug" type="number" value={form?.data?.initiativeAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="agilite" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Ag
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="agiliteEditable" checked={form?.data?.agiliteEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="agilite" bind:value={agilite}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="agiliteAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="agiliteAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="agiliteAug" type="number" value={form?.data?.agiliteAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="dexterite" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Dex
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="dexteriteEditable" checked={form?.data?.dexteriteEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="dexterite" bind:value={dexterite}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="dexteriteAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="dexteriteAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="dexteriteAug" type="number" value={form?.data?.dexteriteAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="intelligence" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Int
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="intelligenceEditable" checked={form?.data?.intelligenceEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="intelligence" bind:value={intelligence}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="intelligenceAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="intelligenceAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="intelligenceAug" type="number" value={form?.data?.intelligenceAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="forceMentale" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        FM
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="forceMentaleEditable" checked={form?.data?.forceMentaleEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="forceMentale" bind:value={forceMentale}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="forceMentaleAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="forceMentaleAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="forceMentaleAug" type="number" value={form?.data?.forceMentaleAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="sociabilite" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Soc
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="sociabiliteEditable" checked={form?.data?.sociabiliteEditable == "on" ? true: false} />
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="sociabilite" bind:value={sociabilite}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for="sociabiliteAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="sociabiliteAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="sociabiliteAug" type="number" value={form?.data?.sociabiliteAug ?? 0} />
                    </div>
                </div>
            </section>
        </section>
    </section>


    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Compétences de base</h2>

            <section class="grid grid-cols-2 gap-5">
                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="art" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Art
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="artEditable" checked={form?.data?.artEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="art" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="artAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="artAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="artAug" type="number" value={form?.data?.artAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="athletisme" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Athlétisme
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="athletismeEditable" checked={form?.data?.athletismeEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="athletisme" value={agilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="athletismeAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="athletismeAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="athletismeAug" type="number" value={form?.data?.athletismeAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="calme" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Calme
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="calmeEditable" checked={form?.data?.calmeEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="calme" value={forceMentale}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="calmeAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="calmeAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="calmeAug" type="number" value={form?.data?.calmeAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="charme" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Charme
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="charmeEditable" checked={form?.data?.charmeEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="charme" value={sociabilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="charmeAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="charmeAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="charmeAug" type="number" value={form?.data?.charmeAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="chevaucher" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Chevaucher
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="chevaucherEditable" checked={form?.data?.chevaucherEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="chevaucher" value={agilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="chevaucherAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="chevaucherAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="chevaucherAug" type="number" value={form?.data?.chevaucherAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="commandement" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Commandement
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="commandementEditable" checked={form?.data?.commandementEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="commandement" value={sociabilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="commandementAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="commandementAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="commandementAug" type="number" value={form?.data?.commandementAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="conduiteAttelage" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Conduite d'attelage
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="conduiteAttelageEditable" checked={form?.data?.conduiteAttelageEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="conduiteAttelage" value={agilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="conduiteAttelageAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="conduiteAttelageAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="conduiteAttelageAug" type="number" value={form?.data?.conduiteAttelageAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="cacBase" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        C.à.C (base)
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="cacBaseEditable" checked={form?.data?.cacBaseEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="cacBase" value={capCombat}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="cacBaseAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="cacBaseAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="cacBaseAug" type="number" value={form?.data?.cacBaseAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="cac" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        C.à.C
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="cacEditable" checked={form?.data?.cacEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="cac" value={capCombat}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="cacAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="cacAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="cacAug" type="number" value={form?.data?.cacAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="discretion" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Discrétion
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="discretionEditable" checked={form?.data?.discretionEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="discretion" value={agilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="discretionAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="discretionAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="discretionAug" type="number" value={form?.data?.discretionAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="divertissement" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Divertissement
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="divertissementEditable" checked={form?.data?.divertissementEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="divertissement" value={sociabilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="divertissementAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="divertissementAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="divertissementAug" type="number" value={form?.data?.divertissementAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="empriseAnimaux" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Emprise Animaux
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="empriseAnimauxEditable" checked={form?.data?.empriseAnimauxEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="empriseAnimaux" value={forceMentale}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="empriseAnimauxAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="empriseAnimauxAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="empriseAnimauxAug" type="number" value={form?.data?.empriseAnimauxAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="escalade" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Escalade
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="escaladeEditable" checked={form?.data?.escaladeEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="escalade" value={force}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="escaladeAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="escaladeAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="escaladeAug" type="number" value={form?.data?.escaladeAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="esquive" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Esquive
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="esquiveEditable" checked={form?.data?.esquiveEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="esquive" value={agilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="esquiveAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="esquiveAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="esquiveAug" type="number" value={form?.data?.esquiveAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="intimidation" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Intimidation
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="intimidationEditable" checked={form?.data?.intimidationEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="intimidation" value={force}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="intimidationAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="intimidationAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="intimidationAug" type="number" value={form?.data?.intimidationAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="intuition" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Intuition
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="intuitionEditable" checked={form?.data?.intuitionEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="intuition" value={initiative}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="intuitionAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="intuitionAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="intuitionAug" type="number" value={form?.data?.intuitionAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="marchandage" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Marchandage
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="marchandageEditable" checked={form?.data?.marchandageEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="marchandage" value={sociabilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="marchandageAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="marchandageAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="marchandageAug" type="number" value={form?.data?.marchandageAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="navigation" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Navigation
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="navigationEditable" checked={form?.data?.navigationEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="navigation" value={initiative}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="navigationAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="navigationAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="navigationAug" type="number" value={form?.data?.navigationAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="pari" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Pari
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="pariEditable" checked={form?.data?.pariEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="pari" value={intelligence}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="pariAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="pariAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="pariAug" type="number" value={form?.data?.pariAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="perception" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Perception
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="perceptionEditable" checked={form?.data?.perceptionEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="perception" value={initiative}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="perceptionAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="perceptionAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="perceptionAug" type="number" value={form?.data?.perceptionAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="ragot" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Ragôt
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="ragotEditable" checked={form?.data?.ragotEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="ragot" value={sociabilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="ragotAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="ragotAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="ragotAug" type="number" value={form?.data?.ragotAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="ramer" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Ramer
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="ramerEditable" checked={form?.data?.ramerEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="ramer" value={force}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="ramerAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="ramerAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="ramerAug" type="number" value={form?.data?.ramerAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="resistance" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Résistance
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="resistanceEditable" checked={form?.data?.resistanceEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="resistance" value={endurance}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="resistanceAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="resistanceAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="resistanceAug" type="number" value={form?.data?.resistanceAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="resistanceAlcool" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Résistance à l'alcool
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="resistanceAlcoolEditable" checked={form?.data?.resistanceAlcoolEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="resistanceAlcool" value={endurance}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="resistanceAlcoolAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="resistanceAlcoolAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="resistanceAlcoolAug" type="number" value={form?.data?.resistanceAlcoolAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="subornation" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Subornation
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="subornationEditable" checked={form?.data?.subornationEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="subornation" value={sociabilite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="subornationAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="subornationAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="subornationAug" type="number" value={form?.data?.subornationAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="survieExterieur" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        Survie en extérieur
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="survieExterieurEditable" checked={form?.data?.survieExterieurEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="survieExterieur" value={intelligence}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="survieExterieurAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="survieExterieurAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="survieExterieurAug" type="number" value={form?.data?.survieExterieurAug ?? 0} />
                    </div>
                </div>

            </section>
        </section>
    </section>

    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Sélectionner compétences avancées</h2>
            <p>{JSON.stringify(advancedSkills)}</p>
            <section class="grid grid-cols-1 gap-5">
                {#each map as [skill, prop]}
                <div>
                    <input type="checkbox" class="checkbox" bind:checked={prop.selected}
                    on:change={(event) => event.target.checked ? addAdvancedSkill(skill, prop) : removeAdvancedSkill(skill)} />
                    <p>{skill} - {JSON.stringify(prop)}</p>
                </div>
                {/each}
            </section>
        </section>
    </section>  

    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Compétences avancées</h2>

            <section class="grid grid-cols-1 gap-5">
                {#each map as [skill, prop]}
                {#if prop.selected}
                <div class="flex flex-col gap-3">
                    <label for="" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        {skill}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default"
                         checked={advancedSkills[skill]?.editable ?? false} 
                         on:change={(event) => advancedSkills[skill].editable = event.target.checked}/>
                    </label>
                    <div class="form-control">
                        <label class="label" for={skill}>Aug.</label>
                        <input type="number" name={skill} class="input input-numbered" value={advancedSkills[skill]?.aug ?? ""} 
                        on:change={(event) => advancedSkills[skill].aug = parseInt(event.target.value)}/>
                    </div>
                    
                </div>
                {/if}
                {/each}

                <input type="hidden" name="advancedSkills" value={JSON.stringify(advancedSkills)} />
            </section>
        </section>
    </section>  





    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Compétences avancées</h2>

            <section class="grid grid-cols-2 gap-5">
                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="crochetage" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        crochetage
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="crochetageEditable" checked={form?.data?.crochetageEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="crochetage" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="crochetageAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="crochetageAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="crochetageAug" type="number" value={form?.data?.crochetageAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="dressage" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        dressage
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="dressageEditable" checked={form?.data?.dressageEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="dressage" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="dressageAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="dressageAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="dressageAug" type="number" value={form?.data?.dressageAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="escamotage" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        escamotage
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="escamotageEditable" checked={form?.data?.escamotageEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="escamotage" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="escamotageAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="escamotageAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="escamotageAug" type="number" value={form?.data?.escamotageAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="evaluation" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        evaluation
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="evaluationEditable" checked={form?.data?.evaluationEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="evaluation" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="evaluationAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="evaluationAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="evaluationAug" type="number" value={form?.data?.evaluationAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="focalisation" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        focalisation
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="focalisationEditable" checked={form?.data?.focalisationEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="focalisation" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="focalisationAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="focalisationAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="focalisationAug" type="number" value={form?.data?.focalisationAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="guerison" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        guerison
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="guerisonEditable" checked={form?.data?.guerisonEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="guerison" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="guerisonAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="guerisonAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="guerisonAug" type="number" value={form?.data?.guerisonAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="langue" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        langue
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="langueEditable" checked={form?.data?.langueEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="langue" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="langueAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="langueAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="langueAug" type="number" value={form?.data?.langueAug ?? 0} />
                    </div>
                </div>
                
                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="metier" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        metier
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="metierEditable" checked={form?.data?.metierEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="metier" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="metierAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="metierAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="metierAug" type="number" value={form?.data?.metierAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="musicien" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        musicien
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="musicienEditable" checked={form?.data?.musicienEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="musicien" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="musicienAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="musicienAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="musicienAug" type="number" value={form?.data?.musicienAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="natation" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        natation
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="natationEditable" checked={form?.data?.natationEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="natation" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="natationAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="natationAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="natationAug" type="number" value={form?.data?.natationAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="piegeage" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        piegeage
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="piegeageEditable" checked={form?.data?.piegeageEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="piegeage" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="piegeageAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="piegeageAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="piegeageAug" type="number" value={form?.data?.piegeageAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="pistage" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        pistage
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="pistageEditable" checked={form?.data?.pistageEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="pistage" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="pistageAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="pistageAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="pistageAug" type="number" value={form?.data?.pistageAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="priere" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        priere
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="priereEditable" checked={form?.data?.priereEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="priere" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="priereAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="priereAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="priereAug" type="number" value={form?.data?.priereAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="projectiles" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        projectiles
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="projectilesEditable" checked={form?.data?.projectilesEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="projectiles" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="projectilesAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="projectilesAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="projectilesAug" type="number" value={form?.data?.projectilesAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="recherche" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        recherche
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="rechercheEditable" checked={form?.data?.rechercheEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="recherche" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="rechercheAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="rechercheAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="rechercheAug" type="number" value={form?.data?.rechercheAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="representation" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        representation
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="representationEditable" checked={form?.data?.representationEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="representation" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="representationAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="representationAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="representationAug" type="number" value={form?.data?.representationAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="savoir" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        savoir
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="savoirEditable" checked={form?.data?.savoirEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="savoir" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="savoirAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="savoirAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="savoirAug" type="number" value={form?.data?.savoirAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="signesSecrets" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        signesSecrets
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="signesSecretsEditable" checked={form?.data?.signesSecretsEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="signesSecrets" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="signesSecretsAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="signesSecretsAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="signesSecretsAug" type="number" value={form?.data?.signesSecretsAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="soinAnimaux" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        soinAnimaux
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="soinAnimauxEditable" checked={form?.data?.soinAnimauxEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="soinAnimaux" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="soinAnimauxAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="soinAnimauxAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="soinAnimauxAug" type="number" value={form?.data?.soinAnimauxAug ?? 0} />
                    </div>
                </div>

                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for="voile" class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        voile
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name="voileEditable" checked={form?.data?.voileEditable == "on" ? true: false}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" disabled type="number" name="voile" value={dexterite}/>
                    <div class="form-control items-center">
                        <label class="label hidden xs:flex" for="voileAug">Augmentations</label>
                        <label class="label flex xs:hidden" for="voileAug">Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name="voileAug" type="number" value={form?.data?.voileAug ?? 0} />
                    </div>
                </div>

            </section>
        </section>
    </section>

    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Talents</h2>
            {#if talents}
            <div class="flex flex-col gap-5 h-72 overflow-scroll overflow-x-hidden">
                {#each talents as talent}
                <div class="flex flex-start items-center gap-10">
                    <input type="checkbox" id={talent.id} class="checkbox" 
                    on:change={(event) => event.target.checked ? selectTalent(talent) : unselectTalent(talent) } />
                    <label for={talent.id}>{talent.name}</label>
                </div>
                {/each}
            </div>
            {/if}
            <input type="hidden" name="talents" value={selectedTalents} />
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