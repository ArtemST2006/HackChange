import { useApi } from './useApi';
import { coursesService } from '../services/api/courses.service';
import type { CourseDB, DashboardResponse, LessonsResponse, LessonResponse } from '../types/backend.types';

export function useMyCourses() {
  return useApi<CourseDB[]>(
    () => coursesService.getMyCourses(),
    { autoFetch: true }
  );
}

export function useCourseDashboard(courseName: string) {
  return useApi<DashboardResponse>(
    () => coursesService.getCourseDashboard(courseName),
    { autoFetch: !!courseName }
  );
}

export function useCourseLessons(courseName: string) {
  return useApi<LessonsResponse>(
    () => coursesService.getCourseLessons(courseName),
    { autoFetch: !!courseName }
  );
}

export function useLesson(courseName: string, lessonName: string) {
  return useApi<LessonResponse>(
    () => coursesService.getLesson(courseName, lessonName),
    { autoFetch: !!courseName && !!lessonName }
  );
}
