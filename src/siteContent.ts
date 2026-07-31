export type Language = 'ru' | 'en';

interface NavigationLabels {
  offers: string;
  work: string;
  process: string;
  faq: string;
  contact: string;
  menu: string;
}

interface HeroContent {
  headline: string;
  tagline: string;
  valueProposition: string;
  primaryCta: string;
  secondaryCta: string;
}

interface ProofFact {
  value: string;
  label: string;
}

interface OfferItem {
  title: string;
  summary: string;
  details: string[];
  cta: string;
  subject: string;
}

interface TaskaContent {
  status: string;
  title: string;
  description: string;
  note: string;
  boardAlt: string;
  projectsAlt: string;
  boardCaption: string;
  projectsCaption: string;
}

interface AiFlowStep {
  title: string;
  detail: string;
}

interface AiCaseContent {
  status: string;
  title: string;
  description: string;
  flowAriaLabel: string;
  steps: AiFlowStep[];
  note: string;
}

interface WorkContent {
  title: string;
  introduction: string;
  taska: TaskaContent;
  ai: AiCaseContent;
}

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessContent {
  title: string;
  introduction: string;
  steps: ProcessStep[];
}

interface CapabilityContent {
  title: string;
  description: string;
  facts: string[];
  note: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqContent {
  title: string;
  items: FaqItem[];
}

interface ContactContent {
  title: string;
  description: string;
  includeLabel: string;
  includeItems: string[];
  primaryCta: string;
  subject: string;
  emailAriaLabel: string;
  privacyNote: string;
}

interface FooterContent {
  statement: string;
  careersLabel: string;
  careersSubject: string;
  careersAriaLabel: string;
}

export interface UiCopy {
  nav: NavigationLabels;
  navAriaLabel: string;
  languageSwitcherAriaLabel: string;
  skipToContent: string;
  hero: HeroContent;
  proofAriaLabel: string;
  proof: ProofFact[];
  offers: {
    title: string;
    introduction: string;
    items: OfferItem[];
  };
  work: WorkContent;
  process: ProcessContent;
  capability: CapabilityContent;
  faq: FaqContent;
  contact: ContactContent;
  footer: FooterContent;
}

export const CONTACT_EMAIL = 'javadevtechlead@gmail.com';
export const LANGUAGE_STORAGE_KEY = 'ozero.language';

export const createMailtoHref = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export const uiCopy: Record<Language, UiCopy> = {
  en: {
    nav: {
      offers: 'Offers',
      work: 'Work',
      process: 'Process',
      faq: 'FAQ',
      contact: 'Contact',
      menu: 'Menu',
    },
    navAriaLabel: 'Site navigation',
    languageSwitcherAriaLabel: 'Language switcher',
    skipToContent: 'Skip to content',
    hero: {
      headline: 'ozero.dev',
      tagline: 'lake of developers',
      valueProposition:
        'Java-first engineers and focused product squads can realistically start in one to three weeks.',
      primaryCta: 'Start a conversation',
      secondaryCta: 'See our work',
    },
    proofAriaLabel: 'Delivery facts',
    proof: [
      {
        value: '≈30',
        label: 'engineers in a curated Java-focused network',
      },
      {
        value: '1–3 weeks',
        label: 'to a realistic focused start after fit is confirmed',
      },
      {
        value: '1 engineer',
        label: 'or a small squad — begin at the right scale',
      },
      {
        value: '1 month',
        label: 'minimum engagement',
      },
    ],
    offers: {
      title: 'Engineering capacity shaped around the work.',
      introduction:
        'Start with one experienced engineer, assemble a focused squad, or hand over a defined delivery scope.',
      items: [
        {
          title: 'Team extension',
          summary:
            'Add a Java engineer or a small cross-functional squad to your existing team.',
          details: [
            'You retain the roadmap and priorities',
            'Optional onboarding and technical oversight',
            'Architecture, mentoring, and replacement support when needed',
          ],
          cta: 'Discuss team extension',
          subject: 'Ozero Dev — team extension',
        },
        {
          title: 'Managed delivery',
          summary:
            'Bring us a defined product or engineering scope and get a focused delivery team.',
          details: [
            'Discovery and scope clarification',
            'Architecture and implementation',
            'Delivery support with visible responsibilities',
          ],
          cta: 'Discuss managed delivery',
          subject: 'Ozero Dev — managed delivery',
        },
        {
          title: 'AI & knowledge integrations',
          summary:
            'Turn a defined knowledge need into a useful assistant interface or service.',
          details: [
            'Knowledge-source mapping',
            'Retrieval and controlled generation',
            'Source-aware response interfaces',
          ],
          cta: 'Discuss an AI integration',
          subject: 'Ozero Dev — AI and knowledge integration',
        },
      ],
    },
    work: {
      title: 'Current product work, shown as it is.',
      introduction:
        'No fictional client logos or inflated outcome metrics — only real product directions and their current status.',
      taska: {
        status: 'IN DEVELOPMENT',
        title: 'Taska — work management for product teams',
        description:
          'A Jira- and Kanban-like work-management product with project workspaces and issue boards. The interface and product decisions are still evolving.',
        note:
          'This is an active development project, not a completed customer case.',
        boardAlt:
          'Taska issue board in dark mode with To Do, In Progress, and Done columns holding ten task, bug, and story cards, each with a date and an assignee avatar',
        projectsAlt:
          'Taska projects screen with four project workspace cards, each showing a short description, member avatars, and an issue count',
        boardCaption: 'Issue board — current product interface',
        projectsCaption: 'Project workspaces — supporting view',
      },
      ai: {
        status: 'INTERNAL R&D · ANONYMIZED',
        title: 'Knowledge assistant for project-specific answers',
        description:
          'An internal research direction for connecting assistant interfaces to selected knowledge sources. Project and data details remain anonymized.',
        flowAriaLabel: 'Knowledge assistant flow',
        steps: [
          {
            title: 'Source library',
            detail: 'Selected project knowledge',
          },
          {
            title: 'Retrieval',
            detail: 'Relevant context is identified',
          },
          {
            title: 'Controlled generation',
            detail: 'The response stays inside that context',
          },
          {
            title: 'Response with sources',
            detail: 'The answer keeps its evidence visible',
          },
        ],
        note:
          'The diagram describes the working concept without exposing private screens, vendors, or data.',
      },
    },
    process: {
      title: 'A short path from the first email to useful work.',
      introduction:
        'The process stays small on purpose: enough structure to establish fit, without unnecessary procurement overhead.',
      steps: [
        {
          title: 'Brief',
          description:
            'Share the role or scope, product context, desired start date, and working language.',
        },
        {
          title: 'Fit',
          description:
            'We align the engagement shape, responsibilities, availability, and language fit.',
        },
        {
          title: 'Start',
          description:
            'A focused engagement can realistically start in one to three weeks. The minimum engagement is one month.',
        },
        {
          title: 'Work',
          description:
            'For team extension, you own the roadmap. Ozero can add onboarding, technical oversight, or delivery support.',
        },
      ],
    },
    capability: {
      title: 'A compact network with experienced support available.',
      description:
        'Ozero maintains a curated network of engineers around Java-heavy product work. Experienced onboarding, technical oversight, mentoring, and architecture support are available when the engagement needs them.',
      facts: [
        'Each of the two principals has more than six years of engineering experience',
        'Network engineers average about three years of development experience',
        'The network covers Java, full-stack, and project-management work',
        'An English-speaking subset is available; language fit is confirmed during matching',
      ],
      note:
        'Engagements are available across Europe and the CIS. DevOps and observability support can be included where the delivery scope requires it.',
    },
    faq: {
      title: 'Practical questions, answered plainly.',
      items: [
        {
          question: 'Can we start with one engineer?',
          answer:
            'Yes. An engagement can begin with one engineer and expand to a focused squad if the scope grows.',
        },
        {
          question: 'How quickly can someone start?',
          answer:
            'A focused engagement can realistically start in one to three weeks after fit and availability are confirmed. The minimum engagement is one month.',
        },
        {
          question: 'Who owns the roadmap and priorities?',
          answer:
            'In team extension, the client owns the roadmap and priorities. Ozero can add onboarding, technical oversight, mentoring, architecture support, or replacement support when agreed.',
        },
        {
          question: 'What experience and language coverage is available?',
          answer:
            'Each of the two principals has more than six years of engineering experience, while network engineers average about three years. Part of the network can work in English; language fit is confirmed during matching.',
        },
        {
          question: 'Do you work beyond team extension?',
          answer:
            'Yes. Ozero also takes defined managed-delivery scopes and builds AI or knowledge integrations around a concrete need.',
        },
        {
          question: 'What should the first email include?',
          answer:
            'Include the role or scope, a little product context, your preferred start date, and the working language. A short note is enough to begin.',
        },
      ],
    },
    contact: {
      title: 'Tell us what needs to move.',
      description:
        'A short email is enough. We will reply with the questions needed to establish fit and a realistic start.',
      includeLabel: 'Useful to include',
      includeItems: [
        'Role or delivery scope',
        'Product and team context',
        'Preferred start date',
        'Working language',
      ],
      primaryCta: 'Write to Ozero',
      subject: 'Ozero Dev — project inquiry',
      emailAriaLabel: `Send a project inquiry to ${CONTACT_EMAIL}`,
      privacyNote:
        'No form and no visitor-data collection. Your email opens in your own mail application.',
    },
    footer: {
      statement: 'Ozero Dev · Java-first engineering capacity',
      careersLabel: 'Future career introductions',
      careersSubject: 'Ozero Dev — future career introduction',
      careersAriaLabel: `Send a future career introduction to ${CONTACT_EMAIL}`,
    },
  },
  ru: {
    nav: {
      offers: 'Форматы',
      work: 'Проекты',
      process: 'Процесс',
      faq: 'Вопросы',
      contact: 'Контакты',
      menu: 'Меню',
    },
    navAriaLabel: 'Навигация по сайту',
    languageSwitcherAriaLabel: 'Выбор языка',
    skipToContent: 'Перейти к содержимому',
    hero: {
      headline: 'ozero.dev',
      tagline: 'озеро разработчиков',
      valueProposition:
        'Подключаем Java-разработчика или небольшую продуктовую команду. Реалистичный срок — одна–три недели.',
      primaryCta: 'Обсудить задачу',
      secondaryCta: 'Посмотреть проекты',
    },
    proofAriaLabel: 'Факты о сотрудничестве',
    proof: [
      {
        value: '≈30',
        label: 'специалистов в отобранной Java-ориентированной сети',
      },
      {
        value: '1–3 недели',
        label: 'реалистичный срок старта после согласования формата и состава',
      },
      {
        value: '1 специалист',
        label: 'или небольшая команда — начинаем с нужного масштаба',
      },
      {
        value: '1 месяц',
        label: 'минимальный срок сотрудничества',
      },
    ],
    offers: {
      title: 'Инженерный ресурс под конкретную задачу.',
      introduction:
        'Начните с одного опытного разработчика, соберите небольшую команду или передайте нам отдельный, заранее согласованный объём работ.',
      items: [
        {
          title: 'Усиление команды',
          summary:
            'Java-разработчик или небольшая кросс-функциональная команда в дополнение к вашей.',
          details: [
            'Продуктовый план и приоритеты остаются у вас',
            'При необходимости — онбординг и технический контроль',
            'Архитектура, менторинг и замена специалиста при необходимости',
          ],
          cta: 'Обсудить усиление команды',
          subject: 'Ozero Dev — усиление команды',
        },
        {
          title: 'Управляемая разработка',
          summary:
            'Собираем небольшую команду под заранее согласованный продуктовый или инженерный объём работ.',
          details: [
            'Исследование задачи и уточнение объёма работ',
            'Архитектура и реализация',
            'Сопровождение разработки с понятными зонами ответственности',
          ],
          cta: 'Обсудить управляемую разработку',
          subject: 'Ozero Dev — управляемая разработка',
        },
        {
          title: 'AI и интеграции знаний',
          summary:
            'Превращаем конкретную задачу по работе со знаниями в интерфейс ассистента или сервис.',
          details: [
            'Карта источников знаний',
            'Поиск контекста и контролируемая генерация',
            'Ответы с видимыми источниками',
          ],
          cta: 'Обсудить AI-интеграцию',
          subject: 'Ozero Dev — AI и интеграция знаний',
        },
      ],
    },
    work: {
      title: 'Текущая продуктовая работа — как есть.',
      introduction:
        'Без выдуманных логотипов клиентов и раздутых метрик — только реальные продуктовые направления и их текущий статус.',
      taska: {
        status: 'В РАЗРАБОТКЕ',
        title: 'Taska — управление работой продуктовых команд',
        description:
          'Продукт в духе Jira и Kanban с рабочими пространствами проектов и досками задач. Интерфейс и продуктовые решения продолжают развиваться.',
        note:
          'Это активная разработка, а не завершённый клиентский кейс.',
        boardAlt:
          'Тёмная доска задач Taska с колонками To Do, In Progress и Done: десять карточек task, bug и story, у каждой дата и аватар исполнителя',
        projectsAlt:
          'Экран проектов Taska с четырьмя карточками рабочих пространств: у каждой краткое описание, аватары участников и число задач',
        boardCaption: 'Доска задач — текущий интерфейс продукта',
        projectsCaption: 'Рабочие пространства — дополнительный экран',
      },
      ai: {
        status: 'ВНУТРЕННИЙ R&D · АНОНИМИЗИРОВАНО',
        title: 'Ассистент по базе знаний для ответов в контексте проекта',
        description:
          'Внутреннее исследовательское направление: подключаем интерфейс ассистента к выбранным источникам знаний. Детали проекта и данных анонимизированы.',
        flowAriaLabel: 'Схема работы ассистента по базе знаний',
        steps: [
          {
            title: 'Библиотека источников',
            detail: 'Выбранные знания проекта',
          },
          {
            title: 'Поиск контекста',
            detail: 'Определяется релевантный контекст',
          },
          {
            title: 'Контролируемая генерация',
            detail: 'Ответ остаётся внутри найденного контекста',
          },
          {
            title: 'Ответ с источниками',
            detail: 'В ответе видно, на чём он основан',
          },
        ],
        note:
          'Схема показывает рабочую концепцию и не раскрывает закрытые экраны, поставщиков моделей и данные.',
      },
    },
    process: {
      title: 'Короткий путь от первого письма до полезной работы.',
      introduction:
        'Процесс намеренно простой: достаточно структуры, чтобы понять, подходим ли мы друг другу, и без долгих закупочных процедур.',
      steps: [
        {
          title: 'Вводные',
          description:
            'Опишите роль или объём работ, контекст продукта, желаемую дату старта и рабочий язык.',
        },
        {
          title: 'Подбор',
          description:
            'Согласуем формат работы, зоны ответственности, доступность и владение нужным языком.',
        },
        {
          title: 'Старт',
          description:
            'Реалистичный срок подключения — от одной до трёх недель. Минимальный срок сотрудничества — один месяц.',
        },
        {
          title: 'Работа',
          description:
            'При усилении команды продуктовый план остаётся у вас. Ozero может добавить онбординг, технический контроль или сопровождение разработки.',
        },
      ],
    },
    capability: {
      title: 'Компактная сеть и опытная поддержка, когда она нужна.',
      description:
        'Ozero поддерживает отобранную сеть специалистов для Java-ориентированной продуктовой разработки. При необходимости доступны опытная помощь с онбордингом, технический контроль, менторинг и архитектурная поддержка.',
      facts: [
        'У каждого из двух руководителей — более шести лет инженерного опыта',
        'Средний опыт разработчиков в сети — около трёх лет',
        'Сеть закрывает Java, full-stack-разработку и управление проектами',
        'Часть специалистов работает на английском; владение языком подтверждаем на этапе подбора',
      ],
      note:
        'Работаем с компаниями из Европы и СНГ. DevOps и observability подключаем, когда этого требует объём работ.',
    },
    faq: {
      title: 'Практические вопросы — прямые ответы.',
      items: [
        {
          question: 'Можно начать с одного специалиста?',
          answer:
            'Да. Начать можно с одного разработчика и вырасти до небольшой команды, если объём работ увеличится.',
        },
        {
          question: 'Как быстро можно начать?',
          answer:
            'Реалистичный срок подключения разработчика или небольшой команды — от одной до трёх недель после того, как согласованы формат работы и доступность. Минимальный срок сотрудничества — один месяц.',
        },
        {
          question: 'Кто отвечает за продуктовый план и приоритеты?',
          answer:
            'В формате усиления команды продуктовый план и приоритеты остаются у клиента. По договорённости Ozero может добавить онбординг, технический контроль, менторинг, архитектурную поддержку или замену специалиста.',
        },
        {
          question: 'Какой опыт у команды и на каких языках вы работаете?',
          answer:
            'У каждого из двух руководителей более шести лет инженерного опыта, средний опыт разработчиков в сети — около трёх лет. Часть сети может работать на английском; владение языком подтверждаем на этапе подбора.',
        },
        {
          question: 'Вы работаете только в формате усиления команды?',
          answer:
            'Нет. Ozero также берёт на себя управляемую разработку согласованного объёма и делает интеграции AI и знаний под конкретную задачу.',
        },
        {
          question: 'Что написать в первом письме?',
          answer:
            'Укажите роль или объём работ, немного контекста продукта, желаемую дату старта и рабочий язык. Для начала достаточно короткого сообщения.',
        },
      ],
    },
    contact: {
      title: 'Расскажите, что нужно сдвинуть с места.',
      description:
        'Достаточно короткого письма. В ответ зададим вопросы, которые помогут понять формат работы и реалистичный срок старта.',
      includeLabel: 'Полезно указать',
      includeItems: [
        'Роль или объём работ',
        'Контекст продукта и команды',
        'Желаемая дата старта',
        'Рабочий язык',
      ],
      primaryCta: 'Написать Ozero',
      subject: 'Ozero Dev — запрос по проекту',
      emailAriaLabel: `Отправить запрос по проекту на ${CONTACT_EMAIL}`,
      privacyNote:
        'Никаких форм и сбора данных о посетителях. Письмо откроется в вашем почтовом приложении.',
    },
    footer: {
      statement: 'Ozero Dev · Java-ориентированный инженерный ресурс',
      careersLabel: 'Знакомство на будущее',
      careersSubject: 'Ozero Dev — знакомство на будущее',
      careersAriaLabel: `Написать на ${CONTACT_EMAIL} для знакомства на будущее`,
    },
  },
};
