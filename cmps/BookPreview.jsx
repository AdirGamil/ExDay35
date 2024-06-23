export function BookPreview ({book}) {
const {title, id, thumbnail} = book

return (
    <article className="book-preview">
        <h2>Title: {title}</h2>
    </article>
)
}