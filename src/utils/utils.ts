import { Entropy } from 'entropy-string';
/* 
This is to ensure we are always working with promises!
you can see this SO thread why we are doing it this way 
https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise/27746324#27746324  
*/
const promiseFrom = (value): Promise<any> => Promise.resolve(value);

const randomString = (): string => {
  const entropy = new Entropy();
  return entropy.string();
};

const randomBool = (): boolean => Math.random() >= 0.5;

const randomObject = (): any => ({ key: randomString() });

const randomFunction = (): string | any =>
  randomBool() ? randomObject() : randomString();

const slowRandomFunction = (): Promise<string | any> =>
  new Promise((resolve) => setTimeout(() => resolve(randomFunction()), 5000));

export { promiseFrom, randomFunction, slowRandomFunction };
