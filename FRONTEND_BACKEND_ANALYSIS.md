# Глубокий анализ несоответствий фронтенда и бэкенда

## 🔴 КРИТИЧЕСКИЕ НЕСООТВЕТСТВИЯ

### 1. **Аутентификация - Разные подходы к токенам**

#### Бэкенд (Go):
- Access Token: JWT в заголовке `Authorization: Bearer <token>`
- Refresh Token: HttpOnly cookie `refresh_token` (7 дней)
- Endpoints:
  - `POST /auth/login` → возвращает `{email, token}` + cookie
  - `POST /auth/refresh` → требует cookie, возвращает `{token}`
  - `POST /auth/logout` → требует cookie
  - `POST /auth/register` → возвращает `{id}`

#### Фронтенд (React):
- Access Token: localStorage `authToken`
- Refresh Token: localStorage `refreshToken` ❌ (должен быть в cookie)
- Endpoints (текущие):
  - `POST /auth/login` → ожидает `{user, accessToken, refreshToken}`
  - `POST /auth/refresh` → отправляет refresh token в body
  - `GET /auth/me` → не существует на бэкенде ❌
  - `POST /auth/forgot-password` → не существует на бэкенде ❌
  - `POST /auth/reset-password` → не существует на бэкенде ❌

**ПРОБЛЕМЫ:**
1. Фронтенд хранит refresh token в localStorage (небезопасно)
2. Бэкенд не предоставляет endpoint `/auth/me`
3. Нет функционала восстановления пароля на бэкенде
4. Разные структуры ответов login

---

### 2. **Курсы - Полное несоответствие структуры**

#### Бэкенд (Go):
```go
// Модель Course
{
  "name": string,
  "professor": string,
  "description": string,
  "type": string
}

// Endpoints
GET /course/dashboard {course_name} → одиночный курс
GET /course/lessons {course_name} → уроки курса
POST /course/lesson/signup {course_name, email} → запись на курс
GET /user/courses → курсы пользователя
```

#### Фронтенд (React):
```typescript
// Модель Course
{
  id: number,
  title: string,
  description: string,
  instructor: string,
  duration: number,
  modules: number,
  enrolledStudents: number,
  rating: number,
  category: string,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  tags: string[],
  // и еще ~20 полей
}

// Endpoints (ожидаемые)
GET /courses → все курсы с фильтрами
GET /courses/my → мои курсы
GET /courses/:id → детали курса
POST /courses/:id/enroll → запись
```

**ПРОБЛЕМЫ:**
1. Разные названия полей: `name` vs `title`, `professor` vs `instructor`
2. Бэкенд использует `course_name` как идентификатор, фронтенд - `id: number`
3. Бэкенд НЕ реализовал `GET /courses` (panic)
4. Нет фильтров, категорий, рейтингов на бэкенде
5. Нет поддержки модулей (только уроки)

---

### 3. **Уроки - Разная структура данных**

#### Бэкенд (Go):
```go
{
  "name": string,
  "description": string
}
```

#### Фронтенд (React):
```typescript
{
  id: number,
  title: string,
  description: string,
  duration: number,
  videoUrl: string,
  content: string,
  order: number,
  isCompleted: boolean,
  hasQuiz: boolean,
  hasCodeExercise: boolean,
  hasHomework: boolean
}
```

**ПРОБЛЕМЫ:**
1. Бэкенд возвращает минимальные данные
2. Нет отслеживания прогресса (isCompleted)
3. Нет порядка уроков (order)
4. Нет информации о типах заданий

---

### 4. **Домашние задания - MinIO vs структурированные данные**

#### Бэкенд (Go):
```go
POST /lesson/homework (multipart/form-data)
// Поля:
- file (multiple files)
- HW_data (JSON): {course_name, lesson_name, email, homework_id?}

// Ответ:
{
  "course_name": string,
  "lesson_name": string,
  "professor": string,
  "description": string,
  "mark": int,
  "homework_id": string (UUID),
  "files": [{name, url (presigned, 15 min)}]
}
```

#### Фронтенд (React):
```go
POST /homeworks/:id/submit (multipart/form-data)
// Поля:
- textAnswer (string)
- files (File[])

// Ожидаемый ответ:
{
  id: number,
  lessonId: number,
  title: string,
  description: string,
  dueDate: string,
  status: 'pending' | 'submitted' | 'graded',
  grade?: number,
  feedback?: string
}
```

