import { useState, useEffect } from 'react';
    import { useRouter } from 'next/router';
    import Navbar from '../../components/Navbar';
    import Footer from '../../components/Footer';

    export default function PharmacyDetails() {
      const router = useRouter();
      const { id } = router.query;
      const [pharmacy, setPharmacy] = useState(null);

      useEffect(() => {
        if (id) {
          // Fetch pharmacy details from the API
          fetch(`/api/pharmacies/${id}`)
            .then(response => response.json())
            .then(data => setPharmacy(data));
        }
      }, [id]);

      if (!pharmacy) {
        return <div>Loading...</div>;
      }

      return (
        <div>
          <Navbar />
          <main className="container mx-auto p-4">
            <header className="bg-blue-100 p-4 rounded-lg mb-4">
              <h1 className="text-3xl font-bold">{pharmacy.name}</h1>
              <p className="text-gray-600">{pharmacy.phone}</p>
              <p className="text-gray-600">{pharmacy.email}</p>
            </header>
            <section className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Services Offered</h2>
              <div className="flex flex-wrap">
                {pharmacy.services.split(',').map(service => (
                  <span key={service} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {service}
                  </span>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-2">Location</h2>
              <p className="text-gray-600 mb-2">{pharmacy.address}</p>
              <div className="w-full h-64 bg-gray-200 rounded-lg">
                {/* Embedded map placeholder */}
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(pharmacy.address)}&output=embed`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    }
