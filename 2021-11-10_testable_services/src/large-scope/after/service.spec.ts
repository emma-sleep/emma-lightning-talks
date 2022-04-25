import {
  TaskExecutorService,
  PriorityEvaluationService,
  ComplexityEvaluationService,
} from "./service";
import { mockClear, mock } from "jest-mock-extended";

describe("TaskExecutorService", () => {
  const mockComplexityEvaluationService = mock<ComplexityEvaluationService>();
  const mockPriorityEvaluationService = mock<PriorityEvaluationService>();
  let taskExecutorService: TaskExecutorService;

  beforeEach(() => {
    mockClear(mockComplexityEvaluationService);
    mockClear(mockPriorityEvaluationService);
    taskExecutorService = new TaskExecutorService(
      mockComplexityEvaluationService,
      mockPriorityEvaluationService
    );
  });

  describe("executeTask", () => {
    it("should return undefined if the priority is too low", () => {
      mockComplexityEvaluationService.evaluateComplexity.mockImplementationOnce(
        () => {}
      );
      mockPriorityEvaluationService.evaluatePriority.mockImplementationOnce(
        () => {
          throw new Error("");
        }
      );

      expect(
        taskExecutorService.executeTask({
          priority: 3,
          complexity: 5,
          runnable: () => 3 + 3,
        })
      ).toBeUndefined();
    });

    it("should return undefined if the complexity is too high", () => {
      mockComplexityEvaluationService.evaluateComplexity.mockImplementationOnce(
        () => {
          throw new Error("");
        }
      );
      mockPriorityEvaluationService.evaluatePriority.mockImplementationOnce(
        () => {}
      );

      expect(
        taskExecutorService.executeTask({
          priority: 6,
          complexity: 15,
          runnable: () => 3 + 3,
        })
      ).toBeUndefined();
    });

    it("should return the runnable return value if priority and complexity are okay", () => {
      mockComplexityEvaluationService.evaluateComplexity.mockImplementationOnce(
        () => {}
      );
      mockPriorityEvaluationService.evaluatePriority.mockImplementationOnce(
        () => {}
      );

      expect(
        taskExecutorService.executeTask({
          priority: 6,
          complexity: 8,
          runnable: () => 3 + 3,
        })
      ).toEqual(6);
    });
  });
});
