const { Client } = require('pg');

    const client = new Client({
      user: 'your_db_user',
      host: 'localhost',
      database: 'pharmacy_directory',
      password: 'your_db_password',
      port: 5432,
    });

    async function migrate() {
      try {
        await client.connect();

        // Create Pharmacies Table
        await client.query(`
          CREATE TABLE IF NOT EXISTS pharmacies (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            services TEXT,
            hours VARCHAR(255),
            phone VARCHAR(50),
            email VARCHAR(255),
            owner_id INTEGER REFERENCES pharmacy_owners(id) ON DELETE SET NULL
          );
        `);

        // Create Pharmacy Owners Table
        await client.query(`
          CREATE TABLE IF NOT EXISTS pharmacy_owners (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            phone VARCHAR(50)
          );
        `);

        // Create Claim Requests Table
        await client.query(`
          CREATE TABLE IF NOT EXISTS claim_requests (
            id SERIAL PRIMARY KEY,
            pharmacy_id INTEGER REFERENCES pharmacies(id) ON DELETE CASCADE,
            owner_id INTEGER REFERENCES pharmacy_owners(id) ON DELETE CASCADE,
            status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
            requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );
        `);

        console.log('Migration completed successfully.');
      } catch (err) {
        console.error('Migration failed:', err);
      } finally {
        await client.end();
      }
    }

    migrate();
