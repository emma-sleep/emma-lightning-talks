// Conditional Types

// Basics
// Conditional types can be defined as conditional expressions
// `SomeType extends OtherType ? TrueType : FalseType;`
// They can be used to describe output types in relation to input types.
interface A {
  a: number;
}
type MyType = { a: number } extends A ? string : number;

// Doesn't look to useful? We can use them also with generics!

interface StringIdEntity {
  id: string;
  toUppercase(): string;
}
interface NumberIdEntity {
  id: number;
  nextId(): number;
}

function withTypeUnions() {
  function wrapId(id: string | number): StringIdEntity | NumberIdEntity {
    throw new Error("not implemented");
  }

  const unknownEntityId = wrapId("EMAOR100200");
}

function withOverloads() {
  function wrapId(id: string): StringIdEntity;
  function wrapId(number: number): NumberIdEntity;
  function wrapId(id: string | number): StringIdEntity | NumberIdEntity {
    throw new Error("not implemented");
  }

  const stringEntityId = wrapId("EMAOR100200");
  const numberEntityId = wrapId(123);
}

function withConditionalType() {
  type ConditionalEntityId<ID extends string | number> = ID extends string
    ? StringIdEntity
    : NumberIdEntity;
  function wrapId<ID extends number | string>(id: ID): ConditionalEntityId<ID> {
    throw new Error("not implemented");
  }

  const stringEntityId = wrapId("EMAOR100200");
  const numberEntityId = wrapId(123);
}

// Not convinced yet? You can also use them to constrain generics.

type IdOf<T> = T extends { id: unknown } ? T["id"] : never;
type NoId = IdOf<number>;
type EntityId = IdOf<StringIdEntity>;

// This works also recursively for arrays
type ElementType<T> = T extends unknown[] ? ElementType<T[number]> : T;
type StringElement = ElementType<string[]>;
type NumberElement = ElementType<number[][]>;
type BooleanElement = ElementType<boolean>;

// We can even infer the "true branch" type
type InferredElementType<T> = T extends Array<infer Element>
  ? InferredElementType<Element>
  : T;
type InferredStringElement = InferredElementType<string[]>;
type InferredNumberElement = InferredElementType<number[][]>;
type InferredBooleanElement = InferredElementType<boolean>;

// Inference creates a new generic variable which can then be used in the "true branch" of the conditional type expression.

// Example: extract return type
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type NumberReturn = GetReturnType<() => number>;

class Runner<TASK> {
  constructor(private task: TASK) {}
  run(): GetReturnType<TASK> {
    // NOTE: this is not necessarily you would do in a TS codebase, but you might need to handle such cases when typing a JS library
    if (!("call" in this.task)) {
      throw new Error("Task is not callable");
    }

    const callable = this.task as unknown as {
      call: () => GetReturnType<TASK>;
    };

    return callable.call();
  }
}

const numberFun: () => number = () => 1;
const runner = new Runner(numberFun);
const result = runner.run();

const invalidRunner = new Runner("");
invalidRunner.run();

// Resources
// * Official docs: https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
// * A curated list of creative uses of TypeScript template literal types and lots of them make heavy use of conditional types: https://github.com/ghoullier/awesome-template-literal-types
// * https://rossbulat.medium.com/typescript-conditionals-explained-a096591f3ac0
