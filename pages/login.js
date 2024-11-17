import { useState } from 'react';
    import Navbar from '../components/Navbar';
    import Footer from '../components/Footer';

    export default function Login() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      /**
       * Handle login form submission
       */
      const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
          // Store token and redirect
        } else {
          // Handle error
        }
      };

      return (
        <div>
          <Navbar />
          <main className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
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
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
          </main>
          <Footer />
        </div>
      );
    }
