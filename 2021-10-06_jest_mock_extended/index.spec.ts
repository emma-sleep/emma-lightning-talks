import { mock, mockFn } from "jest-mock-extended";

interface Observation {}

interface AnimalClassifier {
    isLion(observation: Observation): boolean;
    isTiger(observation: Observation): boolean;
}

class Zoo {
    constructor(private animalClassifier: AnimalClassifier) {}

    whichAnimal(observation: Observation): string {
        if (this.animalClassifier.isLion(observation)) {
            return "lion";
        }

        if (this.animalClassifier.isTiger(observation)) {
            return "tiger";
        }

        throw new Error(`Could not determine animal based on observation ${observation}.`);
    }
}

// Why do we need mocking?
// => we can test `Zoo` without involving the `AnimalClassifier` implementation

// Why is this useful?
// => we can write simpler tests as we are only concerned with the implementation of `Zoo`, but not `AnimalClassifier``
// => we can write a test for `Zoo` even if we don't have access to an implementation of `AnimalClassifier`

describe("Zoo", () => {
    describe("whichAnimal", () => {
        it("should return lion if we observed a lion", () => {
            const classifier = mock<AnimalClassifier>();
            const zoo = new Zoo(classifier);

            classifier.isLion.mockReturnValueOnce(true);

            expect(zoo.whichAnimal({})).toEqual("lion");
        });

        it("should throw if no animal could be classified", () => {
            const classifier = mock<AnimalClassifier>();
            const zoo = new Zoo(classifier);

            classifier.isLion.mockReturnValueOnce(false);
            classifier.isTiger.mockReturnValueOnce(false);

            expect(() => {
                zoo.whichAnimal({});
            }).toThrowError();
        });
    });
});

// Why do we need jest-mock-extended? Jest also provides mocking capabilities!
// => TypeScript support
// => easy to mock entire classes / interfaces which is not possible with Jest out of the box
// => `calledWith` support
// => https://github.com/marchaos/jest-mock-extended

describe("Zoo (jest only)", () => {
    describe("whichAnimal", () => {
        it("should return lion if we observed a lion", () => {
            const classifier = {
                isLion: jest.fn(),
                isTiger: jest.fn(),
            };
            const zoo = new Zoo(classifier);

            classifier.isLion.mockReturnValueOnce(true);

            expect(zoo.whichAnimal({})).toEqual("lion");
        });
    });
});

interface FoodCategoryClassifier {
    (food: string): "fruit" | "vegetable" | "other";
}

function analyzeFood(foodList: string[], categoryClassifier: FoodCategoryClassifier): { name: string; category: string }[] {
    return foodList.map((food) => ({
        name: food,
        category: categoryClassifier(food),
    }));
}

describe("analyzeFood", () => {
    it("should attach category to food", () => {
        const classifier = mockFn<FoodCategoryClassifier>();
        classifier.calledWith("tomato").mockReturnValueOnce("fruit");
        classifier.calledWith("apple").mockReturnValueOnce("fruit");
        classifier.calledWith("beef").mockReturnValueOnce("other");
        classifier.calledWith("carrot").mockReturnValueOnce("vegetable");

        expect(analyzeFood(["tomato", "apple", "beef", "carrot"], classifier)).toEqual([
            { name: "tomato", category: "fruit" },
            { name: "apple", category: "fruit" },
            { name: "beef", category: "other" },
            { name: "carrot", category: "vegetable" },
        ]);
    });
});
