import {html} from "../lib.js";

import {getUserData} from "../util.js";
import {deleteDataById, getDataById} from "../api/data.js";


const detailsTemplate = (data, user, isOwner, onDelete) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src="${data.imgUrl}">
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${data.name}</h1>
                    <h3>Artist: ${data.artist}</h3>
                    <h4>Genre: ${data.genre}</h4>
                    <h4>Price: $${data.price}</h4>
                    <h4>Date: ${data.date}</h4>
                    <p>Description: ${data.description}</p>
                </div>

                <div class="actionBtn">
                    ${isOwner
                            ? html`

                                <a href="/edit/${data._id}" class="edit">Edit</a>
                                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`

                            : null}
                </div>
            </div>
        </div>
    </section>`


export async function detailsView(ctx) {

    const user = getUserData();
    const dataById = await getDataById(ctx.params.id);



    const isOwner = user?.id === dataById._ownerId;

    ctx.render(detailsTemplate(dataById, user, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you wont to delete ${dataById.name}?`);

        if (choice) {

            await deleteDataById(ctx.params.id);
            ctx.page.redirect('/catalogue');
        }

    }

}