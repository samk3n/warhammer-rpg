<script>
    import {PUBLIC_DB_ADDRESS} from "$env/static/public";
    import {getRecordFromId, increaseCharacteristic, decreaseCharacteristic, updateAttribute, updateCharacteristic, increaseSkill, 
        decreaseSkill, calculateWoundsMax, updateGroup, addObjectToCharac, updateCharacObjectCount, deleteObjectFromCharac,
        updateCharacTalentCount, deleteTalentFromCharac, addTalentToCharac, addSpellToCharac, deleteSpellFromCharac, addMeleeWeaponToCharac,
        deleteMeleeWeaponFromCharac, addRangeWeaponToCharac, deleteRangeWeaponFromCharac, updateCharacterPlayable, compareObjectsString,
        isCharacCorrupted, getEncombrement, getEncombrementMax, getCharacteristicInit, getCharacteristicFull,
        getSkillFull, getCharacteristicAug, getBaseSkillAug, updateBaseSkill} from "$lib/utils.js"
    import { onDestroy, onMount } from "svelte";
    import PocketBase from 'pocketbase';
    import gold from '$lib/assets/images/gold.webp';
    import silver from '$lib/assets/images/silver.webp';
    import copper from '$lib/assets/images/copper.webp';

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
        ["groupe", "Groupe"],
        ["exchange", "Échange"],
        ["possessions", "Possessions"],
        ["talents", "Talents"],
        ["sorts", "Sorts"],
        ["meleeWeapons", "Armes de mêlée"],
        ["rangeWeapons", "Armes à distance"],
        ["corruption", "Corruption"],
        ["encombrement", "Encombrement"],]
    );

    let character = data.character;
    let objects = data.objects;
    let talents = data.talents;
    let spells = data.spells;
    let meleeWeapons = data.meleeWeapons;
    let rangeWeapons = data.rangeWeapons;
    const isMaster = data.isMaster;

    $: characteristicsMap = new Map(Object.entries(character.characteristics).sort((a, b) => a[1].order - b[1].order));
    $: baseSkillsMap = new Map(Object.entries(character.baseSkills));

    const characNameMap = new Map([
        ["capCombat", "CC"],
        ["capTir", "CT"],
        ["force", "F"],
        ["endurance", "E"],
        ["initiative", "I"],
        ["agilite", "Ag"],
        ["dexterite", "Dex"],
        ["intelligence", "Int"],
        ["forceMentale", "FM"],
        ["sociabilite", "Soc"],
    ]);

    const baseSkillsNameMap = new Map([
        ["art", "Art"],
        ["athletisme", "Athlétisme"],
        ["calme", "Calme"],
        ["charme", "Charme"],
        ["chevaucher", "Chevaucher"],
        ["commandement", "Commandement"],
        ["conduiteAttelage", "Conduite d'attelage"],
        ["cac", "C. à C."],
        ["discretion", "Discrétion"],
        ["divertissement", "Divertissement"],
        ["empriseAnimaux", "Emprise sur les animaux"],
        ["escalade", "Escalade"],
        ["esquive", "Esquive"],
        ["intimidation", "Intimidation"],
        ["intuition", "Intuition"],
        ["marchandage", "Marchandage"],
        ["navigation", "Navigation"],
        ["pari", "Pari"],
        ["perception", "Perception"],
        ["ragot", "Ragôt"],
        ["ramer", "Ramer"],
        ["resistance", "Résistance"],
        ["resistanceAlcool", "Résistance à l'alcool"],
        ["subornation", "Subornation"],
        ["survieExterieur", "Survie en extérieur"],
    ]);

    let pb;

    let editCharac = false;
    let editSkill = false;
    let editNotes = false;
    let editMasterNotes = false;
    let editEchange = false;

    let addObjectModal;
    let addTalentModal;
    let addSpellModal;
    let addMeleeWeaponModal;
    let addRangeWeaponModal;

    let characFormModal;
    $: if(form && form.message){
        characFormModal.showModal();
    }

    onMount(async () => {
        pb = new PocketBase(PUBLIC_DB_ADDRESS);
        pb.authStore?.loadFromCookie(document.cookie || '');
        
        pb.collection("characters").subscribe(character.id, (e) => {
            if("update" == e.action) {
                character = e.record;
            }
        }, {expand: "user,group,game,possessions,talents,spells,meleeWeapons,rangeWeapons"});

        if(character.group) {
            pb.collection("groups").subscribe(character.group, (e) => {
                if("update" == e.action) {
                    character.expand.group = e.record;
                }
            });
        }

        pb.collection("objects").subscribe("*", (e) => {
            if("create" == e.action){
                objects = [...objects, e.record];
            }
            else if("update" == e.action) {
                if(character.expand.possessions){
                    character.expand.possessions = character.expand.possessions.map((obj) => obj.id == e.record.id ? e.record : obj);
                }
                objects = objects.map((obj) => obj.id == e.record.id ? e.record : obj);
            }
            else if("delete" == e.action){
                if(character.expand.possession){
                    character.expand.possessions = character.expand.possessions.filter((obj) => obj.id != e.record.id);
                }
                objects = objects.filter((obj) => obj.id != e.record.id);
            }
        });

        pb.collection("talents").subscribe("*", (e) => {
            if("create" == e.action){
                talents = [...talents, e.record];
            }
            else if("update" == e.action) {
                if(character.expand.talents){
                    character.expand.talents = character.expand.talents.map((tal) => tal.id == e.record.id ? e.record : tal);
                }
                talents = talents.map((tal) => tal.id == e.record.id ? e.record : tal);
            }
            else if("delete" == e.action){
                if(character.expand.talents){
                    character.expand.talents = character.expand.talents.filter((tal) => tal.id != e.record.id);
                }
                talents = talents.filter((tal) => tal.id != e.record.id);
            }
        });

        pb.collection("spells").subscribe("*", (e) => {
            if("create" == e.action){
                spells = [...spells, e.record];
            }
            else if("update" == e.action) {
                if(character.expand.spells){
                    character.expand.spells = character.expand.spells.map((spell) => spell.id == e.record.id ? e.record : spell);
                }
                spells = spells.map((spell) => spell.id == e.record.id ? e.record : spell);
            }
            else if("delete" == e.action){
                if(character.expand.spells){
                    character.expand.spells = character.expand.spells.filter((spell) => spell.id != e.record.id);
                }
                spells = spells.filter((spell) => spell.id != e.record.id);
            }
        });

        pb.collection("meleeWeapons").subscribe("*", (e) => {
            if("create" == e.action){
                meleeWeapons = [...meleeWeapons, e.record];
            }
            else if("update" == e.action) {
                if(character.expand.meleeWeapons){
                    character.expand.meleeWeapons = character.expand.meleeWeapons.map((mw) => mw.id == e.record.id ? e.record : mw);
                }
                meleeWeapons = meleeWeapons.map((mw) => mw.id == e.record.id ? e.record : mw);
            }
            else if("delete" == e.action){
                if(character.expand.meleeWeapons){
                    character.expand.meleeWeapons = character.expand.meleeWeapons.filter((mw) => mw.id != e.record.id);
                }
                meleeWeapons = meleeWeapons.filter((mw) => mw.id != e.record.id);
            }
        });

        pb.collection("rangeWeapons").subscribe("*", (e) => {
            if("create" == e.action){
                rangeWeapons = [...rangeWeapons, e.record];
            }
            else if("update" == e.action) {
                if(character.expand.rangeWeapons){
                    character.expand.rangeWeapons = character.expand.rangeWeapons.map((rw) => rw.id == e.record.id ? e.record : rw);
                }
                rangeWeapons = rangeWeapons.map((rw) => rw.id == e.record.id ? e.record : rw);
            }
            else if("delete" == e.action){
                if(character.expand.rangeWeapons){
                    character.expand.rangeWeapons = character.expand.rangeWeapons.filter((rw) => rw.id != e.record.id);
                }
                rangeWeapons = rangeWeapons.filter((rw) => rw.id != e.record.id);
            }
        });
        
    });

    onDestroy(() => {
        if(pb) {
            pb.collection("characters").unsubscribe();
            pb.collection("groups").unsubscribe();
            pb.collection("objects").unsubscribe();
            pb.collection("talents").unsubscribe();
            pb.collection("spells").unsubscribe();
            pb.collection("meleeWeapons").unsubscribe();
            pb.collection("rangeWeapons").unsubscribe();
        }
    });

