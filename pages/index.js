import Navbar from '../components/Navbar'
    import Footer from '../components/Footer'

    export default function Home() {
      return (
        <div>
          <Navbar />
          <main className="container mx-auto p-4">
            <section className="hero bg-blue-100 p-8 rounded-lg text-center">
              <h2 className="text-4xl font-bold mb-4">Find Your Pharmacy</h2>
              <input
                type="text"
                placeholder="Search for pharmacies..."
                className="p-2 w-full max-w-md border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-500 text-white p-2 rounded">Search by Condition</button>
                <button className="bg-blue-500 text-white p-2 rounded">Search by Location</button>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      )
    }
