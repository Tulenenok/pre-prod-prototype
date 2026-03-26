import { useMode } from '../context/ModeContext'

const quotes = [
  '«Будет очень стремно это говорить, что ты что-то не понимаешь»',
  '«Мне некомфортно быть неудобным задавать дополнительные вопросы»',
  '«Мне было не суперкомфортно мучить моего бадди вопросами»',
]

const steps = [
  {
    num: '01',
    title: 'Сценарий',
    desc: 'Проживаешь рабочую ситуацию от первого лица, делаешь выбор из трех стратегий, видишь последствия каждой',
  },
  {
    num: '02',
    title: 'Саморегуляция',
    desc: 'Распознаешь свой паттерн (страх, избегание, затягивание), получаешь прием для реальной ситуации',
  },
  {
    num: '03',
    title: 'Микрозадание',
    desc: 'Одно конкретное действие на работе сегодня: от наблюдения до реального поступка',
  },
]

const modules = [
  { name: 'Начало', desc: 'Знакомство с форматом тренажера и первые рабочие ситуации' },
  { name: 'Замечать', desc: 'Учимся замечать стрессовые реакции в теле и поведении' },
  { name: 'Называть', desc: 'Осваиваем практику называния эмоций (affect labeling)' },
  { name: 'Действовать', desc: 'Выбираем и пробуем новые стратегии поведения' },
  { name: 'Встраивать', desc: 'Переносим навыки из тренажера в реальную работу' },
  { name: 'Расти', desc: 'Закрепляем привычки и отслеживаем прогресс' },
]

const painPoints = [
  {
    junior: '«Я боюсь спрашивать»',
    mentor: '«Он не спрашивает, потом неделю делает задачу»',
  },
  {
    junior: '«Не понимаю, чего от меня ждут»',
    mentor: '«Он молчит, я не знаю, где он застрял»',
  },
]

