import {html} from "../lib.js";

import {getUserData} from "../util.js";
import {apply, deleteDataById, getDataById, getOfferByUser, getTotalOffers} from "../api/data.js";


const detailsTemplate = (data, user, isOwner, onDelete, onOffer, isApplied, numberApplications) => html`
    <!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${data.imageUrl}" alt="example1"/>
            <p id="details-title">${data.title}</p>
            <p id="details-category">
                Category: <span id="categories">${data.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${Number(data.salary)}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span
                    >${data.description}</span
                    >
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span
                    >${data.requirements}</span
                    >
                </div>
            </div>
            <p>Applications: <strong id="applications">${numberApplications}</strong></p>

            <!--Edit and Delete are only for creator-->


            <div id="action-buttons">
                ${isOwner
                        ? html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
                        : null}

                ${user && !isOwner && isApplied === 0
                        ? html`<a @click=${onOffer} href="javascript:void(0)" id="apply-btn">Apply</a>` :
                        null}
                <!--Bonus - Only for logged-in users ( not authors )-->

            </div>
        </div>
    </section>`


export async function detailsView(ctx) {

    const user = getUserData();
    const dataById = await getDataById(ctx.params.id);
    const isApplied = user ? await getOfferByUser(ctx.params.id, user.id) : null;

    const numberApplications = await getTotalOffers(ctx.params.id);


    const isOwner = user?.id === dataById._ownerId;

    ctx.render(detailsTemplate(dataById, user, isOwner, onDelete, onOffer, isApplied, numberApplications));

    async function onDelete() {
        const choice = confirm(`Are you sure you wont to delete ${dataById.title}?`);

        if (choice) {

            await deleteDataById(ctx.params.id);
            ctx.page.redirect('/dashboard');
        }

    }

    async function onOffer() {
        await apply(ctx.params.id)
        ctx.page.redirect('/details/' + ctx.params.id);

    }

}