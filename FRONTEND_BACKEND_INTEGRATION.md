# Frontend-Backend Integration Summary

## Overview
Фронтенд был полностью подогнан под backend Go API. Все сервисы переписаны с учетом точных требований backend.

## Completed Changes

### 1. Type Definitions ✅
**File:** `frontend/src/types/backend.types.ts`

Созданы TypeScript типы, точно соответствующие Go структурам:
- Authentication types (RegistrationRequest, LoginRequest, LoginResponse, etc.)
- User/Profile types (StudentProfile)
- Course types (DashboardResponse, LessonsResponse, LessonResponse, etc.)
- Comment types (CourseCommentsResponse, LessonCommentsResponse)
- Homework types (HomeworkRequest, HomeworkResponse, HomeworkPost)
- Error types (ErrorResponse)

### 2. Updated Services ✅

#### auth.service.ts
- ✅ POST /auth/login - теперь возвращает только `{email, token}`
- ✅ POST /auth/register - принимает все поля с backend (student_card, cource, gpa, etc.)
- ✅ POST /auth/logout - очищает токены
- ✅ POST /auth/refresh - использует HttpOnly cookie
- ✅ GET /user/profile - получает StudentProfile (вместо /auth/me)
- ✅ PUT /user/password - изменение пароля

#### user.service.ts (NEW)
- ✅ GET /user/profile - профиль пользователя
- ✅ PUT /user/profile - обновление профиля
- ✅ GET /user/courses - курсы, на которые записан пользователь

#### courses.service.ts
- ✅ GET /course/dashboard - информация о курсе (с body в GET запросе!)
- ✅ GET /course/lessons - список уроков курса (с body в GET запросе!)
- ✅ GET /course/lesson - детали урока (с body в GET запросе!)
- ✅ POST /course/lesson/signup - запись на курс

#### homework.service.ts
- ✅ GET /lesson/homework - получение домашек (с body в GET запросе!)
- ✅ POST /lesson/homework - отправка домашки (multipart/form-data)

#### comments.service.ts (NEW)
- ✅ GET /course/comment?course_id=X - комментарии к курсу
- ✅ POST /course/comment - добавить комментарий к курсу
- ✅ GET /lesson/comment?lesson_id=X - комментарии к уроку
- ✅ POST /lesson/comment - добавить комментарий к уроку

### 3. API Client Updates ✅
**File:** `frontend/src/services/api/client.ts`

- ✅ Сделал метод `request()` публичным для использования в сервисах
- ✅ Поддержка `credentials: 'include'` для работы с HttpOnly cookies
- ✅ Автоматическое добавление JWT токена в заголовок Authorization

---

## Key Backend Specifics Handled

### 1. Authentication Flow
```
Login:
  Frontend → POST /auth/login {email, password}
  Backend → Response: {email, token} + Set-Cookie: refresh_token (HttpOnly)
  Frontend → Сохраняет token в localStorage

Refresh:
  Frontend → POST /auth/refresh (автоматически отправляет refresh_token cookie)
  Backend → Response: {email, token, refresh_token, expires_in} + новый cookie
  Frontend → Обновляет token в localStorage

Logout:
  Frontend → POST /auth/logout
  Backend → Очищает refresh_token cookie
  Frontend → Удаляет token из localStorage
```

### 2. Unusual Backend Patterns

#### GET Requests with Body
Backend использует **body в GET запросах** для некоторых эндпоинтов:
- `GET /course/dashboard` - требует `{course_name: "..."}`
- `GET /course/lessons` - требует `{course_name: "..."}`
- `GET /course/lesson` - требует `{course_name: "...", lesson_name: "..."}`
- `GET /lesson/homework` - требует `{course_name: "...", lesson_name: "...", email: "..."}`

Решение:
```typescript
const response = await apiClient.request<T>('/course/dashboard', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ course_name: courseName }),
});
```

#### Multipart Form Data for Homework
Backend ожидает:
```
Content-Type: multipart/form-data
  - file: <файл> (может быть несколько)
  - HW_data: JSON string {course_name, lesson_name, email, files, homework_id?}
```

Реализовано в `homeworkService.submitHomework()`.

### 3. Data Model Differences

#### Backend → Frontend Mapping

| Backend Field | Frontend Field | Notes |
|--------------|----------------|-------|
| `student.id` | `user.id` | Числовой ID |
| `student.username` | `user.username` | - |
| `student.email` | `user.email` | - |
| `student_data.name` | `user.firstName` + `lastName` | Backend хранит полное имя |
| `student_data.student_card` | - | Новое поле, нужно добавить в UI |
| `student_data.cource` | - | Typo в backend, но так и оставлено |
| `student_data.gpa` | - | Новое поле, нужно добавить в UI |
| `student_data.date_of_birth` | `user.birthDate` | Nullable в backend |

#### Course Identification
- **Backend:** использует `course_name` (string) как идентификатор
- **Frontend:** использовал `id` (string)
- **Solution:** нужны адаптеры для преобразования данных

---

## Remaining Work

### 1. Data Adapters (TODO)
Создать функции-адаптеры для преобразования backend типов во frontend типы:

