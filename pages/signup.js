import { useState } from 'react';
    import Navbar from '../components/Navbar';
    import Footer from '../components/Footer';

    export default function Signup() {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [phone, setPhone] = useState('');

      /**
       * Handle signup form submission
       */
      const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, phone })
        });
        const data = await response.json();
        if (data.ownerId) {
          // Redirect to login
        } else {
          // Handle error
        }
      };

      return (
        <div>
          <Navbar />
          <main className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Signup</h2>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded mb-4"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded mb-4"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded mb-4"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Signup</button>
            </form>
          </main>
          <Footer />
        </div>
      );
    }
