import { useApi } from './useApi';
import { coursesService } from '../services/api/courses.service';
import type { CoursesFilters } from '../services/api/courses.service';
import type { Course, Module, Lesson } from '../types';

export function useCourses(filters?: CoursesFilters) {
  return useApi<Course[]>(
    () => coursesService.getAllCourses(filters),
    { autoFetch: true }
  );
}

export function useMyCourses() {
  return useApi<Course[]>(
    () => coursesService.getMyCourses(),
    { autoFetch: true }
  );
}

export function useCourse(id: string) {
  return useApi<Course>(
    () => coursesService.getCourseById(id),
    { autoFetch: !!id }
  );
}

export function useCourseModules(courseId: string) {
  return useApi<Module[]>(
    () => coursesService.getCourseModules(courseId),
    { autoFetch: !!courseId }
  );
}

export function useLesson(lessonId: string) {
  return useApi<Lesson>(
    () => coursesService.getLesson(lessonId),
    { autoFetch: !!lessonId }
  );
}

export function useFeaturedCourses() {
  return useApi<Course[]>(
    () => coursesService.getFeaturedCourses(),
    { autoFetch: true }
  );
}
