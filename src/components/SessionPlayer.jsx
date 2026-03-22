import { useState, useEffect } from 'react'
import { scenarios } from '../data/scenarios'
import { useMode } from '../context/ModeContext'

function FadeIn({ children, animKey }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(false)
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [animKey])

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      {children}
    </div>
  )
}

function InstructorNote({ children }) {
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mt-4">
      <p className="text-xs text-indigo-700">
        <span className="mr-1.5">🎓</span>{children}
      </p>
    </div>
  )
}

function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100">
      <div
        className="h-full bg-gradient-to-r from-accent-400 to-accent-600 transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function Markdown({ text, className = '' }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

const scenarioCardMeta = [
  {
    badge: 'Модуль 0: Начало',
    description: 'Калибровочная сессия: тренажер фиксирует вашу текущую стратегию реагирования на код-ревью. Минимальная обратная связь.',
    badgeColors: 'bg-gray-100 text-gray-600',
  },
  {
    badge: 'Модуль 1: Замечать',
    description: 'Распознавание паттерна: двухчасовое молчание при блокере. Первый контакт с affect labeling.',
    badgeColors: 'bg-sky-100 text-sky-600',
  },
  {
    badge: 'Модуль 3: Действовать',
    description: 'Максимальная эмоциональная нагрузка: публичная ошибка, признание, подготовка к разбору.',
    badgeColors: 'bg-rose-100 text-rose-600',
  },
]

