# Инструкция по развертыванию

## Требования
- Node.js 18+ или Bun
- npm, yarn, pnpm или bun

## Локальная разработка

### 1. Установка зависимостей
```bash
npm install
# или
bun install
```

### 2. Запуск dev-сервера
```bash
npm run dev
# или
bun dev
```

Сервер запустится на `http://localhost:8080`

## Сборка для продакшена

### 1. Создание production build
```bash
npm run build
# или
bun run build
```

Готовые файлы будут в папке `dist/`

### 2. Предварительный просмотр production build
```bash
npm run preview
# или
bun preview
```

## Развертывание

### На Lovable
1. Откройте проект в [Lovable](https://lovable.dev/projects/25dd8ffc-e3fa-4564-8d52-cad3e0e6a14b)
2. Нажмите "Publish" в правом верхнем углу
3. Следуйте инструкциям

### На Vercel
```bash
# Установите Vercel CLI
npm i -g vercel

# Разверните
vercel
```

### На Netlify
```bash
# Установите Netlify CLI
npm i -g netlify-cli

# Разверните
netlify deploy --prod
```

### На собственном сервере
1. Соберите проект: `npm run build`
2. Скопируйте содержимое папки `dist/` на ваш сервер
3. Настройте веб-сервер (nginx, apache и т.д.) для обслуживания SPA

## Проверка корректности

### Проверка сборки
```bash
# Очистите кэш и node_modules
rm -rf node_modules dist .vite
npm install
npm run build
```

Если сборка завершилась успешно - проект готов к развертыванию.

### Решение проблем

**Ошибка "Cannot find module":**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Ошибка TypeScript:**
```bash
npm run build -- --mode development
```

**Проблемы с кэшем:**
```bash
rm -rf .vite dist
npm run build
```

## Переменные окружения

Для работы базового функционала переменные окружения не требуются.

Если интегрируете внешние сервисы, создайте файл `.env`:
```bash
cp .env.example .env
```

И заполните необходимые значения.

## Поддержка

- **Документация Lovable**: https://docs.lovable.dev/
- **Discord сообщество**: https://discord.com/channels/1119885301872070706/1280461670979993613
- **Проект**: https://lovable.dev/projects/25dd8ffc-e3fa-4564-8d52-cad3e0e6a14b
