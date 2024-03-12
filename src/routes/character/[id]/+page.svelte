<script>
    import {getRecordFromId, 
        increaseCharacteristic, 
        decreaseCharacteristic, 
        updateAttribute, 
        updateCharacteristic, 
        increaseSkill, 
        decreaseSkill, 
        calculateWoundsMax,
        updateGroup} from "$lib/utils.js"
    import { onDestroy, onMount } from "svelte";
    import PocketBase from 'pocketbase';

    export let data;
    export let form;

    const sections = new Map(
        [["destin", "Destin"],
        ["resilience", "Résilience"],
        ["mouvement", "Mouvement"],
        ["experience", "Expérience"],
        ["carac", "Caractéristiques"],
        ["competences", "Compétences"],
        ["richesses", "Richesses"],
        ["blessures", "Blessures"],
        ["ambitions", "Ambitions"],
        ["groupe", "Groupe"],]
    );

    let character = data.character;
    const isMaster = data.isMaster;

    let pb;

    let editCharac = false;
    let editSkill = false;
    let editNotes = false;

    let characFormModal;
    $: if(form && form.message){
        characFormModal.showModal();
    }

    onMount(async () => {
        pb = new PocketBase("http://localhost:8090");
        pb.authStore?.loadFromCookie(document.cookie || '');
        
        pb.collection("characters").subscribe(character.id, (e) => {
            if("update" == e.action) {
                character = e.record;
            }
        }, {expand: "user,group,game"});

        if(character.group) {
            pb.collection("groups").subscribe(character.group, (e) => {
                if("update" == e.action) {
                    character.expand.group = e.record;
                }
            });
        }
    });

    onDestroy(() => {
        if(pb) pb.collection("characters").unsubscribe();
    });

</script>

<section class="flex flex-col gap-7 items-center w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6">

