export default function Marquee({ rows }) {
  return (
    <div className="mq">
      {rows.map((row, r) => (
        <div className="mq-row" key={r}>
          <div className={`mq-track ${r % 2 ? 'rev' : ''}`}>
            {[...row, ...row].map((src, i) => (
              <img key={i} src={src} alt="" draggable="false" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
