import { createRunner } from 'run';

const result = await createRunner().run({
  source: 'return 1;',
  sourceType: 'function-body',
});
console.log(result);
