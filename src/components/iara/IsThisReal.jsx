import { useMemo, useState } from 'react'
import { isThisRealItems } from '../../data/isThisReal.js'

// NOTE: intentionally NOT mounted yet. See ProjectIara.jsx (import + <IsThisReal /> are commented out)
// until the real / AI-generated assets are finalised.
export default function IsThisReal({ items = isThisRealItems }) {
  const deck = useMemo(() => [...items].sort(() => Math.random() - 0.5), [items])
  const [i, setI] = useState(0)
  const [guess, setGuess] = useState(null) // 'real' | 'ai' | null
  const [score, setScore] = useState(0)

  if (!deck.length) return null
  const done = i >= deck.length
  const cur = deck[i]
  const correct = guess && (guess === 'ai') === cur.isAI

  const answer = (g) => {
    if (guess) return
    setGuess(g)
    if ((g === 'ai') === cur.isAI) setScore((s) => s + 1)
  }
  const next = () => {
    setGuess(null)
    setI((v) => v + 1)
  }
  const again = () => {
    setI(0)
    setScore(0)
    setGuess(null)
  }

  return (
    <div className="itr">
      <h2 className="t-h2">Is this real?</h2>
      {done ? (
        <div className="itr-end">
          <p className="t-lg">You got <strong>{score}</strong> of {deck.length}.</p>
          <p className="t-md">{score === deck.length ? 'Not one fooled you.' : 'Iara has fooled better people.'}</p>
          <button className="itr-btn" onClick={again}>Play again</button>
        </div>
      ) : (
        <>
          <div className={`itr-card ${guess ? (correct ? 'right' : 'wrong') : ''}`}>
            <img src={cur.src} alt="" />
            {guess && (
              <div className="itr-reveal">
                <b>{cur.isAI ? 'AI-generated' : 'Real'}</b>
                <span>{cur.reveal}</span>
              </div>
            )}
          </div>
          <div className="itr-actions">
            {!guess ? (
              <>
                <button className="itr-btn" onClick={() => answer('real')}>Real</button>
                <button className="itr-btn" onClick={() => answer('ai')}>AI</button>
              </>
            ) : (
              <button className="itr-btn" onClick={next}>{i + 1 === deck.length ? 'See score' : 'Next'}</button>
            )}
            <span className="t-md">{i + 1} / {deck.length}</span>
          </div>
        </>
      )}
    </div>
  )
}
