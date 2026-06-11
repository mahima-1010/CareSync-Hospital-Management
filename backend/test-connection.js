const { Client } = require('pg');

const passwords = [
  '4TuJ5yXzH8GzJB3VfneqJQjiIH1qIYv6aRfj',
  '3454754a3579587a4838477a4a423356666e65714a516a6949483171495976366152666a'
];
const user = 'postgres';
const host = 'localhost';
const port = 5432;

async function testConnections() {
  for (const password of passwords) {
    console.log(`Testing user: ${user}, password: "${password}"...`);
    const client = new Client({
      host,
      port,
      user,
      password,
      database: 'postgres'
    });

    try {
      await client.connect();
      console.log('Successfully connected!');
      
      const res = await client.query('SELECT datname FROM pg_database');
      const databases = res.rows.map(r => r.datname);
      console.log('Databases available:', databases);
      
      await client.end();
      return { success: true, password };
    } catch (err) {
      console.error(`Failed: ${err.message}`);
    }
  }
  return { success: false };
}

testConnections().then(res => {
  if (res.success) {
    console.log(`Connection successful with password: "${res.password}"`);
  } else {
    console.log('All connection attempts failed.');
  }
  process.exit(0);
});
