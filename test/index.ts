import { TestTs } from '../dist/testts';
import { TestTsx } from '../dist/testtsx';
import { TestTs as Ts, TestTsx as Tsx } from '../dist';

const ts = new TestTs();
console.log(ts.test());

const tsx = new TestTsx();
console.log(tsx.test());

console.log(Ts, Tsx);
