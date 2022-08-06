import {html} from "../lib.js";
import {editDataById, getDataById} from "../api/data.js";


const editTemplate = (onSubmit, data) => html`
    <section class="editPage">
        <form @submit="${onSubmit}">
            <fieldset>
                <legend>Edit Album</legend>

                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" .value="${data.name}">

                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value="${data.imgUrl}">

                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" .value="${data.price}">

                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value="${data.date}">

                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" .value="${data.artist}">

                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" .value="${data.genre}">

                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" rows="10"
                              cols="10">${data.description}</textarea>

                    <button class="edit-album" type="submit">Edit Album</button>
                </div>
            </fieldset>
        </form>
    </section>`


export async function editView(ctx) {
    const dataById = await getDataById(ctx.params.id);
    ctx.render(editTemplate(onSubmit, dataById))

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const input = {
            title: formData.get('title').trim(),
            imageUrl: formData.get('imageUrl').trim(),
            category: formData.get('category').trim(),
            description: formData.get('description').trim(),
            requirements: formData.get('requirements').trim(),
            salary: formData.get('salary').trim()
        }

        const checkFields = Object.values(input).some(v => v === "")

        if (checkFields) {
            return alert('All fields are required!');
        }

        await editDataById(ctx.params.id, input)
        ctx.page.redirect('/details/' + ctx.params.id)
    }
}