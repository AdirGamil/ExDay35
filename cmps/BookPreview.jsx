export function BookPreview({ book }) {
  const {
    id,
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    thumbnail,
    language,
    listPrice,
  } = book

  return (
  <div className="card">
      <img className="card-img" src={thumbnail} alt={title} />
      <div className="card-overlay">
        <div className="card-header">
          <div>
            <h3 className="card-title">{title}</h3>
            <span className="card-tagline">{subtitle}</span>
            <p className="card-status">{listPrice.isOnSale ? 'On Sale' : 'Not on Sale'}</p>
          </div>
        </div>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
}
