import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Pause, Play, Sparkles, Volume2, ChevronDown, ChevronLeft, ChevronRight, RotateCcw, Flame } from 'lucide-react'

const photos = [
  { src: '/photos/abhishek-01.png', label: 'THE BIRTHDAY BOY' },
  { src: '/photos/abhishek-02.png', label: 'TRADITION & STYLE' },
  { src: '/photos/abhishek-03.png', label: 'CALM. COOL. LEGENDARY.' },
  { src: '/photos/abhishek-04.png', label: 'GOOD TIMES, GREAT COMPANY' },
]

const letter = `21 years of existence and still causing trouble! 😂\n\nHappy Birthday, Abhishek! ❤️\n\nMay this new chapter bring you endless happiness, success, crazy adventures and unforgettable memories. Never stop being the amazing and crazy person you are. Keep smiling, keep growing and enjoy every moment of life.\n\nHere's to new adventures, bigger dreams and another year of madness!\n\nHappy 21st Birthday, Bro! 🥳`

function useTypewriter(text, active) {
  const [value, setValue] = useState('')
  useEffect(() => {
    if (!active) return
    let i = 0
    const timer = setInterval(() => { setValue(text.slice(0, ++i)); if (i >= text.length) clearInterval(timer) }, 17)
    return () => clearInterval(timer)
  }, [active, text])
  return value
}

function Confetti({ count = 45 }) {
  return <div className="confetti" aria-hidden="true">{Array.from({ length: count }, (_, i) => <i key={i} style={{ '--x': `${(i * 37) % 100}%`, '--d': `${1.8 + (i % 7) * .22}s`, '--r': `${i * 29}deg`, '--c': ['#ff4bd8','#7c5cff','#40dfff','#ffd363'][i % 4] }} />)}</div>
}

function MusicButton() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)
  const toggle = () => {
    if (playing) { audioRef.current?.close(); audioRef.current = null; setPlaying(false); return }
    const Ctx = window.AudioContext || window.webkitAudioContext
    const ctx = new Ctx(); audioRef.current = ctx
    const playNote = (freq, time, duration) => { const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.frequency.value = freq; osc.type = 'sine'; gain.gain.setValueAtTime(0, time); gain.gain.linearRampToValueAtTime(.045, time + .03); gain.gain.exponentialRampToValueAtTime(.001, time + duration); osc.connect(gain).connect(ctx.destination); osc.start(time); osc.stop(time + duration) }
    const notes = [261.6,329.6,392,523.2,392,329.6,261.6,392]
    let next = ctx.currentTime
    notes.forEach((n, i) => { playNote(n, next + i * .28, .25) })
    setPlaying(true)
  }
  useEffect(() => () => audioRef.current?.close(), [])
  return <button className={`music-control ${playing ? 'is-playing' : ''}`} onClick={toggle} aria-label="Toggle birthday music">
    <span className="visualizer">{[1,2,3,4].map(i => <i key={i} />)}</span>
    {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}<span>{playing ? 'Now playing' : 'Play birthday tune'}</span><Volume2 size={15}/>
  </button>
}

function Cake({ blown, onBlow }) {
  return <button className="cake-wrap" onClick={onBlow} aria-label="Blow out the birthday candles">
    <div className="cake-candles">{Array.from({ length: 7 }, (_, i) => <div className="candle" key={i}><span className={blown ? 'flame out' : 'flame'} /></div>)}</div>
    <div className="cake-top"><span>✦</span><span>21</span><span>✦</span></div><div className="cake-middle"/><div className="cake-bottom"/>
    <small>{blown ? 'A wish has been made ✨' : 'Tap the candles to make a wish'}</small>
  </button>
}

