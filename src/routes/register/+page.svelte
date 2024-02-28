<script>
    export let form;
</script>

<section id="register">
    {#if form}
    <p class="warning">{form.message}</p>
    {/if}
    <form method="POST" action="?/register">
        <div class="user">
            <label for="username">Nom d'utilisateur</label>
            <input class="txt1" type="text" name="username" value={form?.username ?? ""} />
        </div>
        <div class="email">
            <label for="user">Adresse email</label>
            <input class="txt1" type="text" name="email" value={form?.email ?? ""}/>
        </div>
        <div class="password">
            <label for="password">Mot de passe</label>
            <input class="txt1" type="password" name="password" value={form?.password ?? ""}/>
        </div>
        <button class="btn2">Inscription</button>
    </form>
    <p>Si vous avez déjà un compte, <a href="/login" class="highlight" >connectez-vous!</a></p>
</section>

<style lang="scss">
    section {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;

        p {
            text-align: center;
        }

        form {
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
        }

        div {
            display: flex;
            flex-direction: column;
            width: 80%;

            input {
                height: 50px;
            }
        }

        button {
            width: 80%;
        }
    }
</style>