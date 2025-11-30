import { useApi } from './useApi';
import { homeworkService } from '../services/api/homework.service';
import type { HomeworkResponse } from '../types/backend.types';

export function useHomework(courseName: string, lessonName: string, email: string, homeworkId?: string) {
  return useApi<HomeworkResponse[]>(
    () => homeworkService.getHomework(courseName, lessonName, email, homeworkId),
    { autoFetch: !!courseName && !!lessonName && !!email }
  );
}
