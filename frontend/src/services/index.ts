<<<<<<< HEAD
// Re-export services from the api/ subfolder where implementations live
export * from './api';

// Also re-export types if any
export * from './types';
=======
// Export all services for easy importing
export { authService } from './auth.service';
export { courseService } from './course.service';
export { lessonService } from './lesson.service';
export { homeworkService } from './homework.service';
export { userService } from './user.service';
export * from './api.config';
>>>>>>> origin/Front_bombas