{#if data && character}

    <!-- Character name -->
    <h1 class="text-3xl font-bold text-center">{character.name}</h1>

    {#if isMaster}
        <!-- Name of the player, no player, or unplayable -->
        {#if character.isPlayable && character.user}
            <p class="italic text-xl">Joueur: {character.expand.user.username}</p>
        {:else if character.isPlayable}
            <p class="italic text-xl">Joueur: aucun</p>
        {:else}
            <p class="italic text-xl">Non jouable</p>
        {/if}
    {/if}

    <!-- NAV -->
    <nav class="flex flex-wrap  items-center gap-3 w-full mt-5">
        {#each sections as [id, name]}
        <a href={"#"+id} class="flex-grow">
            <button class="btn btn-neutral">{name}</button>
        </a>
        {/each}
        {#if !isMaster}
        <a href="#notes" class="flex-grow">
            <button class="btn btn-neutral">Notes</button>
        </a>
        {/if}
    </nav>

    <section id="main" class="card bg-base-300 w-full">
        <section class="card-body grid gap-5 grid-cols-1 xs:grid-cols-2">
            <div class="form-control">
                <label class="label" for="race">Race</label>
                <input on:change={(event) => updateAttribute(character, "race", event.target.value)} 
                    class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="text" name="race" value={character.race} />
            </div>

            <div class="form-control">
                <label class="label" for="classe">Classe</label>
                <input on:change={(event) => updateAttribute(character, "classe", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!isMaster} 
                type="text" name="classe" value={character.classe} />
            </div>

            <div class="form-control">
                <label class="label" for="carriere">Carrière</label>
                <input on:change={(event) => updateAttribute(character, "carriere", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!isMaster} 
                type="text" name="carriere" value={character.carriere} />
            </div>

            <div class="form-control">
                <label class="label" for="echelon">Échelon</label>
                <input on:change={(event) => updateAttribute(character, "echelon", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!isMaster} 
                type="text" name="echelon" value={character.echelon} />
            </div>

            <div class="form-control">
                <label class="label" for="schemaCarriere">Schéma de carrière</label>
                <input on:change={(event) => updateAttribute(character, "schemaCarriere", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!isMaster} 
                type="text" name="schemaCarriere" value={character.schemaCarriere} />
            </div>

            <div class="form-control">
                <label class="label" for="statut">Statut</label>
                <input on:change={(event) => updateAttribute(character, "statut", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!isMaster} 
                type="text" name="statut" value={character.statut} />
            </div>

            <div class="form-control">
                <label class="label" for="age">Âge</label>
                <input on:change={(event) => updateAttribute(character, "age", parseInt(event.target.value))} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!isMaster} 
                type="number" name="age" value={character.age} />
            </div>

            <div class="form-control">
                <label class="label" for="taille">Taille</label>
                <input on:change={(event) => updateAttribute(character, "taille", parseInt(event.target.value))} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!isMaster} 
                type="number" name="taille" value={character.taille} />
            </div>

            <div class="form-control">
                <label class="label" for="cheveux">Cheveux</label>
                <input on:change={(event) => updateAttribute(character, "cheveux", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!isMaster} 
                type="text" name="cheveux" value={character.cheveux} />
            </div>

            <div class="form-control">
                <label class="label" for="yeux">Yeux</label>
                <input on:change={(event) => updateAttribute(character, "yeux", event.target.value)} 
                class="input input-bordered disabled:text-base-content disabled:cursor-default" 
                disabled={!isMaster} 
                type="text" name="yeux" value={character.yeux} />
            </div>

        </section>
    </section>

    <!-- DESTIN -->
    <section id="destin" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Destin</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-2">
                <div class="form-control items-center">
                    <label class="label" for="destin">Destin</label>
                    <input on:change={(event) => updateAttribute(character, "destin", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="destin" value={character.destin} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="taille">Chance</label>
                    <input on:change={(event) => updateAttribute(character, "chance", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="chance" value={character.chance} />
                </div>
            </section>
        </section>
    </section>

    <!-- RESILIENCE -->
    <section id="resilience" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Résilience</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="destin">Résilience</label>
                    <input on:change={(event) => updateAttribute(character, "resilience", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="resilience" value={character.resilience} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="determination">Détermination</label>
                    <input on:change={(event) => updateAttribute(character, "determination", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="determination" value={character.determination} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="motivation">Motivation</label>
                    <input on:change={(event) => updateAttribute(character, "motivation", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="motivation" value={character.motivation} />
                </div>
            </section>
        </section>
    </section>

    <!-- MOUVEMENT -->
    <section id="mouvement" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Mouvement</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="mouvement">Mouvement</label>
                    <input on:change={(event) => updateAttribute(character, "mouvement", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="mouvement" value={character.mouvement} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="marche">Marche</label>
                    <input on:change={(event) => updateAttribute(character, "marche", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="marche" value={character.marche} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="course">Course</label>
                    <input on:change={(event) => updateAttribute(character, "course", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="course" value={character.course} />
                </div>
            </section>
        </section>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Expérience</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="xpEarned">Gagnée</label>
                    <input on:change={(event) => updateAttribute(character, "xpEarned", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="xpEarned" value={character.xpEarned} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="xpSpent">Dépensée</label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled 
                    type="number" name="xpSpent" value={character.xpSpent} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="course">Disponible</label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled 
                    type="number" name="course" value={character.xpEarned - character.xpSpent} />
                </div>
            </section>
        </section>
    </section>

    <!-- CARACTERISTIQUES -->
    <section id="carac" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title">Caractéristiques</h2>
                {#if isMaster}
                <input type="checkbox" class="toggle toggle-info justify-self-end" bind:checked={editCharac} />
                {/if}
            </div>

            <section class="grid gap-5 grid-cols-1 xs:grid-cols-2">

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="capCombat">
                        CC
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac}  bind:checked={character.capCombat.editable}
                        on:change={(event) => updateCharacteristic(character, "capCombat", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "capCombat", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="capCombat" value={isMaster ? character.capCombat.init : character.capCombat.init + character.capCombat.aug} />
                    {#if isMaster || character.capCombat.editable}
                    <p class="italic font-semibold text-sm">{character.capCombat.aug} {character.capCombat.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.capCombat.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "capCombat")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "capCombat")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="capTir">
                        CT
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac} bind:checked={character.capTir.editable}
                        on:change={(event) => updateCharacteristic(character, "capTir", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "capTir", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="capCombat" value={isMaster ? character.capTir.init : character.capTir.init + character.capTir.aug} />
                    {#if isMaster || character.capTir.editable}
                    <p class="italic font-semibold text-sm">{character.capTir.aug} {character.capTir.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.capTir.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "capTir")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "capTir")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="force">
                        Force
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac} bind:checked={character.force.editable}
                        on:change={(event) => updateCharacteristic(character, "force", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "force", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="force" value={isMaster ? character.force.init : character.force.init + character.force.aug} />
                    {#if isMaster || character.force.editable}
                    <p class="italic font-semibold text-sm">{character.force.aug} {character.force.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.force.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "force")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "force")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="endurance">
                        Endurance
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac} bind:checked={character.endurance.editable}
                        on:change={(event) => updateCharacteristic(character, "endurance", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "endurance", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="endurance" value={isMaster ? character.endurance.init : character.endurance.init + character.endurance.aug} />
                    {#if isMaster || character.endurance.editable}
                    <p class="italic font-semibold text-sm">{character.endurance.aug} {character.endurance.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.endurance.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "endurance")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "endurance")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="initiative">
                        Initiative
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac} bind:checked={character.initiative.editable}
                        on:change={(event) => updateCharacteristic(character, "initiative", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "initiative", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="initiative" value={isMaster ? character.initiative.init : character.initiative.init + character.initiative.aug} />
                    {#if isMaster || character.initiative.editable}
                    <p class="italic font-semibold text-sm">{character.initiative.aug} {character.initiative.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.initiative.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "initiative")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "initiative")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="agilite">
                        Agilité
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac} bind:checked={character.agilite.editable}
                        on:change={(event) => updateCharacteristic(character, "agilite", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "agilite", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="agilite" value={isMaster ? character.agilite.init : character.agilite.init + character.agilite.aug} />
                    {#if isMaster || character.agilite.editable}
                    <p class="italic font-semibold text-sm">{character.agilite.aug} {character.agilite.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.agilite.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "agilite")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "agilite")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="dexterite">
                        Dextérité
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac} bind:checked={character.dexterite.editable}
                        on:change={(event) => updateCharacteristic(character, "dexterite", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "dexterite", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="dexterite" value={isMaster ? character.dexterite.init : character.dexterite.init + character.dexterite.aug} />
                    {#if isMaster || character.dexterite.editable}
                    <p class="italic font-semibold text-sm">{character.dexterite.aug} {character.dexterite.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.dexterite.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "dexterite")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "dexterite")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="intelligence">
                        Intelligence
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac} bind:checked={character.intelligence.editable}
                        on:change={(event) => updateCharacteristic(character, "intelligence", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "intelligence", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="intelligence" value={isMaster ? character.intelligence.init : character.intelligence.init + character.intelligence.aug} />
                    {#if isMaster || character.intelligence.editable}
                    <p class="italic font-semibold text-sm">{character.intelligence.aug} {character.intelligence.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.intelligence.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "intelligence")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "intelligence")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="forceMentale">
                        FM
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac} bind:checked={character.forceMentale.editable}
                        on:change={(event) => updateCharacteristic(character, "forceMentale", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "forceMentale", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="forceMentale" value={isMaster ? character.forceMentale.init : character.forceMentale.init + character.forceMentale.aug} />
                    {#if isMaster || character.forceMentale.editable}
                    <p class="italic font-semibold text-sm">{character.forceMentale.aug} {character.forceMentale.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.forceMentale.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "forceMentale")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "forceMentale")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="sociabilite">
                        Sociablité
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac} bind:checked={character.sociabilite.editable}
                        on:change={(event) => updateCharacteristic(character, "sociabilite", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, "sociabilite", "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name="sociabilite" value={isMaster ? character.sociabilite.init : character.sociabilite.init + character.sociabilite.aug} />
                    {#if isMaster || character.sociabilite.editable}
                    <p class="italic font-semibold text-sm">{character.sociabilite.aug} {character.sociabilite.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.sociabilite.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, "sociabilite")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, "sociabilite")}>+</button>
                    </div>
                    {/if}
                </div>

                
            </section>
        </section>
    </section>

    <!-- COMPETENCES DE BASE -->
    <section id="competences" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title">Compétences de base</h2>
                {#if isMaster}
                <input type="checkbox" class="toggle toggle-info justify-self-end" bind:checked={editSkill} />
                {/if}
            </div>

            <section class="grid gap-5 grid-cols-1 xs:grid-cols-2">

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="art">
                        Art
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.art.editable}
                        on:change={(event) => updateCharacteristic(character, "art", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="art" 
                    value={isMaster ? character[character.art.charac].init + character[character.art.charac].aug : character[character.art.charac].init + character[character.art.charac].aug + character.art.aug} />
                    {#if isMaster || character.art.editable}
                    <p class="italic font-semibold text-sm">{character.art.aug} {character.art.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.art.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "art")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "art")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="athletisme">
                        Athlétisme
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.athletisme.editable}
                        on:change={(event) => updateCharacteristic(character, "athletisme", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="athletisme" 
                    value={isMaster ? character[character.athletisme.charac].init + character[character.athletisme.charac].aug : character[character.athletisme.charac].init + character[character.athletisme.charac].aug + character.athletisme.aug} />
                    {#if isMaster || character.athletisme.editable}
                    <p class="italic font-semibold text-sm">{character.athletisme.aug} {character.athletisme.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.athletisme.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "athletisme")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "athletisme")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="calme">
                        Calme
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.calme.editable}
                        on:change={(event) => updateCharacteristic(character, "calme", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="calme" 
                    value={isMaster ? character[character.calme.charac].init + character[character.calme.charac].aug : character[character.calme.charac].init + character[character.calme.charac].aug + character.calme.aug} />
                    {#if isMaster || character.calme.editable}
                    <p class="italic font-semibold text-sm">{character.calme.aug} {character.calme.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.calme.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "calme")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "calme")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="charme">
                        Charme
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.charme.editable}
                        on:change={(event) => updateCharacteristic(character, "charme", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="charme" 
                    value={isMaster ? character[character.charme.charac].init + character[character.charme.charac].aug : character[character.charme.charac].init + character[character.charme.charac].aug + character.charme.aug} />
                    {#if isMaster || character.charme.editable}
                    <p class="italic font-semibold text-sm">{character.charme.aug} {character.charme.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.charme.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "charme")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "charme")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="chevaucher">
                        Chevaucher
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.chevaucher.editable}
                        on:change={(event) => updateCharacteristic(character, "chevaucher", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="chevaucher" 
                    value={isMaster ? character[character.chevaucher.charac].init + character[character.chevaucher.charac].aug : character[character.chevaucher.charac].init + character[character.chevaucher.charac].aug + character.chevaucher.aug} />
                    {#if isMaster || character.chevaucher.editable}
                    <p class="italic font-semibold text-sm">{character.chevaucher.aug} {character.chevaucher.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.chevaucher.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "chevaucher")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "chevaucher")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="commandement">
                        Commandement
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.commandement.editable}
                        on:change={(event) => updateCharacteristic(character, "commandement", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="commandement" 
                    value={isMaster ? character[character.commandement.charac].init + character[character.commandement.charac].aug : character[character.commandement.charac].init + character[character.commandement.charac].aug + character.commandement.aug} />
                    {#if isMaster || character.commandement.editable}
                    <p class="italic font-semibold text-sm">{character.commandement.aug} {character.commandement.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.commandement.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "commandement")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "commandement")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="conduiteAttelage">
                        Conduite d'attelage
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.conduiteAttelage.editable}
                        on:change={(event) => updateCharacteristic(character, "conduiteAttelage", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="conduiteAttelage" 
                    value={isMaster ? character[character.conduiteAttelage.charac].init + character[character.conduiteAttelage.charac].aug : character[character.conduiteAttelage.charac].init + character[character.conduiteAttelage.charac].aug + character.conduiteAttelage.aug} />
                    {#if isMaster || character.conduiteAttelage.editable}
                    <p class="italic font-semibold text-sm">{character.conduiteAttelage.aug} {character.conduiteAttelage.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.conduiteAttelage.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "conduiteAttelage")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "conduiteAttelage")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="cacBase">
                        C. à C. (base)
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.cacBase.editable}
                        on:change={(event) => updateCharacteristic(character, "cacBase", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="cacBase" 
                    value={isMaster ? character[character.cacBase.charac].init + character[character.cacBase.charac].aug : character[character.cacBase.charac].init + character[character.cacBase.charac].aug + character.cacBase.aug} />
                    {#if isMaster || character.cacBase.editable}
                    <p class="italic font-semibold text-sm">{character.cacBase.aug} {character.cacBase.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.cacBase.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "cacBase")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "cacBase")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="cac">
                        C.à C.
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.cac.editable}
                        on:change={(event) => updateCharacteristic(character, "cac", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="cac" 
                    value={isMaster ? character[character.cac.charac].init + character[character.cac.charac].aug : character[character.cac.charac].init + character[character.cac.charac].aug + character.cac.aug} />
                    {#if isMaster || character.cac.editable}
                    <p class="italic font-semibold text-sm">{character.cac.aug} {character.cac.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.cac.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "cac")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "cac")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="discretion">
                        Discrétion
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.discretion.editable}
                        on:change={(event) => updateCharacteristic(character, "discretion", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="discretion" 
                    value={isMaster ? character[character.discretion.charac].init + character[character.discretion.charac].aug : character[character.discretion.charac].init + character[character.discretion.charac].aug + character.discretion.aug} />
                    {#if isMaster || character.discretion.editable}
                    <p class="italic font-semibold text-sm">{character.discretion.aug} {character.discretion.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.discretion.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "discretion")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "discretion")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="divertissement">
                        Divertissement
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.divertissement.editable}
                        on:change={(event) => updateCharacteristic(character, "divertissement", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="divertissement" 
                    value={isMaster ? character[character.divertissement.charac].init + character[character.divertissement.charac].aug : character[character.divertissement.charac].init + character[character.divertissement.charac].aug + character.divertissement.aug} />
                    {#if isMaster || character.divertissement.editable}
                    <p class="italic font-semibold text-sm">{character.divertissement.aug} {character.divertissement.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.divertissement.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "divertissement")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "divertissement")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="empriseAnimaux">
                        Emprise animaux
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.empriseAnimaux.editable}
                        on:change={(event) => updateCharacteristic(character, "empriseAnimaux", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="empriseAnimaux" 
                    value={isMaster ? character[character.empriseAnimaux.charac].init + character[character.empriseAnimaux.charac].aug : character[character.empriseAnimaux.charac].init + character[character.empriseAnimaux.charac].aug + character.empriseAnimaux.aug} />
                    {#if isMaster || character.empriseAnimaux.editable}
                    <p class="italic font-semibold text-sm">{character.empriseAnimaux.aug} {character.empriseAnimaux.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.empriseAnimaux.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "empriseAnimaux")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "empriseAnimaux")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="escalade">
                        Escalade
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.escalade.editable}
                        on:change={(event) => updateCharacteristic(character, "escalade", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="escalade" 
                    value={isMaster ? character[character.escalade.charac].init + character[character.escalade.charac].aug : character[character.escalade.charac].init + character[character.escalade.charac].aug + character.escalade.aug} />
                    {#if isMaster || character.escalade.editable}
                    <p class="italic font-semibold text-sm">{character.escalade.aug} {character.escalade.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.escalade.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "escalade")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "escalade")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="esquive">
                        Esquive
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.esquive.editable}
                        on:change={(event) => updateCharacteristic(character, "esquive", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="esquive" 
                    value={isMaster ? character[character.esquive.charac].init + character[character.esquive.charac].aug : character[character.esquive.charac].init + character[character.esquive.charac].aug + character.esquive.aug} />
                    {#if isMaster || character.esquive.editable}
                    <p class="italic font-semibold text-sm">{character.esquive.aug} {character.esquive.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.esquive.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "esquive")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "esquive")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="intimidation">
                        Intimidation
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.intimidation.editable}
                        on:change={(event) => updateCharacteristic(character, "intimidation", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="intimidation" 
                    value={isMaster ? character[character.intimidation.charac].init + character[character.intimidation.charac].aug : character[character.intimidation.charac].init + character[character.intimidation.charac].aug + character.intimidation.aug} />
                    {#if isMaster || character.intimidation.editable}
                    <p class="italic font-semibold text-sm">{character.intimidation.aug} {character.intimidation.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.intimidation.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "intimidation")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "intimidation")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="intuition">
                        Intuition
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.intuition.editable}
                        on:change={(event) => updateCharacteristic(character, "intuition", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="intuition" 
                    value={isMaster ? character[character.intuition.charac].init + character[character.intuition.charac].aug : character[character.intuition.charac].init + character[character.intuition.charac].aug + character.intuition.aug} />
                    {#if isMaster || character.intuition.editable}
                    <p class="italic font-semibold text-sm">{character.intuition.aug} {character.intuition.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.intuition.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "intuition")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "intuition")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="marchandage">
                        Marchandage
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.marchandage.editable}
                        on:change={(event) => updateCharacteristic(character, "marchandage", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="marchandage" 
                    value={isMaster ? character[character.marchandage.charac].init + character[character.marchandage.charac].aug : character[character.marchandage.charac].init + character[character.marchandage.charac].aug + character.marchandage.aug} />
                    {#if isMaster || character.marchandage.editable}
                    <p class="italic font-semibold text-sm">{character.marchandage.aug} {character.marchandage.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.marchandage.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "marchandage")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "marchandage")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="navigation">
                        Navigation
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.navigation.editable}
                        on:change={(event) => updateCharacteristic(character, "navigation", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="navigation" 
                    value={isMaster ? character[character.navigation.charac].init + character[character.navigation.charac].aug : character[character.navigation.charac].init + character[character.navigation.charac].aug + character.navigation.aug} />
                    {#if isMaster || character.navigation.editable}
                    <p class="italic font-semibold text-sm">{character.navigation.aug} {character.navigation.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.navigation.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "navigation")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "navigation")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="pari">
                        Pari
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.pari.editable}
                        on:change={(event) => updateCharacteristic(character, "pari", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="pari" 
                    value={isMaster ? character[character.pari.charac].init + character[character.pari.charac].aug : character[character.pari.charac].init + character[character.pari.charac].aug + character.pari.aug} />
                    {#if isMaster || character.pari.editable}
                    <p class="italic font-semibold text-sm">{character.pari.aug} {character.pari.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.pari.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "pari")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "pari")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="perception">
                        Perception
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.perception.editable}
                        on:change={(event) => updateCharacteristic(character, "perception", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="perception" 
                    value={isMaster ? character[character.perception.charac].init + character[character.perception.charac].aug : character[character.perception.charac].init + character[character.perception.charac].aug + character.perception.aug} />
                    {#if isMaster || character.perception.editable}
                    <p class="italic font-semibold text-sm">{character.perception.aug} {character.perception.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.perception.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "perception")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "perception")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="ragot">
                        Ragot
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.ragot.editable}
                        on:change={(event) => updateCharacteristic(character, "ragot", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="ragot" 
                    value={isMaster ? character[character.ragot.charac].init + character[character.ragot.charac].aug : character[character.ragot.charac].init + character[character.ragot.charac].aug + character.ragot.aug} />
                    {#if isMaster || character.ragot.editable}
                    <p class="italic font-semibold text-sm">{character.ragot.aug} {character.ragot.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.ragot.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "ragot")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "ragot")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="ramer">
                        Ramer
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.ramer.editable}
                        on:change={(event) => updateCharacteristic(character, "ramer", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="ramer" 
                    value={isMaster ? character[character.ramer.charac].init + character[character.ramer.charac].aug : character[character.ramer.charac].init + character[character.ramer.charac].aug + character.ramer.aug} />
                    {#if isMaster || character.ramer.editable}
                    <p class="italic font-semibold text-sm">{character.ramer.aug} {character.ramer.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.ramer.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "ramer")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "ramer")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="resistance">
                        Résistance
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.resistance.editable}
                        on:change={(event) => updateCharacteristic(character, "resistance", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="resistance" 
                    value={isMaster ? character[character.resistance.charac].init + character[character.resistance.charac].aug : character[character.resistance.charac].init + character[character.resistance.charac].aug + character.resistance.aug} />
                    {#if isMaster || character.resistance.editable}
                    <p class="italic font-semibold text-sm">{character.resistance.aug} {character.resistance.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.resistance.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "resistance")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "resistance")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="resistanceAlcool">
                        Résistance à l'alcool
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.resistanceAlcool.editable}
                        on:change={(event) => updateCharacteristic(character, "resistanceAlcool", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="resistanceAlcool" 
                    value={isMaster ? character[character.resistanceAlcool.charac].init + character[character.resistanceAlcool.charac].aug : character[character.resistanceAlcool.charac].init + character[character.resistanceAlcool.charac].aug + character.resistanceAlcool.aug} />
                    {#if isMaster || character.resistanceAlcool.editable}
                    <p class="italic font-semibold text-sm">{character.resistanceAlcool.aug} {character.resistanceAlcool.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.resistanceAlcool.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "resistanceAlcool")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "resistanceAlcool")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="subornation">
                        Subornation
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.subornation.editable}
                        on:change={(event) => updateCharacteristic(character, "subornation", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="subornation" 
                    value={isMaster ? character[character.subornation.charac].init + character[character.subornation.charac].aug : character[character.subornation.charac].init + character[character.subornation.charac].aug + character.subornation.aug} />
                    {#if isMaster || character.subornation.editable}
                    <p class="italic font-semibold text-sm">{character.subornation.aug} {character.subornation.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.subornation.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "subornation")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "subornation")}>+</button>
                    </div>
                    {/if}
                </div>

                <div class="form-control items-center">
                    <label class="label flex justify-between w-3/4" for="survieExterieur">
                        Survie en extérieur
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.survieExterieur.editable}
                        on:change={(event) => updateCharacteristic(character, "survieExterieur", "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name="survieExterieur" 
                    value={isMaster ? character[character.survieExterieur.charac].init + character[character.survieExterieur.charac].aug : character[character.survieExterieur.charac].init + character[character.survieExterieur.charac].aug + character.survieExterieur.aug} />
                    {#if isMaster || character.survieExterieur.editable}
                    <p class="italic font-semibold text-sm">{character.survieExterieur.aug} {character.survieExterieur.aug > 1 ? "augmentations" : "augmentation"}</p>
                    {/if}
                    {#if (!isMaster || !character.isPlayable) && character.survieExterieur.editable}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, "survieExterieur")}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, "survieExterieur")}>+</button>
                    </div>
                    {/if}
                </div>

            </section>
        </section>
    </section>



    <!-- RICHESSES -->
    <section id="richesses" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Richesses</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="gold">Couronnes d'Or</label>
                    <input on:change={(event) => updateAttribute(character, "gold", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="gold" value={character.gold} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="silver">Pièces d'Argent</label>
                    <input on:change={(event) => updateAttribute(character, "silver", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster}  
                    type="number" name="silver" value={character.silver} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="copper">Sous de Cuivre</label>
                    <input  on:change={(event) => updateAttribute(character, "copper", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster}  
                    type="number" name="copper" value={character.copper} />
                </div>
            </section>
        </section>
    </section>

    <!-- BLESSURES -->
    <section id="blessures" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Blessures</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="blessuresMax">Max</label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled type="number" name="blessuresMax" value={calculateWoundsMax(character)} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="blessuresInfligees">Infligées</label>
                    <input on:change={(event) => updateAttribute(character, "blessuresInfligees", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster}  
                    type="number" name="blessuresInfligees" value={character.blessuresInfligees} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="blessuresRestantes">Restantes</label>
                    <input class="text-center text-2xl font-bold input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    class:disabled:text-success={calculateWoundsMax(character) - character.blessuresInfligees > calculateWoundsMax(character) / 2}
                    class:disabled:text-warning={calculateWoundsMax(character) - character.blessuresInfligees <= calculateWoundsMax(character) / 2 && calculateWoundsMax(character) - character.blessuresInfligees > calculateWoundsMax(character) * 0.2}
                    class:disabled:text-error={calculateWoundsMax(character) - character.blessuresInfligees <= calculateWoundsMax(character) * 0.2}
                    disabled type="number" name="blessuresRestantes" value={calculateWoundsMax(character) - character.blessuresInfligees} />
                </div>
            </section>
        </section>
    </section>

    <!-- AMBITIONS -->
    <section id="ambitions" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Ambitions</h2>
            <section class="">
                <div class="form-control">
                    <label class="label" for="ambitionCourt">Court terme</label>
                    <textarea on:change={(event) => updateAttribute(character, "ambitionCourt", event.target.value)} 
                    class="textarea textarea-bordered sm:text-lg h-60 disabled:text-base-content disabled:cursor-default" 
                    disabled={isMaster}  
                     name="ambitionCourt" value={character.ambitionCourt} />
                </div>

                <div class="form-control">
                    <label class="label" for="ambitionLong">Long terme</label>
                    <textarea on:change={(event) => updateAttribute(character, "ambitionLong", event.target.value)} 
                    class="textarea textarea-bordered sm:text-lg h-60 disabled:text-base-content disabled:cursor-default" 
                    disabled={isMaster}  
                     name="ambitionLong" value={character.ambitionLong} />
                </div>
            </section>
        </section>
    </section>

    <!-- GROUPE -->
    <section id="groupe" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Groupe</h2>
            <section class="flex flex-col gap-5">
                {#if !character.group}
                    {#if isMaster}
                        <p class="text-center text-lg italic" >Le joueur n'a pas encore rejoint de groupe.</p>
                    {:else}
                        <p class="text-center text-lg italic" >Vous n'avez pas encore rejoint de groupe.</p>
                    {/if}

                    {#if !isMaster}
                    <div class="flex justify-center gap-5 mt-5">
                        <a href={"/creategroup/?characId=" + character.id}>
                            <button class="btn btn-neutral">Créer un groupe</button>
                        </a>
                        <a href={"/findgroup/?gameId=" + character.game + "&characId=" + character.id}>
                            <button class="btn btn-neutral">Trouver un groupe</button>
                        </a>
                    </div>
                    {/if}
                {:else}
                    <div class="form-control">
                        <label class="label" for="groupName">Nom</label>
                        <input on:change={(event) => updateGroup(character.expand.group, "name", event.target.value)} 
                        class="text-center input input-bordered disabled:text-base-content disabled:cursor-default" 
                        disabled={isMaster}  
                        type="text" name="groupName" value={character.expand.group.name} />
                    </div>

                    <div class="form-control">
                        <p class="label">Membres</p>
                        <div class="flex flex-wrap">
                            {#each character.expand.group.characters as groupCharacId}
                                {#await getRecordFromId("characters", groupCharacId) then groupCharac}
                                    <input class="grow input input-bordered text-center disabled:text-base-content disabled:cursor-default" 
                                    type="text" value={groupCharac.name} disabled/>
                                {/await}
                            {/each}
                        </div>
                    </div>

                    <div class="form-control">
                        <label class="label" for="ambitionCourt">Ambition court terme</label>
                        <textarea on:change={(event) => updateGroup(character.expand.group, "ambitionCourt", event.target.value)} 
                            class="textarea textarea-bordered sm:text-lg h-60 disabled:text-base-content disabled:cursor-default" 
                            disabled={isMaster} 
                            name="ambitionCourt" value={character.expand.group.ambitionCourt} />
                    </div>

                    <div class="form-control">
                        <label class="label" for="ambitionLong">Ambition long terme</label>
                        <textarea on:change={(event) => updateGroup(character.expand.group, "ambitionLong", event.target.value)} 
                            class="textarea textarea-bordered sm:text-lg h-60 disabled:text-base-content disabled:cursor-default" 
                            disabled={isMaster}  
                            name="ambitionLong" value={character.expand.group.ambitionLong} />
                    </div>
                    
                {/if}
            </section>
        </section>
        {#if character.group && !isMaster}
        <form class="card-actions justify-center" method="POST" action="?/leaveGroup">
            <input type="hidden" name="characId" value={character.id} />
            <input type="hidden" name="groupId" value={character.group} />
            <button class="btn btn-warning">Quitter le groupe</button>
        </form>
        {/if}
    </section>

    <!-- Notes -->
    {#if !isMaster}
    <section id="notes" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title">Notes</h2>
                <input type="checkbox" class="toggle toggle-info justify-self-end" bind:checked={editNotes} />
            </div>
            <section class="" style:display={editNotes ? "block" : "none"}>
                <div class="form-control">
                    <textarea on:change={(event) => updateAttribute(character, "notes", event.target.value)} 
                    class="textarea textarea-bordered sm:text-lg h-96 disabled:text-base-content disabled:cursor-default" 
                    disabled={isMaster}  
                     name="notes" value={character.notes} />
                </div>
            </section>
        </section>
    </section>
    {/if}













    <!-- If master, expel player and delete character buttons + modal for deleting confirmation -->
    {#if isMaster}

        <!-- Master delete character or expel player -->
        <section class="flex gap-3 mt-10">
            {#if character.user}
                <form class="flex-1" method="POST" action="?/leaveCharac">
                    <input type="hidden" name="characId" value={character.id} />
                    <input type="hidden" name="gameId" value={character.game} />
                    <input type="hidden" name="userId" value={character.user} />
                    <button class="btn btn-warning">Expulser le joueur</button>
                </form>
            {/if}

            <button class="btn btn-error flex-1" onclick="deleteCharacModal.showModal()">Supprimer le personnage</button>
        </section>
        
        <!-- Delete character modal -->
        <dialog id="deleteCharacModal" class="modal modal-bottom sm:modal-middle" >
            <form class="modal-box form-control bg-base-200" method="POST" action="?/deleteCharac">
                <input type="hidden" name="characId" value={character.id} />
                <input type="hidden" name="userId" value={character.user} />
                <input type="hidden" name="gameId" value={character.game} />

                <p class="text-xl">Voulez-vous vraiment supprimer ce personnage?</p>

                <section class="modal-action">
                    <button class="btn btn-neutral" type="button" onclick="deleteCharacModal.close()">Fermer</button>
                    <button class="btn btn-error" type="submit" onclick="deleteCharacModal.close()">Supprimer le personnage</button>
                </section>
            </form>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    
        <!-- If not master, leave character button -->
    {:else}
        <form method="POST" action="?/leaveCharac">
            <input type="hidden" name="characId" value={character.id} />
            <input type="hidden" name="gameId" value={character.game} />
            <input type="hidden" name="userId" value={character.user} />
            <button class="btn btn-warning" >Rendre le personnage</button>
        </form>

    {/if}

        

    
    <!-- Form message modal -->
    {#if form && form.message}
        <dialog id="characFormModal" class="modal modal-bottom sm:modal-middle" bind:this={characFormModal}>
            <section class="modal-box bg-base-200">
                <p class="text-xl">{form.message}</p>
                <div class="modal-action">
                    <button class="btn btn-neutral" onlick="characFormModal.close()">Fermer</button>
                </div>
            </section>
        </dialog>
    {/if}

{/if}
</section>