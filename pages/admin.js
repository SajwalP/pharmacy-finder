import { useState, useEffect } from 'react';
    import Navbar from '../components/Navbar';
    import Footer from '../components/Footer';

    export default function AdminDashboard() {
      const [claims, setClaims] = useState([]);

      useEffect(() => {
        // Fetch claims from the API
        fetch('/api/claims')
          .then(response => response.json())
          .then(data => setClaims(data));
      }, []);

      /**
       * Handle status change for a claim
       */
      const handleStatusChange = async (id, status) => {
        await fetch(`/api/claims/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        // Update local state or refetch claims
      };

      return (
        <div>
          <Navbar />
          <main className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Pharmacy ID</th>
                  <th className="border p-2">Owner Email</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {claims.map(claim => (
                  <tr key={claim.id}>
                    <td className="border p-2">{claim.pharmacy_id}</td>
                    <td className="border p-2">{claim.owner_id}</td>
                    <td className="border p-2">{claim.status}</td>
                    <td className="border p-2">
                      <button onClick={() => handleStatusChange(claim.id, 'approved')} className="bg-green-500 text-white p-1 rounded mr-2">Approve</button>
                      <button onClick={() => handleStatusChange(claim.id, 'rejected')} className="bg-red-500 text-white p-1 rounded">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </main>
          <Footer />
        </div>
      );
    }
