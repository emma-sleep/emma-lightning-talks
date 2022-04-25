interface Task<T> {
  complexity: number;
  priority: number;
  runnable: () => T;
}

export class ComplexityEvaluationService {
  private static MAX_COMPLEXITY = 10;

  evaluateComplexity(task: Task<unknown>) {
    if (task.complexity > ComplexityEvaluationService.MAX_COMPLEXITY) {
      throw new Error(
        `Complexity ${task.complexity} is too high. Maximum of ${ComplexityEvaluationService.MAX_COMPLEXITY} allowed.`
      );
    }
  }
}

export class PriorityEvaluationService {
  private static MIN_PRIORITY = 5;

  evaluatePriority(task: Task<unknown>) {
    if (task.priority < PriorityEvaluationService.MIN_PRIORITY) {
      throw new Error(
        `Priority ${task.priority} is too low. Minimum of ${PriorityEvaluationService.MIN_PRIORITY} required.`
      );
    }
  }
}

export class TaskExecutorService {
  constructor(
    private complexityEvaluation: ComplexityEvaluationService,
    private priorityEvaluation: PriorityEvaluationService
  ) {}

  executeTask<T>(task: Task<T>): T | undefined {
    try {
      this.complexityEvaluation.evaluateComplexity(task);
      this.priorityEvaluation.evaluatePriority(task);

      return task.runnable();
    } catch {
      return undefined;
    }
  }
}
