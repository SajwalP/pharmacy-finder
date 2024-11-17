import express from 'express';
    import bodyParser from 'body-parser';
    import { pharmacyRouter } from './routes/pharmacy';
    import { claimRouter } from './routes/claim';
    import { authRouter } from './routes/auth';

    const app = express();
    app.use(bodyParser.json());

    // Root route to check server status
    app.get('/', (req, res) => {
      res.send('Welcome to the Pharmacy Directory API');
    });

    // Mount routers for different API endpoints
    app.use('/api/pharmacies', pharmacyRouter);
    app.use('/api/claims', claimRouter);
    app.use('/api/auth', authRouter);

    // Start the server on the specified port
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
