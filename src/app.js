import {render, page} from './lib.js';
import {homeView} from "./views/home.js";
import {getUserData} from "./util.js";
import {navTemplate} from "./api/navTemplate.js"
import {logout} from "./api/users.js";
import {loginView} from "./views/login.js";
import {registerView} from "./views/register.js";
import {catalogueView} from "./views/catalogue.js";
import {createView} from "./views/create.js";
import {detailsView} from "./views/details.js";
import {editView} from "./views/edit.js";
import {offerView} from "./views/offer.js";


const mainElement = document.getElementById('content');
const header = document.getElementById('site-header');

page(addSession)
page(contextDecoration)
page('/', homeView);
page('/dashboard', catalogueView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/login', loginView);
page('/register', registerView);
page('/logout', onLogout);
page('/create', createView);
page('/offer', offerView);


page.start();


function contextDecoration(ctx, next) {
    render(navTemplate(ctx.user), header)
    ctx.render = mainRender

    next();
}

function addSession(ctx, next) {
    ctx.user = getUserData();
    next();
}

function mainRender(templateResult) {
    return render(templateResult, mainElement)
}

function onLogout() {
    logout();
    page.redirect('/dashboard');
}