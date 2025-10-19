# Creative Studio - AI Content Generator

Платформа для создания UGC-видео, профессиональных роликов и AI-фотосессий.

## Project info

**URL**: https://lovable.dev/projects/25dd8ffc-e3fa-4564-8d52-cad3e0e6a14b

## 🚀 Быстрый старт

### Требования
- Node.js 18+ или Bun
- npm, yarn, pnpm или bun

### Установка и запуск

1. **Клонируйте репозиторий:**
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Установите зависимости:**
```sh
npm install
# или
bun install
# или
yarn install
```

3. **Запустите dev-сервер:**
```sh
npm run dev
# или
bun dev
# или  
yarn dev
```

4. **Откройте браузер:**
Перейдите на `http://localhost:8080`

## 📁 Структура проекта

```
src/
├── components/     # Переиспользуемые компоненты
│   ├── ui/        # shadcn-ui компоненты
│   └── ...        # Кастомные компоненты
├── pages/         # Страницы (роуты)
├── hooks/         # React hooks
├── lib/           # Утилиты
└── index.css      # Глобальные стили и дизайн-система
```

## 🛠️ Технологии

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui
- React Router
- Tanstack Query
- Lucide Icons

## 📦 Сборка для продакшена

```sh
npm run build
```

Готовые файлы будут в папке `dist/`

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/25dd8ffc-e3fa-4564-8d52-cad3e0e6a14b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/25dd8ffc-e3fa-4564-8d52-cad3e0e6a14b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
