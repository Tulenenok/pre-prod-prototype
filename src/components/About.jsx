import { useState } from 'react'
import { useMode } from '../context/ModeContext'

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-display text-lg font-semibold text-gray-900">{title}</h3>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4">
          {children}
        </div>
      )}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <h4 className="font-display text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
      {children}
    </h4>
  )
}

function MetricTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-2 border border-gray-200 font-medium text-gray-700">Метрика</th>
            <th className="text-left p-2 border border-gray-200 font-medium text-gray-700">Целевое значение</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="p-2 border border-gray-200">{r[0]}</td>
              <td className="p-2 border border-gray-200">{r[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ================================================================
   USER MODE
   ================================================================ */

function UserView({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-50 via-white to-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">

        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            О тренажере
          </h1>
          <p className="text-gray-500">Все, что нужно знать о Pre-Prod</p>
        </div>

        {/* 1. Что такое Pre-Prod */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-6">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">Что такое Pre-Prod</h2>
          <p className="text-gray-600 leading-relaxed">
            Pre-Prod: <span className="mark">асинхронный тренажер</span>, в котором ты на практике
            осваиваешь <span className="mark">три ключевые компетенции</span> для
            прохождения <span className="mark">испытательного срока</span> в IT-команде:
            профессиональную коммуникацию, саморегуляцию в стрессовых ситуациях
            и организацию собственной работы. Не курс с лекциями и не наставник,
            а инструмент для самостоятельной практики: 10-15 минут в день, 4-6 недель.
          </p>
        </div>

        {/* 2. Для кого */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-6">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-3">Для кого</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Для начинающих IT-специалистов с опытом от 0 до 12 месяцев: стажеров, джуниоров,
            выпускников буткемпов и курсов переквалификации. Технически ты готов,
            но чувствуешь неуверенность в рабочей коммуникации.
          </p>
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
            <p className="text-accent-800 text-sm font-medium mb-3">Знакомо?</p>
            <ul className="space-y-2.5">
              {[
                'Сидишь над задачей два часа и не спрашиваешь',
                'Пишешь «нормально, делаю» вместо структурированного статуса',
                'Боишься показаться некомпетентным',
                'Не знаешь, как подготовиться к встрече с наставником',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-accent-700">
                  <span className="text-accent-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Три компетенции */}
        <div className="mb-6">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-4 px-1">Три компетенции</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg">💬</span>
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1.5">Коммуникация</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Инициировать контакт, формулировать запросы и конструктивно реагировать на обратную связь.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg">🧘</span>
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1.5">Саморегуляция</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Распознавать стрессовые паттерны и заменять их конкретными продуктивными действиями.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-lg">📋</span>
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1.5">Самоорганизация</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Планировать задачи, фиксировать блокеры и готовиться к встречам с наставником.
              </p>
            </div>
          </div>
          <div className="text-center mt-3">
            <button
              onClick={() => onNavigate('landing')}
              className="text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors"
            >
              Подробнее на главной →
            </button>
          </div>
        </div>

        {/* 4. Как устроена сессия */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-6">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-2">Как устроена сессия</h2>
          <p className="text-sm text-gray-500 mb-6">Одна сессия, ~10 минут, три блока</p>
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <div className="flex-1 bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🎭</div>
              <div className="font-display font-medium text-gray-900 text-sm mb-1">Сценарий</div>
              <div className="text-xs text-gray-500">5-7 мин</div>
              <p className="text-xs text-gray-500 mt-2">Рабочая ситуация с точками выбора и обратной связью</p>
            </div>
            <div className="hidden sm:flex items-center text-gray-300 text-xl">→</div>
            <div className="flex-1 bg-amber-50 border border-amber-100 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🧘</div>
              <div className="font-display font-medium text-gray-900 text-sm mb-1">Саморегуляция</div>
              <div className="text-xs text-gray-500">2-3 мин</div>
              <p className="text-xs text-gray-500 mt-2">Упражнение на осознание эмоций и замену паттерна</p>
            </div>
            <div className="hidden sm:flex items-center text-gray-300 text-xl">→</div>
            <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="font-display font-medium text-gray-900 text-sm mb-1">Микрозадание</div>
              <div className="text-xs text-gray-500">1-2 мин</div>
              <p className="text-xs text-gray-500 mt-2">Одно конкретное действие на ближайший рабочий день</p>
            </div>
          </div>
        </div>

        {/* 5. Чему ты научишься */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold text-gray-900 mb-5">Чему ты научишься</h2>
          <div className="space-y-4">
            {[
              { icon: '🎯', text: 'Формулировать запрос помощи так, чтобы тебе реально помогли' },
              { icon: '📢', text: 'Сообщать о проблемах до того, как спросят' },
              { icon: '🛡️', text: 'Замечать, когда страх мешает действовать, и справляться с ним' },
              { icon: '📋', text: 'Организовать свою работу так, чтобы ничего не терялось' },
              { icon: '🌱', text: 'Анализировать свой опыт и расти без внешней поддержки' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">{item.icon}</span>
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-12">
          <button
            onClick={() => onNavigate('session')}
            className="px-8 py-3.5 bg-accent-600 text-white rounded-xl font-medium hover:bg-accent-700 active:scale-[0.98] transition-all shadow-lg shadow-accent-600/20"
          >
            Попробовать демо-сессию
          </button>
        </div>

        <div className="text-center pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">Подготовила Наталия Гурова МПДТПО251</p>
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   INSTRUCTOR MODE: DATA
   ================================================================ */

const theories = [
  { theory: 'Experiential Learning', author: 'Kolb, 1984', role: 'Базовый цикл обучения через опыт: конкретный опыт → рефлексия → концептуализация → эксперимент. Определяет структуру сессии.' },
  { theory: 'Scenario-Based Learning (SBL)', author: 'Clark, 2013', role: 'Структура сценариев: ситуация → решение → последствия в нарративе. Определяет, как устроен каждый сценарий.' },
  { theory: 'Action Mapping', author: 'Moore, 2017', role: 'Проектирование от бизнес-цели к критическим решениям, а не от контента к тестам. Определяет, какие сценарии создавать.' },
  { theory: 'Narrative Transportation', author: 'Green & Brock, 2000', role: 'Вовлечение через нарратив повышает эмпатию и готовность к действию. Определяет стиль и язык сценариев.' },
  { theory: 'Behavioral Rehearsal', author: 'Bandura, 1977', role: 'Многократная репетиция поведения в безопасной среде как основа формирования навыка. Философия тренажера.' },
  { theory: 'Affect Labeling', author: 'Lieberman et al., 2007', role: 'Вербализация эмоции снижает активность миндалины. Основа упражнений на саморегуляцию.' },
  { theory: 'Cognitive Reappraisal', author: 'Gross, 1998', role: 'Переосмысление ситуации для изменения эмоциональной реакции. Второй прием саморегуляции в тренажере.' },
  { theory: 'Self-Efficacy Theory', author: 'Bandura, 1997', role: 'Вера в собственную способность справиться с задачей как ключевой предиктор поведения. Метрика 2.4.' },
  { theory: 'Fink\'s Taxonomy', author: 'Fink, 2003', role: 'Шесть взаимосвязанных категорий значимого обучения. Рамка проверки полноты образовательных результатов.' },
  { theory: 'Kirkpatrick Model', author: 'Kirkpatrick, 1959', role: 'Четырехуровневая модель оценки эффективности обучения. Структура системы метрик продукта.' },
]

/* ================================================================
   INSTRUCTOR MODE: VIEW
   ================================================================ */

function InstructorView({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-50 via-white to-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
            Режим преподавателя
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            О продукте Pre-Prod
          </h1>
          <p className="text-gray-500">Обоснование проектных решений тренажера</p>
        </div>

        <div className="space-y-4">

          {/* 1. Описание и цель */}
          <Collapsible title="Описание и цель продукта" defaultOpen>
            <div className="space-y-4">
              <div>
                <SectionLabel>Тип продукта</SectionLabel>
                <p className="text-gray-700 leading-relaxed">
                  <span className="mark">Асинхронный тренажер</span> (не курс, не навигатор).
                  Формат, в котором обучающийся отрабатывает поведенческие навыки
                  через принятие решений в реалистичных рабочих ситуациях.
                  10-15 минут в день, 4-6 недель.
                </p>
              </div>
              <div>
                <SectionLabel>Цель</SectionLabel>
                <p className="text-gray-700 leading-relaxed">
                  Сформировать у начинающих IT-специалистов <span className="mark">три
                  взаимосвязанные компетенции</span>: профессиональную коммуникацию в команде,
                  саморегуляцию и самоорганизацию, позволяющие осознанно и результативно
                  действовать в типичных рабочих ситуациях первых месяцев работы в IT-команде.
                </p>
              </div>
              <div>
                <SectionLabel>Задачи</SectionLabel>
                <ol className="text-gray-700 space-y-2 list-decimal list-inside leading-relaxed">
                  <li><strong>Коммуникация:</strong> научить инициировать рабочий контакт, формулировать структурированные запросы, конструктивно реагировать на критику и неопределенность</li>
                  <li><strong>Саморегуляция:</strong> научить распознавать собственные стрессовые реакции (избегание, молчание, затягивание) и заменять их конкретными продуктивными действиями</li>
                  <li><strong>Самоорганизация:</strong> сформировать базовые рабочие практики: планирование задач, фиксацию вопросов и блокеров, подготовку к встречам с наставником</li>
                  <li><strong>Рефлексия:</strong> научить самостоятельно анализировать свой опыт в рабочих ситуациях и корректировать поведение без тренажера</li>
                </ol>
              </div>
            </div>
          </Collapsible>

          {/* 2. Целевая аудитория и JTBD */}
          <Collapsible title="Целевая аудитория и JTBD">
            <div className="space-y-5">
              <div>
                <SectionLabel>Основная аудитория</SectionLabel>
                <p className="text-gray-700 leading-relaxed">
                  Начинающие IT-специалисты с опытом от 0 до 12 месяцев: стажеры, джуниоры,
                  выпускники буткемпов и курсов переквалификации. Технически достаточны,
                  но испытывают неуверенность в рабочей коммуникации.
                </p>
              </div>

              <div>
                <SectionLabel>Основной JTBD</SectionLabel>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed italic">
                    «Когда я выхожу на первую работу или стажировку в IT, я хочу с первых недель
                    стать ценным членом команды, чтобы пройти испытательный срок и закрепиться в профессии.»
                  </p>
                </div>
              </div>

              <div>
                <SectionLabel>Поддерживающие JTBD</SectionLabel>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Компетенция</th>
                        <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">JTBD</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700 align-top whitespace-nowrap">
                          <span className="mark">Коммуникация</span>
                        </td>
                        <td className="p-3 border border-gray-200 leading-relaxed">
                          Когда мне непонятна задача или я застрял, я хочу уметь задать нужный вопрос
                          нужному человеку в нужный момент, чтобы не терять время молча и не выглядеть беспомощным
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700 align-top whitespace-nowrap">
                          <span className="mark">Саморегуляция</span>
                        </td>
                        <td className="p-3 border border-gray-200 leading-relaxed">
                          Когда я чувствую страх или неуверенность (перед дейли, после код-ревью,
                          когда нужно попросить помощи), я хочу справляться с этим и действовать, а не замирать
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700 align-top whitespace-nowrap">
                          <span className="mark">Самоорганизация</span>
                        </td>
                        <td className="p-3 border border-gray-200 leading-relaxed">
                          Когда у меня много задач, вопросов и неопределенности, я хочу структурировать
                          свою работу, чтобы ничего не терялось и я всегда знал, что делать дальше
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <SectionLabel>Эмоциональный JTBD</SectionLabel>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-700 text-sm italic leading-relaxed">
                    «Я хочу чувствовать себя нормальным начинающим специалистом, который имеет право
                    не знать и учиться, а не самозванцем, которого скоро разоблачат.»
                  </p>
                </div>
              </div>

              <div>
                <SectionLabel>Пересечение болей: одна проблема, два взгляда</SectionLabel>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Джун</th>
                        <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Ментор</th>
                        <th className="text-left p-3 border border-gray-200 font-medium text-gray-700">Общая проблема</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr>
                        <td className="p-3 border border-gray-200">«Я боюсь спрашивать»</td>
                        <td className="p-3 border border-gray-200">«Он не спрашивает, потом неделю делает задачу»</td>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700">Барьер в запросе помощи</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200">«Не понимаю, чего от меня ждут»</td>
                        <td className="p-3 border border-gray-200">«Он молчит, я не знаю, где он застрял»</td>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700">Отсутствие прозрачности</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200">«Мне некомфортно быть неудобным»</td>
                        <td className="p-3 border border-gray-200">«Мне приходится каждый раз вытягивать из него информацию»</td>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700">Несформированная коммуникация</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Collapsible>

          {/* 3. Образовательные результаты */}
          <Collapsible title="Образовательные результаты">
            <div className="space-y-6">

              {/* Intro */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Результаты описаны в <span className="mark">двух слоях</span>: поведенческом
                  (что обучающийся делает) и таксономическом по Финку (что стоит за поведением).
                  Все формулировки соответствуют модели <span className="mark">ABCD</span>:
                  аудитория, поведение, условие, степень. Все глаголы наблюдаемые и оцениваемые.
                </p>
              </div>

              {/* Layer 1: Behavioral */}
              <div>
                <h4 className="font-display text-base font-semibold text-gray-900 mb-3">
                  Слой 1: поведенческие результаты
                </h4>

                {/* Program-level */}
                <h5 className="font-display text-sm font-semibold text-gray-700 mb-2">
                  Уровень программы (5 результатов)
                </h5>
                <p className="text-xs text-gray-500 mb-3">
                  Аудитория: начинающий IT-специалист на испытательном сроке (0-12 мес. опыта)
                </p>
                <ol className="text-sm text-gray-700 space-y-2.5 list-decimal list-inside leading-relaxed mb-5">
                  <li>
                    <span className="mark">Коммуникация:</span> инициирует профессиональную коммуникацию,
                    формулирует структурированные запросы, конструктивно уточняет обратную связь
                  </li>
                  <li>
                    <span className="mark">Саморегуляция:</span> распознает стрессовые реакции
                    (молчание, затягивание, избегание), заменяет их конкретными продуктивными действиями
                  </li>
                  <li>
                    <span className="mark">Самоорганизация:</span> ведет систему управления задачами,
                    вопросами и блокерами, готовится к взаимодействию с наставником
                  </li>
                  <li>
                    <span className="mark">Рефлексия:</span> самостоятельно анализирует опыт,
                    извлекает выводы, планирует корректировку поведения
                  </li>
                  <li>
                    <span className="mark">Профессиональное самовосприятие:</span> определяет позицию
                    начинающего специалиста, имеющего право учиться и обязанного коммуницировать
                  </li>
                </ol>

                {/* Scenario-level */}
                <h5 className="font-display text-sm font-semibold text-gray-700 mb-2">
                  Уровень сценария (12 результатов по 4 задачам)
                </h5>

                {/* Task 1 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <h6 className="font-display text-xs font-semibold text-accent-600 uppercase tracking-wide mb-2">
                    Задача 1. Коммуникация в команде
                  </h6>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>
                      <strong>1.1</strong> Запрос помощи при блокере: формулирует запрос, включающий
                      (1) контекст задачи, (2) предпринятые шаги, (3) точку затруднения,
                      (4) конкретно запрашиваемую помощь
                    </li>
                    <li>
                      <strong>1.2</strong> Реакция на критическую ОС: задает уточняющий вопрос
                      о содержании необходимых изменений, подтверждает следующий шаг
                    </li>
                    <li>
                      <strong>1.3</strong> Инициация контакта: сообщает текущий статус,
                      предлагает варианты дальнейших действий, запрашивает приоритеты
                    </li>
                    <li>
                      <strong>1.4</strong> Статус-апдейты: формирует обновление по структуре:
                      что завершено, что в работе, где есть блокер
                    </li>
                  </ul>
                </div>

                {/* Task 2 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <h6 className="font-display text-xs font-semibold text-accent-600 uppercase tracking-wide mb-2">
                    Задача 2. Саморегуляция в стрессовых ситуациях
                  </h6>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>
                      <strong>2.1</strong> Распознавание паттерна: определяет, какой именно
                      паттерн избегания активировался (молчание, затягивание, уход от контакта)
                    </li>
                    <li>
                      <strong>2.2</strong> Продуктивное действие: выбирает и выполняет конкретное
                      действие вместо откладывания
                    </li>
                    <li>
                      <strong>2.3</strong> Прием саморегуляции: применяет освоенный прием
                      (пауза, переформулирование ситуации, разбиение на микрошаги) перед реакцией
                    </li>
                  </ul>
                </div>

                {/* Task 3 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <h6 className="font-display text-xs font-semibold text-accent-600 uppercase tracking-wide mb-2">
                    Задача 3. Организация собственной работы
                  </h6>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>
                      <strong>3.1</strong> Приоритизированный список: составляет список
                      с явно зафиксированными вопросами и блокерами по каждой задаче
                    </li>
                    <li>
                      <strong>3.2</strong> Фиксация блокеров: структурированно фиксирует:
                      к какой задаче относится, что предпринято, что необходимо решить
                    </li>
                    <li>
                      <strong>3.3</strong> Повестка для наставника: готовит повестку: что сделано,
                      текущие затруднения, вопросы для обсуждения
                    </li>
                  </ul>
                </div>

                {/* Task 4 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-5">
                  <h6 className="font-display text-xs font-semibold text-accent-600 uppercase tracking-wide mb-2">
                    Задача 4. Рефлексия и перенос
                  </h6>
                  <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
                    <li>
                      <strong>4.1</strong> Рефлексивный анализ: проводит анализ по схеме:
                      (1) что сделал, (2) какой результат получил, (3) что сделает иначе
                    </li>
                    <li>
                      <strong>4.2</strong> Запрос обратной связи: запрашивает ОС по конкретному
                      аспекту поведения (указывая ситуацию и область развития), а не общую оценку
                    </li>
                  </ul>
                </div>
              </div>

              {/* Layer 2: Fink Taxonomy */}
              <div>
                <h4 className="font-display text-base font-semibold text-gray-900 mb-3">
                  Слой 2: таксономия значимого обучения Финка
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  Пять категорий Финка, дополняющих поведенческий слой. Категория Application
                  полностью совпадает со слоем 1 и не дублируется.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-2.5 border border-gray-200 font-medium text-gray-700 w-16">Код</th>
                        <th className="text-left p-2.5 border border-gray-200 font-medium text-gray-700 w-40">Категория</th>
                        <th className="text-left p-2.5 border border-gray-200 font-medium text-gray-700">Результат</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">FK.1</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Foundational Knowledge</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Распознает типичные ситуации адаптации в IT-команде и определяет ожидания команды к начинающему специалисту</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">FK.2</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Foundational Knowledge</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Определяет стрессовые реакции как распространенные паттерны начинающих специалистов, а не индивидуальную проблему</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">INT.1</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Integration</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Прослеживает связь между конкретными действиями и их последствиями для предсказуемости работы команды и доверия</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">INT.2</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Integration</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Связывает развитие трех компетенций с прохождением испытательного срока, подкрепляя конкретными примерами</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">HD.1</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Human Dimension</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Определяет профессиональную позицию: «начинающий специалист, имеющий право не знать и обязанный задавать вопросы»</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">HD.2</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Human Dimension</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Называет собственные стратегии избегания и определяет их как предмет осознанной работы, а не личностный дефект</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">HD.3</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Human Dimension</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Формулирует 3-4 конкретных поведенческих признака, определяющих профессиональный образ в команде</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">CAR.1</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Caring</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Обосновывает выбор стратегий прозрачности и инициативности ценностными, а не только прагматическими аргументами</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">CAR.2</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Caring</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Фиксирует прозрачность, инициативность и регулярный запрос помощи как собственные профессиональные принципы</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">LHL.1</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Learning How to Learn</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">По реакции среды определяет, какие стратегии поведения оказались продуктивными, формулирует вывод для корректировки</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-mono text-xs">LHL.2</td>
                        <td className="p-2.5 border border-gray-200"><span className="mark">Learning How to Learn</span></td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Составляет план развития по одной из трех компетенций: рабочая ситуация, целевое действие, сигналы среды для оценки</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary badge */}
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 flex items-center justify-center">
                <p className="text-sm text-gray-700 font-medium text-center">
                  23 образовательных результата · Формат ABCD · Все глаголы оцениваемые
                </p>
              </div>

            </div>
          </Collapsible>

          {/* 4. Формат и механика сценариев */}
          <Collapsible title="Формат и механика сценариев">
            <div className="space-y-5">

              <div>
                <SectionLabel>Философия</SectionLabel>
                <p className="text-gray-700 leading-relaxed">
                  <span className="mark">Тренажер как репетиция</span>, а не симуляция.
                  Обучающийся не притворяется кем-то другим, а тренирует собственные реакции
                  в реалистичных ситуациях (<span className="mark">behavioral rehearsal</span>, Bandura, 1977).
                  Цепочка: сценарий (распознавание + репетиция) → микрозадание (мост к реальности) →
                  рефлексия (закрепление после реального опыта).
                </p>
              </div>

              <div>
                <SectionLabel>Теоретическая рамка: три подхода</SectionLabel>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-2.5 border border-gray-200 font-medium text-gray-700">Подход</th>
                        <th className="text-left p-2.5 border border-gray-200 font-medium text-gray-700">Роль в проектировании</th>
                        <th className="text-left p-2.5 border border-gray-200 font-medium text-gray-700">Источник</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-medium text-gray-700">
                          <span className="mark">SBL</span>
                        </td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Структура сценария: ситуация → решение → последствия в нарративе</td>
                        <td className="p-2.5 border border-gray-200 whitespace-nowrap">Clark, 2013</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-medium text-gray-700">
                          <span className="mark">Action Mapping</span>
                        </td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">От задачи продукта к критическим решениям, а не от контента к тестам</td>
                        <td className="p-2.5 border border-gray-200 whitespace-nowrap">Moore, 2017</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-medium text-gray-700">
                          <span className="mark">Narrative Transportation</span>
                        </td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Приемы погружения: повествование от первого лица, конкретные детали, эмоциональные сигналы</td>
                        <td className="p-2.5 border border-gray-200 whitespace-nowrap">Green & Brock, 2000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <SectionLabel>Анатомия сессии</SectionLabel>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-2.5 border border-gray-200 font-medium text-gray-700">Блок</th>
                        <th className="text-left p-2.5 border border-gray-200 font-medium text-gray-700">Время</th>
                        <th className="text-left p-2.5 border border-gray-200 font-medium text-gray-700">Содержание</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-medium">Сценарий</td>
                        <td className="p-2.5 border border-gray-200 whitespace-nowrap">5-7 мин</td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Рабочая ситуация от первого лица, 2-3 точки выбора с последствиями</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-medium">Саморегуляция</td>
                        <td className="p-2.5 border border-gray-200 whitespace-nowrap">2-3 мин</td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Распознавание паттерна, affect labeling, когнитивная переоценка</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 border border-gray-200 font-medium">Микрозадание</td>
                        <td className="p-2.5 border border-gray-200 whitespace-nowrap">1-2 мин</td>
                        <td className="p-2.5 border border-gray-200 leading-relaxed">Одно конкретное действие на ближайший рабочий день</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <SectionLabel>Механика выбора</SectionLabel>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <span className="mark">Спектр из 3 стратегий</span> вместо бинарного
                  «правильно/неправильно». Каждый вариант отражает определенную степень
                  продуктивности: явно непродуктивная (избегание, молчание), приемлемая
                  (действие без структуры), продуктивная (структурированное осознанное действие).
                  Пользователь не видит маркировку до выбора.
                </p>
              </div>

              <div>
                <SectionLabel>Прогрессия обратной связи</SectionLabel>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-accent-600 mb-1">Модули 1-2</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="mark">Разбор:</span> объяснение последствий каждого выбора
                      с конкретными примерами. Формирует систему координат.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs font-medium text-accent-600 mb-1">Модули 3+</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="mark">Рефлексия:</span> обучающийся сам анализирует свой
                      выбор и его последствия. Переход к самостоятельности.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <SectionLabel>Упражнения саморегуляции</SectionLabel>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  Два основных приема:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-800 mb-1">
                      <span className="mark">Affect labeling</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Называние эмоции снижает активность миндалины и улучшает
                      эмоциональную регуляцию (Lieberman et al., 2007)
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <div className="text-xs font-semibold text-gray-800 mb-1">
                      <span className="mark">Cognitive reappraisal</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Переосмысление ситуации для изменения эмоциональной реакции (Gross, 1998)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <SectionLabel>Микрозадания</SectionLabel>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Одно действие в день. Градиент сложности: от наблюдения (модуль 1)
                  к активному социальному действию (модуль 4). Привязка к реальному
                  рабочему контексту обучающегося. Фиксация результата через отметку
                  или артефакт (скриншот сообщения, текст вопроса).
                </p>
              </div>

            </div>
          </Collapsible>

          {/* 5. Структура программы */}
          <Collapsible title="Структура программы">
            <div className="space-y-5">

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-700 font-medium">
                  6 модулей · 25 сессий · ~5 недель · ~250 минут
                </p>
              </div>

              <div>
                <SectionLabel>Путь по модулям</SectionLabel>
                <div className="space-y-2">
                  {[
                    { num: 0, title: 'Начало', sessions: '2 сессии', phase: 'Онбординг', desc: 'Знакомство с продуктом, калибровочные сценарии, пре-оценка' },
                    { num: 1, title: 'Замечать', sessions: '5 сессий', phase: 'Распознавание', desc: 'Простые ситуации, один паттерн за раз, подробный разбор' },
                    { num: 2, title: 'Называть', sessions: '5 сессий', phase: 'Формулирование', desc: 'Учусь находить слова: запрос помощи, уточнение, статус' },
                    { num: 3, title: 'Действовать', sessions: '5 сессий', phase: 'Действие через дискомфорт', desc: 'Эмоционально нагруженные ситуации, переход от разбора к рефлексии' },
                    { num: 4, title: 'Встраивать', sessions: '5 сессий', phase: 'Интеграция в работу', desc: 'Практики, рутины, все компетенции вместе' },
                    { num: 5, title: 'Расти', sessions: '3 сессии', phase: 'Автономия', desc: 'Рефлексия, артефакты (памятка + план развития), выход из тренажера' },
                  ].map(m => (
                    <div key={m.num} className="flex gap-3 items-start bg-gray-50 rounded-lg p-3">
                      <div className="w-7 h-7 rounded-full bg-accent-100 flex items-center justify-center text-xs font-bold text-accent-700 flex-shrink-0 mt-0.5">
                        {m.num}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-medium text-gray-900">{m.title}</span>
                          <span className="text-xs text-gray-400">{m.sessions}</span>
                          <span className="text-xs text-accent-600">{m.phase}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Три оси прогрессии</SectionLabel>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">📈</div>
                    <div className="font-display text-sm font-medium text-gray-900">Эмоциональная нагрузка</div>
                    <p className="text-xs text-gray-500 mt-1">От безопасных к высокострессовым ситуациям</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">🔀</div>
                    <div className="font-display text-sm font-medium text-gray-900">Интеграция компетенций</div>
                    <p className="text-xs text-gray-500 mt-1">От одной компетенции к трем одновременно</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg mb-1">❓</div>
                    <div className="font-display text-sm font-medium text-gray-900">Неопределенность</div>
                    <p className="text-xs text-gray-500 mt-1">От четких инструкций к открытым задачам</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => onNavigate('map')}
                  className="text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors"
                >
                  Подробная карта программы →
                </button>
              </div>

            </div>
          </Collapsible>

          {/* 6. Метрики */}
          <Collapsible title="Метрики (модель Киркпатрика)">
            <div className="space-y-5">

              <p className="text-gray-700 text-sm leading-relaxed">
                Система оценки построена на четырехуровневой модели Киркпатрика (1959).
                Ключевая особенность: метрики учитывают <span className="mark">разрыв
                «знаю, но боюсь»</span> (know-but-fear gap), типичный для soft skills,
                когда обучающийся понимает правильное поведение, но не может его воспроизвести
                из-за эмоционального барьера.
              </p>

              <div>
                <h4 className="font-display text-sm font-semibold text-gray-900 mb-2">L1. Реакция</h4>
                <MetricTable rows={[
                  ['Activation Rate (завершили первый сценарий)', '≥ 60%'],
                  ['Completion Rate (завершили программу)', '≥ 50%'],
                  ['Retention D7', '≥ 15%'],
                  ['CSI (индекс удовлетворенности)', '≥ 4.3 / 5.0'],
                  ['Retention D28', '≥ 8%'],
                ]} />
              </div>

              <div>
                <h4 className="font-display text-sm font-semibold text-gray-900 mb-2">L2. Обучение</h4>
                <MetricTable rows={[
                  ['Доля продуктивных стратегий в сценариях', '≥ 70%'],
                  ['Дельта пре/пост (сдвиг минимум +1 ступень)', 'у ≥ 60% обучающихся'],
                  ['Прогрессия по модулям', '≥ +15 п.п.'],
                  ['Самоэффективность (шкала 1-5)', '≥ 3.5 / 5.0, дельта ≥ +0.5'],
                  ['Доля выполненных микрозаданий', '≥ 50%'],
                  ['Качество рефлексии (≥ 2 из 3 критериев)', '≥ 60%'],
                ]} />
              </div>

              <div>
                <h4 className="font-display text-sm font-semibold text-gray-900 mb-2">L3. Поведение</h4>
                <MetricTable rows={[
                  ['Качество артефактов микрозаданий', '≥ 60%'],
                  ['Возврат к справочным материалам', '≥ 25%'],
                  ['Удержание навыка (ретест через 3-4 нед.)', '≥ 65%'],
                  ['Самоотчет о поведении', '≥ 60% фиксируют изменения'],
                  ['Оценка ментора (опционально)', '≥ 50%'],
                ]} />
              </div>

              <div>
                <h4 className="font-display text-sm font-semibold text-gray-900 mb-2">L4. Результаты</h4>
                <MetricTable rows={[
                  ['Прохождение испытательного срока', '≥ 80%'],
                  ['Удержание на работе через 6 месяцев', '> 72%'],
                  ['Субъективная оценка адаптации', '≥ 4.0 / 5.0'],
                ]} />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Примечание:</strong> уровни 1-2 измеряются внутри продукта и доступны
                  с первого дня. Уровни 3-4 требуют данных за пределами продукта (follow-up
                  через 3-6 месяцев). Поведенческие изменения на L3 измеряются четырьмя независимыми
                  методами (триангуляция), а не только самоотчетами.
                </p>
              </div>

            </div>
          </Collapsible>

          {/* 7. Теоретические основания */}
          <Collapsible title="Теоретические основания">
            <div className="space-y-2">
              {theories.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-baseline gap-2 flex-wrap mb-1">
                    <span className="font-medium text-gray-900 text-sm">
                      <span className="mark">{item.theory}</span>
                    </span>
                    <span className="text-xs text-accent-600">{item.author}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.role}</p>
                </div>
              ))}
            </div>
          </Collapsible>

        </div>

        <div className="text-center pt-8 mt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">Подготовила Наталия Гурова МПДТПО251</p>
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function About({ onNavigate }) {
  const { isInstructor } = useMode()

  return isInstructor
    ? <InstructorView onNavigate={onNavigate} />
    : <UserView onNavigate={onNavigate} />
}
