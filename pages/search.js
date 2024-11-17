import { useState, useEffect } from 'react';
    import Navbar from '../components/Navbar';
    import Footer from '../components/Footer';

    export default function SearchResults() {
      const [pharmacies, setPharmacies] = useState([]);
      const [filters, setFilters] = useState({
        services: '',
        onlineBooking: false,
        costRange: '',
        location: ''
      });

      useEffect(() => {
        // Fetch pharmacies from the API
        fetch('/api/pharmacies')
          .then(response => response.json())
          .then(data => setPharmacies(data));
      }, []);

      const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters({
          ...filters,
          [name]: type === 'checkbox' ? checked : value
        });
      };

      return (
        <div>
          <Navbar />
          <main className="container mx-auto p-4 flex">
            <aside className="w-1/4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Filters</h3>
              <div className="mb-4">
                <label className="block mb-2">Services</label>
                <input
                  type="text"
                  name="services"
                  value={filters.services}
                  onChange={handleFilterChange}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Online Booking</label>
                <input
                  type="checkbox"
                  name="onlineBooking"
                  checked={filters.onlineBooking}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Available
              </div>
              <div className="mb-4">
                <label className="block mb-2">Cost Range</label>
                <input
                  type="text"
                  name="costRange"
                  value={filters.costRange}
                  onChange={handleFilterChange}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
            </aside>
            <section className="w-3/4 p-4">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search for pharmacies..."
                  className="p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pharmacies.map(pharmacy => (
                  <div key={pharmacy.id} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="text-xl font-bold">{pharmacy.name}</h4>
                    <p className="text-gray-600">{pharmacy.location}</p>
                    <div className="flex flex-wrap mt-2">
                      {pharmacy.services.split(',').map(service => (
                        <span key={service} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                    <button className="mt-4 bg-blue-500 text-white p-2 rounded">More Details</button>
                  </div>
                ))}
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    }
