import { useState } from 'react'

function StatBanner({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        <div className="text-5xl font-bold text-accent-600 mb-3">28%</div>
        <p className="text-gray-700 leading-relaxed mb-3">
          начинающих специалистов не проходят испытательный срок.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          Основная причина не в нехватке технических навыков, а в неумении коммуницировать в команде,
          справляться со стрессом и организовать свою работу.
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          Источники: HH.ru, исследование адаптации IT-специалистов, 2023; Deloitte Human Capital Trends, 2022
        </p>
      </div>
    </div>
  )
}

export default function Landing({ onNavigate }) {
  const [showStat, setShowStat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-accent-50 flex items-center justify-center px-6">
      {showStat && <StatBanner onClose={() => setShowStat(false)} />}

      <div className="max-w-lg text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full mb-5">
          <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
          Кликабельный прототип
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-tight">Pre-Prod</h1>

        <p className="text-lg text-gray-600 mb-2 leading-relaxed">
          Асинхронный тренажер soft skills
        </p>
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          для адаптации начинающих IT-специалистов на рабочем месте
        </p>

        <div className="grid grid-cols-3 gap-5 max-w-sm mx-auto mb-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-2 shadow-sm">
              <span className="text-xl">💬</span>
            </div>
            <div className="text-xs text-gray-600 font-medium">Коммуникация<br/>в команде</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 mb-2 shadow-sm">
              <span className="text-xl">🧘</span>
            </div>
            <div className="text-xs text-gray-600 font-medium">Саморегуляция<br/>в стрессе</div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 mb-2 shadow-sm">
              <span className="text-xl">📋</span>
            </div>
            <div className="text-xs text-gray-600 font-medium">Организация<br/>работы</div>
          </div>
        </div>

        <button
          onClick={() => setShowStat(true)}
          className="text-sm text-accent-600 hover:text-accent-700 underline underline-offset-2 mb-8 block mx-auto"
        >
          Зачем это нужно?
        </button>

        <div className="bg-white/70 border border-gray-200 rounded-xl p-5 mb-8 text-left max-w-md mx-auto">
          <div className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-3">Что демонстрирует прототип</div>
          <ul className="space-y-2 text-sm text-gray-600 leading-relaxed">
            <li className="flex gap-2">
              <span className="text-accent-500 mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-gray-700">Интерактивная сессия</strong> с точками выбора, сравнением последствий, блоком саморегуляции и микрозаданием</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent-500 mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-gray-700">Карта программы</strong> из 6 модулей (25 сессий) с осями прогрессии и компетенциями</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent-500 mt-0.5 flex-shrink-0">→</span>
              <span><strong className="text-gray-700">Педагогический дизайн</strong> на основе SBL (Clark, 2013), Action Mapping (Moore, 2017) и таксономии Финка</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={() => onNavigate('session')}
            className="px-8 py-3.5 bg-accent-600 text-white rounded-xl font-medium hover:bg-accent-700 active:scale-[0.98] transition-all shadow-lg shadow-accent-600/20"
          >
            Пройти демо-сессию
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="px-8 py-3.5 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
          >
            Карта программы
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-16">
          Демо-сессия ~5 минут · Полная программа: 25 сессий за ~5 недель
        </p>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Подготовила Наталия Гурова МПДТПО251
          </p>
        </div>
      </div>
    </div>
  )
}
