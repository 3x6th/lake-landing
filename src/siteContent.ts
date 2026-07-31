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
  label: string;
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
  label: string;
  title: string;
  introduction: string;
  steps: ProcessStep[];
}

interface CapabilityContent {
  label: string;
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
  label: string;
  title: string;
  items: FaqItem[];
}

interface ContactContent {
  label: string;
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
  hero: HeroContent;
  proofAriaLabel: string;
  proof: ProofFact[];
  offers: {
    label: string;
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
      label: 'Ways to work',
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
      label: 'Selected work',
      title: 'Current product work, shown as it is.',
      introduction:
        'No fictional client logos or inflated outcome metrics — only real product directions and their current status.',
      taska: {
        status: 'IN DEVELOPMENT',
        title: 'Taska — work management for product teams',
        description:
          'A Jira- and Kanban-like product with project workspaces, issue boards, roles, workflows, and notifications. The interface and product decisions are still evolving.',
        note:
          'This is an active development project, not a completed customer case.',
        boardAlt:
          'Taska dark-mode Kanban board with To Do, In Progress, and Done columns',
        projectsAlt:
          'Taska projects overview with three project workspaces',
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
      label: 'How we start',
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
      label: 'Delivery capability',
      title: 'A compact network with experienced support available.',
      description:
        'Ozero maintains a curated network of trusted specialists around Java-heavy product work. Experienced onboarding, technical oversight, mentoring, and architecture support are available when the engagement needs them.',
      facts: [
        'Both principals have more than six years of engineering experience',
        'Network engineers average about three years of development experience',
        'Java, full-stack, and project-management capability',
        'An English-speaking subset is available; language fit is confirmed during matching',
      ],
      note:
        'Engagements are available across Europe and the CIS. DevOps and observability support can be included where the delivery scope requires it.',
    },
    faq: {
      label: 'Before we talk',
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
            'Both principals have more than six years of engineering experience, while network engineers average about three years. Part of the network can work in English; language fit is confirmed during matching.',
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
      label: 'Start here',
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
    hero: {
      headline: 'ozero.dev',
      tagline: 'озеро разработчиков',
      valueProposition:
        'Реалистичный срок подключения Java-разработчика или сфокусированной продуктовой команды — одна–три недели.',
      primaryCta: 'Начать разговор',
      secondaryCta: 'Посмотреть проекты',
    },
    proofAriaLabel: 'Факты о работе',
    proof: [
      {
        value: '≈30',
        label: 'специалистов в отобранной Java-ориентированной сети',
      },
      {
        value: '1–3 недели',
        label: 'до реалистичного сфокусированного старта после подтверждения fit',
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
      label: 'Форматы работы',
      title: 'Инженерный ресурс под реальную задачу.',
      introduction:
        'Начните с одного опытного разработчика, соберите небольшую команду или передайте нам очерченный объём разработки.',
      items: [
        {
          title: 'Усиление команды',
          summary:
            'Java-разработчик или небольшая кросс-функциональная команда в дополнение к вашей.',
          details: [
            'Roadmap и приоритеты остаются у вас',
            'Опционально — онбординг и технический контроль',
            'Архитектура, менторинг и замена специалиста при необходимости',
          ],
          cta: 'Обсудить усиление команды',
          subject: 'Ozero Dev — усиление команды',
        },
        {
          title: 'Управляемая разработка',
          summary:
            'Сфокусированная команда для поставки заранее согласованного продуктового или инженерного объёма.',
          details: [
            'Discovery и уточнение объёма',
            'Архитектура и реализация',
            'Поддержка поставки с понятными зонами ответственности',
          ],
          cta: 'Обсудить управляемую разработку',
          subject: 'Ozero Dev — управляемая разработка',
        },
        {
          title: 'AI и knowledge-интеграции',
          summary:
            'Превращаем конкретную задачу работы со знаниями в полезный интерфейс или сервис.',
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
      label: 'Избранные проекты',
      title: 'Текущая продуктовая работа без приукрашиваний.',
      introduction:
        'Без выдуманных логотипов клиентов и метрик результата — только реальные направления и их честный статус.',
      taska: {
        status: 'В РАЗРАБОТКЕ',
        title: 'Taska — управление работой продуктовых команд',
        description:
          'Продукт по типу Jira и Kanban с рабочими пространствами, досками задач, ролями, workflow и уведомлениями. Интерфейс и продуктовые решения продолжают развиваться.',
        note:
          'Это активная разработка, а не завершённый клиентский кейс.',
        boardAlt:
          'Тёмная Kanban-доска Taska с колонками К выполнению, В работе и Готово',
        projectsAlt:
          'Обзор Taska с тремя рабочими пространствами проектов',
        boardCaption: 'Доска задач — текущий интерфейс продукта',
        projectsCaption: 'Рабочие пространства — дополнительный экран',
      },
      ai: {
        status: 'ВНУТРЕННИЙ R&D · АНОНИМИЗИРОВАНО',
        title: 'Knowledge-ассистент для ответов в контексте проекта',
        description:
          'Внутреннее исследовательское направление по подключению ассистентских интерфейсов к выбранным источникам знаний. Детали проекта и данных анонимизированы.',
        flowAriaLabel: 'Схема работы knowledge-ассистента',
        steps: [
          {
            title: 'Библиотека источников',
            detail: 'Выбранные знания проекта',
          },
          {
            title: 'Поиск контекста',
            detail: 'Определяется релевантная информация',
          },
          {
            title: 'Контролируемая генерация',
            detail: 'Ответ остаётся внутри найденного контекста',
          },
          {
            title: 'Ответ с источниками',
            detail: 'Доказательства остаются видимыми',
          },
        ],
        note:
          'Схема показывает рабочую концепцию без раскрытия приватных экранов, поставщиков или данных.',
      },
    },
    process: {
      label: 'Как начинаем',
      title: 'Короткий путь от первого письма до полезной работы.',
      introduction:
        'Процесс намеренно компактный: достаточно структуры, чтобы подтвердить fit, без лишней бюрократии на старте.',
      steps: [
        {
          title: 'Вводные',
          description:
            'Опишите роль или объём работ, контекст продукта, желаемую дату старта и рабочий язык.',
        },
        {
          title: 'Соответствие',
          description:
            'Согласуем формат работы, зоны ответственности, доступность и языковой fit.',
        },
        {
          title: 'Старт',
          description:
            'Реалистичный срок начала сфокусированной работы — от одной до трёх недель. Минимальный срок — один месяц.',
        },
        {
          title: 'Работа',
          description:
            'При усилении команды roadmap остаётся у клиента. Ozero может добавить онбординг, технический контроль или поддержку поставки.',
        },
      ],
    },
    capability: {
      label: 'Возможности',
      title: 'Компактная сеть с доступной поддержкой опытных специалистов.',
      description:
        'Ozero поддерживает отобранную сеть проверенных специалистов вокруг Java-ориентированной продуктовой разработки. При необходимости доступны помощь с онбордингом, технический контроль, менторинг и архитектурная поддержка.',
      facts: [
        'У обоих руководителей более шести лет инженерного опыта',
        'Средний опыт специалистов сети — около трёх лет разработки',
        'Компетенции в Java, full-stack-разработке и управлении проектами',
        'Часть специалистов работает на английском; языковой fit подтверждается при подборе',
      ],
      note:
        'Работаем с Европой и СНГ. DevOps и observability могут входить в поддержку, когда этого требует объём поставки.',
    },
    faq: {
      label: 'До разговора',
      title: 'Практические вопросы — прямые ответы.',
      items: [
        {
          question: 'Можно начать с одного специалиста?',
          answer:
            'Да. Сотрудничество может начаться с одного разработчика и вырасти до сфокусированной команды, если увеличится объём.',
        },
        {
          question: 'Как быстро можно начать?',
          answer:
            'После подтверждения fit и доступности реалистичный срок начала сфокусированной работы — от одной до трёх недель. Минимальный срок сотрудничества — один месяц.',
        },
        {
          question: 'Кто отвечает за roadmap и приоритеты?',
          answer:
            'В формате усиления команды roadmap и приоритеты остаются у клиента. По договорённости Ozero может добавить онбординг, технический контроль, менторинг, архитектурную поддержку или замену специалиста.',
        },
        {
          question: 'Какой опыт и языковая поддержка доступны?',
          answer:
            'У обоих руководителей более шести лет инженерного опыта, средний опыт специалистов сети — около трёх лет. Часть сети может работать на английском; языковой fit подтверждаем при подборе.',
        },
        {
          question: 'Вы работаете только как team extension?',
          answer:
            'Нет. Ozero также выполняет управляемую поставку согласованного продуктового объёма и создаёт AI или knowledge-интеграции под конкретную задачу.',
        },
        {
          question: 'Что написать в первом письме?',
          answer:
            'Укажите роль или объём работ, немного контекста продукта, желаемую дату старта и рабочий язык. Для начала достаточно короткого сообщения.',
        },
      ],
    },
    contact: {
      label: 'Начать здесь',
      title: 'Расскажите, что нужно сдвинуть с места.',
      description:
        'Достаточно короткого письма. Мы ответим вопросами, которые помогут подтвердить fit и реалистичный срок старта.',
      includeLabel: 'Полезно указать',
      includeItems: [
        'Роль или объём поставки',
        'Контекст продукта и команды',
        'Желаемую дату старта',
        'Рабочий язык',
      ],
      primaryCta: 'Написать Ozero',
      subject: 'Ozero Dev — запрос по проекту',
      emailAriaLabel: `Отправить запрос по проекту на ${CONTACT_EMAIL}`,
      privacyNote:
        'Без формы и сбора данных посетителя. Письмо откроется в вашем почтовом приложении.',
    },
    footer: {
      statement: 'Ozero Dev · Java-ориентированный инженерный ресурс',
      careersLabel: 'Знакомство на будущее',
      careersSubject: 'Ozero Dev — знакомство на будущее',
      careersAriaLabel: `Отправить письмо для знакомства на ${CONTACT_EMAIL}`,
    },
  },
};