function App() {
  const [revealed, setRevealed] = useState(false)
  const [blown, setBlown] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const [activePhoto, setActivePhoto] = useState(0)
  const typedLetter = useTypewriter(letter, revealed)
  const reveal = () => { setRevealed(true); setTimeout(() => document.getElementById('celebration')?.scrollIntoView({ behavior: 'smooth' }), 650) }
  const finale = () => { setCelebrate(true); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); setTimeout(() => setCelebrate(false), 4600) }
  return <main>
    <div className="stars" aria-hidden="true">{Array.from({ length: 70 }, (_, i) => <i key={i} style={{ left: `${(i * 31) % 100}%`, top: `${(i * 57) % 100}%`, animationDelay: `${i * -.14}s` }} />)}</div>
    <AnimatePresence>{!revealed && <motion.section className="welcome" exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }} transition={{ duration: .65 }}>
      <div className="welcome-orb orb-one"/><div className="welcome-orb orb-two"/>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="welcome-content">
        <span className="eyebrow"><Sparkles size={15}/> A SECRET TRANSMISSION</span>
        <p className="welcome-copy">Something Special<br/>Is Waiting For You<span>...</span></p>
        <motion.div className="gift" animate={{ y: [0,-10,0], rotate: [0,-2,2,0] }} transition={{ repeat: Infinity, duration: 2.6 }}><Gift size={78}/><i/></motion.div>
        <button className="unwrap" onClick={reveal}>UNWRAP YOUR SURPRISE <span>🎁</span></button>
        <p className="tiny">For a legendary human turning 21</p>
      </motion.div>
    </motion.section>}</AnimatePresence>

    {revealed && <>
      <section id="celebration" className="hero section-shell">
        <Confetti count={34}/><nav><span className="brand">ABHISHEK<span>_21</span></span><MusicButton/></nav>
        <div className="hero-layout">
          <div className="hero-copy"><motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="live-dot"/> OFFICIALLY UNLOCKED</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>HAPPY<br/><em>21ST</em> BIRTHDAY<br/>ABHISHEK<span>!</span></motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>Welcome to <strong>Level 21</strong> <span className="rocket">🚀</span></motion.p>
            <button className="scroll-cue" onClick={() => document.querySelector('.letter-section')?.scrollIntoView({ behavior: 'smooth' })}>READ YOUR BIRTHDAY NOTE <ChevronDown size={16}/></button>
          </div>
          <motion.div className="portrait-showcase" initial={{ scale: .78, opacity: 0, rotate: 6 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: 'spring', delay: .25 }}>
            <div className="photo-card"><AnimatePresence mode="wait"><motion.img key={photos[activePhoto].src} src={photos[activePhoto].src} alt="Abhishek" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .35 }}/></AnimatePresence><div className="photo-caption"><span>{photos[activePhoto].label}</span><b>21</b></div></div>
            <button className="photo-arrow left" onClick={() => setActivePhoto((activePhoto + photos.length - 1) % photos.length)} aria-label="Previous photo"><ChevronLeft size={17}/></button>
            <button className="photo-arrow right" onClick={() => setActivePhoto((activePhoto + 1) % photos.length)} aria-label="Next photo"><ChevronRight size={17}/></button>
            <div className="photo-dots">{photos.map((_, i) => <button key={i} onClick={() => setActivePhoto(i)} className={i === activePhoto ? 'active' : ''} aria-label={`Show photo ${i + 1}`}/>)}</div>
          </motion.div>
        </div>
        <div className="hero-bottom"><span>EST. 2005</span><span>•</span><span>THE LEGEND CONTINUES</span><span>•</span><span>11.05.2026</span></div>
      </section>

      <section className="letter-section section-shell"><div className="letter-grid"><div className="letter-intro"><span className="eyebrow"><Sparkles size={15}/> A NOTE FOR THE BIRTHDAY BOY</span><h2>Some things<br/>are <em>worth saying.</em></h2><div className="scribble">to the next<br/>beautiful chapter <span>↗</span></div></div><motion.article className="letter" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="letter-top"><span>TO: ABHISHEK</span><span>FROM: YOUR BRO</span></div><p>{typedLetter}<span className="cursor">|</span></p><div className="letter-stamp">21<br/><small>YEARS<br/>ICONIC</small></div></motion.article></div></section>

      <section className="cake-section section-shell"><div><span className="eyebrow"><Flame size={15}/> MAKE A WISH</span><h2>One more year of<br/><em>being iconic.</em></h2><p>Every adventure starts with a wish. This one is all yours.</p></div><Cake blown={blown} onBlow={() => setBlown(true)}/></section>

      <section className="finale section-shell"><div className="finale-glow"/><span className="eyebrow">ACHIEVEMENT EARNED <Sparkles size={15}/></span><h2>LEVEL 21<br/><em>UNLOCKED!</em> <span>🔓</span></h2><p>The journey has just begun, Abhishek!<br/>Stay crazy. Stay legendary. ❤️</p><button className="final-button" onClick={finale}>LIGHT UP THE SKY <span>✦</span></button><button className="replay" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setBlown(false) }}><RotateCcw size={14}/> REPLAY THE SURPRISE</button></section>
      <footer>MADE WITH AN UNREASONABLE AMOUNT OF LOVE <span>♥</span> FOR ABHISHEK</footer>
    </>}
    <AnimatePresence>{celebrate && <motion.div className="firework-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Confetti count={130}/>{Array.from({ length: 7 }, (_, i) => <i className="burst" key={i} style={{ left: `${10 + i * 14}%`, top: `${15 + (i % 3) * 23}%`, '--delay': `${i * .28}s` }}/>)}</motion.div>}</AnimatePresence>
  </main>
}
export default App
