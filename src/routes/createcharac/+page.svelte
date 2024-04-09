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

    let specialtyInputText = new Map();

    $: characteristics = new Map([
        ["capCombat", form?.data?.capCombat ?? 0],
        ["capTir", form?.data?.capTir ?? 0],
        ["force", form?.data?.force ?? 0],
        ["endurance", form?.data?.endurance ?? 0],
        ["initiative", form?.data?.initiative ?? 0],
        ["agilite", form?.data?.agilite ?? 0],
        ["dexterite", form?.data?.dexterite ?? 0],
        ["intelligence", form?.data?.intelligence ?? 0],
        ["forceMentale", form?.data?.forceMentale ?? 0],
        ["sociabilite", form?.data?.sociabilite ?? 0],
    ]);

    $: capCombat = form?.data?.capCombat ?? 0;
    $: capTir = form?.data?.capTir ?? 0;
    $: force = form?.data?.force ?? 0;
    $: endurance = form?.data?.endurance ?? 0;
    $: initiative = form?.data?.initiative ?? 0;
    $: agilite = form?.data?.agilite ?? 0;
    $: dexterite = form?.data?.dexterite ?? 0;
    $: intelligence = form?.data?.intelligence ?? 0;
    $: forceMentale = form?.data?.forceMentale ?? 0;
    $: sociabilite = form?.data?.sociabilite ?? 0;

    $: advancedSkillsProps = form?.data?.advancedSkillsProps ?? {
        "crochetage": {selected: false, grouped: false, charac: "dexterite"},
        "dressage": {selected: false, grouped: true, charac: "intelligence"}
    };
    $: advancedSkillsPropsMap = new Map(Object.entries(advancedSkillsProps));

    $: advancedSkills = form?.data?.advancedSkills ?? {};
    $: advancedSkillsMap =  new Map(Object.entries(advancedSkills));

    function addAdvancedSkill(skill, prop) {
        if(prop.grouped) {
            advancedSkills[skill] = {charac: prop.charac, spe: [], grouped: true}
        }
        else {
            advancedSkills[skill] = {aug: 0, editable: false, charac: prop.charac}
        }        
        advancedSkills = advancedSkills;
    }

    function removeAdvancedSkill(skill) {
        delete advancedSkills[skill];
        advancedSkills = advancedSkills;
    }

    function addSkillSpecialty(skill, specialty) {
        advancedSkills[skill].spe = [...advancedSkills[skill].spe, specialty];
        advancedSkills[skill][specialty] = {aug: 0, editable: false};
        advancedSkills = advancedSkills;
        // Reset input text
        specialtyInputText.set(skill, "");
    }

    function removeSkillSpecialty(skill, specialty) {
        delete advancedSkills[skill][specialty];
        advancedSkills[skill].spe = advancedSkills[skill].spe.filter((element) => element != specialty);
        advancedSkills = advancedSkills;
    }

</script>

<h1 class="text-3xl font-semibold">Créer un personnage</h1>