**ПРОБЛЕМЫ:**
1. Разные URL структуры: `/lesson/homework` vs `/homeworks/:id/submit`
2. Фронтенд использует числовые ID, бэкенд - названия курсов/уроков
3. Бэкенд использует UUID для homework_id, фронтенд - числа
4. Presigned URLs действуют 15 минут - нужен механизм обновления
5. Нет endpoint для получения списка всех заданий

---

### 5. **Пользовательский профиль - Разные поля**

#### Бэкенд (Go):
```go
GET /user/profile → {
  student: {id, username, email},
  student_data: {name, student_card, date_of_birth, cource, gpa}
}

PUT /user/profile → принимает ту же структуру
PUT /user/password → {email, old_password, new_password}
```

#### Фронтенд (React):
```typescript
{
  id: number,
  username: string,
  email: string,
  fullName: string,
  avatar: string,
  bio: string,
  enrolledCourses: number,
  completedCourses: number,
  achievements: Achievement[]
}
```

**ПРОБЛЕМЫ:**
1. Фронтенд не знает о `student_card`, `cource`, `gpa`
2. Бэкенд не предоставляет аватары, био, достижения
3. Разные структуры обновления профиля

---

### 6. **Комментарии - Новый функционал**

#### Бэкенд (Go):
```go
// Курсы
GET /course/comment?course_id=1
POST /course/comment {course_id, comment}

// Уроки
GET /lesson/comment?lesson_id=1
POST /lesson/comment {lesson_id, comment}

// Ответ:
{
  success: bool,
  comments: [{id, comment, username, user_id, created_at}]
}
```

#### Фронтенд (React):
- ❌ Не реализовано
- ❌ Нет сервиса
- ❌ Нет типов
- ❌ Нет UI компонентов

---

## 🟡 СРЕДНИЕ НЕСООТВЕТСТВИЯ

### 7. **Dashboard/Статистика**

#### Бэкенд:
- ❌ `GET /dashboard` - не реализовано (panic)
- ✅ Может быть реализовано через комбинацию других endpoints

#### Фронтенд:
- Ожидает: `GET /dashboard/statistics`
- Нужны данные: курсы, прогресс, задания, активность

---

### 8. **API Response формат**

#### Бэкенд:
- Возвращает напрямую данные или `{id}` для создания
- Для комментариев: `{success, comments}`
- Ошибки: статус код + простое сообщение

#### Фронтенд:
- Ожидает: `{success, data, message}`
- Ошибки: `{message, errors: {field: [...]}, statusCode}`

---

## 🟢 СОВПАДЕНИЯ

### 9. **Что работает правильно**

✅ JWT Bearer токены в заголовках
✅ CORS настроен на бэкенде
✅ Rate limiting на бэкенде
✅ Multipart/form-data для файлов
✅ Базовая структура REST API

---

## 📋 ПЛАН ДЕЙСТВИЙ

### Приоритет 1: Критические исправления

#### 1.1. Исправить аутентификацию
- [ ] Убрать хранение refresh token из localStorage
- [ ] Добавить поддержку cookies в API client
- [ ] Реализовать `GET /user/profile` как замену `/auth/me`
- [ ] Обновить AuthContext для работы с cookies
- [ ] Адаптировать login/register под структуру бэкенда

#### 1.2. Создать правильные сервисы курсов
- [ ] `course.service.ts` с endpoints:
  - `getCourse(courseName)` → `/course/dashboard`
  - `getCourseLessons(courseName)` → `/course/lessons`
  - `enrollCourse(courseName)` → `/course/lesson/signup`
  - `getMyCourses()` → `/user/courses`
- [ ] Адаптировать типы под бэкенд структуру

#### 1.3. Создать сервис уроков
- [ ] `lesson.service.ts` с endpoints:
  - `getLesson(courseName, lessonName)` → `/course/lesson`
  - `getLessonComments(lessonId)` → `/lesson/comment`
  - `addLessonComment(lessonId, comment)` → `/lesson/comment`

#### 1.4. Исправить homework.service
- [ ] Адаптировать под структуру `/lesson/homework`
- [ ] Использовать `{course_name, lesson_name, email}`
- [ ] Обработать presigned URLs с TTL
- [ ] Добавить механизм обновления ссылок

### Приоритет 2: Новый функционал

#### 2.1. Создать comment.service.ts
- [ ] Комментарии к курсам
- [ ] Комментарии к урокам
- [ ] Типы для комментариев

