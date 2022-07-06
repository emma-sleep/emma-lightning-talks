// JavaScript Proxies
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
//
//
// > The Proxy object enables you to create a proxy for another object,
// > which can intercept and redefine fundamental operations for that
// > object.
//
//
// So called "traps" can be set for all interactions with objects such
// as getting a property value, setting a property value, invoking a function
// (yes, functions are objects too in JavaScript), and checking if a
// property exists on an object.
//
// Resources:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// https://css-tricks.com/an-intro-to-javascript-proxy/
// https://vuejs.org/guide/extras/reactivity-in-depth.html#how-vue-tracks-these-changes
// https://blog.logrocket.com/practical-use-cases-for-javascript-es6-proxies/
// https://levelup.gitconnected.com/when-vue-meets-proxy-402e9e3c6722

const functionRegistry: { [key: string]: () => void } = {
  // npm run exec noop
  noop() {
    const myObject: any = {};
    const proxy = new Proxy(myObject, {});
    proxy["a"] = 1;
    console.log(proxy["a"]);
    console.log(myObject["a"]);
  },
  // npm run exec logging
  logging() {
    const myObject: any = {};
    const proxy = new Proxy(myObject, {
      set(target, prop, value, receiver) {
        console.log(`Setting value "${value}" for property "${String(prop)}".`);
        return Reflect.set(target, prop, value, receiver);
      },
    });
    proxy["a"] = 1;
    proxy["b"] = "hello world";
  },
  // npm run exec fnTrap
  fnTrap() {
    const sum = (a: number, b: number) => a + b;
    const proxy = new Proxy(sum, {
      apply(fn, thisArg, argArray) {
        const result = fn(...(argArray as [number, number]));
        console.log(
          `Calling function "${fn.name}" with args "${argArray}" and the result is "${result}".`
        );
        return result * 10;
      },
    });
    console.log(sum(5, 5));
    console.log(proxy(5, 5));
  },
  // npm run exec validation
  validation() {
    const myObject: any = {};
    const proxy = new Proxy(myObject, {
      set(target, prop, value, receiver) {
        if (typeof value !== "number") {
          console.error(
            `Could not set "${String(
              prop
            )}" with value "${value}" as the object only accepts numbers.`
          );
          return false;
        }
        return Reflect.set(target, prop, value, receiver);
      },
    });
    proxy["a"] = 1;
    try {
      proxy["b"] = "hello world";
    } catch (err) {
      console.error(err);
    }
  },
  // npm run exec readOnly
  readOnly() {
    const myObject = {
      name: "John Doe",
      age: 42,
    };
    const throwError = () => {
      throw new Error("Read only");
    };
    const handler = {
      set: throwError,
      defineProperty: throwError,
      deleteProperty: throwError,
      preventExtensions: throwError,
      setPrototypeOf: throwError,
    };

    const proxy = new Proxy(myObject, handler);
    console.log("Name:", proxy.name);

    try {
      proxy.age = 25;
    } catch (err) {
      console.error(err);
    }
  },
  // npm run exec reactivity
  // Inspired by https://vuejs.org/guide/extras/reactivity-in-depth.html#how-reactivity-works-in-vue
  // but a little bit less efficient (for the sake of simplicity) as a change
  // to any reactive object would trigger all possible effects.
  reactivity() {
    const effects = new Set<() => void>();

    const watchEffect = (update: () => void) => {
      effects.add(update);
      update();
    };

    const reactiveObject = new Proxy(
      { count: 0 },
      {
        set(target, prop, value, receiver) {
          const result = Reflect.set(target, prop, value, receiver);
          effects.forEach((effect) => effect());
          return result;
        },
      }
    );

    let innerHtml;
    watchEffect(() => {
      innerHtml = `Counter is ${reactiveObject.count}`;
    });

    console.log(innerHtml);
    reactiveObject.count++;
    console.log(innerHtml);
  },
};

// Just some helper to make this executable with `npm run exec`. Just pass one of the function registry function names
// as a parameter to run the function, e.g. `npm run exec readOnly`.
(() => {
  const functionName = process.argv[2];
  if (!functionName || typeof functionRegistry[functionName] !== "function") {
    console.error(
      `"${functionName} is not registered as a function in ${__filename}`
    );
    process.exit(1);
  }
  functionRegistry[functionName]();
  process.exit(0);
})();