{#if form && form.message}
    <p class="text-warning font-semibold mt-5">{form.message}</p>
{/if}

<form class="mt-10 flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6" method="POST">
    
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="capCombat" value={characteristics.get("capCombat")}
                    on:change={(event) => {
                        characteristics.set("capCombat", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="capTir" value={characteristics.get("capTir")}
                    on:change={(event) => {
                        characteristics.set("capTir", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="force" value={characteristics.get("force")}
                    on:change={(event) => {
                        characteristics.set("force", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="endurance" value={characteristics.get("endurance")}
                    on:change={(event) => {
                        characteristics.set("endurance", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="initiative" value={characteristics.get("initiative")}
                    on:change={(event) => {
                        characteristics.set("initiative", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="agilite" value={characteristics.get("agilite")}
                    on:change={(event) => {
                        characteristics.set("agilite", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="dexterite" value={characteristics.get("dexterite")} 
                    on:change={(event) => {
                        characteristics.set("dexterite", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="intelligence" value={characteristics.get("intelligence")}
                    on:change={(event) => {
                        characteristics.set("intelligence", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="forceMentale" value={characteristics.get("forceMentale")}
                    on:change={(event) => {
                        characteristics.set("forceMentale", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                    <input class="input input-bordered w-3/4 text-center" type="number" name="sociabilite" value={characteristics.get("sociabilite")}
                    on:change={(event) => {
                        characteristics.set("sociabilite", event.target.value);
                        characteristics = characteristics;
                    }}/>
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
                {#each advancedSkillsPropsMap as [skill, prop]}
                <div>
                    <input type="checkbox" class="checkbox" bind:checked={advancedSkillsProps[skill].selected}
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
                {#each advancedSkillsMap as [skill, prop]}
                <div class="flex flex-col items-center gap-3 p-3 border-2 border-base-100 rounded-xl">
                    <label for="" class="label flex flex-col items-start gap-3 2xs:flex-row 2xs:justify-center text-sm xs:text-base w-full">
                        <p class="font-medium text-center">{skill} [{prop.charac}: {characteristics.get(prop.charac)}]</p>
                        {#if !prop.grouped}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default"
                         checked={advancedSkills[skill]?.editable ?? false} 
                         on:change={(event) => advancedSkills[skill].editable = event.target.checked}/>
                         {/if}
                    </label>

                    {#if !prop.grouped}
                    <div class="form-control items-center">
                        <label class="label text-sm xs:text-base" for={skill}>Aug.</label>
                        <input type="number" name={skill} class="input input-bordered w-3/4 text-center" value={advancedSkills[skill]?.aug ?? 0} 
                        on:change={(event) => advancedSkills[skill].aug = parseInt(event.target.value)} />
                    </div>
                    {:else}
                    <div class="form-control">
                            {#each advancedSkills[skill].spe as spe}
                            <label for="" class="label flex flex-col items-start gap-3 2xs:flex-row 2xs:justify-start 2xs:items-center text-sm xs:text-base w-full">
                                <div>
                                    <button type="button" class="btn btn-ghost text-error"
                                    on:click={() => removeSkillSpecialty(skill, spe)}>X</button>
                                    {skill} ({spe})
                                </div>
                                <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default"
                                checked={advancedSkills[skill][spe]?.editable ?? false} 
                                on:change={(event) => advancedSkills[skill][spe].editable = event.target.checked}/>
                            </label>
                                <div class="form-control items-center">
                                    <label class="label text-sm xs:text-base" for={skill+spe}>Aug.</label>
                                    <input type="number" class="input input-bordered w-3/4 text-center" id={skill+spe} value={advancedSkills[skill][spe]?.aug ?? 0} 
                                    on:change={(event) => advancedSkills[skill][spe].aug = parseInt(event.target.value)} />
                                </div>
                            {/each}

                        <label for="specialty" class="label text-sm xs:text-base mt-5">Ajouter une spécialité</label>
                        <div class="flex flex-col items-center w-full xs:flex-row">
                            <input type="text" class="input input-bordered xs:flex-1 w-full" id="specialty" value={specialtyInputText.get(skill) ?? ""}
                            on:change={(event) => {
                                specialtyInputText.set(skill, event.target.value);
                                specialtyInputText = specialtyInputText;
                            }}/>
                            <button type="button" class="btn btn-success w-1/5" on:click={() => addSkillSpecialty(skill, specialtyInputText.get(skill))}>+</button>
                        </div>
                       
                    </div>
                    {/if}
                    
                </div>
                {/each}
                <!-- Hidden input used to pass the data related to advanced skills,  -->
                <!-- to be able to return them from the form action (in createcharac/+page.server.js) if an error occurs -->
                <input type="hidden" name="advancedSkills" value={JSON.stringify(advancedSkills)} />
                <input type="hidden" name="advancedSkillsProps" value={JSON.stringify(advancedSkillsProps)} />
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




        

    <input type="hidden" name="game" value={data.gameId} />
    <section class="card-actions justify-center">
        <button class="btn btn-neutral btn-wide">Créer</button>
    </section>
</form>