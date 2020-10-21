import { createConnections } from 'typeorm';

createConnections()
  .then(() => {
    console.log(' 🗃️  Database connected.');
  })
  .catch(err => {
    console.log(` ❌  ${err.message}`);
  });