export default function Landing({ onNavigate }) {
  const { isInstructor } = useMode()

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes hero-float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, -30px) rotate(3deg); }
          50% { transform: translate(-10px, 15px) rotate(-2deg); }
          75% { transform: translate(20px, 10px) rotate(4deg); }
        }
        @keyframes hero-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, -15px) scale(1.05); }
          66% { transform: translate(15px, 25px) scale(0.95); }
        }
        @keyframes hero-float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, -25px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-float-1 { animation: hero-float-1 20s ease-in-out infinite; }
        .anim-float-2 { animation: hero-float-2 25s ease-in-out infinite; }
        .anim-float-3 { animation: hero-float-3 18s ease-in-out infinite; }
        .anim-fade-in { animation: fade-in-up 0.8s ease-out both; }
        .anim-fade-in-d1 { animation: fade-in-up 0.8s 0.15s ease-out both; }
        .anim-fade-in-d2 { animation: fade-in-up 0.8s 0.3s ease-out both; }
        .anim-fade-in-d3 { animation: fade-in-up 0.8s 0.45s ease-out both; }
      `}</style>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent-50 via-white to-accent-100/60">
        <div className="absolute top-16 -left-32 w-[30rem] h-[30rem] bg-accent-200/30 rounded-full blur-3xl pointer-events-none anim-float-1" />
        <div className="absolute bottom-16 -right-32 w-[28rem] h-[28rem] bg-accent-300/20 rounded-full blur-3xl pointer-events-none anim-float-2" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-accent-100/40 rounded-full blur-3xl pointer-events-none anim-float-3" />
        <div
          className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-accent-200/25 rounded-full blur-3xl pointer-events-none anim-float-2"
          style={{ animationDelay: '-8s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-accent-100/80 text-accent-700 text-sm font-medium rounded-full mb-8 backdrop-blur-sm border border-accent-200/50 anim-fade-in">
            <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
            {isInstructor ? 'Кликабельный прототип продукта' : 'Асинхронный тренажер soft skills'}
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.1] anim-fade-in-d1">
            {isInstructor ? (
              <>
                Pre-Prod: тренажер трех компетенций{' '}
                <span className="text-accent-600">адаптации в IT-команде</span>
              </>
            ) : (
              <>
                <span className="text-accent-600">Спрашивай.</span>{' '}
                Действуй.{' '}
                <span className="text-accent-600">Расти.</span>
              </>
            )}
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto anim-fade-in-d2">
            Тренажер для начинающих IT-специалистов, который учит{' '}
            <span className="mark">общаться в команде</span>,{' '}
            <span className="mark">справляться со стрессом</span> и{' '}
            <span className="mark">организовать работу</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 anim-fade-in-d3">
            <button
              onClick={() => onNavigate('session')}
              className="px-8 py-4 bg-accent-600 text-white rounded-2xl font-semibold text-lg hover:bg-accent-700 active:scale-[0.97] transition-all duration-200 shadow-xl shadow-accent-600/25 hover:shadow-2xl hover:shadow-accent-600/30"
            >
              Попробовать сессию
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-white/80 text-gray-700 rounded-2xl font-semibold text-lg hover:bg-white transition-all duration-200 border border-gray-200/80 shadow-lg backdrop-blur-sm"
            >
              Узнать больше
            </button>
            <button
              onClick={() => onNavigate('pitch')}
              className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg hover:bg-black transition-all duration-200 shadow-lg"
            >
              Открыть презентацию
            </button>
          </div>

          <p className="text-sm text-gray-400 anim-fade-in-d3">
            Демо-сессия ~5 минут · Без регистрации
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 animate-bounce">
          <span className="text-xs tracking-wide">Подробнее</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════ PROBLEM ═══════════════════════ */}
      <section
        className="py-24 sm:py-28 px-6 bg-gray-900 text-white relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-40 bg-accent-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-display text-8xl sm:text-9xl font-extrabold text-accent-400 tracking-tight leading-none">
              28%
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-6 mb-4 leading-tight">
              начинающих специалистов
              <br />
              не проходят испытательный срок
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Причина не в нехватке технических навыков, а в неумении коммуницировать,
              справляться со стрессом и организовывать свою работу.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {quotes.map((q, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="text-accent-400 text-5xl font-serif leading-none mb-3 select-none">
                  &ldquo;
                </div>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                  {q}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 italic">
            По результатам 7 глубинных интервью с джунами и менторами
          </p>
        </div>
      </section>

      {/* ═══════════════════════ THREE COMPETENCIES ═══════════════════════ */}
      <section className="py-24 sm:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Три ключевые компетенции
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Все, что нужно для успешной адаптации на рабочем месте
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Communication */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-50 group-hover:bg-accent-100 transition-colors duration-300 mb-6 shadow-sm">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">
                Коммуникация в команде
              </h3>
              <ul className="space-y-3 text-gray-500 text-[0.95rem] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    <span className="mark">Запрос помощи</span> с контекстом
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    <span className="mark">Уточнение задач</span> у наставника
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    Реакция на <span className="mark">код-ревью</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    <span className="mark">Статус-апдейты</span> для команды
                  </span>
                </li>
              </ul>
            </div>

            {/* Self-regulation */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-50 group-hover:bg-accent-100 transition-colors duration-300 mb-6 shadow-sm">
                <span className="text-3xl">🧘</span>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Саморегуляция</h3>
              <ul className="space-y-3 text-gray-500 text-[0.95rem] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    Распознавание <span className="mark">паттернов</span>: молчание, затягивание
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    <span className="mark">Affect labeling</span>: называние эмоций
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    Действие через <span className="mark">дискомфорт</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Work organization */}
            <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-50 group-hover:bg-accent-100 transition-colors duration-300 mb-6 shadow-sm">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">
                Организация работы
              </h3>
              <ul className="space-y-3 text-gray-500 text-[0.95rem] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    <span className="mark">Планирование</span> рабочего дня
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    Фиксация <span className="mark">блокеров</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-400 mt-0.5 shrink-0">•</span>
                  <span>
                    Подготовка к <span className="mark">встречам с наставником</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="py-24 sm:py-28 px-6 bg-gradient-to-br from-accent-50 via-accent-50/30 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Как устроена сессия
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Каждая сессия состоит из трех форматов, которые дополняют друг друга
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-accent-200 via-accent-400 to-accent-200 rounded-full" />

            {steps.map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-600 text-white font-bold text-xl mb-6 shadow-lg shadow-accent-600/25 relative z-10 font-display">
                  {s.num}
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-16 text-xl text-gray-700 font-medium">
            Одна сессия. Три формата. <span className="mark">10 минут в день</span>.
          </p>
        </div>
      </section>

      {/* ═══════════════════════ PROGRAM PATH ═══════════════════════ */}
      <section className="py-24 sm:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Путь из 25 сессий
            </h2>
            <p className="text-lg text-gray-500">
              6 модулей: от первого осознания к устойчивой привычке
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
            {modules.map((mod, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    i === 0
                      ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/20'
                      : 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:border-accent-300'
                  }`}
                >
                  {mod.name}
                </div>
                {i < modules.length - 1 && (
                  <svg
                    className="w-4 h-4 text-accent-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14">
            {modules.map((mod, i) => (
              <div
                key={i}
                className="group rounded-xl bg-gray-50 border border-gray-100 p-5 hover:border-accent-200 hover:bg-accent-50/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xs font-bold text-accent-500 font-display">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-bold text-gray-900">{mod.name}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-base text-gray-600 font-medium mb-4">
            25 сессий · 5 недель · 3 компетенции · 23 образовательных результата
          </p>

          {isInstructor && (
            <p className="text-center text-sm text-accent-600 bg-accent-50 inline-flex mx-auto px-5 py-2.5 rounded-xl">
              Теоретическая основа: SBL (Clark, 2013) · Action Mapping (Moore, 2017) · Таксономия
              Финка (2003)
            </p>
          )}
        </div>
      </section>

      {/* ═══════════════════════ PAIN INTERSECTION (instructor only) ═══════════════════════ */}
      {isInstructor && (
        <section className="py-24 sm:py-28 px-6 bg-gradient-to-br from-accent-50 via-accent-50/30 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Одна проблема, два взгляда
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Продукт работает на стыке двух перспектив
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="text-center py-3">
                <span className="text-2xl mb-1 block">👩‍💻</span>
                <span className="font-display font-bold text-gray-900">Джун</span>
              </div>
              <div className="text-center py-3">
                <span className="text-2xl mb-1 block">👨‍🏫</span>
                <span className="font-display font-bold text-gray-900">Ментор</span>
              </div>
            </div>

            {painPoints.map((p, i) => (
              <div key={i} className="grid grid-cols-2 gap-4 sm:gap-6 mb-4">
                <div className="bg-white rounded-2xl p-5 sm:p-6 text-gray-600 shadow-sm border border-gray-100 text-sm sm:text-base leading-relaxed">
                  {p.junior}
                </div>
                <div className="bg-white rounded-2xl p-5 sm:p-6 text-gray-600 shadow-sm border border-gray-100 text-sm sm:text-base leading-relaxed">
                  {p.mentor}
                </div>
              </div>
            ))}

            <p className="text-center mt-10 text-base text-gray-600 font-medium bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100 max-w-lg mx-auto">
              Продукт адресуется <span className="mark">джуну</span>, но решает проблему{' '}
              <span className="mark">обоих</span>
            </p>
          </div>
        </section>
      )}

      {/* ═══════════════════════ FINAL CTA ═══════════════════════ */}
      <section className="relative py-24 sm:py-28 px-6 bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/5 to-black/15 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none anim-float-3" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none anim-float-1" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Готовы попробовать?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Пройдите демо-сессию и оцените формат тренажера
          </p>

          <button
            onClick={() => onNavigate('session')}
            className="px-10 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:bg-gray-50 active:scale-[0.97] transition-all duration-200 shadow-xl mb-8"
          >
            Попробуйте демо-сессию
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <button
              onClick={() => onNavigate('about')}
              className="text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors duration-200"
            >
              Узнать подробнее
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white/60 transition-colors duration-200"
            >
              Карта программы
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer className="py-10 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p className="text-sm text-gray-500">Подготовила Наталия Гурова МПДТПО251</p>
          {isInstructor && (
            <p className="text-xs text-gray-400">
              Теоретическая основа: SBL (Clark, 2013) · Action Mapping (Moore, 2017) · Таксономия
              Финка (2003)
            </p>
          )}
        </div>
      </footer>
    </div>
  )
}
