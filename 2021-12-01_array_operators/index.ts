/////////////////////////////////////////////////////////////
/////         Lightning Talk: Array Operators           /////
/////////////////////////////////////////////////////////////

/**
 * What are we talking about?
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 *
 * Operators: map, filter, reduce
 *
 * What do they have in common?
 *  * allow you to perform operations on data in an declarative rather than imperative way
 *  * do not mutate the input array (in difference to push, pop, splice)
 *
 * Use cases:
 *  * transform data sets in a unified way
 *  * aggregate data
 *  * build higher-order functions for data processing easily
 */

["a", "b", "c", "d"].map((element) => element.toUpperCase());
// Result: ["A", "B", "C", "D"]

/**
 * The map operator
 *
 * Iterate over an array, apply a function to each element of the array,
 * and return a new array containing the results of the mapping function.
 * The order of elements is maintained.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */

[1, 2, 3, 4].filter((element) => element > 2);
// Result: [3, 4]

/**
 * The filter operator
 *
 * Iterate over an array and apply a predicate to each element of the array.
 * Returns a new array which contains all the elements from the source array
 * for which the predicate returned a truthy value (true, 1, non-empty string, etc.).
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */

[1, 2, 3, 4].reduce(
  (previousValue, currentValue) => previousValue + currentValue
);
// Result: 10
// In detail:
//  * First iteration:  previousValue = 1, currentValue = 2 => returns 3  (1 + 2)
//  * Second iteration: previousValue = 3, currentValue = 3 => returns 6  (3 + 3)
//  * Third iteration:  previousValue = 6, currentValue = 4 => returns 10 (6 + 4)
//  * Last element processed, i.e. return 10

/**
 * The reduce operator
 *
 * Iterate over an array and apply a reducer function to the current element together
 * with the result of applying the reducer function of the previous element. Returns
 * a single value which is the result of the last reducer function application.
 *
 * For the first array element, there is no previous reducer function application.
 * Therefore, we start with the second element and take the first element of the array
 * (index = 0) as the first `previousValue`.
 *
 * You can also supply an `initialValue` to circumvent this behavior.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 */

["1", "2", "3", "4"].reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  ""
);
// Result: 10
// In detail:
//  * First iteration:  previousValue = 0, currentValue = 1 => returns 1  (0 + 1)
//  * Second iteration: previousValue = 1, currentValue = 2 => returns 3  (1 + 2)
//  * Third iteration:  previousValue = 3, currentValue = 3 => returns 6  (3 + 3)
//  * Forth iteration:  previousValue = 6, currentValue = 4 => returns 10 (6 + 4)
//  * Last element processed, i.e. return 10

/////////////////////////////////////////////////////////////
/////                 Common use cases                  /////
/////////////////////////////////////////////////////////////

function transformData() {
  // ["x", "y", "z"] => ["X", "Y", "Z"]

  function imperative(array: string[]): string[] {
    const result: string[] = [];

    for (const element of array) {
      result.push(element.toUpperCase());
    }

    return result;
  }

  function declarative(array: string[]): string[] {
    return array.map((element) => element.toUpperCase());
  }
}

function transformAndFilterData() {
  // ["x", "y", "z"] => ["Y", "Z"]

  function imperative(array: string[]): string[] {
    const result: string[] = [];

    for (const element of array) {
      if (!element.startsWith("x")) {
        continue;
      }

      result.push(element.toUpperCase());
    }

    return result;
  }

  function declarative(array: string[]): string[] {
    return array
      .filter((element) => element.startsWith("x"))
      .map((element) => element.toUpperCase());
  }
}

function groupData() {
  // [
  //   {"code": "A", "discount": "1"},
  //   {"code": "B", "discount": "2"},
  //   {"code": "C", "discount": "1"},
  //   {"code": "E", "discount": "2"},
  //   {"code": "F", "discount": "1"},
  // ] => {
  //   "1": ["A", "C", "E"],
  //   "2": ["B", "D"],
  // }
  function imperative(
    discounts: { code: string; discount: string }[]
  ): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    for (const { code, discount } of discounts) {
      result[discount] = result[discount]?.concat(code) ?? [code];
    }

    return result;
  }

  function declarative(
    discounts: { code: string; discount: string }[]
  ): Record<string, string[]> {
    return discounts.reduce(
      (grouped, { discount, code }) => ({
        ...grouped,
        [discount]: grouped[discount]?.concat(code) ?? [code],
      }),
      {} as Record<string, string[]>
    );
  }
}

function count() {
  // [
  //   {"order": "ASDF-123456", "code": "A"},
  //   {"order": "ASDF-123457", "code": "B"},
  //   {"order": "ASDF-123458", "code": "B"},
  //   {"order": "ASDF-123459", "code": "A"},
  //   {"order": "ASDF-123451", "code": "B"},
  // ] => {
  //   "A": 2,
  //   "B": 3,
  // }
  function imperative(
    orders: { code: string; order: string }[]
  ): Record<string, number> {
    const result: Record<string, number> = {};

    for (const { code } of orders) {
      result[code] = (result[code] ?? 0) + 1;
    }

    return result;
  }

  function declarative(
    orders: { code: string; order: string }[]
  ): Record<string, number> {
    return orders.reduce(
      (counts, { code }) => ({
        ...counts,
        [code]: (counts[code] ?? 0) + 1,
      }),
      {} as Record<string, number>
    );
  }
}