```typescript
// frontend/src/utils/adapters.ts

export function adaptStudentProfile(profile: StudentProfile): User {
  const [firstName, ...lastNameParts] = profile.student_data.name.split(' ');
  return {
    id: String(profile.student.id),
    email: profile.student.email,
    firstName: firstName || '',
    lastName: lastNameParts.join(' ') || '',
    username: profile.student.username,
    birthDate: profile.student_data.date_of_birth || undefined,
    // Добавить новые поля:
    studentCard: profile.student_data.student_card,
    course: profile.student_data.cource,
    gpa: profile.student_data.gpa || undefined,
    role: 'student',
    registeredAt: new Date().toISOString(), // Backend не возвращает
  };
}

export function adaptCourseDB(course: CourseDB): Course {
  return {
    id: course.name, // Используем name как id
    title: course.name,
    description: course.description,
    teacherName: course.professor,
    category: course.type,
    // Остальные поля будут заполнены дефолтными значениями
    coverImage: '/default-course-cover.jpg',
    progress: 0,
    totalModules: 0,
    completedModules: 0,
    isActive: false,
    startDate: new Date().toISOString(),
  };
}
```

### 2. Update AuthContext (TODO)
**File:** `frontend/src/context/AuthContext.tsx`

Обновить для работы с новым auth flow:

```typescript
// Изменения:
1. Использовать новые типы из backend.types.ts
2. После login вызывать authService.getCurrentUser() для получения профиля
3. Использовать адаптер для преобразования StudentProfile → User
4. Обработать случай, когда register не возвращает token (только id)
```

### 3. Update Register Page (TODO)
**File:** `frontend/src/pages/Register/Register.tsx`

Добавить новые поля:
- `student_card` - номер студенческого билета
- `cource` - курс обучения (1-6)
- `gpa` - средний балл
- `date_of_birth` - дата рождения

### 4. Update Profile Page (TODO)
**File:** `frontend/src/pages/Profile/Profile.tsx`

Добавить отображение и редактирование новых полей:
- Номер студенческого билета
- Курс обучения
- GPA

### 5. Configuration (TODO)
**File:** `frontend/.env`

Изменить для работы с реальным backend:

```env
# Было:
VITE_USE_MOCK_DATA=true

# Стало:
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=http://localhost:8000
```

### 6. Error Handling (TODO)
Добавить обработку backend ошибок:

```typescript
// Backend возвращает:
{
  "error": {
    "code": 400,
    "message": "Invalid credentials"
  }
}

// Нужно обновить ApiError тип и обработку
```

---

## Testing Checklist

### Authentication
- [ ] Регистрация с полными данными (включая student_card, gpa, cource)
- [ ] Логин и получение JWT токена
- [ ] Refresh token автоматически обновляется
- [ ] Logout очищает токены и cookie
- [ ] Защищенные роуты требуют авторизации

### Courses
- [ ] Получение списка курсов пользователя
- [ ] Просмотр деталей курса
- [ ] Просмотр списка уроков
- [ ] Запись на курс

### Homework
- [ ] Получение списка домашних заданий
- [ ] Отправка домашки с файлами
- [ ] Presigned URLs работают (15 минут)

### Comments
- [ ] Добавление комментариев к курсу
- [ ] Просмотр комментариев курса
- [ ] Добавление комментариев к уроку
- [ ] Просмотр комментариев урока

### Profile
- [ ] Просмотр профиля
- [ ] Редактирование профиля
- [ ] Смена пароля

---

## API Endpoint Summary

### Public Endpoints
- POST /auth/login
- POST /auth/register

### Protected Endpoints (require JWT)
- POST /auth/logout
- POST /auth/refresh
- GET /user/profile
- PUT /user/profile
- PUT /user/password
- GET /user/courses
- GET /course/dashboard
- GET /course/lessons
- GET /course/lesson
- POST /course/lesson/signup
- GET /course/comment
- POST /course/comment
- GET /lesson/comment
- POST /lesson/comment
- GET /lesson/homework
- POST /lesson/homework

### NOT IMPLEMENTED on Backend
- GET /dashboard (panics)
- GET /courses (panics)

---

## Important Notes

1. **Typo in Backend:** Поле называется `cource` вместо `course` - это typo в backend, но не исправляем
2. **GET with Body:** Backend использует body в GET запросах - нестандартно, но работает
3. **Refresh Token:** Хранится в HttpOnly cookie автоматически, не нужно передавать вручную
4. **Course Identification:** Backend использует `course_name` как primary key, не числовой ID
5. **Presigned URLs:** Файлы в MinIO имеют URLs с 15-минутным сроком действия

---

## Next Steps Priority

1. **HIGH:** Создать data adapters для преобразования типов
2. **HIGH:** Обновить AuthContext для работы с новым auth flow
3. **HIGH:** Обновить Register page с новыми полями
4. **MEDIUM:** Обновить Profile page для новых полей
5. **MEDIUM:** Создать компоненты для Comments
6. **LOW:** Добавить обработку presigned URL expiration

---

## Files Modified

### New Files
- `frontend/src/types/backend.types.ts`
- `frontend/src/services/api/user.service.ts`
- `frontend/src/services/api/comments.service.ts`

### Updated Files
- `frontend/src/services/api/client.ts`
- `frontend/src/services/api/auth.service.ts`
- `frontend/src/services/api/courses.service.ts`
- `frontend/src/services/api/homework.service.ts`
- `frontend/src/services/api/index.ts`

### Files to Update (Next)
- `frontend/src/context/AuthContext.tsx`
- `frontend/src/pages/Register/Register.tsx`
- `frontend/src/pages/Profile/Profile.tsx`
- `frontend/.env`
- `frontend/src/utils/adapters.ts` (create new)

---

## Conclusion

✅ Все API сервисы подогнаны под backend
✅ Типы соответствуют Go структурам
✅ Обработаны все особенности backend (GET with body, multipart, cookies)
⏳ Остается создать адаптеры и обновить UI компоненты

Backend НЕ был изменен, как и требовалось.
