<script>
    import {enhance} from "$app/forms";
    import {characNameMap, baseSkillsNameMap, advancedSkillsNameMap} from "$lib/utils.js";

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

    let baseSkillsSpeText = new Map();
    let advancedSkillsSpeText = new Map();

    $: characteristics = form?.data?.characteristics ??{
        "agilite": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 5
        },
        "capCombat": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 0
        },
        "capTir": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 1
        },
        "dexterite": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 6
        },
        "endurance": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 3
        },
        "force": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 2
        },
        "forceMentale": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 8
        },
        "initiative": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 4
        },
        "intelligence": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 7
        },
        "sociabilite": {
            "aug": 0,
            "editable": false,
            "init": 0,
            "order": 9
        }
    };
    $: characteristicsMap = new Map(Object.entries(characteristics).sort((a, b) => a[1].order - b[1].order));

    $: baseSkills = form?.data?.baseSkills ?? {
        "art": {
            "aug": 0,
            "charac": "dexterite",
            "editable": false,
            "grouped": true,
            "spe": []
        },
        "athletisme": {
            "aug": 0,
            "charac": "agilite",
            "editable": false
        },
        "cac": {
            "aug": 0,
            "charac": "capCombat",
            "editable": false,
            "grouped": true,
            "spe": ["Base"],
            "Base": {
                "aug": 0,
                "editable": false
            }
        },
        "calme": {
            "aug": 0,
            "charac": "forceMentale",
            "editable": false
        },
        "charme": {
            "aug": 0,
            "charac": "sociabilite",
            "editable": false
        },
        "chevaucher": {
            "aug": 0,
            "charac": "agilite",
            "editable": false,
            "grouped": true,
            "spe": []
        },
        "commandement": {
            "aug": 0,
            "charac": "sociabilite",
            "editable": false
        },
        "conduiteAttelage": {
            "aug": 0,
            "charac": "agilite",
            "editable": false
        },
        "discretion": {
            "aug": 0,
            "charac": "agilite",
            "editable": false,
            "grouped": true,
            "spe": []
        },
        "divertissement": {
            "aug": 0,
            "charac": "sociabilite",
            "editable": false,
            "grouped": true,
            "spe": []
        },
        "empriseAnimaux": {
            "aug": 0,
            "charac": "forceMentale",
            "editable": false
        },
        "escalade": {
            "aug": 0,
            "charac": "force",
            "editable": false
        },
        "esquive": {
            "aug": 0,
            "charac": "agilite",
            "editable": false
        },
        "intimidation": {
            "aug": 0,
            "charac": "force",
            "editable": false
        },
        "intuition": {
            "aug": 0,
            "charac": "initiative",
            "editable": false
        },
        "marchandage": {
            "aug": 0,
            "charac": "sociabilite",
            "editable": false
        },
        "navigation": {
            "aug": 0,
            "charac": "initiative",
            "editable": false
        },
        "pari": {
            "aug": 0,
            "charac": "intelligence",
            "editable": false
        },
        "perception": {
            "aug": 0,
            "charac": "initiative",
            "editable": false
        },
        "ragot": {
            "aug": 0,
            "charac": "sociabilite",
            "editable": false
        },
        "ramer": {
            "aug": 0,
            "charac": "force",
            "editable": false
        },
        "resistance": {
            "aug": 0,
            "charac": "endurance",
            "editable": false
        },
        "resistanceAlcool": {
            "aug": 0,
            "charac": "endurance",
            "editable": false
        },
        "subornation": {
            "aug": 0,
            "charac": "sociabilite",
            "editable": false
        },
        "survieExterieur": {
            "aug": 0,
            "charac": "intelligence",
            "editable": false
        }
    };
    $: baseSkillsMap = new Map(Object.entries(baseSkills));
    

    $: advancedSkillsProps = form?.data?.advancedSkillsProps ?? {
        "crochetage": {selected: false, grouped: false, charac: "dexterite"},
        "dressage": {selected: false, grouped: true, charac: "intelligence"},
        "escamotage": {selected: false, grouped: false, charac: "dexterite"},
        "evaluation": {selected: false, grouped: true, charac: "intelligence"},
        "focalisation": {selected: false, grouped: true, charac: "forceMentale"},
        "guerison": {selected: false, grouped: false, charac: "intelligence"},
        "langue": {selected: false, grouped: true, charac: "intelligence"},
        "metier": {selected: false, grouped: true, charac: "dexterite"},
        "musicien": {selected: false, grouped: true, charac: "dexterite"},
        "natation": {selected: false, grouped: false, charac: "force"},
        "piegeage": {selected: false, grouped: false, charac: "dexterite"},
        "pistage": {selected: false, grouped: false, charac: "initiative"},
        "priere": {selected: false, grouped: false, charac: "sociabilite"},
        "projectiles": {selected: false, grouped: true, charac: "capTir"},
        "recherche": {selected: false, grouped: false, charac: "intelligence"},
        "representation": {selected: false, grouped: true, charac: "agilite"},
        "savoir": {selected: false, grouped: true, charac: "intelligence"},
        "signesSecrets": {selected: false, grouped: true, charac: "intelligence"},
        "soinAnimaux": {selected: false, grouped: false, charac: "intelligence"},
        "voile": {selected: false, grouped: true, charac: "agilite"}
    };
    $: advancedSkillsPropsMap = new Map(Object.entries(advancedSkillsProps));

    $: advancedSkills = form?.data?.advancedSkills ?? {};
    $: advancedSkillsMap =  new Map(Object.entries(advancedSkills));

    function addAdvancedSkill(skill, prop) {
        if(!advancedSkills[skill]){
            if(prop.grouped) {
                advancedSkills[skill] = {charac: prop.charac, spe: [], grouped: true}
            }
            else {
                advancedSkills[skill] = {aug: 0, editable: false, charac: prop.charac}
            }        
            advancedSkills = advancedSkills;
        }
    }

    function removeAdvancedSkill(skill) {
        delete advancedSkills[skill];
        advancedSkills = advancedSkills;
    }

    function addAdvancedSkillSpecialty(skill, specialty) {
        if(!advancedSkills[skill][specialty] && specialty != "") {
            advancedSkills[skill].spe = [...advancedSkills[skill].spe, specialty];
            advancedSkills[skill][specialty] = {aug: 0, editable: false};
            advancedSkills = advancedSkills;
            // Reset input text
            advancedSkillsSpeText.set(skill, "");
        }
    }

    function removeAdvancedSkillSpecialty(skill, specialty) {
        delete advancedSkills[skill][specialty];
        advancedSkills[skill].spe = advancedSkills[skill].spe.filter((element) => element != specialty);
        advancedSkills = advancedSkills;
    }

    function addBaseSkillSpecialty(skill, specialty) {
        if(baseSkills[skill] && ! baseSkills[skill][specialty] && specialty != "") {
            baseSkills[skill].spe = [...baseSkills[skill].spe, specialty];
            baseSkills[skill][specialty] = {aug: 0, editable: false};
            baseSkills = baseSkills;
            // Reset input text
            baseSkillsSpeText.set(skill, "");
        }
    }

    function removeBaseSkillSpecialty(skill, specialty) {
        delete baseSkills[skill][specialty];
        baseSkills[skill].spe = baseSkills[skill].spe.filter((element) => element != specialty);
        baseSkills = baseSkills;
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

            <section class="flex justify-center">
                <div class="form-control items-center">
                    <label for="mouvement">Mouvement</label>
                    <input class="input input-bordered w-3/4" type="number" name="mouvement" value={form?.data?.mouvement ?? ""}/>
                </div>

                <!-- <div class="form-control items-center">
                    <label for="marche">Marche</label>
                    <input class="input input-bordered w-3/4" type="number" name="marche" value={form?.data?.marche ?? ""}/>
                </div>

                <div class="form-control items-center">
                    <label for="course">Course</label>
                    <input class="input input-bordered w-3/4" type="number" name="course" value={form?.data?.course ?? ""}/>
                </div> -->
            </section>
        </section>
    </section>

    <!-- CARACTERISTIQUES -->
    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Caractéristiques</h2>

            <section class="grid grid-cols-1 xs:grid-cols-2 gap-5">
                {#each characteristicsMap as [charac, prop]}
                <div class="form-control items-center border-2 rounded-lg border-base-200">
                    <label for={charac} class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm xs:text-base w-3/4">
                        {characNameMap.get(charac)}
                        <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name={charac+"Editable"} 
                        checked={characteristics[charac].editable}
                        on:change={(event) => characteristics[charac].editable = event.target.checked}/>
                    </label>
                    <input class="input input-bordered w-3/4 text-center" type="number" name="capCombat" value={characteristics[charac].init}
                    on:change={(event) => {
                        characteristics[charac].init = parseInt(event.target.value);
                    }}/>
                    <div class="flex flex-col items-center">
                        <label class="label hidden xs:flex" for={charac+"Aug"}>Augmentations</label>
                        <label class="label flex xs:hidden" for={charac+"Aug"}>Aug.</label>
                        <input class="input input-bordered w-1/2 text-center" name={charac+"Aug"} type="number" value={characteristics[charac].aug}
                        on:change={(event) => characteristics[charac].aug = parseInt(event.target.value)} />
                    </div>
                </div>
                {/each}
                <!-- Hidden input used to pass the data related to characteristics,  -->
                <!-- to be able to return them from the form action (in createcharac/+page.server.js) if an error occurs -->
                <input type="hidden" name="characteristics" value={JSON.stringify(characteristics)} />
            </section>
        </section>
    </section>
   

    <!-- COMPETENCES DE BASE -->
    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Compétences de base</h2>

            <section class="grid grid-cols-1 gap-2 h-80 overflow-y-scroll mb-5">
                {#each baseSkillsMap as [skill, prop]}
                {#if prop.grouped}
                <div class="flex flex-col gap-3 even:bg-base-100 odd:bg-base-200 rounded-md p-2">
                    <p>{baseSkillsNameMap.get(skill)}</p>
                    <div class="flex flex-col items-center xs:flex-row gap-3 w-full">
                        <input type="text" class="input input-bordered w-full xs:flex-1" value={baseSkillsSpeText.get(skill) ?? ""}
                        on:change={(event) => {
                            baseSkillsSpeText.set(skill, event.target.value);
                            baseSkillsSpeText = baseSkillsSpeText;
                        }} />
                        <button type="button" class="btn btn-success btn-sm xs:btn-md"
                        on:click={() => addBaseSkillSpecialty(skill, baseSkillsSpeText.get(skill))} >+</button>
                    </div>
                </div>
                {/if}
                {/each}
            </section>

            <section class="grid grid-cols-1 xs:grid-cols-2 gap-5">
                {#each baseSkillsMap as [skill, prop]}
                    
                    <div class="form-control items-center border-2 rounded-lg border-base-200">
                        <label for={skill} class="label flex flex-col items-start 2xs:flex-row 2xs:justify-between text-sm 2xs:text-base w-3/4">
                            {baseSkillsNameMap.get(skill)}
                            <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name={skill+"Editable"} 
                            checked={baseSkills[skill].editable ? true: false} on:change={(event) => baseSkills[skill].editable = event.target.checked}/>
                        </label>
                        <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" 
                        disabled type="number" name={skill} 
                        value={parseInt(characteristics[prop.charac].init) +  parseInt(characteristics[prop.charac].aug)}/>
                        <div class="form-control items-center">
                            <label class="label hidden xs:flex" for={skill+"Aug"}>Augmentations</label>
                            <label class="label flex xs:hidden" for={skill+"Aug"}>Aug.</label>
                            <input class="input input-bordered w-1/2 text-center" name={skill+"Aug"} type="number" value={baseSkills[skill].aug}
                            on:change={(event) => baseSkills[skill].aug = parseInt(event.target.value)} />
                        </div>
                    </div>

                    {#if prop.grouped}
                    {#each prop.spe as spe}
                        <div class="form-control items-center border-2 rounded-lg border-base-200">
                            <label for={skill+spe} class="label flex flex-col gap-2 items-start 2xs:flex-row 2xs:justify-between 2xs:items-center text-sm 2xs:text-base w-3/4">
                                <div class="flex flex-col items-start 2xs:items-center 2xs:flex-row">
                                    {#if (skill == "cac" && spe != "Base") || skill != "cac"}
                                        <button type="button" class="btn btn-ghost text-error"
                                        on:click={() => removeBaseSkillSpecialty(skill, spe)}>X</button>
                                    {/if}
                                    {baseSkillsNameMap.get(skill)} ({spe})
                                </div>
                                <input type="checkbox" class="checkbox checkbox-neutral disabled:cursor-default" name={skill+spe+"Editable"} 
                                checked={baseSkills[skill][spe].editable ? true: false} on:change={(event) => baseSkills[skill][spe].editable = event.target.checked}/>
                            </label>
                            <input class="input input-bordered w-3/4 text-center disabled:cursor-default disabled:text-base-content" 
                            disabled type="number" name={skill+spe} 
                            value={parseInt(characteristics[prop.charac].init) +  parseInt(characteristics[prop.charac].aug)}/>
                            <div class="form-control items-center">
                                <label class="label hidden xs:flex" for={skill+spe+"Aug"}>Augmentations</label>
                                <label class="label flex xs:hidden" for={skill+spe+"Aug"}>Aug.</label>
                                <input class="input input-bordered w-1/2 text-center" name={skill+spe+"Aug"} type="number" value={baseSkills[skill][spe].aug}
                                on:change={(event) => baseSkills[skill][spe].aug = parseInt(event.target.value)} />
                            </div>
                        </div>
                        {/each}
                    {/if}
                {/each}

                <!-- Hidden input used to pass the data related to base skills,  -->
                <!-- to be able to return them from the form action (in createcharac/+page.server.js) if an error occurs -->
                <input type="hidden" name="baseSkills" value={JSON.stringify(baseSkills)} />
                
            </section>
        </section>
    </section>


    <!-- COMPETENCES AVANCEES -->
    <section class="card gap-10 bg-base-300 w-full">
        <section class="card-body">
            <h2 class="text-xl font-semibold text-center mb-5" >Compétences avancées</h2>
            <section class="grid grid-cols-1 gap-2 h-96 overflow-y-scroll mb-5">
                {#each advancedSkillsPropsMap as [skill, prop]}
                <div class="flex items-center gap-3 even:bg-base-100 odd:bg-base-200 rounded-md p-2">
                    <input type="checkbox" class="checkbox" bind:checked={advancedSkillsProps[skill].selected} id={skill}
                    on:change={(event) => event.target.checked ? addAdvancedSkill(skill, prop) : removeAdvancedSkill(skill)} />
                    <label for={skill} class="label">{advancedSkillsNameMap.get(skill)}</label>
                </div>
                {/each}
            </section>

            <section class="grid grid-cols-1 gap-5">
                {#if advancedSkillsMap.size == 0}
                <p class="text-center italic text-lg">Aucune compétence avancée.</p>
                {/if}
                {#each advancedSkillsMap as [skill, prop]}
                <div class="flex flex-col items-center gap-3 p-3 border-2 border-base-100 rounded-xl">
                    <label for="" class="label flex flex-col items-center gap-5 2xs:flex-row 2xs:justify-center text-sm xs:text-base ">
                        <p class="text-lg font-medium text-center">{advancedSkillsNameMap.get(skill)} [{characNameMap.get(prop.charac)}: {parseInt(characteristics[prop.charac].init) + parseInt(characteristics[prop.charac].aug)}]</p>
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
                            <label for="" class="label flex flex-col items-start gap-3 2xs:flex-row 2xs:justify-between 2xs:items-center text-sm xs:text-base w-full">
                                <div>
                                    <button type="button" class="btn btn-ghost text-error"
                                    on:click={() => removeAdvancedSkillSpecialty(skill, spe)}>X</button>
                                    {advancedSkillsNameMap.get(skill)} ({spe})
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

                        <div class="divider"></div>

                        <label for="specialty" class="label text-sm text-center xs:text-base">Ajouter une spécialité</label>
                        <div class="flex flex-col items-center w-full xs:flex-row">
                            <input type="text" class="input input-bordered xs:flex-1 w-full" id="specialty" value={advancedSkillsSpeText.get(skill) ?? ""}
                            on:change={(event) => {
                                advancedSkillsSpeText.set(skill, event.target.value);
                                advancedSkillsSpeText = advancedSkillsSpeText;
                            }}/>
                            <button type="button" class="btn btn-success w-1/5" on:click={() => addAdvancedSkillSpecialty(skill, advancedSkillsSpeText.get(skill))}>+</button>
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
                <div class="flex flex-start items-center gap-5">
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