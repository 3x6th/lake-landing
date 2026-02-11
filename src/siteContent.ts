export type Language = 'ru' | 'en';

export interface LocalizedText {
  ru: string;
  en: string;
}

export interface ServiceItem {
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProjectItem {
  name: LocalizedText;
  description: LocalizedText;
  tech: string[];
}

interface NavigationLabels {
  services: string;
  projects: string;
  vacancy: string;
  contacts: string;
}

interface HeroContent {
  typingTexts: string[];
  tagline: string;
  valueProposition: string;
  primaryCta: string;
  secondaryCta: string;
}

interface SectionLabels {
  services: string;
  projects: string;
  vacancy: string;
  contacts: string;
}

interface ContactsContent {
  description: string;
  copyButtonLabel: string;
  copiedLabel: string;
  emailAriaLabel: string;
}

export interface UiCopy {
  nav: NavigationLabels;
  navAriaLabel: string;
  languageSwitcherAriaLabel: string;
  hero: HeroContent;
  sections: SectionLabels;
  contacts: ContactsContent;
  servicesSubtitle: string;
  projectsSubtitle: string;
  vacancySubtitle: string;
  footerSuffix: string;
}

export interface VacancyContent {
  title: string;
  responsibilitiesHeading: string;
  requirementsHeading: string;
  niceToHaveHeading: string;
  conditionsHeading: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  conditions: string[];
}

export const CONTACT_EMAIL = 'javadevtechlead@gmail.com';
export const LANGUAGE_STORAGE_KEY = 'ozero.language';

export const uiCopy: Record<Language, UiCopy> = {
  ru: {
    nav: {
      services: 'Услуги',
      projects: 'Проекты',
      vacancy: 'Вакансия',
      contacts: 'Контакты',
    },
    navAriaLabel: 'Навигация по сайту',
    languageSwitcherAriaLabel: 'Выбор языка',
    hero: {
      typingTexts: ['ozero.dev', 'озеро разработчиков'],
      tagline: 'озеро разработчиков',
      valueProposition: 'Аутсорс-разработка и интеграция AI-сервисов для продуктовых команд.',
      primaryCta: 'Написать нам',
      secondaryCta: 'Посмотреть проекты',
    },
    sections: {
      services: 'Услуги',
      projects: 'Проекты',
      vacancy: 'Вакансия: Java Developer',
      contacts: 'Контакты',
    },
    contacts: {
      description: 'Свяжитесь с нами по почте для сотрудничества или отклика на вакансию.',
      copyButtonLabel: 'Скопировать email',
      copiedLabel: 'Скопировано',
      emailAriaLabel: 'Отправить письмо на javadevtechlead@gmail.com',
    },
    servicesSubtitle: 'Помогаем усиливать команду и запускать продукты быстрее.',
    projectsSubtitle: 'Ключевые проектные направления команды.',
    vacancySubtitle: 'Ищем Java Developer в продуктовую команду.',
    footerSuffix: 'Аутсорс-команды и интеграция AI-сервисов.',
  },
  en: {
    nav: {
      services: 'Services',
      projects: 'Projects',
      vacancy: 'Vacancy',
      contacts: 'Contacts',
    },
    navAriaLabel: 'Site navigation',
    languageSwitcherAriaLabel: 'Language switcher',
    hero: {
      typingTexts: ['ozero.dev', 'lake of developers'],
      tagline: 'lake of developers',
      valueProposition: 'Outsourcing teams and AI integrations for product companies.',
      primaryCta: 'Contact us',
      secondaryCta: 'View projects',
    },
    sections: {
      services: 'Services',
      projects: 'Projects',
      vacancy: 'Java Developer Vacancy',
      contacts: 'Contacts',
    },
    contacts: {
      description: 'Reach out by email for outsourcing inquiries or job applications.',
      copyButtonLabel: 'Copy email',
      copiedLabel: 'Copied',
      emailAriaLabel: 'Send email to javadevtechlead@gmail.com',
    },
    servicesSubtitle: 'We strengthen engineering teams and deliver products end-to-end.',
    projectsSubtitle: 'Selected product directions and implementation cases.',
    vacancySubtitle: 'Open role in our product team.',
    footerSuffix: 'Outsourcing teams and AI integrations.',
  },
};

export const services: ServiceItem[] = [
  {
    title: {
      ru: 'Аутсорс и team extension',
      en: 'Outsourcing / Team extension',
    },
    description: {
      ru: 'Выделенные инженеры, чтобы усилить вашу команду.',
      en: 'Dedicated engineers to strengthen your team.',
    },
  },
  {
    title: {
      ru: 'End-to-end delivery',
      en: 'End-to-end delivery',
    },
    description: {
      ru: 'От идеи до продакшна: архитектура, разработка, поддержка.',
      en: 'From discovery to production: architecture, implementation, support.',
    },
  },
  {
    title: {
      ru: 'Интеграция AI-сервисов',
      en: 'AI service integration',
    },
    description: {
      ru: 'Интеграция LLM/AI: чат, рекомендации, RAG, оценка качества, безопасность.',
      en: 'LLM/AI integration: chat, recommendations, RAG, evaluation, safety.',
    },
  },
  {
    title: {
      ru: 'DevOps и observability',
      en: 'DevOps & Observability',
    },
    description: {
      ru: 'CI/CD, Docker, мониторинг (Prometheus/Grafana), стабильный деплой.',
      en: 'CI/CD, Docker, monitoring (Prometheus/Grafana), reliable deployments.',
    },
  },
];

export const projects: ProjectItem[] = [
  {
    name: {
      ru: 'Обучающая платформа',
      en: 'Learning Platform',
    },
    description: {
      ru: 'Микросервисная платформа для управления образовательным контентом, ролями и прогрессом пользователей.',
      en: 'A microservice-based platform for educational content management, role-based access, and learner progress tracking.',
    },
    tech: ['Java', 'Spring Boot', 'JWT', 'Kafka', 'PostgreSQL', 'Microservices'],
  },
  {
    name: {
      ru: 'AI агент с интеграцией в Steam',
      en: 'AI Agent with Steam Integration',
    },
    description: {
      ru: 'AI-ассистент для рекомендаций игр с контекстом профиля пользователя и интеграцией со Steam.',
      en: 'An AI assistant for game recommendations with user context processing and Steam integration.',
    },
    tech: ['Java 21', 'Spring Boot', 'Spring Security', 'gRPC', 'PostgreSQL', 'Redis', 'Docker', 'Python', 'FastAPI'],
  },
  {
    name: {
      ru: 'Таск-трекер (аналог Jira)',
      en: 'Task Tracker (Jira-like)',
    },
    description: {
      ru: 'Корпоративный трекер задач Taska: проекты, workflow, роли, доска по статусам, in-app/email уведомления и событийная микросервисная архитектура.',
      en: 'Taska corporate issue tracker with projects, workflows, role model, status board, in-app/email notifications, and event-driven microservice architecture.',
    },
    tech: ['Microservices', 'API Gateway/BFF', 'gRPC', 'Kafka', 'PostgreSQL', 'Outbox Pattern', 'Workflow Engine'],
  },
];

export const vacancy: Record<Language, VacancyContent> = {
  ru: {
    title: 'Java Developer',
    responsibilitiesHeading: 'Обязанности',
    requirementsHeading: 'Требования',
    niceToHaveHeading: 'Будет плюсом',
    conditionsHeading: 'Условия',
    responsibilities: [
      'Разработка и поддержка микросервисных приложений на Java 21 с использованием Spring Boot (Spring Security, Spring Data JPA, Spring WebFlux)',
      'Проектирование и реализация REST API, интеграция с внешними сервисами через gRPC и HTTP',
      'Работа с базами данных PostgreSQL: проектирование схем, оптимизация запросов, управление миграциями (Liquibase)',
      'Реализация аутентификации и авторизации (JWT, OAuth2, интеграция со Steam)',
      'Интеграция с брокерами сообщений (Kafka, RabbitMQ) для асинхронного взаимодействия между сервисами',
      'Написание unit- и интеграционных тестов (JUnit, Testcontainers, JaCoCo)',
      'Участие в код-ревью, улучшение архитектуры и качества кодовой базы',
      'Контейнеризация приложений (Docker, Docker Compose), настройка окружений для разработки и деплоя',
    ],
    requirements: [
      'Опыт разработки на Java (от 1 года), уверенное знание Java 17+',
      'Знание Spring Boot, Spring Security, Spring Data JPA / R2DBC',
      'Опыт работы с PostgreSQL и инструментами миграций (Liquibase / Flyway)',
      'Понимание принципов микросервисной архитектуры и межсервисного взаимодействия (REST, gRPC, очереди сообщений)',
      'Опыт работы с Docker и Docker Compose',
      'Опыт работы с Redis (кэширование, rate limiting)',
      "Знание Git, умение работать с Pull Request'ами и код-ревью",
      'Понимание принципов ООП, SOLID, паттернов проектирования',
    ],
    niceToHave: [
      'Опыт frontend-разработки: React, TypeScript, Vite, Tailwind CSS',
      'Знание Python (FastAPI, gRPC, Poetry)',
      'Навыки DevOps: настройка CI/CD (GitHub Actions), мониторинг (Prometheus, Grafana), деплой на VPS',
      'Опыт работы с Swagger / OpenAPI, Checkstyle',
      'Опыт работы с реактивным стеком Spring (WebFlux, R2DBC)',
    ],
    conditions: [
      'Работа в небольшой продуктовой команде над интересными проектами на стыке геймдева и AI',
      'Современный стек: Java 21, Spring Boot, gRPC, Kafka, Docker, Prometheus + Grafana',
      'Возможность влиять на архитектурные решения и развивать проект с нуля',
      'Профессиональный рост: код-ревью, менторство, работа с актуальными технологиями',
    ],
  },
  en: {
    title: 'Java Developer',
    responsibilitiesHeading: 'Responsibilities',
    requirementsHeading: 'Requirements',
    niceToHaveHeading: 'Nice to have',
    conditionsHeading: 'Conditions',
    responsibilities: [
      'Develop and maintain Java 21 microservice applications using Spring Boot (Spring Security, Spring Data JPA, Spring WebFlux)',
      'Design and implement REST APIs, integrate with external services via gRPC and HTTP',
      'Work with PostgreSQL: schema design, query optimization, and migration management (Liquibase)',
      'Implement authentication and authorization (JWT, OAuth2, Steam integration)',
      'Integrate message brokers (Kafka, RabbitMQ) for asynchronous communication between services',
      'Write unit and integration tests (JUnit, Testcontainers, JaCoCo)',
      'Participate in code reviews, improve architecture and overall code quality',
      'Containerize applications (Docker, Docker Compose), configure environments for development and deployment',
    ],
    requirements: [
      'At least 1 year of Java development experience, solid knowledge of Java 17+',
      'Knowledge of Spring Boot, Spring Security, Spring Data JPA / R2DBC',
      'Experience with PostgreSQL and migration tools (Liquibase / Flyway)',
      'Understanding of microservice architecture and inter-service communication (REST, gRPC, message queues)',
      'Experience with Docker and Docker Compose',
      'Experience with Redis (caching, rate limiting)',
      'Knowledge of Git, ability to work with pull requests and code reviews',
      'Understanding of OOP, SOLID principles, and design patterns',
    ],
    niceToHave: [
      'Frontend development experience: React, TypeScript, Vite, Tailwind CSS',
      'Knowledge of Python (FastAPI, gRPC, Poetry)',
      'DevOps skills: CI/CD setup (GitHub Actions), monitoring (Prometheus, Grafana), VPS deployment',
      'Experience with Swagger / OpenAPI and Checkstyle',
      'Experience with Spring reactive stack (WebFlux, R2DBC)',
    ],
    conditions: [
      'Work in a small product team on projects at the intersection of game development and AI',
      'Modern stack: Java 21, Spring Boot, gRPC, Kafka, Docker, Prometheus + Grafana',
      'Opportunity to influence architecture decisions and grow the project from scratch',
      'Professional growth through code reviews, mentorship, and work with modern technologies',
    ],
  },
};