</script>

<section class="flex flex-col gap-7 items-center w-11/12 sm:w-4/5 lg:w-4/6 xl:w-3/6">

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
    <nav class="flex flex-wrap items-center gap-3 w-full mt-5">
        {#each sections as [id, name]}
        <a href={"#"+id} class="">
            <button class="btn btn-neutral">{name}</button>
        </a>
        {/each}
        <a href={isMaster ? "#masterNotes" : "#notes"} class="flex-grow">
            <button class="btn btn-neutral">Notes</button>
        </a>
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
                    <input on:change={(event) => updateAttribute(character, "motivation", event.target.value)} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="text" name="motivation" value={character.motivation} />
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

            <section class="grid gap-5 grid-cols-2">
                {#each characteristicsMap as [characName, object]}
                <div class="form-control items-center">
                    <label class="label flex flex-col items-start sm:flex-row sm:justify-between text-sm xs:text-base w-3/4" for={characName}>
                        {characNameMap.get(characName)}
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" disabled={!editCharac}  bind:checked={character.characteristics[characName].editable}
                        on:change={(event) => updateCharacteristic(character, characName, "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input on:change={(event) => updateCharacteristic(character, characName, "init", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster || !editCharac} 
                    type="number" name={characName} value={isMaster ? getCharacteristicInit(character, characName) : getCharacteristicFull(character, characName)} />
                    {#if isMaster || character[characName].editable}
                    <p class="italic font-semibold text-sm hidden xs:block">{getCharacteristicAug(character, characName)} {getCharacteristicAug(character, characName) > 1 ? "augmentations" : "augmentation"}</p>
                    <p class="italic font-semibold text-sm block xs:hidden">{getCharacteristicAug(character, characName)} aug.</p>
                    {/if}
                    {#if character.characteristics[characName].editable && editCharac}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseCharacteristic(character, characName, isMaster)}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseCharacteristic(character, characName, isMaster)}>+</button>
                    </div>
                    {/if}
                </div>
                {/each}
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
            
            <section class="grid gap-5 grid-cols-2">
                {#each baseSkillsMap as [skillName, object]}
                <div class="form-control items-center">
                    <label class="label flex flex-col items-start sm:flex-row sm:justify-between text-sm xs:text-base w-3/4" for={skillName}>
                        {baseSkillsNameMap.get(skillName)}
                        {#if isMaster}
                        <input type="checkbox" class="checkbox checkbox-neutral" disabled={!editSkill} bind:checked={character.baseSkills[skillName].editable}
                        on:change={(event) => updateBaseSkill(character, skillName, "editable", event.target.checked)} />
                        {/if}
                    </label>
                    <input class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled
                    type="number" name={skillName} 
                    value={isMaster ? getCharacteristicFull(character, character[skillName].charac) : getSkillFull(character, skillName)} />
                    {#if isMaster || character[skillName].editable}
                    <p class="italic font-semibold text-sm hidden xs:block">{getBaseSkillAug(character, skillName)} {getBaseSkillAug(character, skillName) > 1 ? "augmentations" : "augmentation"}</p>
                    <p class="italic font-semibold text-sm block xs:hidden">{getBaseSkillAug(character, skillName)} aug.</p>
                    {/if}
                    {#if character.baseSkills[skillName].editable && editSkill}
                    <div class="w-1/3 flex justify-center">
                        <button class="btn btn-error text-2xl flex-1" on:click={() => decreaseSkill(character, skillName, isMaster)}>-</button>
                        <button class="btn btn-success text-2xl flex-1" on:click={() => increaseSkill(character, skillName, isMaster)}>+</button>
                    </div>
                    {/if}
                </div>
                {/each}
            </section>
        </section>
    </section>


    <!-- RICHESSES -->
    <section id="richesses" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Richesses</h2>
            <section class="grid gap-5 grid-cols-1 xs:grid-cols-3">
                <div class="form-control items-center">
                    <label class="label" for="gold"><img src={gold} alt="Courrone d'or" class="w-14 h-14" /></label>
                    <input on:change={(event) => updateAttribute(character, "gold", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster} 
                    type="number" name="gold" value={character.gold} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="silver"><img src={silver} alt="Pistole d'argent" class="w-14 h-14" /></label>
                    <input on:change={(event) => updateAttribute(character, "silver", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster}  
                    type="number" name="silver" value={character.silver} />
                </div>

                <div class="form-control items-center">
                    <label class="label" for="copper"><img src={copper} alt="Sou de cuivre" class="w-14 h-14" /></label>
                    <input  on:change={(event) => updateAttribute(character, "copper", parseInt(event.target.value))} 
                    class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster}  
                    type="number" name="copper" value={character.copper} />
                </div>
            </section>
            <section class=" flex justify-center mt-5">
                <section class="bg-base-100 flex flex-col gap-3 items-center p-5 rounded-md">
                    <div class="flex flex-col items-start 2xs:flex-row">
                        <div class="text-center text-sm 2xs:text-base">
                            &nbsp;&nbsp;&nbsp;&nbsp;1 <img src={gold} alt="Courrone d'or" class="w-7 h-7 inline" />
                        </div>
                        <div class="text-center text-sm 2xs:text-base">
                            =   20 <img src={silver} alt="Pistole d'argent" class="w-7 h-7 inline" />
                        </div>
                        <div class="text-center text-sm 2xs:text-base">
                            =   240 <img src={copper} alt="Sou de cuivre" class="w-7 h-7 inline" />
                        </div>
                    </div>
                    <div class="divider"></div>
                    <p class="text-center text-sm 2xs:text-base" >1 <img src={silver} alt="Pistole d'argent" class="w-7 h-7 inline" />   =   12 <img src={copper} alt="Sou de cuivre" class="w-7 h-7 inline" /></p>
                </section>
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
                        <div class="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-3">
                            {#each character.expand.group.characters as groupCharacId}
                                {#await getRecordFromId("characters", groupCharacId) then groupCharac}
                                    <input class="input input-bordered w-full text-center disabled:text-base-content disabled:cursor-default" 
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

    <!-- ECHANGE -->
    <section id="exchange" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title text-center">Échange MJ-Joueur</h2>
                <input type="checkbox" class="toggle toggle-info justify-self-end" bind:checked={editEchange} />
            </div>
            <section class="" style:display={editEchange ? "block" : "none"}>
                <div class="form-control">
                    <textarea on:change={(event) => updateAttribute(character, "exchange", event.target.value)} 
                    class="textarea textarea-bordered sm:text-lg h-96 disabled:text-base-content disabled:cursor-default"  
                    name="notes" value={character.exchange} />
                </div>
            </section>
        </section>
    </section>

    <!-- POSSESSIONS -->
    <section id="possessions" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title">Possessions</h2>
            </div>
            {#if isMaster}
            <div class="card-actions justify-center mb-5">
                <button class="btn btn-neutral w-32 xs:w-48" on:click={() => addObjectModal.show()} >Ajouter des possessions</button>
            </div>
            {/if}
            {#if character.possessions.length == 0}
                <p class="text-lg italic text-center">Aucune possession</p>
            {:else}
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th class="w-2/3">Nom</th>
                            <th class="hidden xs:table-cell" >Enc.</th>
                            <th>Nbre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each character.expand.possessions as possession}
                        <tr>
                            <td class="text-xs 2xs:text-sm xs:text-base">
                                {#if isMaster}
                                <button class="btn btn-ghost btn-circle text-error btn-sm"
                                on:click={() => {
                                    // Deleting object from character's objects list
                                    deleteObjectFromCharac(character, possession.id);
                                    // Adding the deleted objects to the list of available objects
                                    // in the add object modal, sorted alphabetically.
                                    objects = [...objects, possession].sort((a, b) => compareObjectsString(a.name, b.name));
                                }}>X</button>
                                {/if}
                                {possession.name}
                            </td>
                            <td data-tip="sdhbqqhsdbgh" class="tooltip text-xs 2xs:text-sm xs:text-base hidden xs:table-cell">{possession.encombrement}</td>
                            <td>
                                <input on:change={(event) => updateCharacObjectCount(character, possession.id, event.target.value)}
                                class="text-xs 2xs:text-sm xs:text-base input input-bordered w-10 xs:w-16 text-center disabled:text-base-content disabled:cursor-default" 
                                disabled={!isMaster}
                                type="number" value={character.nbPossessions[possession.id].count} min="1"/>
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </section>

        <dialog id="addObjectModal" class="modal modal-bottom sm:modal-middle" bind:this={addObjectModal} >
            <section class="modal-box form-control bg-base-300">
                {#if objects.length == 0}
                <p class="text-lg text-center mb-5">Aucun objet disponible</p>
                <section class="card-actions justify-center">
                    <button class="btn btn-neutral"
                    on:click={() => addObjectModal.close()}>Fermer</button>
                </section>
                {:else}
                <table class="card-body table table-zebra">
                    <thead>
                        <tr>
                            <th class="w-2/3">Nom</th>
                            <th>Enc.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each objects as object}
                            <tr>
                                <td class="text-xs 2xs:text-sm xs:text-base">{object.name}</td>
                                <td class="text-xs 2xs:text-sm xs:text-base">{object.encombrement}</td>
                                <td><button class="btn btn-success btn-sm xs:btn-md" 
                                on:click={() => {
                                    // Adding the object to the character objects list
                                    addObjectToCharac(character, object.id);
                                    // Removing the object that was just added to character
                                    // So it doesn't appear in the modal
                                    // Because you can only add an object once.
                                    objects = objects.filter((obj) => obj.id !== object.id);
                                } }>+</button></td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {/if}
            </section>
            <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
                <button>Close</button>
            </form>
        </dialog>
    </section>

    <!-- TALENTS -->
    <section id="talents" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title">Talents</h2>
            </div>
            {#if isMaster}
            <div class="card-actions justify-center mb-5">
                <button class="btn btn-neutral w-32 xs:w-48" on:click={() => addTalentModal.show()} >Ajouter des talents</button>
            </div>
            {/if}
            {#if character.talents.length == 0}
                <p class="text-lg italic text-center">Aucun talent</p>
            {:else}
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Nbre</th>
                            <th class="hidden sm:table-cell">Desc.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each character.expand.talents as talent}
                        <tr>
                            <td class="text-xs 2xs:text-sm xs:text-base">
                                {#if isMaster}
                                <button class="btn btn-ghost btn-circle text-error btn-sm"
                                on:click={() => {
                                    // Deleting talent from character's talents list
                                    deleteTalentFromCharac(character, talent.id);
                                    // Adding the deleted talent to the list of available talents
                                    // in the add talent modal, sorted alphabetically.
                                    talents = [...talents, talent].sort((a, b) => compareObjectsString(a.name, b.name));
                                }}>X</button>
                                {/if}
                                {talent.name}</td>
                            <td>
                                <input on:change={(event) => updateCharacTalentCount(character, talent.id, event.target.value)}
                                class="text-xs 2xs:text-sm xs:text-base input input-bordered w-10 xs:w-16 text-center disabled:text-base-content disabled:cursor-default" 
                                disabled={!isMaster}
                                type="number" value={character.nbTalents[talent.id].count} min="1"/>
                            </td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden sm:table-cell">{talent.description}</td>
                            
                        </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </section>

        <dialog id="addTalentModal" class="modal modal-bottom sm:modal-middle" bind:this={addTalentModal} >
            <section class="modal-box form-control bg-base-300">
                {#if talents.length == 0}
                <p class="text-lg text-center mb-5">Aucun talent disponible</p>
                {:else}
                <table class="card-body table table-zebra">
                    <thead>
                        <tr>
                            <th class="w-full">Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each talents as talent}
                            <tr>
                                <td class="text-xs 2xs:text-sm xs:text-base">{talent.name}</td>
                                <td><button class="btn btn-success btn-sm xs:btn-md" 
                                on:click={() => {
                                    // Adding the talent to the character talents list
                                    addTalentToCharac(character, talent.id);
                                    // Removing the talent that was just added to character
                                    // So it doesn't appear in the modal
                                    // Because you can only add an talent once.
                                    talents = talents.filter((tal) => tal.id !== talent.id);
                                } }>+</button></td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {/if}
                <section class="card-actions justify-center mt-5">
                    <button class="btn btn-neutral"
                    on:click={() => addTalentModal.close()}>Fermer</button>
                </section>
            </section>
            <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
                <button>Close</button>
            </form>
        </dialog>
    </section>

    <!-- SORTS -->
    <section id="sorts" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title">Sorts</h2>
            </div>
            {#if isMaster}
            <div class="card-actions justify-center mb-5">
                <button class="btn btn-neutral w-32 xs:w-48" on:click={() => addSpellModal.show()} >Ajouter des sorts</button>
            </div>
            {/if}
            {#if character.spells.length == 0}
                <p class="text-lg italic text-center">Aucun sort</p>
            {:else}
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>NI</th>
                            <th class="hidden xs:table-cell">Portée</th>
                            <th class="hidden xs:table-cell">Cible</th>
                            <th class="hidden sm:table-cell">Durée</th>
                            <th class="hidden md:table-cell">Effets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each character.expand.spells as spell}
                        <tr>
                            <td class="text-xs 2xs:text-sm xs:text-base">
                                {#if isMaster}
                                <button class="btn btn-ghost btn-circle text-error btn-sm"
                                on:click={() => {
                                    // Deleting spell from character's spells list
                                    deleteSpellFromCharac(character, spell.id);
                                    // Adding the deleted spell to the list of available spells
                                    // in the add spell modal, sorted alphabetically.
                                    spells = [...spells, spell].sort((a, b) => compareObjectsString(a.name, b.name));
                                }}>X</button>
                                {/if}
                                {spell.name}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base">{spell.ni}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden xs:table-cell">{spell.portee}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden xs:table-cell">{spell.cible}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden sm:table-cell">{spell.duree}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden md:table-cell">{spell.effets}</td>
                            
                        </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </section>

        <dialog id="addSpellModal" class="modal modal-bottom sm:modal-middle" bind:this={addSpellModal} >
            <section class="modal-box form-control bg-base-300">
                {#if spells.length == 0}
                <p class="text-lg text-center mb-5">Aucun sort disponible</p>
                {:else}
                <table class="card-body table table-zebra">
                    <thead>
                        <tr>
                            <th class="w-full">Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each spells as spell}
                            <tr>
                                <td class="text-xs 2xs:text-sm xs:text-base">{spell.name}</td>
                                <td><button class="btn btn-success btn-sm xs:btn-md" 
                                on:click={() => {
                                    // Adding the spell to the character spells list
                                    addSpellToCharac(character, spell.id);
                                    // Removing the spell that was just added to character
                                    // So it doesn't appear in the modal
                                    // Because you can only add an spell once.
                                    spells = spells.filter((spe) => spe.id !== spell.id);
                                } }>+</button></td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {/if}
                <section class="card-actions justify-center mt-5">
                    <button class="btn btn-neutral"
                    on:click={() => addSpellModal.close()}>Fermer</button>
                </section>
            </section>
            <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
                <button>Close</button>
            </form>
        </dialog>
    </section>

    <!-- MELEE WEAPONS -->
    <section id="meleeWeapons" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title">Armes de mêlée</h2>
            </div>
            {#if isMaster}
            <div class="card-actions justify-center mb-5">
                <button class="btn btn-neutral w-32 xs:w-48" on:click={() => addMeleeWeaponModal.show()} >Ajouter des armes de mêlée</button>
            </div>
            {/if}
            {#if character.meleeWeapons.length == 0}
                <p class="text-lg italic text-center">Aucune arme de mêlée</p>
            {:else}
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th class="hidden sm:table-cell">Groupe</th>
                            <th class="hidden sm:table-cell">Enc.</th>
                            <th>Dégâts</th>
                            <th class="hidden sm:table-cell">Propriétés</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each character.expand.meleeWeapons as mw}
                        <tr>
                            <td class="text-xs 2xs:text-sm xs:text-base">
                                {#if isMaster}
                                <button class="btn btn-ghost btn-circle text-error btn-sm"
                                on:click={() => {
                                    // Deleting melee weapon from character's melee weapons list
                                    deleteMeleeWeaponFromCharac(character, mw.id);
                                    // Adding the deleted melee weapon to the list of available melee weapons
                                    // in the add melee weapon modal, sorted alphabetically.
                                    meleeWeapons = [...meleeWeapons, mw].sort((a, b) => compareObjectsString(a.name, b.name));
                                }}>X</button>
                                {/if}
                                {mw.name}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden sm:table-cell">{mw.groupe}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden sm:table-cell">{mw.encombrement}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base">{mw.degats}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden sm:table-cell">{mw.proprietes}</td>
                            
                        </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </section>

        <dialog id="addMeleeWeaponModal" class="modal modal-bottom sm:modal-middle" bind:this={addMeleeWeaponModal} >
            <section class="modal-box form-control bg-base-300">
                {#if meleeWeapons.length == 0}
                <p class="text-lg text-center mb-5">Aucune arme de mêlée disponible</p>
                {:else}
                <table class="card-body table table-zebra">
                    <thead>
                        <tr>
                            <th class="w-full">Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each meleeWeapons as mw}
                            <tr>
                                <td class="text-xs 2xs:text-sm xs:text-base">{mw.name}</td>
                                <td><button class="btn btn-success btn-sm xs:btn-md" 
                                on:click={() => {
                                    // Adding the melee weapon to the character melee weapons list
                                    addMeleeWeaponToCharac(character, mw.id);
                                    // Removing the melee weapon that was just added to character
                                    // So it doesn't appear in the modal
                                    // Because you can only add a melee weapon once.
                                    meleeWeapons = meleeWeapons.filter((meleeWeapon) => meleeWeapon.id !== mw.id);
                                } }>+</button></td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {/if}
                <section class="card-actions justify-center mt-5">
                    <button class="btn btn-neutral"
                    on:click={() => addMeleeWeaponModal.close()}>Fermer</button>
                </section>
            </section>
            <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
                <button>Close</button>
            </form>
        </dialog>
    </section>

    <!-- RANGE WEAPONS -->
    <section id="rangeWeapons" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title text-center">Armes à distance</h2>
            </div>
            {#if isMaster}
            <div class="card-actions justify-center mb-5">
                <button class="btn btn-neutral w-32 xs:w-48" on:click={() => addRangeWeaponModal.show()} >Ajouter des armes à distance</button>
            </div>
            {/if}
            {#if character.rangeWeapons.length == 0}
                <p class="text-lg italic text-center">Aucune arme à distance</p>
            {:else}
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th class="hidden md:table-cell">Groupe</th>
                            <th class="hidden sm:table-cell">Enc.</th>
                            <th>Portée</th>
                            <th class="hidden sm:table-cell">Dégâts</th>
                            <th class="hidden sm:table-cell">Propriétés</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each character.expand.rangeWeapons as rw}
                        <tr>
                            <td class="text-xs 2xs:text-sm xs:text-base">
                                {#if isMaster}
                                <button class="btn btn-ghost btn-circle text-error btn-sm"
                                on:click={() => {
                                    // Deleting range weapon from character's range weapons list
                                    deleteRangeWeaponFromCharac(character, rw.id);
                                    // Adding the deleted range weapon to the list of available range weapons
                                    // in the add range weapon modal, sorted alphabetically.
                                    rangeWeapons = [...rangeWeapons, rw].sort((a, b) => compareObjectsString(a.name, b.name));
                                }}>X</button>
                                {/if}
                                {rw.name}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden md:table-cell">{rw.groupe}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden sm:table-cell">{rw.encombrement}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base">{rw.portee}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden sm:table-cell">{rw.degats}</td>
                            <td class="text-xs 2xs:text-sm xs:text-base hidden sm:table-cell">{rw.proprietes}</td>
                            
                        </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </section>

        <dialog id="addRangeWeaponModal" class="modal modal-bottom sm:modal-middle" bind:this={addRangeWeaponModal} >
            <section class="modal-box form-control bg-base-300">
                {#if rangeWeapons.length == 0}
                <p class="text-lg text-center mb-5">Aucune arme à distance disponible</p>
                {:else}
                <table class="card-body table table-zebra">
                    <thead>
                        <tr>
                            <th class="w-full">Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each rangeWeapons as rw}
                            <tr>
                                <td class="text-xs 2xs:text-sm xs:text-base">{rw.name}</td>
                                <td><button class="btn btn-success btn-sm xs:btn-md" 
                                on:click={() => {
                                    // Adding the range weapon to the character range weapons list
                                    addRangeWeaponToCharac(character, rw.id);
                                    // Removing the range weapon that was just added to character
                                    // So it doesn't appear in the modal
                                    // Because you can only add a range weapon once.
                                    rangeWeapons = rangeWeapons.filter((rangeWeapon) => rangeWeapon.id !== rw.id);
                                } }>+</button></td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
                {/if}
                <section class="card-actions justify-center mt-5">
                    <button class="btn btn-neutral"
                    on:click={() => addRangeWeaponModal.close()}>Fermer</button>
                </section>
            </section>
            <form method="dialog" class="modal-backdrop bg-neutral bg-opacity-40">
                <button>Close</button>
            </form>
        </dialog>
    </section>

     <!-- CORRUPTION -->
    <section id="corruption" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title">Corruption et mutations</h2>

            <section>
                <div class="form-control">
                    <label class="label" for="corruption">Corruption</label>
                    <input type="number" class="input input-bordered disabled:cursor-default disabled:text-base-content" 
                    class:input-error={isCharacCorrupted(character)}
                    class:text-error={isCharacCorrupted(character)}
                    min="0" value={character.corruption} disabled={!isMaster} 
                    on:change={(event) => updateAttribute(character, "corruption", event.target.value)} />
                </div>
                <div class="form-control">
                    <label for="mutations" class="label">Mutations</label>
                    <textarea on:change={(event) => updateAttribute(character, "mutations", event.target.value)} 
                    class="textarea textarea-bordered sm:text-lg h-96 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster}  
                     name="mutations" value={character.notes} />
                </div>
            </section>
        </section>
    </section>

    <!-- ENCOMBREMENT -->
    <section id="encombrement" class="card bg-base-300 w-full">
        <section class="card-body">
            <h2 class="card-title self-center mb-5">Encombrement</h2>

            <section class="grid gap-5 grid-cols-1 xs:grid-cols-2">
                <div class="form-control items-center">
                    <label class="label" for="encMax">Max.</label>
                    <input type="number" name="encMax" class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    value={getEncombrementMax(character)} disabled  />
                </div>
                <div class="form-control items-center">
                    <label class="label" for="encTotal">Total</label>
                    <input type="number" name="encTotal" class="text-center input input-bordered w-3/4 disabled:text-base-content disabled:cursor-default" 
                    value={getEncombrement(character)} disabled  />
                </div>
            </section>
        </section>
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
    {:else}
    <section id="masterNotes" class="card bg-base-300 w-full">
        <section class="card-body">
            <div class="flex justify-center items-center flex-wrap gap-5 mb-5">
                <h2 class="card-title">Notes</h2>
                <input type="checkbox" class="toggle toggle-info justify-self-end" bind:checked={editMasterNotes} />
            </div>
            <section style:display={editMasterNotes ? "block" : "none"}>
                <div class="form-control">
                    <textarea on:change={(event) => updateAttribute(character, "masterNotes", event.target.value)} 
                    class="textarea textarea-bordered sm:text-lg h-96 disabled:text-base-content disabled:cursor-default" 
                    disabled={!isMaster}  
                     name="notes" value={character.masterNotes} />
                </div>
            </section>
        </section>
    </section>
    {/if}










    <!-- If master, expel player and delete character buttons + modal for deleting confirmation -->
    {#if isMaster}
        <section class="flex items-center gap-5 mt-10">
            <label class="text-lg" for="isPlayable">Jouable</label>
            <input type="checkbox" class="checkbox" name="isPlayable" bind:checked={character.isPlayable}
            on:change={(event) => updateCharacterPlayable(character, event.target.checked)} />
        </section>

        <!-- Master delete character or expel player -->
        <section class="flex gap-3 mt-5">
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