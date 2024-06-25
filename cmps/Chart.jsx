export function Chart({ data }) {
  return (
    <ul className="chart">
      {data.map((item) => (
        <li key={item.category}>
          <span
            title={`${item.category}: ${item.count} books`}
            style={{ height: item.count * 10 + '%' }}
          >
            {item.count}
          </span>
        </li>
      ))}
    </ul>
  )
}
