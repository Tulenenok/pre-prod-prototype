import { useState } from 'react'
import { modules, competencyColors, scenarioTypeColors } from '../data/program'

function AxisIndicator({ level, maxLevel = 3 }) {
  if (level === null) return <span className="text-xs text-gray-300">·</span>
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            i <= level ? 'bg-accent-500' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

function CompetencyBadge({ name }) {
  const colors = competencyColors[name] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: '' }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text}`}>
      {colors.icon && <span>{colors.icon}</span>}
      {name}
    </span>
  )
}

function ScenarioItem({ scenario }) {
  const typeClass = scenarioTypeColors[scenario.type] || 'bg-gray-50 text-gray-500'
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className={`inline-block px-2 py-0.5 text-[10px] font-medium rounded-md flex-shrink-0 mt-0.5 ${typeClass}`}>
        {scenario.type}
      </span>
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-700">{scenario.name}</div>
        <div className="text-xs text-gray-400 mt-0.5">{scenario.description}</div>
      </div>
    </div>
  )
}

function ModuleCard({ module, isExpanded, onToggle, onStartSession }) {
  const isActive = module.isActive
  return (
    <div
      className={`rounded-xl border-2 transition-all duration-300 ${
        isActive
          ? 'border-accent-300 bg-gradient-to-br from-accent-50/50 to-blue-50/30 shadow-lg shadow-accent-100'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <button onClick={onToggle} className="w-full text-left p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold ${
                isActive
                  ? 'bg-accent-600 text-white shadow-md shadow-accent-600/30'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {module.number}
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isActive ? 'text-accent-800' : 'text-gray-800'}`}>
                {module.name}
              </h3>
              <p className="text-sm text-gray-500">{module.phase} · {module.sessions} сессий</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100/80 pt-4 space-y-5 animate-[fadeIn_300ms_ease-out]">
          <p className="text-gray-600 leading-relaxed">{module.description}</p>

          {module.competencies.length > 0 && (
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-2 font-medium">Компетенции в фокусе</div>
              <div className="flex flex-wrap gap-2">
                {module.competencies.map((c) => <CompetencyBadge key={c} name={c} />)}
              </div>
            </div>
          )}

          {module.axes.A !== null && (
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-3 font-medium">Оси прогрессии</div>
              <div className="space-y-2.5 bg-gray-50 rounded-lg p-3">
                {[
                  { key: 'A', label: 'Эмоциональная нагрузка', desc: 'уровень стресса в ситуации' },
                  { key: 'B', label: 'Интеграция компетенций', desc: 'сколько компетенций задействовано' },
                  { key: 'C', label: 'Неопределенность', desc: 'насколько однозначен «лучший» выбор' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-600">{label}</span>
                      <span className="text-xs text-gray-400 ml-1.5">· {desc}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <AxisIndicator level={module.axes[key]} />
                      <span className="text-xs text-gray-400 w-28 text-right">{module.axesLabels?.[key]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-2 font-medium">Сценарии модуля</div>
            <div className="divide-y divide-gray-100">
              {module.scenarios.map((s, i) => <ScenarioItem key={i} scenario={s} />)}
            </div>
          </div>

          {isActive && (
            <button
              onClick={onStartSession}
              className="w-full mt-2 py-3 bg-accent-600 text-white rounded-xl font-medium hover:bg-accent-700 active:scale-[0.98] transition-all shadow-lg shadow-accent-600/20"
            >
              Попробовать сессию из этого модуля →
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function ProgramMap({ onNavigate }) {
  const [expandedModule, setExpandedModule] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <button
          onClick={() => onNavigate('landing')}
          className="text-gray-400 hover:text-gray-600 transition-colors text-sm mb-8 block"
        >
          ← На главную
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Карта программы</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Путь от распознавания своих паттернов к автономному профессиональному развитию.
          Каждый модуль представляет фазу обучения, не привязанную к календарю.
        </p>

        <div className="flex items-center justify-between mb-8 px-2 overflow-x-auto">
          {modules.map((m, i) => (
            <div key={m.number} className="flex items-center flex-shrink-0">
              <button
                onClick={() => setExpandedModule(m.number)}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  m.isActive
                    ? 'bg-accent-600 text-white shadow-md shadow-accent-600/30'
                    : expandedModule === m.number
                    ? 'bg-gray-300 text-white'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
              >
                {m.number}
              </button>
              {i < modules.length - 1 && (
                <div className={`w-5 sm:w-8 h-0.5 mx-0.5 ${i < 1 ? 'bg-accent-300' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {modules.map((m) => (
            <ModuleCard
              key={m.number}
              module={m}
              isExpanded={expandedModule === m.number}
              onToggle={() => setExpandedModule(expandedModule === m.number ? null : m.number)}
              onStartSession={() => onNavigate('session')}
            />
          ))}
        </div>

        <div className="mt-10 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
              <div className="text-3xl font-bold text-gray-800">25</div>
              <div className="text-sm text-gray-500">сессий</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">23</div>
              <div className="text-sm text-gray-500">образовательных результата</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">3</div>
              <div className="text-sm text-gray-500">компетенции</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {Object.entries(competencyColors).map(([name, colors]) => (
              <CompetencyBadge key={name} name={name} />
            ))}
          </div>
          <div className="text-center text-xs text-gray-400 leading-relaxed space-y-1">
            <p>Теоретическая основа: цикл Колба · SBL (Clark, 2013) · Action Mapping (Moore, 2017) · таксономия Финка (2003)</p>
            <p>Саморегуляция: affect labeling (Lieberman et al., 2007) · когнитивная переоценка (Gross, 2015)</p>
            <p>Метрики: модель Киркпатрика (4 уровня) · самоэффективность (Bandura, 1997)</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Подготовила Наталия Гурова МПДТПО251
          </p>
        </div>
      </div>
    </div>
  )
}
