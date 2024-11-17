import { Router } from 'express';
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';
    import { pool } from '../db'; // Assume a configured PostgreSQL pool

    export const authRouter = Router();

    /**
     * Signup endpoint for pharmacy owners
     * Expects: { name, email, password, phone }
     * Returns: { ownerId }
     */
    authRouter.post('/signup', async (req, res) => {
      const { name, email, password, phone } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const result = await pool.query(
          'INSERT INTO pharmacy_owners (name, email, password_hash, phone) VALUES ($1, $2, $3, $4) RETURNING id',
          [name, email, hashedPassword, phone]
        );
        res.status(201).json({ ownerId: result.rows[0].id });
      } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
      }
    });

    /**
     * Login endpoint for pharmacy owners
     * Expects: { email, password }
     * Returns: { token }
     */
    authRouter.post('/login', async (req, res) => {
      const { email, password } = req.body;

      try {
        const result = await pool.query('SELECT * FROM pharmacy_owners WHERE email = $1', [email]);
        const owner = result.rows[0];

        if (owner && await bcrypt.compare(password, owner.password_hash)) {
          const token = jwt.sign({ ownerId: owner.id }, 'your_jwt_secret', { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
      }
    });
