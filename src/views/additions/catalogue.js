import {html} from "../lib.js";
import {getAllData} from "../api/data.js";
import {getUserData} from "../util.js";


const catalogueTemplate = (catalogue, user) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${catalogue.length === 0
                ? html`     <p>No Albums in Catalog!</p>`
                : catalogue.map(album => dataTemplate(album, user))}
    </section>`;

const dataTemplate = (data, user) => html`
    <div class="card-box">
        <img src=".${data.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${data.name}</p>
                <p class="artist">Artist: ${data.artist}</p>
                <p class="genre">Genre: ${data.genre}c</p>
                <p class="price">Price: $${toString(Number(data.price).toFixed(2))}</p>
                <p class="date">Release Date: ${data.date}</p>
            </div>

            ${user
                    ? html`
                        <div class="btn-group">
                            <a href="/details/${music._id}" id="details">Details</a>
                        </div>`
                    : null}

        </div>
    </div>`

export async function catalogueView(ctx) {

    const user = getUserData();
    const catalogue = await getAllData();
    ctx.render(catalogueTemplate(catalogue, user))

}