<script>
    export let form;
</script>

<section class="w-11/12 sm:w-4/5 md:w-3/5 lg:w-3/6">
    {#if form}
    <p class="text-warning font-semibold text-center">{form.message}</p>
    {/if}
    <form class="card bg-base-300 shadow-lg mt-10 w-full" method="POST" action="?/register">
        <section class="card-body">
            <div class="form-control">
                <label class="label" for="username">Nom d'utilisateur</label>
                <input class="input input-bordered" type="text" name="username" value={form?.username ?? ""} />
            </div>
            <div class="form-control">
                <label class="label" for="user">Adresse email</label>
                <input class="input input-bordered" type="text" name="email" value={form?.email ?? ""}/>
            </div>
            <div class="form-control">
                <label class="label" for="password">Mot de passe</label>
                <input class="input input-bordered" type="password" name="password" value={form?.password ?? ""}/>
            </div>
        </section>
        
        <section class="card-actions justify-center">
            <button class="btn btn-neutral btn-wide">Inscription</button>
        </section>
    </form>
    <p class="text-center mt-5">Si vous avez déjà un compte, <a href="/login" class="underline" >connectez-vous!</a></p>
</section>