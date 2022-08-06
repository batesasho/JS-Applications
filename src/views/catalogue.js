import {html} from "../lib.js";
import {getAllData} from "../api/data.js";
import {getUserData} from "../util.js";


const catalogueTemplate = (catalogue) => html`
    <section id="dashboard">
        <h2>Job Offers</h2>
        ${catalogue.length === 0
                ? html`<h2>No offers yet.</h2>`
                : catalogue.map(dataTemplate)}
    </section>`;

const dataTemplate = (data) => html`
    <div class="offer">
        <img src="${data.imageUrl}" alt="example1"/>
        <p>
            <strong>Title: </strong><span class="title">${data.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${Number(data.salary)}</span></p>
        <a class="details-btn" href="/details/${data._id}">Details</a>
    </div>`

export async function catalogueView(ctx) {

    const catalogue = await getAllData();
    ctx.render(catalogueTemplate(catalogue))

}