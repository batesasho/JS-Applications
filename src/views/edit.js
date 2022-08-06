import {html} from "../lib.js";
import {editDataById, getDataById} from "../api/data.js";


const editTemplate = (onSubmit, data) => html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input
                        type="text"
                        name="title"
                        id="job-title"
                        placeholder="Title"
                        .value=${data.title}
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="job-logo"
                        placeholder="Company logo url"
                        .value=${data.imageUrl}
                />
                <input
                        type="text"
                        name="category"
                        id="job-category"
                        placeholder="Category"
                        .value=${data.category}
                />
                <textarea
                        id="job-description"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                        .value=${data.description}
                ></textarea>
                <textarea
                        id="job-requirements"
                        name="requirements"
                        placeholder="Requirements"
                        rows="4"
                        cols="50"
                        .value=${data.requirements}
                ></textarea>
                <input
                        type="text"
                        name="salary"
                        id="job-salary"
                        placeholder="Salary"
                        .value=${Number(data.salary)}
                />

                <button type="submit">post</button>
            </form>
        </div>
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