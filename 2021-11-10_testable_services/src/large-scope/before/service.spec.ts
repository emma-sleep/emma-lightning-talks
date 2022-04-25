import { TaskExecutorService } from "./service";

describe("TaskExecutorService", () => {
  let taskExecutorService: TaskExecutorService;

  beforeEach(() => {
    taskExecutorService = new TaskExecutorService();
  });

  describe("executeTask", () => {
    it("should return undefined if the priority is too low", () => {
      expect(
        taskExecutorService.executeTask({
          priority: 3,
          complexity: 5,
          runnable: () => 3 + 3,
        })
      ).toBeUndefined();
    });

    it("should return undefined if the complexity is too high", () => {
      expect(
        taskExecutorService.executeTask({
          priority: 6,
          complexity: 15,
          runnable: () => 3 + 3,
        })
      ).toBeUndefined();
    });

    it("should return the runnable return value if priority and complexity are okay", () => {
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

/**
 * Issues with this:
 *
 *  * Tests will fail if the constants in the evaluation services are changed
 *  * The behavior of the evaluation services is simple, but we would need significantly more
 *    tests here if there would be more code flows in the evaluation
 *  * When someone reads the test, they need to take a look at the implementation
 *    to understand why "priority" and "complexity" were chosen explicitly
 */
