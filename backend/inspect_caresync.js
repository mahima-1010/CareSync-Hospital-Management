const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '4TuJ5yXzH8GzJB3VfneqJQjiIH1qIYv6aRfj',
  database: 'CareSync'
});

async function inspectSchema() {
  try {
    await client.connect();
    console.log('Connected to CareSync database.');

    // Get all tables in the public schema
    const tablesRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    const tables = tablesRes.rows.map(r => r.table_name);
    console.log('Tables in CareSync:', tables);

    // Print columns for each table
    for (const table of tables) {
      console.log(`\n=== Schema for table: ${table} ===`);
      const columnsRes = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = $1
        ORDER BY ordinal_position;
      `, [table]);
      console.table(columnsRes.rows);

      // Print first 5 rows of data for inspection
      const dataRes = await client.query(`SELECT * FROM "${table}" LIMIT 5;`);
      console.log(`Sample data from ${table} (up to 5 rows):`);
      console.log(dataRes.rows);
    }

  } catch (err) {
    console.error('Error inspecting CareSync:', err.message);
  } finally {
    await client.end();
  }
}

inspectSchema();
