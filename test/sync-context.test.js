const assert = require('assert');
const mongodbContext = require('..');

async function main() {
  const store = mongodbContext({
    host: '127.0.0.1',
    port: '27017',
    database: 'nodered_ctx_test',
    username: null,
    password: null,
    options: null
  });

  const scope = `sync_test_${Date.now()}`;
  const value = { ok: true, at: Date.now() };

  await store.open();

  try {
    store.set(scope, 'x', value);
    assert.deepStrictEqual(store.get(scope, 'x'), value);
    assert.deepStrictEqual(store.keys(scope), ['x']);
  } finally {
    await store.delete(scope);
    await store.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
