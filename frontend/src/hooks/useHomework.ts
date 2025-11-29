import { useApi } from './useApi';
import { homeworkService } from '../services/api';
import { Homework, HomeworkSubmission } from '../types';

export function useMyHomeworks() {
  return useApi<Homework[]>(
    () => homeworkService.getMyHomeworks(),
    { autoFetch: true }
  );
}

export function useHomework(id: string) {
  return useApi<Homework>(
    () => homeworkService.getHomeworkById(id),
    { autoFetch: !!id }
  );
}

export function useSubmission(homeworkId: string) {
  return useApi<HomeworkSubmission | null>(
    () => homeworkService.getSubmission(homeworkId),
    { autoFetch: !!homeworkId }
  );
}
