import { useState } from 'react';
    import Navbar from '../components/Navbar';
    import Footer from '../components/Footer';

    export default function Claim() {
      const [pharmacyId, setPharmacyId] = useState('');
      const [ownerEmail, setOwnerEmail] = useState('');

      /**
       * Handle claim form submission
       */
      const handleClaim = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/claims', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pharmacyId, ownerEmail })
        });
        const data = await response.json();
        if (data.claimId) {
          // Show success message
        } else {
          // Handle error
        }
      };

      return (
        <div>
          <Navbar />
          <main className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Submit Claim</h2>
            <form onSubmit={handleClaim}>
              <input
                type="text"
                placeholder="Pharmacy ID"
                value={pharmacyId}
                onChange={(e) => setPharmacyId(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded mb-4"
              />
              <input
                type="email"
                placeholder="Owner Email"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded mb-4"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Claim</button>
            </form>
          </main>
          <Footer />
        </div>
      );
    }
