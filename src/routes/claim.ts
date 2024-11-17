import { Router } from 'express';
    import { pool } from '../db';

    export const claimRouter = Router();

    /**
     * Submit a new claim request
     * Expects: { pharmacyId, ownerEmail }
     * Returns: { claimId }
     */
    claimRouter.post('/', async (req, res) => {
      const { pharmacyId, ownerEmail } = req.body;

      try {
        const result = await pool.query(
          'INSERT INTO claim_requests (pharmacy_id, owner_id, status) VALUES ($1, (SELECT id FROM pharmacy_owners WHERE email = $2), $3) RETURNING id',
          [pharmacyId, ownerEmail, 'pending']
        );
        res.status(201).json({ claimId: result.rows[0].id });
      } catch (error) {
        res.status(500).json({ error: 'Error submitting claim' });
      }
    });

    /**
     * Fetch all claim requests
     * Returns: Array of claim requests
     */
    claimRouter.get('/', async (req, res) => {
      try {
        const result = await pool.query('SELECT * FROM claim_requests');
        res.json(result.rows);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching claims' });
      }
    });

    /**
     * Update claim status
     * Expects: { status }
     * Returns: Success message
     */
    claimRouter.put('/:id', async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;

      try {
        await pool.query('UPDATE claim_requests SET status = $1 WHERE id = $2', [status, id]);
        res.json({ message: 'Claim status updated' });
      } catch (error) {
        res.status(500).json({ error: 'Error updating claim status' });
      }
    });
