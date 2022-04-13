function exampleTypeOf() {
    function numberOrString(param: number | string) {
        if (typeof param === "string") {
            param.toUpperCase();
        }

        param.toUpperCase()
    }
}

function exampleTruthiness() {
    class MyClass {
        doSomething(): void {}
    }

    function optionalParam(param: MyClass | undefined) {
        if (param) {
            param.doSomething()
        }

        param.doSomething()
    }

    function negatedCondition(param: MyClass | undefined) {
        if (!param) {
            return
        }

        param.doSomething();
    }
}

function exampleEquality() {
    function example(a: string | number, b: string | boolean) {
        if (a === b) {
            a.toUpperCase()
            b.toUpperCase()
        }   
        a.toUpperCase()
        b.toUpperCase()
    }
}

function exampleIn() {
    type Fish = { swim: () => void };
    type Bird = { fly: () => void };

    function example(animal: Fish | Bird) {
        if ("swim" in animal) {
            animal.swim()
        }

        animal.swim()
    }
}

function exampleInstanceOf() {
    class Fish {
        swim(): void {}
    }

    class Bird {
        fly(): void {}
    }

    function example(animal: Fish | Bird) {
        if (animal instanceof Fish) {
            animal.swim()
        }

        animal.swim()
    }
}

function exampleTypePredicate() {
    interface Fish {
        identifier: string
        swim(): void 
    }

    interface Bird {
        identifier: string
        fly(): void 
    }

    function isFish(animal: Fish | Bird): animal is Fish {
        return animal.identifier.startsWith("fish-")
    }

    function example(animal: Fish | Bird) {
        if (isFish(animal)) {
            animal.swim()
        }

        animal.swim()
    }
}