function ScenarioPicker({ scenarios, onSelect, onNavigate, isInstructor }) {
  return (
    <div className="min-h-screen bg-white">
      <button
        onClick={() => onNavigate('landing')}
        className="fixed top-4 left-4 z-40 text-gray-400 hover:text-gray-600 transition-colors text-sm"
      >
        ← На главную
      </button>

      <div className="max-w-xl mx-auto px-6 py-16 min-h-screen flex items-center">
        <div className="w-full">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl font-bold text-gray-800 mb-3">
              Выберите сессию для демо
            </h1>
            <p className="text-gray-500">
              Три сессии из разных модулей программы. Каждая показывает тренажер на разном этапе: от калибровки до действия через дискомфорт.
            </p>
          </div>

          <div className="max-w-lg mx-auto space-y-4">
            {scenarios.map((scenario, i) => {
              const meta = scenarioCardMeta[i]
              return (
                <button
                  key={scenario.id}
                  onClick={() => onSelect(scenario)}
                  className="group w-full text-left border-2 border-gray-200 rounded-2xl p-5 hover:border-accent-400 hover:shadow-lg transition-all cursor-pointer"
                >
                  <span className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${meta.badgeColors} mb-3`}>
                    {meta.badge}
                  </span>
                  <div className="font-display text-lg font-semibold text-gray-800 mb-2">
                    {scenario.title}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{meta.description}</p>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">~{scenario.estimatedMinutes} мин</span>
                  </div>
                </button>
              )
            })}
          </div>

          {isInstructor && (
            <div className="max-w-lg mx-auto">
              <InstructorNote>
                Три сценария демонстрируют прогрессию по программе. Сессия 0.2 (калибровка) замеряет базовую реакцию. Сессия 1.1 (распознавание) формирует осознание паттерна. Сессия 3.4 (действие) тренирует поведение через дискомфорт.
              </InstructorNote>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StepIntro({ step, onNext, isInstructor }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-100 text-accent-700 text-sm font-medium rounded-full mb-6">
        <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
        {step.title}
      </div>
      <div className="text-lg text-gray-600 mb-6">{step.subtitle}</div>
      <div className="text-left bg-gray-50 rounded-xl p-5 mb-6 max-w-md mx-auto">
        {step.description.split('\n\n').map((p, i) => (
          <p key={i} className="text-gray-600 leading-relaxed mb-3 last:mb-0">{p}</p>
        ))}
      </div>
      {step.meta && (
        <p className="text-xs text-gray-400 mb-8 max-w-md mx-auto">{step.meta}</p>
      )}
      <button
        onClick={onNext}
        className="px-8 py-3 bg-accent-600 text-white rounded-xl font-medium hover:bg-accent-700 active:scale-[0.98] transition-all shadow-lg shadow-accent-600/20"
      >
        {step.buttonText}
      </button>
      {isInstructor && (
        <InstructorNote>
          Контекст тренажера: калибровочная сессия модуля «Замечать». Формирует когнитивную базу (<span className="mark">FK.1</span>) и начинает тренировку <span className="mark">ОР 2.1</span> (распознавание паттерна избегания).
        </InstructorNote>
      )}
    </div>
  )
}

function StepNarrative({ step, onNext, isInstructor }) {
  return (
    <div>
      {step.text.split('\n\n').map((p, i) => (
        <p key={i} className="text-gray-700 text-lg leading-relaxed mb-4 last:mb-0">
          {p}
        </p>
      ))}
      <button
        onClick={onNext}
        className="mt-8 px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all"
      >
        Дальше →
      </button>
      {isInstructor && (
        <InstructorNote>
          <span className="mark">Нарративная транспортация</span> (Green & Brock, 2000): повествование от первого лица с конкретными деталями рабочей среды
        </InstructorNote>
      )}
    </div>
  )
}

function StepChoice({ step, onChoose, isInstructor }) {
  const [hovered, setHovered] = useState(null)
  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-gray-800 mb-6">{step.prompt}</h3>
      <div className="space-y-3">
        {step.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChoose(option.id)}
            onMouseEnter={() => setHovered(option.id)}
            onMouseLeave={() => setHovered(null)}
            className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
              hovered === option.id
                ? 'border-accent-300 bg-accent-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className="text-gray-700 leading-relaxed">{option.text}</span>
          </button>
        ))}
      </div>
      {isInstructor && (
        <InstructorNote>
          Три стратегии разной продуктивности (спектр, не бинарный выбор). Варианты не маркированы до выбора, чтобы пользователь выбирал на основе склонности.
        </InstructorNote>
      )}
    </div>
  )
}

function StepConsequence({ step, choiceId, onNext }) {
  const variant = step.variants[choiceId]
  if (!variant) return null

  return (
    <div>
      {variant.text.split('\n\n').map((p, i) => (
        <p key={i} className="text-gray-700 text-lg leading-relaxed mb-4 last:mb-0">
          {p}
        </p>
      ))}
      <button
        onClick={onNext}
        className="mt-8 px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all"
      >
        Дальше →
      </button>
    </div>
  )
}

function StepConsequenceFull({ step, choiceId, onNext, isInstructor }) {
  const levelColors = [
    'border-red-200 bg-red-50/50',
    'border-amber-200 bg-amber-50/50',
    'border-emerald-200 bg-emerald-50/50',
  ]
  const levelLabels = ['Менее продуктивно', 'Приемлемо', 'Продуктивно']
  const levelDots = ['bg-red-400', 'bg-amber-400', 'bg-emerald-400']

  const orderedKeys = Object.keys(step.variants).sort(
    (a, b) => step.variants[a].level - step.variants[b].level
  )

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">{step.prompt}</p>
      <div className="space-y-3">
        {orderedKeys.map((key) => {
          const v = step.variants[key]
          const isChosen = key === choiceId
          return (
            <div
              key={key}
              className={`rounded-xl border-2 p-4 transition-all ${levelColors[v.level]} ${
                isChosen ? 'ring-2 ring-accent-400 ring-offset-1' : 'opacity-80'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${levelDots[v.level]}`} />
                <span className="text-xs font-medium text-gray-500">{levelLabels[v.level]}</span>
                {isChosen && (
                  <span className="text-xs font-medium text-accent-600 ml-auto">← твой выбор</span>
                )}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{v.text}</p>
            </div>
          )
        })}
      </div>
      <button
        onClick={onNext}
        className="mt-8 px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all"
      >
        Дальше →
      </button>
      {isInstructor && (
        <InstructorNote>
          Все три последствия показаны для сравнения. В полной версии пользователь видит только свой результат. Цветовая маркировка: продуктивность стратегии.
        </InstructorNote>
      )}
    </div>
  )
}

function StepDebrief({ step, onNext, isInstructor }) {
  return (
    <div>
      <div className="bg-gradient-to-br from-accent-50 to-blue-50 border border-accent-200 rounded-xl p-6">
        <div className="font-display text-sm font-semibold text-accent-600 uppercase tracking-wide mb-4">
          {step.title}
        </div>
        {step.text.split('\n\n').map((p, i) => (
          <p key={i} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
            <Markdown text={p} />
          </p>
        ))}
      </div>
      <button
        onClick={onNext}
        className="mt-8 px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all"
      >
        Дальше →
      </button>
      {isInstructor && (
        <InstructorNote>
          Модули 1-2: подробный разбор формирует систему координат. С модуля 3 формат меняется на рефлексивные вопросы (<span className="mark">gradual release of responsibility</span>).
        </InstructorNote>
      )}
    </div>
  )
}

function StepSelfRegulation({ step, onNext, isInstructor }) {
  const [selected, setSelected] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSelect = (optionId) => {
    const option = step.options.find((o) => o.id === optionId)
    setSelected(option)
    setTimeout(() => setShowFeedback(true), 400)
  }

  if (showFeedback && selected) {
    const fb = step.feedback[selected.group]
    return (
      <FadeIn animKey="sr-feedback">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <div className="font-display text-sm font-semibold text-amber-600 uppercase tracking-wide mb-4">
            {fb.title}
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">{fb.text}</p>
          <p className="text-gray-700 leading-relaxed mb-4"><Markdown text={fb.technique} /></p>
          {fb.nextStep && (
            <p className="text-gray-600 leading-relaxed italic">{fb.nextStep}</p>
          )}
        </div>
        <button
          onClick={onNext}
          className="mt-8 px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 active:scale-[0.98] transition-all"
        >
          Дальше →
        </button>
        {isInstructor && (
          <InstructorNote>
            Блок саморегуляции (<span className="mark">ОР 2.1</span>, <span className="mark">HD.2</span>). Здесь нет «проигрыша»: любой ответ начинает разговор о паттерне. Приемы: <span className="mark">affect labeling</span> (Lieberman et al., 2007), <span className="mark">когнитивная переоценка</span> (Gross, 1998).
          </InstructorNote>
        )}
      </FadeIn>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
          {step.label}
        </span>
      </div>
      {step.sublabel && (
        <p className="text-xs text-gray-400 mb-5">{step.sublabel}</p>
      )}
      <div className="mb-6">
        {step.situation.split('\n\n').map((p, i) => (
          <p key={i} className="text-gray-700 text-lg leading-relaxed mb-4 last:mb-0">
            {p}
          </p>
        ))}
      </div>
      <h3 className="font-display text-xl font-semibold text-gray-800 mb-4">{step.prompt}</h3>
      <div className="space-y-3">
        {step.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selected?.id === option.id
                ? 'border-amber-400 bg-amber-50 shadow-md'
                : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
            }`}
          >
            <span className="text-gray-700">{option.text}</span>
          </button>
        ))}
      </div>
      {isInstructor && (
        <InstructorNote>
          Блок саморегуляции (<span className="mark">ОР 2.1</span>, <span className="mark">HD.2</span>). Здесь нет «проигрыша»: любой ответ начинает разговор о паттерне. Приемы: <span className="mark">affect labeling</span> (Lieberman et al., 2007), <span className="mark">когнитивная переоценка</span> (Gross, 1998).
        </InstructorNote>
      )}
    </div>
  )
}

function StepMicrotask({ step, onNext, isInstructor }) {
  return (
    <div>
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
        <div className="font-display text-sm font-semibold text-emerald-600 uppercase tracking-wide mb-1">
          {step.label}
        </div>
        {step.sublabel && (
          <p className="text-xs text-emerald-500 mb-4">{step.sublabel}</p>
        )}
        {step.text.split('\n\n').map((p, i) => (
          <p key={i} className="text-gray-700 text-lg leading-relaxed mb-4">{p}</p>
        ))}
        {step.note && (
          <p className="text-sm text-gray-500 border-t border-emerald-100 pt-3 mt-2">{step.note}</p>
        )}
      </div>
      <button
        onClick={onNext}
        className="mt-8 px-6 py-2.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 active:scale-[0.98] transition-all font-medium"
      >
        Понятно →
      </button>
      {isInstructor && (
        <InstructorNote>
          Мост к реальному поведению (<span className="mark">метрика 2.5</span>). Градиент сложности: от наблюдения (модуль 1) к реальному действию (модуль 3) и артефактам (модуль 4).
        </InstructorNote>
      )}
    </div>
  )
}

function StepSelfEfficacy({ step, onNext, isInstructor }) {
  const [value, setValue] = useState(null)

  return (
    <div className="text-center">
      <h3 className="font-display text-xl font-semibold text-gray-800 mb-3">{step.prompt}</h3>
      {step.sublabel && (
        <p className="text-xs text-gray-400 mb-8">{step.sublabel}</p>
      )}
      <div className="flex justify-center items-center gap-3 mb-4">
        {step.scale.map((item) => (
          <button
            key={item.value}
            onClick={() => setValue(item.value)}
            className={`w-14 h-14 rounded-xl text-lg font-semibold transition-all duration-200 ${
              value === item.value
                ? 'bg-accent-600 text-white scale-110 shadow-lg shadow-accent-600/30'
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
            }`}
          >
            {item.value}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-400 mb-8 max-w-xs mx-auto">
        <span>{step.scale[0].label}</span>
        <span>{step.scale[step.scale.length - 1].label}</span>
      </div>
      {value && (
        <FadeIn animKey={`se-${value}`}>
          <button
            onClick={onNext}
            className="px-6 py-2.5 bg-accent-600 text-white rounded-lg hover:bg-accent-700 active:scale-[0.98] transition-all font-medium shadow-lg shadow-accent-600/20"
          >
            Завершить сессию →
          </button>
        </FadeIn>
      )}
      {isInstructor && (
        <InstructorNote>
          Измерение <span className="mark">самоэффективности</span> (Bandura, 1997), <span className="mark">метрика 2.4</span>. Предиктор реального поведения: готовность применить, а не только знание. Закрывает разрыв «знаю, но боюсь».
        </InstructorNote>
      )}
    </div>
  )
}

function StepOutro({ step, onComplete, isInstructor }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-6">
        <span className="text-3xl">✓</span>
      </div>
      <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">{step.title}</h2>
      <p className="text-gray-600 mb-6">{step.text}</p>

      <div className="text-left bg-gray-50 rounded-xl p-5 mb-6 max-w-md mx-auto">
        <div className="font-display text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Что ты сделал в этой сессии</div>
        <ul className="space-y-2">
          {step.learnings.map((l, i) => (
            <li key={i} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
              <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
              {l}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">{step.progression}</p>

      <button
        onClick={onComplete}
        className="px-8 py-3 bg-accent-600 text-white rounded-xl font-medium hover:bg-accent-700 active:scale-[0.98] transition-all shadow-lg shadow-accent-600/20"
      >
        {step.buttonText}
      </button>
      {isInstructor && (
        <InstructorNote>
          Сессия покрывает: <span className="mark">ОР 1.1</span> (запрос помощи), <span className="mark">ОР 2.1</span> (распознавание паттерна), <span className="mark">FK.1</span> (ориентировка в ситуации адаптации). Метрики: <span className="mark">2.1</span>, <span className="mark">2.4</span>.
        </InstructorNote>
      )}
    </div>
  )
}

export default function SessionPlayer({ onNavigate }) {
  const { isInstructor } = useMode()
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [choices, setChoices] = useState({})

  if (!selectedScenario) {
    return (
      <ScenarioPicker
        scenarios={scenarios}
        onSelect={(s) => { setSelectedScenario(s); setStepIndex(0); setChoices({}) }}
        onNavigate={onNavigate}
        isInstructor={isInstructor}
      />
    )
  }

  const steps = selectedScenario.steps
  const totalSteps = steps.length
  const currentStep = steps[stepIndex]

  const goNext = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleChoice = (choiceId) => {
    setChoices({ ...choices, [currentStep.id]: choiceId })
    goNext()
  }

  const handleComplete = () => {
    setSelectedScenario(null)
    setStepIndex(0)
    setChoices({})
  }

  const lastChoiceId = () => {
    const choiceSteps = steps.filter((s) => s.type === 'choice')
    for (let i = choiceSteps.length - 1; i >= 0; i--) {
      if (choices[choiceSteps[i].id]) return choices[choiceSteps[i].id]
    }
    return null
  }

  const renderStep = () => {
    switch (currentStep.type) {
      case 'intro':
        return <StepIntro step={currentStep} onNext={goNext} isInstructor={isInstructor} />
      case 'narrative':
        return <StepNarrative step={currentStep} onNext={goNext} isInstructor={isInstructor} />
      case 'choice':
        return <StepChoice step={currentStep} onChoose={handleChoice} isInstructor={isInstructor} />
      case 'consequence':
        return <StepConsequence step={currentStep} choiceId={lastChoiceId()} onNext={goNext} />
      case 'consequence_full':
        return <StepConsequenceFull step={currentStep} choiceId={choices[currentStep.choiceStepId]} onNext={goNext} isInstructor={isInstructor} />
      case 'debrief':
        return <StepDebrief step={currentStep} onNext={goNext} isInstructor={isInstructor} />
      case 'selfregulation':
        return <StepSelfRegulation step={currentStep} onNext={goNext} isInstructor={isInstructor} />
      case 'microtask':
        return <StepMicrotask step={currentStep} onNext={goNext} isInstructor={isInstructor} />
      case 'selfefficacy':
        return <StepSelfEfficacy step={currentStep} onNext={goNext} isInstructor={isInstructor} />
      case 'outro':
        return <StepOutro step={currentStep} onComplete={handleComplete} isInstructor={isInstructor} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <ProgressBar current={stepIndex} total={totalSteps} />

      {stepIndex > 0 && currentStep.type !== 'intro' && (
        <button
          onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
          className="fixed top-4 left-4 z-40 text-gray-400 hover:text-gray-600 transition-colors text-sm"
        >
          ← Назад
        </button>
      )}

      <div className="fixed top-4 right-4 z-40 flex items-center gap-4">
        <button
          onClick={handleComplete}
          className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
        >
          Другая сессия
        </button>
        <span className="text-gray-200">|</span>
        <button
          onClick={() => onNavigate('landing')}
          className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
        >
          На главную
        </button>
      </div>

      <div className="max-w-xl mx-auto px-6 py-16 min-h-screen flex items-center">
        <div className="w-full">
          <FadeIn animKey={stepIndex}>
            {renderStep()}
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
