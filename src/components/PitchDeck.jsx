import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Демо-чат: тимлид только «живой» диалог и эмоции; советы, разбор и микрозадание — от системы (в ленте и у композера).
 */
const PRODUCT_BOT_LINES = [
  'Привет. По PROJ-204 релиз завтра утром — как ты по интеграции платежей? Нужен честный статус: если жмёт — скажи сейчас, ок? Не хочу ночью перед выкатом ловить сюрприз.',
  'Спасибо, так уже можно думать. По симптомам очень похоже на права сервис-акка на стейдже. Кинь request id из лога — гляну трассу и отпишусь, куда дальше.',
  'Ок, легче уже 😮‍💨 Жду id до 18:00. Если к пятнадцати поймёшь, что не успеваешь — напиши заранее, лады? Молчать до дедлайна — самое нервное.',
]

const PRODUCT_USER_MESSAGE_BAD =
  'Ну короче не взлетает, как-нибудь сам завтра добью, норм всё.'

/** Коммуникация + честно про давление (саморегуляция) + шаги (самоорганизация) */
const PRODUCT_USER_MESSAGE_GOOD =
  'Привет. Честно — прижимает по сроку, злюсь на себя за то, что застрял, но хочу не пропадать. Застрял на 404 по /api/v2/payments: по шагам перепроверил токен, таймауты, контракт и пару смежных ручек — без толку. Можешь глянуть логи на стейдже или ткнуть, куда копать — без этого я просто топчусь на месте.'

/** Договорённости с собой и с коллегой: самоорганизация + прозрачность по риску */
const PRODUCT_USER_MESSAGE_FOLLOWUP =
  'Договорились: до 18:00 вытащу request id из лога и скину сюда. Если к 16:30 пойму, что не везёт — напишу раньше, не в последний момент.'

const PRODUCT_HINT_AFTER_BAD =
  'Сообщение обрывает контакт: нет фактов, нет шагов и непонятно, чего ждать от тимлида. Добавь, что именно не работает, что уже сделал по шагам, и формулировку запроса помощи — при желании коротко отметь давление по сроку честно, без «всё норм».'

const PRODUCT_SYSTEM_AFTER_GOOD1 =
  'Сильный ответ для перегруженного дня: тимлиду проще подключиться. Коммуникация — контекст и запрос, а не «сам разберусь». Саморегуляция — ты назвал давление и раздражение вместо маскировки. Самоорганизация — перечисленные проверки и ясно, где ты застрял, а не абстрактное «не работает».'

const PRODUCT_SYSTEM_MICROTASK =
  'Микрозадание: завтра до обеда одной строкой в заметке зафиксируй — какой сигнал дал тимлиду и какой срок себе ставишь на id; вечером отметь «сделал / перенёс и почему».'

const TYPE_MS_BAD = 72
const TYPE_MS_GOOD = 42
const TYPE_MS_FOLLOWUP = 48
const PAUSE_TO_FIRST_BOT = 2000
const PAUSE_BEFORE_USER_REPLY = 2200
const PAUSE_AFTER_BAD_IN_CHAT = 500
const PAUSE_HINT_VISIBLE = 5200
const PAUSE_AFTER_GOOD_IN_CHAT = 700
const PAUSE_BEFORE_BOT_ANALYSIS = 2400
const PAUSE_AFTER_GOOD_TYPED = 1200
const PAUSE_AFTER_FOLLOWUP_TYPED = 1000
const PAUSE_AFTER_SEND = 2200
/** После ответа тимлида с request id — пауза, затем вторая реплика пользователя */
const PAUSE_AFTER_BOT_TECH = 3000
const PAUSE_BEFORE_SYSTEM_MICRO = 2800
const PAUSE_LOOP_END = 5200

/** Демо-чат показывается только на этом слайде */
const PITCH_CHAT_LAYOUT = 'valueDialog'

const slides = [
  {
    kicker: '',
    title: 'Мяу.',
    subtitle: 'Коммуникация начинается с доверия',
    points: [],
    theme: 'contrast',
    layout: 'hero',
  },
  {
    kicker: '',
    title: 'Обо мне',
    subtitle: '',
    points: [
      'Data Engineer, 4 года в Яндексе',
      'Педагогический дизайнер',
      'Исследователь адаптации начинающих специалистов',
      'Соединяю IT и педдизайн в практический продукт',
    ],
    theme: 'contrastLight',
    layout: 'profile',
  },
  {
    kicker: 'Story',
    title: '',
    subtitle: '',
    points: [
      'Нашел работу мечты',
      'Провалил коммуникацию с руководителем по ключевым задачам',
      'Не собрал вовремя обратную связь от коллег',
      'Увольнение стало сюрпризом',
    ],
    theme: 'contrastLighter',
    layout: 'catStory',
  },
  {
    kicker: 'Insight',
    title: '',
    subtitle: '',
    points: ['Специалисты', 'Руководители', 'Менторы'],
    chips: false,
    theme: 'sunrise',
    layout: 'insightSunrise',
  },
  {
    kicker: 'Product',
    title: '',
    subtitle: '',
    points: ['5-15 минут в день', '5 недель', 'Без лекций. Только практика.'],
    metrics: ['5-15 мин', '5 недель', '25 сессий'],
    theme: 'sunriseBright',
    layout: 'productInfo',
  },
  {
    kicker: 'Mechanics',
    title: 'Одна сессия.\nОдно действие в реальности.',
    subtitle: 'Короткие циклы, которые переносят навык в работу',
    points: ['Сценарий', 'Выбор', 'Последствия', 'Микрозадания'],
    chips: true,
    theme: 'sunToEvening',
    layout: 'mechanicsCycle',
  },
  {
    kicker: 'Program',
    title: 'Структура программы',
    subtitle: '6 модулей · 25 сессий · ~5 недель · ~250 минут',
    theme: 'violetToBlue',
    layout: 'programModules',
    modules: [
      {
        num: '0',
        path: 'Начало',
        sessions: '2 сессии',
        body: 'Знакомство с продуктом, калибровочные сценарии, пре-оценка',
      },
      {
        num: '1',
        path: 'Замечать',
        sessions: '5 сессий',
        body: 'Простые ситуации, один паттерн за раз, подробный разбор',
      },
      {
        num: '2',
        path: 'Называть',
        sessions: '5 сессий',
        body: 'Учусь находить слова: запрос помощи, уточнение, статус',
      },
      {
        num: '3',
        path: 'Действовать',
        sessions: '5 сессий',
        body: 'Эмоционально нагруженные ситуации, переход от разбора к рефлексии',
      },
      {
        num: '4',
        path: 'Встраивать',
        sessions: '5 сессий',
        body: 'Практики, рутины, все компетенции вместе',
      },
      {
        num: '5',
        path: 'Расти',
        sessions: '3 сессии',
        body: 'Рефлексия, артефакты (памятка + план развития), выход из тренажера',
      },
    ],
  },
  {
    kicker: 'Value',
    title: 'От «знаю» к «делаю»',
    subtitle: 'В стрессовой ситуации. В реальной команде.',
    valueBullets: [
      { emoji: '🎯', text: 'Формулировать запрос помощи так, чтобы тебе реально помогли' },
      { emoji: '📢', text: 'Сообщать о проблемах до того, как спросят' },
      { emoji: '🛡️', text: 'Замечать, когда страх мешает действовать, и справляться с ним' },
      { emoji: '📋', text: 'Организовать свою работу так, чтобы ничего не терялось' },
      { emoji: '🌱', text: 'Анализировать свой опыт и расти без внешней поддержки' },
    ],
    theme: 'dark',
    layout: 'valueDialog',
  },
  {
    kicker: 'Вместо заключения',
    title: 'Скоро первая работа?',
    subtitle: '',
    closingBody:
      'Если ты планируешь выходить на первую работу и переживаешь о том, как и с кем общаться в команде, — будем рады видеть тебя среди участников нашей программы.',
    theme: 'contrast',
    layout: 'heroClosing',
    closingDialogue: [
      { speaker: 'cat', text: 'Ну что, убедила?' },
      {
        speaker: 'bird',
        text: 'Убедила. Лучше тренировать коммуникацию заранее, чем чинить последствия потом.',
      },
      { speaker: 'cat', text: 'Жду вас в Pre-Prod. И правда спасибо за внимание!' },
    ],
  },
]

