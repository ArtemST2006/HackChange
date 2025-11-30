# Frontend-Backend Integration Guide

This document explains how the frontend is integrated with the backend API and how to configure it.

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```bash
# Backend API URL
VITE_API_URL=http://localhost:8080

# Use mock data (set to 'true' to use mock data instead of real API)
VITE_USE_MOCK_DATA=false
```

### Development Mode

For development without a running backend, set `VITE_USE_MOCK_DATA=true`. This will use mock data from `src/utils/mockData.ts`.

## API Service Layer

The frontend uses a service layer pattern to communicate with the backend. All API calls are centralized in the `src/services/` directory.

### Services

1. **authService** (`src/services/auth.service.ts`)
   - `register(data)` - Register new user
   - `login(data)` - Login user
   - `logout()` - Logout user
   - `refreshToken()` - Refresh JWT token
   - `getCurrentUser()` - Get current user profile

2. **courseService** (`src/services/course.service.ts`)
   - `getAllCourses()` - Get all courses
   - `getCourseDashboard(data)` - Get course dashboard
   - `getCourseLessons(data)` - Get course lessons
   - `getCourseLesson(data)` - Get single lesson
   - `signupCourse(data)` - Sign up for a course
   - `getCourseComments(courseId)` - Get course comments
   - `postCourseComment(data)` - Post course comment

3. **lessonService** (`src/services/lesson.service.ts`)
   - `getLessonComments(lessonId)` - Get lesson comments
   - `postLessonComment(data)` - Post lesson comment

4. **homeworkService** (`src/services/homework.service.ts`)
   - `getHomework(data, homeworkId?)` - Get homework
   - `submitHomework(data, files)` - Submit homework with files

5. **userService** (`src/services/user.service.ts`)
   - `getUserProfile()` - Get user profile
   - `updateUserProfile(data)` - Update user profile
   - `getUserCourses()` - Get user courses
   - `changePassword(data)` - Change password

## TypeScript Types

All backend API types are defined in `src/types/api.ts`. These types match the backend's JSON entities:

- `RegistrationRequest`, `RegistrationResponse`
- `LoginRequest`, `LoginResponse`
- `StudentProfile`
- `CourseDB`, `DashboardRequest`, `DashboardResponse`
- `LessonResponse`, `LessonsResponse`
- `HomeworkRequest`, `HomeworkResponse`, `HomeworkFile`
- `CommentResponse`, `CourseCommentRequest`, `LessonCommentRequest`

## Authentication

The frontend uses JWT tokens for authentication:

1. **Access Token** - Stored in `localStorage` with key `access_token`
2. **Refresh Token** - Stored in HTTP-only cookie (managed by backend)
3. **User Email** - Stored in `localStorage` with key `user_email`

### Token Flow

1. User logs in → Backend returns access token and sets refresh token cookie
2. Frontend stores access token in localStorage
3. All authenticated requests include `Authorization: Bearer <token>` header
4. When access token expires → Frontend calls `/auth/refresh` to get new token
5. Backend validates refresh token cookie and returns new access token

## Backend API Endpoints

### Auth Routes (`/auth`)
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/refresh` - Refresh access token

### User Routes (`/user`) - Require Authentication
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile
- `PUT /user/password` - Change password
- `GET /user/courses` - Get user's courses

### Public Routes
- `GET /dashboard` - Get dashboard
- `GET /courses` - Get all courses

### Course Routes (`/course`) - Require Authentication
- `GET /course/dashboard` - Get course dashboard
- `GET /course/lessons` - Get course lessons
- `GET /course/lesson` - Get single lesson
- `POST /course/lesson/signup` - Sign up for course
- `GET /course/comment?course_id=X` - Get course comments
- `POST /course/comment` - Post course comment

### Lesson Routes (`/lesson`) - Require Authentication
- `GET /lesson/comment?lesson_id=X` - Get lesson comments
- `POST /lesson/comment` - Post lesson comment
- `GET /lesson/homework` - Get homework
- `POST /lesson/homework` - Submit homework (multipart/form-data)

## Data Mapping

### Frontend User → Backend StudentProfile

```typescript
// Frontend User type
{
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  role: 'student',
  registeredAt: string
}

// Backend StudentProfile
{
  student: {
    id: number,
    username: string,
    email: string
  },
  student_data: {
    name: string,  // "FirstName LastName"
    student_card: string,
    date_of_birth: string | null,
    cource: string,
    gpa: number | null
  }
}
```

## File Upload

Homework submission uses multipart/form-data:

```javascript
const formData = new FormData();

// Add files
files.forEach(file => formData.append('file', file));

// Add homework data as JSON string
formData.append('HW_data', JSON.stringify({
  course_name: "Python для начинающих",
  lesson_name: "Модуль 1",
  email: "user@example.com",
  files: []
}));
```

## Error Handling

All API errors follow this structure:

```json
{
  "error": {
    "code": 500,
    "message": "Error description"
  }
}
```

Services throw errors that can be caught in components:

```typescript
try {
  await courseService.signupCourse(data);
} catch (error) {
  console.error(error.message);
  alert(error.message);
}
```

## Components Using API

1. **AuthContext** (`src/context/AuthContext.tsx`)
   - Manages authentication state
   - Calls authService for login/register/logout

2. **CourseDetail** (`src/pages/CourseDetail/CourseDetail.tsx`)
   - Uses courseService.signupCourse() for joining courses

3. **HomeworkDetail** (`src/pages/HomeworkDetail/HomeworkDetail.tsx`)
   - Uses homeworkService.submitHomework() for homework submission

4. **Login** (`src/pages/Login/Login.tsx`)
   - Uses AuthContext which calls authService.login()

5. **Register** (`src/pages/Register/Register.tsx`)
   - Uses AuthContext which calls authService.register()

## Testing

### With Backend Running

1. Start backend: `cd backend && go run cmd/main.go`
2. Update `.env`: `VITE_API_URL=http://localhost:8080`
3. Start frontend: `cd frontend && npm run dev`

### Without Backend (Mock Mode)

1. Update `.env`: `VITE_USE_MOCK_DATA=true`
2. Start frontend: `cd frontend && npm run dev`

## CORS Configuration

The backend is configured to accept requests from any origin during development:

```go
AllowedOrigins: []string{"*"}
```

For production, update this to your frontend domain.

## Next Steps

1. ✅ TypeScript interfaces created matching backend
2. ✅ API service layer implemented
3. ✅ Authentication flow integrated
4. ✅ Course signup integrated
5. ✅ Homework submission integrated
6. ⏳ Update all components to use real API data
7. ⏳ Implement loading states
8. ⏳ Add proper error handling UI
9. ⏳ Add token refresh logic
10. ⏳ Replace all mock data with API calls
