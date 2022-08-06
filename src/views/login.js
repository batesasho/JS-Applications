import {html} from "../lib.js";
import {login} from "../api/users.js";

const loginTemplate = (onSubmit) => html`

    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit = ${onSubmit} class="login-form">
                <input type="text" name="email" id="email" placeholder="email"/>
                <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                />
                <button type="submit">login</button>
                <p class="message">
                    Not registered? <a href="/register">Create an account</a>
                </p>
            </form>
        </div>
    </section>`

export function loginView(ctx) {

    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const input = {
            email: formData.get('email').trim(),
            password: formData.get('password').trim()
        }
        if (input.email === "" || input.password === "") {
            return alert('All fields are required!');
        }

        await login(input.email, input.password);
        ctx.page.redirect('/dashboard');


    }
}