export default function PitchDeck() {
  const [index, setIndex] = useState(0)
  const [productMessages, setProductMessages] = useState([])
  const [productComposerText, setProductComposerText] = useState('')
  const [productComposerMode, setProductComposerMode] = useState('idle')
  const [productComposerTone, setProductComposerTone] = useState('neutral')
  const [productTrainerHint, setProductTrainerHint] = useState('')
  const productChatEndRef = useRef(null)
  const last = slides.length - 1

  const progress = useMemo(() => `${index + 1}/${slides.length}`, [index])

  const prev = () => setIndex((v) => (v === 0 ? 0 : v - 1))
  const next = () => setIndex((v) => (v === last ? last : v + 1))

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev()
      if (e.key === 'Home') setIndex(0)
      if (e.key === 'End') setIndex(last)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [last])

  useEffect(() => {
    const current = slides[index]
    if (current.layout !== PITCH_CHAT_LAYOUT) {
      setProductMessages([])
      setProductComposerText('')
      setProductComposerMode('idle')
      setProductComposerTone('neutral')
      setProductTrainerHint('')
      return
    }

    let cancelled = false
    const timers = []
    const after = (ms, fn) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
      timers.push(id)
    }

    const typeString = (text, charMs, onComplete) => {
      let i = 0
      const step = () => {
        if (cancelled) return
        if (i < text.length) {
          setProductComposerText(text.slice(0, i + 1))
          i++
          if (i < text.length) after(charMs, step)
          else onComplete()
        }
      }
      setProductComposerText('')
      step()
    }

    const runCycle = () => {
      if (cancelled) return
      setProductMessages([])
      setProductComposerText('')
      setProductComposerMode('idle')
      setProductComposerTone('neutral')
      setProductTrainerHint('')

      const tBot1 = PAUSE_TO_FIRST_BOT
      const typeStartAt = tBot1 + PAUSE_BEFORE_USER_REPLY

      after(tBot1, () => {
        if (cancelled) return
        setProductMessages([{ role: 'bot', text: PRODUCT_BOT_LINES[0] }])
      })

      after(typeStartAt, () => {
        if (cancelled) return
        setProductComposerMode('typing')
        setProductComposerTone('neutral')
        setProductTrainerHint('')
        typeString(PRODUCT_USER_MESSAGE_BAD, TYPE_MS_BAD, () => {
          if (cancelled) return
          setProductComposerText('')
          setProductComposerMode('sent')
          setProductComposerTone('neutral')
          setProductMessages((m) => [...m, { role: 'user', text: PRODUCT_USER_MESSAGE_BAD }])
          after(PAUSE_AFTER_BAD_IN_CHAT, () => {
            if (cancelled) return
            setProductTrainerHint(PRODUCT_HINT_AFTER_BAD)
            setProductComposerMode('idle')
            after(PAUSE_HINT_VISIBLE, () => {
              if (cancelled) return
              setProductTrainerHint('')
              setProductComposerMode('typing')
              setProductComposerTone('good')
              typeString(PRODUCT_USER_MESSAGE_GOOD, TYPE_MS_GOOD, () => {
                if (cancelled) return
                after(PAUSE_AFTER_GOOD_TYPED, () => {
                  if (cancelled) return
                  setProductComposerText('')
                  setProductMessages((m) => [...m, { role: 'user', text: PRODUCT_USER_MESSAGE_GOOD }])
                  setProductComposerMode('sent')
                  setProductComposerTone('neutral')
                  after(PAUSE_AFTER_GOOD_IN_CHAT, () => {
                    if (cancelled) return
                    setProductMessages((m) => [
                      ...m,
                      { role: 'system', text: PRODUCT_SYSTEM_AFTER_GOOD1 },
                    ])
                    after(PAUSE_BEFORE_BOT_ANALYSIS, () => {
                      if (cancelled) return
                      setProductMessages((m) => [...m, { role: 'bot', text: PRODUCT_BOT_LINES[1] }])
                      setProductComposerMode('idle')
                      after(PAUSE_AFTER_BOT_TECH, () => {
                        if (cancelled) return
                        setProductComposerMode('typing')
                        setProductComposerTone('good')
                        typeString(PRODUCT_USER_MESSAGE_FOLLOWUP, TYPE_MS_FOLLOWUP, () => {
                          if (cancelled) return
                          after(PAUSE_AFTER_FOLLOWUP_TYPED, () => {
                            if (cancelled) return
                            setProductComposerText('')
                            setProductMessages((m) => [
                              ...m,
                              { role: 'user', text: PRODUCT_USER_MESSAGE_FOLLOWUP },
                            ])
                            setProductComposerMode('sent')
                            setProductComposerTone('neutral')
                            after(PAUSE_AFTER_SEND, () => {
                              if (cancelled) return
                              setProductMessages((m) => [...m, { role: 'bot', text: PRODUCT_BOT_LINES[2] }])
                              setProductComposerMode('idle')
                              after(PAUSE_BEFORE_SYSTEM_MICRO, () => {
                                if (cancelled) return
                                setProductMessages((m) => [
                                  ...m,
                                  { role: 'system', text: PRODUCT_SYSTEM_MICROTASK },
                                ])
                                after(PAUSE_LOOP_END, runCycle)
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    }

    runCycle()

    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [index])

  useEffect(() => {
    if (slides[index].layout !== PITCH_CHAT_LAYOUT) return
    productChatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [index, productMessages, productComposerText])

  const slide = slides[index]
  const themeClass = {
    dark: 'from-slate-950 via-slate-900 to-slate-800 text-white border-slate-700/60',
    accent: 'from-accent-700 via-accent-600 to-accent-500 text-white border-white/20',
    contrast: 'from-gray-950 via-gray-900 to-accent-900 text-white border-accent-300/20',
    contrastLight: 'from-slate-900 via-slate-800 to-accent-800 text-white border-white/20',
    contrastLighter: 'from-slate-800 via-slate-700 to-accent-700 text-white border-white/20',
    sunrise: 'from-[#2f3f6f] via-[#7a6a67] to-[#e39b5f] text-white border-white/20',
    /** Следующий шаг «восхода» после Insight: небо и подсветка теплее и светлее */
    sunriseBright:
      'from-[#4d6294] via-[#a8968a] to-[#eebd86] text-white border-white/25',
    /** Слева направо: солнечный угол → сумерки и вечер (левый тон сохраняет «солнце», но не для бледного текста) */
    sunToEvening:
      'from-[#deb87a] via-[#4a3a52] to-[#101820] text-white border-white/25',
    /**
     * Структура программы: мост между соседними слайдами.
     * От тона предыдущего (механика, sunToEvening): снизу справа to #101820 + via #4a3a52.
     * К следующему (Value, dark): сверху слева slate-950 #020617.
     */
    violetToBlue:
      'from-[#4a3a52] via-[#1c2744] to-[#020617] text-white border-white/20',
    clean: 'from-white via-gray-50 to-accent-50/40 text-gray-900 border-gray-200',
  }[slide.theme]

  return (
    <main className="min-h-screen bg-[#06090f] px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex items-center justify-between text-sm text-gray-400">
          <span className="font-medium">Pre-Prod Pitch Deck</span>
          <span>Слайд {progress}</span>
        </div>

        <section
          className={`relative flex flex-col overflow-hidden rounded-3xl border bg-gradient-to-br shadow-2xl p-8 sm:p-12 h-[74vh] ${themeClass}`}
        >
          <style>{`
            @keyframes cat-forward {
              0% { transform: translateX(0); }
              100% { transform: translateX(28px); }
            }
            @keyframes target-forward {
              0% { transform: translateX(0); }
              100% { transform: translateX(64px); }
            }
            @keyframes cat-jump-cycle {
              0%, 18%, 100% { transform: translateY(0); }
              9% { transform: translateY(-6px); }
            }
            @keyframes pixel-flicker {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.72; }
            }
            @keyframes caret-blink {
              0%, 45% { opacity: 1; }
              46%, 55% { opacity: 0; }
              56%, 100% { opacity: 1; }
            }
            .typing-caret {
              animation: caret-blink 1.1s steps(1, end) infinite;
              margin-left: 1px;
              font-weight: 300;
            }
            .pixel-font {
              font-family: "Courier New", "SFMono-Regular", Menlo, Monaco, Consolas, monospace;
              letter-spacing: 0.02em;
              text-transform: uppercase;
            }
            .cat-runner {
              left: 64px;
              animation: cat-forward 5.2s linear infinite;
            }
            .hero-closing-scene .cat-sit-wrap {
              animation: none;
            }
            .hero-closing-scene .cat-sit-wrap .cat-sprite {
              animation: none;
            }
            .hero-closing-scene .cat-tail {
              animation: none;
            }
            .hero-closing-scene .cat-pose {
              animation: none !important;
            }
            .hero-closing-scene .cat-pose-1 {
              opacity: 1;
            }
            .hero-closing-scene .cat-pose-2,
            .hero-closing-scene .cat-pose-3 {
              display: none;
            }
            .cat-sit-chat {
              left: 22%;
              bottom: 1.35rem;
              transform: translateX(-50%);
            }
            .bird-sit-chat {
              left: 70%;
              bottom: 1.85rem;
              transform: translateX(-50%);
            }
            .hero-closing-scene .bird-sit-static {
              animation: none;
            }
            .hero-closing-scene .bird-sit-static .bird-wing-up {
              display: none;
            }
            .cat-sprite {
              animation: cat-jump-cycle 1.1s ease-in-out infinite;
            }
            .cat-pose {
              opacity: 0;
            }
            .cat-pose-1 {
              animation: cat-pose-1 0.45s steps(1, end) infinite;
            }
            .cat-pose-2 {
              animation: cat-pose-2 0.45s steps(1, end) infinite;
            }
            .cat-pose-3 {
              animation: cat-pose-3 0.45s steps(1, end) infinite;
            }
            @keyframes cat-pose-1 {
              0%, 33% { opacity: 1; }
              34%, 100% { opacity: 0; }
            }
            @keyframes cat-pose-2 {
              0%, 33% { opacity: 0; }
              34%, 66% { opacity: 1; }
              67%, 100% { opacity: 0; }
            }
            @keyframes cat-pose-3 {
              0%, 66% { opacity: 0; }
              67%, 100% { opacity: 1; }
            }
            .cat-outline rect {
              shape-rendering: crispEdges;
            }
            .flying-target {
              left: 210px;
              animation: target-forward 5.2s linear infinite, bird-bob 0.8s ease-in-out infinite;
            }
            .bird-wing-up {
              animation: bird-wing-up 0.38s steps(1, end) infinite;
            }
            .bird-wing-down {
              animation: bird-wing-down 0.38s steps(1, end) infinite;
            }
            @keyframes bird-wing-up {
              0%, 49% { opacity: 1; }
              50%, 100% { opacity: 0; }
            }
            @keyframes bird-wing-down {
              0%, 49% { opacity: 0; }
              50%, 100% { opacity: 1; }
            }
            @keyframes bird-bob {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-2px); }
            }
            .cat-tail {
              transform-origin: 14px 30px;
              animation: tail-swish 0.65s ease-in-out infinite;
            }
            @keyframes tail-swish {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(-7deg); }
            }
            .pixel-scan {
              background-image: linear-gradient(
                to bottom,
                rgba(255,255,255,0.05) 0px,
                rgba(255,255,255,0.05) 1px,
                transparent 1px,
                transparent 3px
              );
              background-size: 100% 3px;
            }
            .pixel-caret {
              animation: pixel-flicker 0.9s steps(1, end) infinite;
            }
            .meow-blink {
              animation: pixel-flicker 1.2s steps(1, end) infinite;
            }
            .marker-pink {
              background-image: linear-gradient(
                177deg,
                transparent 48%,
                rgba(224, 138, 59, 0.46) 48%,
                rgba(224, 138, 59, 0.46) 80%,
                transparent 80%
              );
              background-repeat: no-repeat;
              padding: 0 1px;
              box-decoration-break: clone;
              -webkit-box-decoration-break: clone;
            }
            @keyframes star-drift {
              0% { transform: translate3d(0, 0, 0); }
              50% { transform: translate3d(-6px, 4px, 0); }
              100% { transform: translate3d(0, 0, 0); }
            }
            .starfield-drift {
              animation: star-drift 18s ease-in-out infinite;
              will-change: transform;
            }
            @keyframes bubble-in {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .bubble-in {
              animation: bubble-in 260ms ease-out both;
            }
            /* Чат: пузыри с «завитушкой»-хвостом, левый / правый */
            .chat-bubble-them {
              --chat-bg: rgba(255, 255, 255, 0.14);
              --chat-br: rgba(255, 255, 255, 0.22);
              position: relative;
              background: var(--chat-bg);
              border: 1px solid var(--chat-br);
              border-radius: 1.15rem 1.15rem 1.15rem 0.35rem;
              box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
            }
            .chat-bubble-them::before {
              content: '';
              position: absolute;
              bottom: 7px;
              left: -7px;
              width: 0;
              height: 0;
              border: 7px solid transparent;
              border-right-color: var(--chat-bg);
              border-left: 0;
            }
            .chat-bubble-them::after {
              content: '';
              position: absolute;
              bottom: 6px;
              left: -9px;
              width: 0;
              height: 0;
              border: 8px solid transparent;
              border-right-color: var(--chat-br);
              border-left: 0;
              z-index: 0;
            }
            .chat-bubble-me {
              --chat-bg: rgba(125, 211, 252, 0.18);
              --chat-br: rgba(186, 230, 253, 0.42);
              position: relative;
              background: var(--chat-bg);
              border: 1px solid var(--chat-br);
              border-radius: 1.15rem 1.15rem 0.35rem 1.15rem;
              box-shadow: 0 6px 16px rgba(0, 0, 0, 0.22);
            }
            .chat-bubble-me::before {
              content: '';
              position: absolute;
              bottom: 7px;
              right: -7px;
              width: 0;
              height: 0;
              border: 7px solid transparent;
              border-left-color: var(--chat-bg);
              border-right: 0;
            }
            .chat-bubble-me::after {
              content: '';
              position: absolute;
              bottom: 6px;
              right: -9px;
              width: 0;
              height: 0;
              border: 8px solid transparent;
              border-left-color: var(--chat-br);
              border-right: 0;
              z-index: 0;
            }
            @keyframes trainer-hint-glow {
              0% {
                opacity: 0;
                transform: translateY(4px);
                box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
                box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.45), 0 12px 32px rgba(251, 191, 36, 0.14);
              }
            }
            .trainer-hint-glow {
              animation: trainer-hint-glow 380ms ease-out both;
            }
            @keyframes trainer-hint-pulse {
              0%, 100% { box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.4), 0 12px 32px rgba(251, 191, 36, 0.12); }
              50% { box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.55), 0 12px 36px rgba(251, 191, 36, 0.22); }
            }
            .trainer-hint-banner {
              animation:
                trainer-hint-glow 380ms ease-out both,
                trainer-hint-pulse 1.6s ease-in-out infinite 380ms;
            }
            .chat-system-card {
              background: linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(30, 27, 75, 0.35));
              border: 1px solid rgba(165, 180, 252, 0.4);
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            }
            .product-slide-scroll {
              scrollbar-width: thin;
              scrollbar-color: rgba(255, 255, 255, 0.28) transparent;
            }
            .product-slide-scroll::-webkit-scrollbar {
              width: 5px;
            }
            .product-slide-scroll::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.22);
              border-radius: 999px;
            }
            @media (max-height: 720px) {
              .pitch-value-bullets {
                font-size: 9px;
                line-height: 1.4;
              }
              .pitch-value-bullets li {
                padding-top: 0.125rem;
                padding-bottom: 0.125rem;
              }
            }
            @media (max-height: 640px) {
              .pitch-program-modules-root {
                gap: 0.25rem;
              }
              .pitch-program-modules-grid {
                gap: 0.375rem 0.5rem;
                grid-auto-flow: column;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                grid-template-rows: repeat(3, minmax(3.1rem, 1fr));
              }
            }
          `}</style>
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-300/20 blur-3xl" />
          <div
            className={`starfield-drift pointer-events-none absolute inset-0 ${slide.layout === 'programModules' ? 'opacity-25' : 'opacity-40'}`}
            style={{
            backgroundImage:
              'radial-gradient(circle at 8% 14%, rgba(255,255,255,0.75) 1px, transparent 1.5px), radial-gradient(circle at 16% 78%, rgba(255,255,255,0.45) 1px, transparent 1.5px), radial-gradient(circle at 27% 44%, rgba(255,255,255,0.55) 1px, transparent 1.5px), radial-gradient(circle at 39% 22%, rgba(255,255,255,0.5) 1px, transparent 1.5px), radial-gradient(circle at 51% 68%, rgba(255,255,255,0.6) 1px, transparent 1.5px), radial-gradient(circle at 64% 36%, rgba(255,255,255,0.45) 1px, transparent 1.5px), radial-gradient(circle at 74% 18%, rgba(255,255,255,0.7) 1px, transparent 1.5px), radial-gradient(circle at 83% 58%, rgba(255,255,255,0.5) 1px, transparent 1.5px), radial-gradient(circle at 92% 28%, rgba(255,255,255,0.55) 1px, transparent 1.5px), radial-gradient(circle at 95% 82%, rgba(255,255,255,0.75) 1px, transparent 1.5px)',
          }} />

          <div
            className={`relative z-10 flex min-h-0 flex-1 flex-col overflow-x-hidden overscroll-contain pt-0 ${
              slide.layout === 'programModules'
                ? 'overflow-y-hidden pb-20 sm:pb-24 md:pb-28'
                : 'overflow-y-auto pb-28 sm:pb-32 md:pb-36'
            }`}
          >
            {slide.kicker && (
              <p
                className={`uppercase tracking-[0.18em] font-semibold opacity-80 ${
                  slide.layout === 'productInfo' ||
                  slide.layout === PITCH_CHAT_LAYOUT ||
                  slide.layout === 'mechanicsCycle' ||
                  slide.layout === 'programModules' ||
                  slide.layout === 'heroClosing'
                    ? 'mb-1 text-[10px] tracking-[0.2em]'
                    : 'mb-4 text-xs tracking-[0.18em]'
                }`}
              >
                {slide.kicker}
              </p>
            )}
            {slide.layout === 'hero' || slide.layout === 'heroClosing' ? (
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                <div>
                  {slide.layout === 'heroClosing' ? (
                    <>
                      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 max-w-xl">
                        {slide.title}
                      </h1>
                      {slide.closingBody ? (
                        <p className="mb-6 max-w-xl text-base leading-relaxed opacity-90 sm:text-lg">
                          {slide.closingBody}
                        </p>
                      ) : (
                        slide.subtitle && (
                          <p className="mb-6 max-w-xl text-lg opacity-90 sm:text-2xl">{slide.subtitle}</p>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      <h1 className="font-display text-6xl sm:text-8xl font-bold tracking-tight mb-3">{slide.title}</h1>
                      <p className="text-lg sm:text-2xl opacity-90 mb-6 max-w-xl">{slide.subtitle}</p>
                    </>
                  )}
                </div>

                <div className="rounded-2xl border border-white/20 bg-black/45 backdrop-blur-sm p-4 pixel-font">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-sm bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-sm bg-yellow-400/80" />
                    <span className="h-2.5 w-2.5 rounded-sm bg-green-400/80" />
                    <span className="ml-2 text-xs text-white/60">
                      {slide.layout === 'heroClosing' ? 'dialog://closing' : 'terminal://meow-mode'}
                    </span>
                  </div>

                  <div
                    className={`relative h-56 rounded-xl border border-white/15 bg-[#090d18] overflow-hidden pixel-scan ${
                      slide.layout === 'heroClosing' ? 'hero-closing-scene' : ''
                    }`}
                  >
                    {slide.layout === 'heroClosing' ? (
                      <>
                        <div className="absolute inset-x-2 top-2 z-10 flex max-h-[62%] flex-col gap-1 overflow-y-auto overscroll-contain pr-0.5">
                          {(slide.closingDialogue ?? []).map((line, i) => (
                            <div
                              key={`closing-line-${i}-${line.text.slice(0, 12)}`}
                              className={`flex ${line.speaker === 'bird' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className="max-w-[90%] rounded border border-white/18 bg-black/55 px-2 py-1 text-left text-[8px] font-medium leading-snug text-white/93 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:max-w-[85%] sm:text-[9px] normal-case">
                                {line.text}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="absolute bottom-8 left-0 right-0 h-[3px] bg-[#4f5fb8]/70" />

                        <div className="cat-sit-wrap cat-sit-chat absolute">
                          <svg
                            className="cat-sprite h-16 w-24"
                            viewBox="0 0 96 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="Пиксельный рыжий кот"
                          >
                            <g className="cat-tail">
                              <rect x="10" y="32" width="4" height="4" fill="#2A1A12" />
                              <rect x="14" y="28" width="4" height="4" fill="#2A1A12" />
                              <rect x="18" y="24" width="4" height="4" fill="#2A1A12" />
                              <rect x="22" y="20" width="4" height="4" fill="#2A1A12" />
                              <rect x="14" y="32" width="4" height="4" fill="#E08A3B" />
                              <rect x="18" y="28" width="4" height="4" fill="#E08A3B" />
                              <rect x="22" y="24" width="4" height="4" fill="#E08A3B" />
                            </g>
                            <rect x="24" y="26" width="34" height="16" fill="#E08A3B" />
                            <rect x="24" y="26" width="34" height="2" fill="#2A1A12" />
                            <rect x="24" y="40" width="34" height="2" fill="#2A1A12" />
                            <rect x="24" y="26" width="2" height="16" fill="#2A1A12" />
                            <rect x="56" y="26" width="2" height="16" fill="#2A1A12" />
                            <rect x="58" y="24" width="16" height="14" fill="#F4A259" />
                            <rect x="58" y="24" width="16" height="2" fill="#2A1A12" />
                            <rect x="58" y="36" width="16" height="2" fill="#2A1A12" />
                            <rect x="58" y="24" width="2" height="14" fill="#2A1A12" />
                            <rect x="72" y="24" width="2" height="14" fill="#2A1A12" />
                            <rect x="60" y="20" width="4" height="4" fill="#2A1A12" />
                            <rect x="68" y="20" width="4" height="4" fill="#2A1A12" />
                            <rect x="61" y="21" width="2" height="2" fill="#FFB6C4" />
                            <rect x="69" y="21" width="2" height="2" fill="#FFB6C4" />
                            <rect x="62" y="30" width="2" height="2" fill="#2A1A12" />
                            <rect x="68" y="30" width="2" height="2" fill="#2A1A12" />
                            <rect x="65" y="33" width="3" height="2" fill="#FF8FA6" />
                            <g className="cat-pose cat-pose-1">
                              <rect x="30" y="42" width="5" height="8" fill="#2A1A12" />
                              <rect x="44" y="42" width="5" height="8" fill="#2A1A12" />
                            </g>
                            <g className="cat-pose cat-pose-2">
                              <rect x="28" y="42" width="5" height="7" fill="#2A1A12" />
                              <rect x="46" y="42" width="5" height="10" fill="#2A1A12" />
                            </g>
                            <g className="cat-pose cat-pose-3">
                              <rect x="32" y="42" width="5" height="10" fill="#2A1A12" />
                              <rect x="42" y="42" width="5" height="7" fill="#2A1A12" />
                            </g>
                          </svg>
                        </div>

                        <div className="bird-sit-static bird-sit-chat absolute">
                          <svg
                            className="h-9 w-9"
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-label="Пиксельная птица"
                          >
                            <rect x="4" y="16" width="4" height="4" fill="#0B1020" />
                            <rect x="8" y="12" width="4" height="8" fill="#0B1020" />
                            <rect className="bird-wing-up" x="12" y="8" width="4" height="8" fill="#0B1020" />
                            <rect className="bird-wing-down" x="12" y="14" width="4" height="8" fill="#0B1020" />
                            <rect x="16" y="12" width="8" height="8" fill="#0B1020" />
                            <rect x="24" y="14" width="6" height="6" fill="#0B1020" />
                            <rect x="30" y="16" width="2" height="2" fill="#0B1020" />
                            <rect x="8" y="16" width="4" height="4" fill="#7ED0FF" />
                            <rect className="bird-wing-up" x="12" y="12" width="4" height="8" fill="#7ED0FF" />
                            <rect className="bird-wing-down" x="12" y="18" width="4" height="4" fill="#7ED0FF" />
                            <rect x="16" y="14" width="8" height="6" fill="#9BE7FF" />
                            <rect x="24" y="16" width="6" height="4" fill="#9BE7FF" />
                            <rect x="26" y="17" width="2" height="2" fill="#0B1020" />
                            <rect x="30" y="17" width="2" height="2" fill="#FFC857" />
                          </svg>
                        </div>

                        <div className="absolute right-3 bottom-2 text-[9px] text-white/45 normal-case">CAT ↔ BIRD</div>
                      </>
                    ) : (
                      <>
                    <div className="absolute left-4 top-4 text-[11px] text-[#95a1ff]">MEOW MODE: ON</div>
                    <div className="absolute left-4 top-9 text-[11px] text-[#b8f7d4]">
                      SAY: MЯУ <span className="meow-blink">_</span>
                    </div>
                    <div className="absolute left-4 top-16 text-[10px] text-white/55 normal-case">
                      Легкий вход в диалог
                    </div>

                    <div className="absolute bottom-8 left-0 right-0 h-[3px] bg-[#4f5fb8]/70" />

                    <div className="cat-runner absolute bottom-8">
                      <svg className="cat-sprite h-16 w-24" viewBox="0 0 96 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pixel orange cat running right">
                        <g className="cat-tail">
                          <rect x="10" y="32" width="4" height="4" fill="#2A1A12" />
                          <rect x="14" y="28" width="4" height="4" fill="#2A1A12" />
                          <rect x="18" y="24" width="4" height="4" fill="#2A1A12" />
                          <rect x="22" y="20" width="4" height="4" fill="#2A1A12" />
                          <rect x="14" y="32" width="4" height="4" fill="#E08A3B" />
                          <rect x="18" y="28" width="4" height="4" fill="#E08A3B" />
                          <rect x="22" y="24" width="4" height="4" fill="#E08A3B" />
                        </g>

                        <rect x="24" y="26" width="34" height="16" fill="#E08A3B" />
                        <rect x="24" y="26" width="34" height="2" fill="#2A1A12" />
                        <rect x="24" y="40" width="34" height="2" fill="#2A1A12" />
                        <rect x="24" y="26" width="2" height="16" fill="#2A1A12" />
                        <rect x="56" y="26" width="2" height="16" fill="#2A1A12" />

                        <rect x="58" y="24" width="16" height="14" fill="#F4A259" />
                        <rect x="58" y="24" width="16" height="2" fill="#2A1A12" />
                        <rect x="58" y="36" width="16" height="2" fill="#2A1A12" />
                        <rect x="58" y="24" width="2" height="14" fill="#2A1A12" />
                        <rect x="72" y="24" width="2" height="14" fill="#2A1A12" />

                        <rect x="60" y="20" width="4" height="4" fill="#2A1A12" />
                        <rect x="68" y="20" width="4" height="4" fill="#2A1A12" />
                        <rect x="61" y="21" width="2" height="2" fill="#FFB6C4" />
                        <rect x="69" y="21" width="2" height="2" fill="#FFB6C4" />

                        <rect x="62" y="30" width="2" height="2" fill="#2A1A12" />
                        <rect x="68" y="30" width="2" height="2" fill="#2A1A12" />
                        <rect x="65" y="33" width="3" height="2" fill="#FF8FA6" />

                        <g className="cat-pose cat-pose-1">
                          <rect x="30" y="42" width="5" height="8" fill="#2A1A12" />
                          <rect x="44" y="42" width="5" height="8" fill="#2A1A12" />
                        </g>
                        <g className="cat-pose cat-pose-2">
                          <rect x="28" y="42" width="5" height="7" fill="#2A1A12" />
                          <rect x="46" y="42" width="5" height="10" fill="#2A1A12" />
                        </g>
                        <g className="cat-pose cat-pose-3">
                          <rect x="32" y="42" width="5" height="10" fill="#2A1A12" />
                          <rect x="42" y="42" width="5" height="7" fill="#2A1A12" />
                        </g>
                      </svg>
                    </div>

                    <div className="flying-target absolute bottom-16">
                      <svg className="h-9 w-9" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Pixel bird flying right">
                        <rect x="4" y="16" width="4" height="4" fill="#0B1020" />
                        <rect x="8" y="12" width="4" height="8" fill="#0B1020" />
                        <rect className="bird-wing-up" x="12" y="8" width="4" height="8" fill="#0B1020" />
                        <rect className="bird-wing-down" x="12" y="14" width="4" height="8" fill="#0B1020" />
                        <rect x="16" y="12" width="8" height="8" fill="#0B1020" />
                        <rect x="24" y="14" width="6" height="6" fill="#0B1020" />
                        <rect x="30" y="16" width="2" height="2" fill="#0B1020" />

                        <rect x="8" y="16" width="4" height="4" fill="#7ED0FF" />
                        <rect className="bird-wing-up" x="12" y="12" width="4" height="8" fill="#7ED0FF" />
                        <rect className="bird-wing-down" x="12" y="18" width="4" height="4" fill="#7ED0FF" />
                        <rect x="16" y="14" width="8" height="6" fill="#9BE7FF" />
                        <rect x="24" y="16" width="6" height="4" fill="#9BE7FF" />

                        <rect x="26" y="17" width="2" height="2" fill="#0B1020" />
                        <rect x="30" y="17" width="2" height="2" fill="#FFC857" />
                      </svg>
                    </div>

                    <div className="absolute right-4 bottom-3 text-[10px] text-white/50">CAT → BIRD</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {slide.title &&
                  slide.layout !== 'productInfo' &&
                  slide.layout !== PITCH_CHAT_LAYOUT &&
                  slide.layout !== 'mechanicsCycle' &&
                  slide.layout !== 'programModules' &&
                  slide.layout !== 'heroClosing' && (
                  <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight whitespace-pre-line mb-4">
                    {slide.title}
                  </h1>
                )}
                {slide.subtitle &&
                  slide.layout !== 'productInfo' &&
                  slide.layout !== PITCH_CHAT_LAYOUT &&
                  slide.layout !== 'mechanicsCycle' &&
                  slide.layout !== 'programModules' &&
                  slide.layout !== 'heroClosing' && (
                  <p className="text-base sm:text-xl opacity-85 mb-8 max-w-3xl">{slide.subtitle}</p>
                )}
              </>
            )}

            {slide.layout === 'profile' && (
              <div className="mb-3 grid md:grid-cols-2 gap-6 md:items-start">
                <div
                  className="relative mx-auto aspect-[3/4] w-full max-w-[170px] overflow-hidden rounded-3xl border border-white/20 bg-transparent sm:max-w-[185px] md:mx-0 md:max-w-[200px] lg:max-w-[220px] md:justify-self-start"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}assets/natalia-photo.jpg`}
                    alt="Наталия Гурова"
                    className="absolute inset-0 h-full w-full object-contain object-center mix-blend-multiply"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>

                <div className="flex flex-col justify-center gap-4">
                  {slide.points.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/25 bg-white/10 px-5 py-3.5 text-base sm:text-lg font-normal"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'catStory' && (
              <div className="mb-8 pt-4">
                <div className="relative max-w-4xl space-y-4">
                  <div className="pointer-events-none absolute left-1 top-4 bottom-4 w-[2px] bg-gradient-to-b from-white/50 via-white/28 to-white/14" />
                  {slide.points.map((p, i) => (
                    <div key={p}>
                      <div
                        className="relative rounded-2xl bg-white/12 border border-white/22 px-6 py-[11px] backdrop-blur-[1px]"
                        style={{
                          marginLeft: `${38 + i * 72}px`,
                          width: '72%',
                        }}
                      >
                        <span className="absolute -left-8 top-1/2 -translate-y-1/2 h-px w-4 bg-white/28" />
                        <span className="absolute -left-5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white/88 shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />
                        <p className="text-[11px] uppercase tracking-[0.18em] opacity-58 mb-1">Этап {i + 1}</p>
                        <p
                          className="text-[14px] sm:text-[15px] leading-relaxed"
                          style={{ fontFamily: 'Gilroy, "Plus Jakarta Sans", sans-serif' }}
                        >
                          {i === 0 ? (
                            <>
                              Нашел <span className="marker-pink">работу мечты</span>
                            </>
                          ) : i === 3 ? (
                            <>
                              <span className="marker-pink">Увольнение</span> стало сюрпризом
                            </>
                          ) : (
                            p
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'insightSunrise' && (
              <div className="mb-4">
                <div className="grid md:grid-cols-2 gap-8 items-center min-h-[46vh]">
                  <div className="rounded-3xl border border-white/25 bg-white/10 backdrop-blur-[2px] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.20)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/75 mb-4">Исследование</p>
                    <div className="flex items-end gap-3">
                      <span className="font-display text-8xl sm:text-9xl leading-none text-white">7</span>
                      <span className="text-2xl sm:text-3xl pb-2 text-white/95">интервью</span>
                    </div>
                    <p className="mt-6 text-sm sm:text-base text-white/85 max-w-md">
                      Реальные истории первых месяцев работы в команде, без «теории в вакууме».
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl bg-white/12 border border-white/25 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/70 mb-1">Кто участвовал</p>
                      <div className="flex flex-wrap gap-2">
                        {slide.points.map((item) => (
                          <span key={item} className="px-3 py-1.5 rounded-xl bg-white/12 border border-white/20 text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/12 border border-white/25 px-5 py-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/70 mb-1">Ключевой вывод</p>
                      <p className="text-base sm:text-lg leading-relaxed text-white/95">
                        Проблема не в «слабых знаниях», а в адаптации под давлением:
                        как спрашивать, как держать контакт и как не выпадать из коммуникации.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/10 border border-white/20 px-5 py-3">
                      <p className="text-sm text-white/90">
                        Поэтому `Pre-Prod` тренирует не информацию, а поведение в рабочих ситуациях.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {slide.layout === 'mechanicsCycle' && (
              <div className="mb-0 flex w-full min-w-0 flex-col">
                <header className="max-w-3xl shrink-0 space-y-1.5 sm:space-y-2">
                  <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white [text-wrap:balance] whitespace-pre-line sm:text-4xl md:text-5xl">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">{slide.subtitle}</p>
                  )}
                </header>

                <div className="mt-2 grid w-full min-w-0 grid-cols-1 items-start gap-4 sm:mt-3 sm:gap-5 lg:mt-3 lg:grid-cols-2 lg:items-start lg:gap-x-10 lg:gap-y-4">
                  <div className="flex min-w-0 flex-col lg:max-w-xl">
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {slide.points.map((p) => (
                        <span
                          key={p}
                          className="rounded-2xl border border-white/20 bg-white/15 px-3 py-2 text-sm font-semibold backdrop-blur-sm sm:px-5 sm:py-2.5 sm:text-base"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex min-w-0 shrink-0 justify-center lg:justify-end lg:self-start">
                    <div className="w-full max-w-[280px] sm:max-w-[320px]">
                      <svg
                        viewBox="0 0 400 400"
                        className="h-auto w-full overflow-visible"
                        aria-label="Цикл: Сценарий, Выбор, Последствия, Микрозадания"
                      >
                        <defs>
                          <marker
                            id="mech-cycle-arrow-pitch"
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                          >
                            <path d="M0,0 L10,3 L0,6 Z" fill="rgba(255,255,255,0.55)" />
                          </marker>
                        </defs>
                        <circle
                          cx="200"
                          cy="200"
                          r="118"
                          fill="none"
                          stroke="rgba(255,255,255,0.14)"
                          strokeWidth="1"
                          strokeDasharray="5 10"
                        />
                        <g fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round">
                          <path
                            d="M 200 82 A 118 118 0 0 1 318 200"
                            markerEnd="url(#mech-cycle-arrow-pitch)"
                          />
                          <path
                            d="M 318 200 A 118 118 0 0 1 200 318"
                            markerEnd="url(#mech-cycle-arrow-pitch)"
                          />
                          <path
                            d="M 200 318 A 118 118 0 0 1 82 200"
                            markerEnd="url(#mech-cycle-arrow-pitch)"
                          />
                          <path
                            d="M 82 200 A 118 118 0 0 1 200 82"
                            markerEnd="url(#mech-cycle-arrow-pitch)"
                          />
                        </g>
                        <g className="select-none" fill="rgba(255,255,255,0.95)" fontWeight="600">
                          <text
                            x="200"
                            y="52"
                            textAnchor="middle"
                            fontSize="13"
                            fontFamily="system-ui, sans-serif"
                          >
                            Сценарий
                          </text>
                          <text
                            x="338"
                            y="206"
                            textAnchor="middle"
                            fontSize="13"
                            fontFamily="system-ui, sans-serif"
                          >
                            Выбор
                          </text>
                          <text
                            x="200"
                            y="358"
                            textAnchor="middle"
                            fontSize="13"
                            fontFamily="system-ui, sans-serif"
                          >
                            Последствия
                          </text>
                          <text
                            x="56"
                            y="200"
                            textAnchor="middle"
                            fontSize="12"
                            fontFamily="system-ui, sans-serif"
                          >
                            <tspan x="56" y="194">
                              Микро-
                            </tspan>
                            <tspan x="56" y="210">
                              задания
                            </tspan>
                          </text>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {slide.layout === 'programModules' && slide.modules && (
              <div className="pitch-program-modules-root mb-0 flex min-h-0 w-full min-w-0 max-w-[1200px] flex-1 flex-col gap-1.5 overflow-hidden sm:gap-2 md:gap-2.5">
                <header className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 md:gap-6">
                  <h1 className="min-w-0 max-w-[min(100%,20rem)] font-display text-[1.45rem] font-bold leading-[1.06] tracking-tight text-white [text-wrap:balance] sm:max-w-[min(100%,28rem)] sm:text-3xl md:max-w-xl md:text-[2.125rem] lg:max-w-2xl lg:text-4xl">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <div
                      className="flex shrink-0 flex-col gap-0.5 self-end text-right sm:self-start sm:items-end"
                      role="list"
                      aria-label="Параметры программы"
                    >
                      {(slide.subtitle.includes('·')
                        ? slide.subtitle.split(/\s*·\s*/)
                        : [slide.subtitle]
                      ).map((segment, i) => (
                        <span
                          key={`${segment}-${i}`}
                          className="text-[11px] font-semibold tabular-nums leading-snug tracking-tight text-white/90 sm:text-xs md:text-sm"
                          role="listitem"
                        >
                          {segment.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                  <span className="whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.2em] text-white/52 sm:text-[9px]">
                    Путь по модулям
                  </span>
                  <span
                    className="h-px min-w-[1.5rem] flex-1 bg-gradient-to-r from-white/22 via-white/12 to-transparent"
                    aria-hidden
                  />
                </div>

                <ol className="pitch-program-modules-grid m-0 grid h-full min-h-0 min-w-0 flex-1 grid-flow-col grid-cols-2 grid-rows-3 items-stretch gap-x-2 gap-y-0.5 [grid-template-rows:repeat(3,minmax(3.35rem,1fr))] sm:gap-x-3 sm:gap-y-1 sm:[grid-template-rows:repeat(3,minmax(3.5rem,1fr))] md:gap-x-4 md:gap-y-1.5 list-none p-0">
                  {slide.modules.map((mod) => (
                    <li key={mod.num} className="flex h-full min-h-0 min-w-0">
                      <div className="flex h-full min-h-0 min-w-0 flex-1 items-stretch gap-1.5 rounded-lg border border-white/13 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-1.5 shadow-[0_6px_18px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.07)] sm:gap-2 sm:rounded-xl sm:p-2 md:rounded-xl md:px-2.5 md:py-2 md:transition-colors md:hover:border-white/22">
                        <div className="flex h-6 w-6 shrink-0 basis-6 items-center justify-center self-start rounded-full border border-white/22 bg-black/25 text-[10px] font-bold tabular-nums leading-none text-white sm:h-7 sm:w-7 sm:basis-7 sm:text-[11px]">
                          {mod.num}
                        </div>
                        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-hidden">
                          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-1.5 gap-y-0">
                            <span className="min-w-0 break-words font-display text-[10px] font-semibold leading-snug tracking-tight text-white sm:text-[11px] md:text-xs">
                              {mod.path}
                            </span>
                            <span className="max-w-[100%] shrink-0 self-start rounded-full border border-white/12 bg-black/35 px-1.5 py-px text-center text-[6px] font-semibold tabular-nums leading-tight tracking-wide text-white/78 sm:px-1.5 sm:text-[7px] md:text-[8px]">
                              {mod.sessions}
                            </span>
                          </div>
                          <p className="mt-0.5 line-clamp-2 break-words text-[7px] leading-snug text-white/75 sm:mt-1 sm:text-[8px] md:text-[9px]">
                            {mod.body}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {slide.layout === 'productInfo' && (
              <div className="relative mb-0 -mt-0.5 grid min-h-0 w-full max-h-[min(56vh,calc(74vh-13.5rem))] grid-cols-1 gap-5 overflow-hidden pb-1 pt-3 sm:max-h-[min(52vh,calc(74vh-13rem))] sm:gap-6 sm:pt-4 md:max-h-[min(calc(74vh-14rem),58vh)] md:grid-cols-2 md:items-stretch md:gap-0 md:pt-4">
                <div className="pointer-events-none absolute left-1/2 top-[15%] hidden h-[70%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" aria-hidden />

                <div className="product-slide-scroll flex min-h-0 flex-col justify-center gap-4 overflow-y-auto overscroll-contain pr-0 md:max-h-full md:pr-8 md:pt-1">
                  <header className="shrink-0 space-y-4 sm:space-y-5">
                    <h2 className="font-display text-5xl font-bold leading-[0.92] tracking-[-0.04em] text-white [text-wrap:balance] sm:text-6xl md:text-7xl lg:text-[4.35rem] xl:text-[4.85rem]">
                      Pre-Prod
                    </h2>
                    <p className="max-w-lg text-base font-medium leading-snug text-white/70 sm:text-lg">
                      Тренажёр для первых месяцев в IT: поведение в реальных рабочих ситуациях.
                    </p>
                    <div className="h-px max-w-[4.5rem] bg-gradient-to-r from-accent-200/80 to-transparent" aria-hidden />
                  </header>

                  {slide.metrics && (
                    <section className="shrink-0 space-y-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Режим</p>
                      <div className="grid max-w-lg grid-cols-3 gap-2">
                        {slide.metrics.map((m) => (
                          <div
                            key={m}
                            className="rounded-2xl border border-white/[0.16] bg-white/[0.07] px-2.5 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:py-3"
                          >
                            <span className="block text-[11px] font-semibold leading-tight text-white/95 sm:text-xs">
                              {m}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <section className="mt-auto max-w-lg shrink-0 rounded-2xl border border-white/[0.12] bg-black/20 px-3.5 py-2.5 sm:px-4 sm:py-3">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      Идея продукта
                    </p>
                    <p className="text-xs leading-relaxed text-white/78 sm:text-sm">
                      Не заучивать теорию, а закреплять{' '}
                      <span className="font-medium text-white">действия</span>.
                    </p>
                  </section>
                </div>

                <div className="product-slide-scroll flex min-h-0 flex-col justify-center overflow-y-auto overscroll-contain pl-0 md:max-h-full md:pl-8 md:pt-1">
                  <section className="flex min-h-0 flex-1 flex-col rounded-2xl border border-white/[0.14] bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-transparent p-4 shadow-[0_16px_40px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-5 md:p-5 md:py-6">
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-200/90">
                      Как устроено
                    </p>
                    <p className="text-sm font-medium leading-snug text-white/92 sm:text-base">
                      Без лекций — короткие сценарии и микрозадания в ритме рабочих дедлайнов, как в настоящей команде.
                    </p>
                    <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                      Три опоры на испытательном сроке
                    </p>
                    <ul className="mt-2 flex flex-col gap-2 sm:gap-2.5">
                      <li className="flex gap-2.5 rounded-xl border border-white/10 bg-black/20 px-2.5 py-2 sm:px-3 sm:py-2.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-300" aria-hidden />
                        <span className="text-xs leading-snug text-white/88 sm:text-sm">
                          <span className="font-semibold text-white">Коммуникация</span> — что и как говорить коллегам и
                          руководителю
                        </span>
                      </li>
                      <li className="flex gap-2.5 rounded-xl border border-white/10 bg-black/20 px-2.5 py-2 sm:px-3 sm:py-2.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-300" aria-hidden />
                        <span className="text-xs leading-snug text-white/88 sm:text-sm">
                          <span className="font-semibold text-white">Саморегуляция</span> — работа со сложными
                          эмоциями в напряжённых ситуациях
                        </span>
                      </li>
                      <li className="flex gap-2.5 rounded-xl border border-white/10 bg-black/20 px-2.5 py-2 sm:px-3 sm:py-2.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-300" aria-hidden />
                        <span className="text-xs leading-snug text-white/88 sm:text-sm">
                          <span className="font-semibold text-white">Самоорганизация</span> — как человек выстраивает
                          свою работу: с чего начать, что важнее и на чём держать фокус
                        </span>
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            )}

            {slide.layout === PITCH_CHAT_LAYOUT && (
              <div className="mb-0 -mt-0.5 flex h-[calc(74vh-12.75rem)] min-h-0 w-full flex-col gap-2 overflow-hidden sm:h-[calc(74vh-14rem)] md:grid md:h-[calc(74vh-14.75rem)] md:grid-cols-2 md:items-stretch md:gap-3">
                <div className="product-slide-scroll flex min-h-0 min-w-0 flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain pt-2 pr-1 sm:gap-2 sm:pt-3 md:h-full md:max-h-full md:shrink-0 md:pr-3 md:pt-3">
                  <header className="pitch-value-slide-text shrink-0 space-y-0.5 sm:space-y-1">
                    <h2 className="font-display text-2xl font-bold leading-[1.08] tracking-tight text-white [text-wrap:balance] whitespace-pre-line sm:text-3xl md:text-[2rem] lg:text-4xl">
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className="max-w-md text-[10px] leading-snug text-white/78 sm:text-xs">{slide.subtitle}</p>
                    )}
                  </header>
                  <div className="mt-4 shrink-0 space-y-2.5 sm:mt-5 sm:space-y-3 md:mt-6 md:space-y-3.5">
                    <div className="h-px w-10 shrink-0 bg-gradient-to-r from-white/35 to-transparent" aria-hidden />
                    <ul className="pitch-value-bullets m-0 max-w-xl list-none shrink-0 space-y-2.5 py-0 pr-1 text-[10px] leading-snug sm:space-y-3 sm:text-[11px] md:space-y-3.5 md:text-xs md:leading-relaxed">
                      {(slide.valueBullets ?? slide.points.map((text) => ({ emoji: null, text }))).map((item, i) => (
                        <li
                          key={`${i}-${item.text.slice(0, 24)}`}
                          className="flex gap-2.5 py-0.5 sm:gap-3 sm:py-1"
                        >
                          {item.emoji != null && item.emoji !== '' && (
                            <span className="shrink-0 pt-0.5 text-[0.95em] leading-none sm:pt-px sm:text-base" aria-hidden>
                              {item.emoji}
                            </span>
                          )}
                          <span className="min-w-0 text-white/92">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex w-full min-h-[200px] flex-1 flex-col md:h-full md:min-h-0">
                  <div className="flex-1 min-h-0 space-y-3 overflow-y-auto overscroll-contain px-0.5 py-0.5">
                    {productMessages.map((msg, i) => {
                      const isUser = msg.role === 'user'
                      const isSystem = msg.role === 'system'
                      const prev = productMessages[i - 1]
                      const showAuthor = i === 0 || !prev || prev.role !== msg.role

                      if (isSystem) {
                        return (
                          <div key={`m-${i}`} className="flex w-full justify-center px-1">
                            <div className="flex w-full max-w-[min(100%,22rem)] flex-col items-center gap-1">
                              {showAuthor && (
                                <span className="text-[7px] uppercase tracking-[0.16em] text-indigo-200/75 sm:text-[8px]">
                                  Система · Pre-Prod
                                </span>
                              )}
                              <div className="bubble-in chat-system-card w-full rounded-xl px-2.5 py-2 text-left text-[9px] leading-snug text-indigo-50/95 sm:text-[10px]">
                                {msg.text}
                              </div>
                            </div>
                          </div>
                        )
                      }

                      return (
                        <div
                          key={`m-${i}`}
                          className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`flex max-w-[min(47%,18.5rem)] flex-col gap-1 sm:max-w-[min(48%,21rem)] ${
                              isUser ? 'items-end pl-6' : 'items-start pr-6'
                            }`}
                          >
                            {showAuthor && (
                              <span className="px-1 text-[7px] uppercase tracking-[0.16em] text-white/50 sm:text-[8px]">
                                {isUser ? 'Вы' : 'Тимлид'}
                              </span>
                            )}
                            <div
                              className={`bubble-in relative z-[1] w-full px-2.5 py-1.5 text-[9px] leading-snug text-white/95 sm:text-[10px] ${
                                isUser ? 'chat-bubble-me' : 'chat-bubble-them'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={productChatEndRef} className="h-px w-full shrink-0" aria-hidden />
                  </div>

                  <div className="mt-auto shrink-0 space-y-1.5 border-t border-white/10 pt-2">
                    {productTrainerHint && (
                      <p
                        key={productTrainerHint}
                        className="trainer-hint-banner rounded-lg border border-amber-400/55 bg-amber-950/55 px-2 py-1.5 text-[8px] leading-snug text-amber-50/98 ring-1 ring-amber-400/35 sm:text-[9px]"
                      >
                        <span className="font-semibold text-amber-200/95">Система: </span>
                        {productTrainerHint}
                      </p>
                    )}
                    <div
                      className={`flex min-h-[38px] items-center rounded-lg border px-2.5 py-2 text-[9px] leading-snug transition-colors duration-200 sm:text-[10px] ${
                        productComposerTone === 'bad'
                          ? 'border-red-400/75 bg-red-950/45 text-red-50/95 ring-1 ring-red-500/30'
                          : productComposerTone === 'good'
                            ? 'border-emerald-400/75 bg-emerald-950/35 text-emerald-50/95 ring-1 ring-emerald-400/30'
                            : 'border-white/15 bg-white/5 text-white/88'
                      }`}
                    >
                      {productComposerMode === 'typing' && (
                        <span>
                          {productComposerText}
                          <span className="typing-caret inline text-current opacity-90">|</span>
                        </span>
                      )}
                      {productComposerMode === 'idle' && (
                        <span className="text-white/40">Написать сообщение…</span>
                      )}
                      {productComposerMode === 'sent' && (
                        <span className="text-white/65">Сообщение отправлено</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {slide.chips && slide.layout !== 'mechanicsCycle' && (
              <div className="flex flex-wrap gap-3">
                {slide.points.map((p) => (
                  <span
                    key={p}
                    className="px-6 py-3 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 font-semibold text-base"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}

            {slide.flow && (
              <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                {slide.points.map((p, i) => (
                  <div key={p} className="flex items-center gap-3">
                    <span className="px-6 py-3 rounded-2xl bg-white/15 border border-white/20 font-semibold">{p}</span>
                    {i < slide.points.length - 1 && <span className="opacity-60">→</span>}
                  </div>
                ))}
              </div>
            )}

            {!slide.layout && !slide.chips && !slide.flow && (
              <ul className="space-y-3 text-base sm:text-lg leading-relaxed max-w-3xl">
                {slide.points.map((p) => (
                  <li key={p} className="rounded-2xl bg-white/15 border border-white/20 px-6 py-4">
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}

            {slide.metrics && slide.layout !== 'productInfo' && slide.layout !== PITCH_CHAT_LAYOUT && (
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl">
                {slide.metrics.map((m) => (
                  <div
                    key={m}
                    className="rounded-2xl bg-white/12 border border-white/25 px-4 py-3 text-center font-semibold"
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="absolute left-8 right-8 bottom-8 z-30 pt-6 border-t border-white/20 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={index === 0}
              className="px-5 py-2.5 rounded-xl border border-white/30 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            >
              ← Назад
            </button>
            <div className="hidden sm:flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={`nav-dot-${i}-${s.kicker || 'slide'}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/35'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={index === last}
              className="px-5 py-2.5 rounded-xl bg-white text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              Далее →
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