#### 2.2. Создать user.service.ts
- [ ] Профиль пользователя
- [ ] Обновление профиля
- [ ] Смена пароля

### Приоритет 3: Улучшения типов

#### 3.1. Обновить TypeScript типы
- [ ] Привести в соответствие с бэкенд моделями
- [ ] Добавить типы для всех ответов
- [ ] Создать mapping между frontend/backend типами

#### 3.2. Создать API адаптеры
- [ ] `backend-to-frontend.adapters.ts` - преобразование данных
- [ ] Маппинг полей (name→title, professor→instructor)

### Приоритет 4: Конфигурация

#### 4.1. Обновить .env
- [ ] `VITE_API_BASE_URL=http://localhost:8000`
- [ ] `VITE_USE_MOCK_DATA=false`
- [ ] `VITE_API_TIMEOUT=10000`

#### 4.2. Настроить API client
- [ ] Поддержка cookies
- [ ] Автоматический refresh токенов
- [ ] Обработка presigned URLs

---

## 🗂️ МАППИНГ ПОЛЕЙ

### Курсы
| Бэкенд | Фронтенд | Действие |
|--------|----------|----------|
| name | title | Переименовать |
| professor | instructor | Переименовать |
| description | description | ✓ Совпадает |
| type | category | Переименовать |
| - | id | Добавить генерацию |
| - | duration | Вычислить из уроков |
| - | rating | Mock или удалить |

### Уроки
| Бэкенд | Фронтенд | Действие |
|--------|----------|----------|
| name | title | Переименовать |
| description | description | ✓ Совпадает |
| - | id | Добавить генерацию |
| - | videoUrl | Использовать video_url из БД |
| - | order | Использовать позицию в массиве |

### Пользователь
| Бэкенд | Фронтенд | Действие |
|--------|----------|----------|
| student.username | username | ✓ Совпадает |
| student.email | email | ✓ Совпадает |
| student_data.name | fullName | Переименовать |
| student_data.student_card | - | Добавить поле |
| student_data.cource | - | Добавить поле |
| student_data.gpa | - | Добавить поле |
| - | avatar | Mock или удалить |
| - | bio | Mock или удалить |

---

## 🔧 ТЕХНИЧЕСКИЕ ДЕТАЛИ

### Настройка cookies для JWT

```typescript
// api/client.ts
const apiClient = {
  async request(method, endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ← ВАЖНО для cookies
      ...options
    });
    return response;
  }
};
```

### Обработка presigned URLs

```typescript
// Сохранять время получения URL
interface FileWithUrl {
  name: string;
  url: string;
  expiresAt: number; // timestamp
}

// Проверять перед использованием
async function getFileUrl(homeworkId: string, fileName: string) {
  const cached = cache.get(fileName);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.url;
  }

  // Запросить новый presigned URL
  const response = await lessonService.getHomework({
    course_name,
    lesson_name,
    email,
    homework_id: homeworkId
  });

  return response.files.find(f => f.name === fileName)?.url;
}
```

### Адаптер данных

```typescript
// adapters/course.adapter.ts
export function adaptCourseFromBackend(backendCourse: BackendCourse): FrontendCourse {
  return {
    id: hashString(backendCourse.name), // генерируем ID из имени
    title: backendCourse.name,
    description: backendCourse.description,
    instructor: backendCourse.professor,
    category: backendCourse.type,
    // остальные поля с дефолтными значениями
    duration: 0,
    modules: 0,
    rating: 0,
    enrolledStudents: 0,
    difficulty: 'beginner' as const,
    tags: []
  };
}
```

---

## 📊 СТАТИСТИКА РАБОТ

**Всего несоответствий:** 25+
**Критических:** 6
**Средних:** 2
**Файлов требует изменения:** ~15
**Новых сервисов:** 5
**Обновлений типов:** 10+

**Примерное время:** 4-6 часов работы

---

## ✅ ЧЕКЛИСТ ГОТОВНОСТИ

- [ ] Все сервисы используют правильные endpoints
- [ ] Типы соответствуют бэкенд моделям
- [ ] Cookies настроены для refresh токенов
- [ ] Presigned URLs обрабатываются корректно
- [ ] Комментарии интегрированы
- [ ] .env обновлен
- [ ] Mock режим отключен
- [ ] Тестирование всех endpoints
- [ ] Обработка ошибок
- [ ] Документация обновлена
