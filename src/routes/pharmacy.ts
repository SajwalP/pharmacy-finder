import { Router } from 'express';

    export const pharmacyRouter = Router();

    pharmacyRouter.get('/', (req, res) => {
      // Fetch pharmacies with filters and pagination
      res.json({ message: 'List of pharmacies' });
    });

    pharmacyRouter.get('/:id', (req, res) => {
      // Fetch specific pharmacy details
      res.json({ message: `Details of pharmacy ${req.params.id}` });
    });
