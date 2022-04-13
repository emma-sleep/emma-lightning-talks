// Lightning Talk: JavaScript Iterators and Generators
// Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
// Reason: https://github.com/emma-sleep/payment-integration-service/pull/389/files#diff-1513a08d6f4c0586557665498a6f36d26b33836e6808a4d74953843556a931f9R120-R124

// Iterator
function range(start = 0, end = Infinity, step = 1): Iterator<number> {
  let index = start;

  return {
    next() {
      if (index < end) {
        const value = index;
        index = index + step;
        return { value, done: false };
      }
      return { value: index, done: true };
    },
  };
}

// An iterator is any object with a `next` function member that
// follows the "iteration protocol", i.e. it returns an object
// with a `value` and a `done` property.
// The latter is required to know when to stop iterating.

// Using the iterator
function useRange() {
  const iterator = range(0, 10);
  let result = iterator.next();
  while (!result.done) {
    console.log(result.value);
    result = iterator.next();
  }
}

// How can we use this in `for ... of` and with the spread `...` operator?
const iterable = {
  [Symbol.iterator]() {
    return range(0, 10);
  },
};

// Loop prints numbers from 0 to 9 (inclusive)
for (const number of iterable) {
  console.log(number);
}

const numbers = [...iterable]; // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// JavaScript/TypeScript provides several built-in iterables such
// as String, Array, TypedArray, Map, and Set (they all have a
// Symbol.iterator method).

// Generators
// A generator is following the iteration protocol. When its `next`
// function is called, it executes until it encounters a `yield`
// statement. Thereby, an iterative algorithm can be represented by
// a series of non-continuous execution steps. Generators are created
// by generator functions.

function* xrange(start = 0, end = Infinity, step = 1): Generator<number> {
  for (let index = start; index < end; index = index + step) {
    yield index;
  }
}

// But why?

// Represent infinite sequences
async function retryIndefinitely(longRunningOperation: () => Promise<void>) {
  for (const nthTry of xrange(1, Infinity)) {
    console.log(`${nthTry}. try:`);
    await longRunningOperation();
  }
}

// Represent complex sequences
// (note that this example is shamelessly copied from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#advanced_generators)

function* fibonacci() {
  let current = 0;
  let next = 1;
  while (true) {
    let reset = yield current;
    [current, next] = [next, next + current];
    if (reset) {
      current = 0;
      next = 1;
    }
  }
}

const sequence = fibonacci();
console.log(sequence.next().value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2
console.log(sequence.next().value); // 3
console.log(sequence.next().value); // 5
console.log(sequence.next().value); // 8
console.log(sequence.next(true).value); // 0
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 1
console.log(sequence.next().value); // 2

// Avoid expensive computations
function parseApiGatewayHeader(header: string, secret: string): string {
  // do some heavy computation
  return "parsed";
}
function parseCloudflareHeader(header: string): string {
  // do some heavy computation
  return "parsed";
}

async function ip(request, reply): Promise<string> {
  const apiGatewayHeader = request.headers["api-gw-header"];
  const cloudflareHeader = request.headers["cf-header"];
  const requestIp = request.ip;
  function* ipCandidates() {
    yield parseApiGatewayHeader(apiGatewayHeader, "secret");
    yield parseCloudflareHeader(cloudflareHeader);
    yield requestIp;
  }

  for (const candidate of ipCandidates()) {
    if (candidate) {
      return candidate;
    }
  }

  reply.log.error(
    {
      ["api-gw-header"]: apiGatewayHeader,
      ["cf-header"]: cloudflareHeader,
      requestIp,
    },
    "Could not determine user's IP based on request."
  );
  throw new Error("Could not determine user's IP based on request.");
}
