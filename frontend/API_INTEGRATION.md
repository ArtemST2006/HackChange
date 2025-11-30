# API Integration Guide

Это руководство для backend-разработчиков по интеграции с фронтендом.

## Конфигурация

Фронтенд ожидает API на URL, указанном в переменной окружения:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Аутентификация

### JWT Token
- Токен должен возвращаться при `/auth/login` и `/auth/register`
- Фронтенд автоматически добавляет токен в заголовок: `Authorization: Bearer <token>`
- Токен хранится в `localStorage` под ключом `authToken`

### Формат ответа API

Все API endpoints должны возвращать данные в следующем формате:

```typescript
{
  "data": T,           // Данные запроса
  "message": string,   // Опциональное сообщение
  "success": boolean   // Статус успеха
}
```

### Формат ошибок

```typescript
{
  "message": string,                    // Сообщение об ошибке
  "errors": Record<string, string[]>,   // Опциональные ошибки валидации
  "statusCode": number                  // HTTP статус код
}
```

## API Endpoints

### Authentication (`/auth`)

#### POST `/auth/login`
**Request:**
```json
{
  "email": "string",
  "password": "string",
  "rememberMe": "boolean?"
}
```

**Response:**
```json
{
  "data": {
    "user": User,
    "token": "string",
    "refreshToken": "string?"
  },
  "success": true
}
```

#### POST `/auth/register`
**Request:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "agreeToTerms": "boolean"
}
```

**Response:** Same as login

#### POST `/auth/logout`
**Response:**
```json
{
  "success": true
}
```

#### GET `/auth/me`
**Response:**
```json
{
  "data": User,
  "success": true
}
```

#### POST `/auth/refresh`
**Request:**
```json
{
  "refreshToken": "string"
}
```

**Response:**
```json
{
  "data": {
    "user": User,
    "token": "string"
  },
  "success": true
}
```

### Dashboard (`/dashboard`)

#### GET `/dashboard`
**Response:**
```json
{
  "data": {
    "user": User,
    "statistics": UserStatistics,
    "continueLearning": Course?,
    "upcomingDeadlines": Homework[],
    "myCourses": Course[],
    "recommendedCourses": Course[],
    "recentActivity": Activity[]
  },
  "success": true
}
```

#### GET `/dashboard/statistics`
**Response:**
```json
{
  "data": {
    "activeCourses": "number",
    "completedCourses": "number",
    "totalHomeworks": "number",
    "completedHomeworks": "number",
    "totalTests": "number",
    "completedTests": "number",
    "averageGrade": "number",
    "streak": "number",
    "totalStudyTime": "number",
    "registeredAt": "string (ISO date)"
  },
  "success": true
}
```

### Courses (`/courses`)

#### GET `/courses`
**Query Parameters:**
- `category`: string (optional)
- `difficulty`: 'beginner' | 'intermediate' | 'advanced' (optional)
- `minDuration`: number (optional)
- `maxDuration`: number (optional)
- `search`: string (optional)

**Response:**
```json
{
  "data": Course[],
  "success": true
}
```

#### GET `/courses/my`
Возвращает курсы текущего пользователя

**Response:**
```json
{
  "data": Course[],
  "success": true
}
```

#### GET `/courses/featured`
Возвращает рекомендуемые/избранные курсы

**Response:**
```json
{
  "data": Course[],
  "success": true
}
```

#### GET `/courses/:id`
**Response:**
```json
{
  "data": Course,
  "success": true
}
```

#### GET `/courses/:id/modules`
**Response:**
```json
{
  "data": Module[],
  "success": true
}
```

#### POST `/courses/:id/enroll`
Записать пользователя на курс

**Response:**
```json
{
  "success": true
}
```

### Lessons (`/lessons`)

#### GET `/lessons/:id`
**Response:**
```json
{
  "data": Lesson,
  "success": true
}
```

#### POST `/lessons/:id/complete`
Отметить урок как завершенный

**Response:**
```json
{
  "success": true
}
```

### Homeworks (`/homeworks`)

#### GET `/homeworks/my`
**Response:**
```json
{
  "data": Homework[],
  "success": true
}
```

#### GET `/homeworks/:id`
**Response:**
```json
{
  "data": Homework,
  "success": true
}
```

#### POST `/homeworks/:id/submit`
**Content-Type:** `multipart/form-data`

**Form Fields:**
- `textAnswer`: string (optional)
- `files`: File[] (optional)

**Response:**
```json
{
  "data": HomeworkSubmission,
  "success": true
}
```

#### GET `/homeworks/:id/submission`
**Response:**
```json
{
  "data": HomeworkSubmission | null,
  "success": true
}
```
**Note:** Возвращает 404 если submission не найден

## TypeScript Типы

Все TypeScript типы находятся в файле: `src/types/index.ts`

Основные типы:
- `User` - Пользователь
- `Course` - Курс
- `Module` - Модуль курса
- `Lesson` - Урок
- `Homework` - Домашнее задание
- `HomeworkSubmission` - Отправка домашнего задания
- `UserStatistics` - Статистика пользователя
- `DashboardData` - Данные для дашборда

## Использование на фронтенде

### Custom Hooks

Фронтенд предоставляет готовые хуки для работы с API:

```typescript
import { useDashboard, useStatistics } from './hooks';
import { useCourses, useMyCourses, useCourse } from './hooks';
import { useMyHomeworks, useHomework } from './hooks';

// Пример использования
function Dashboard() {
  const { data, loading, error, refetch } = useDashboard();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Use data */}</div>;
}
```

### Прямое использование сервисов

```typescript
import { dashboardService, coursesService, homeworkService } from './services/api';

// Получить данные дашборда
const dashboardData = await dashboardService.getDashboardData();

// Получить курсы с фильтрами
const courses = await coursesService.getAllCourses({
  category: 'Программирование',
  difficulty: 'beginner'
});

// Отправить домашнее задание
const submission = await homeworkService.submitHomework(
  'homework-id',
  'Текстовый ответ',
  [file1, file2]
);
```

## Обработка ошибок

API клиент автоматически обрабатывает ошибки и преобразует их в формат `ApiError`:

```typescript
try {
  const data = await dashboardService.getDashboardData();
} catch (error) {
  const apiError = error as ApiError;
  console.error(apiError.message);
  console.error(apiError.statusCode);
  console.error(apiError.errors); // Validation errors
}
```

## CORS

Убедитесь, что backend настроен для приема запросов с фронтенда:
- Разрешите origin: `http://localhost:5173` (dev)
- Разрешите методы: GET, POST, PUT, PATCH, DELETE
- Разрешите заголовки: `Content-Type`, `Authorization`
- Разрешите credentials: true (для cookies/localStorage)

## Тестирование

До готовности бэкенда фронтенд использует моковые данные из `src/utils/mockData.ts`.

Для переключения на реальный API:
1. Создайте файл `.env` в корне `frontend/`
2. Добавьте: `VITE_API_BASE_URL=http://your-backend-url/api`
3. Обновите AuthContext для использования реальных API сервисов

## Примеры запросов

### cURL примеры

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get dashboard (with auth)
curl -X GET http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get courses with filters
curl -X GET "http://localhost:3000/api/courses?category=Programming&difficulty=beginner"

# Submit homework
curl -X POST http://localhost:3000/api/homeworks/hw-123/submit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "textAnswer=My answer" \
  -F "files=@/path/to/file.pdf"
```

## Контакты

При возникновении вопросов по интеграции API обращайтесь к frontend-команде.
