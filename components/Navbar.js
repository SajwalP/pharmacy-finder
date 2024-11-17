export default function Navbar() {
      return (
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl">Pharmacy Directory</h1>
            <ul className="flex space-x-4">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/search" className="text-white">Search Pharmacies</a></li>
              <li><a href="/login" className="text-white">Login</a></li>
            </ul>
            <select className="bg-white text-black p-2 rounded">
              <option>Region 1</option>
              <option>Region 2</option>
              <option>Region 3</option>
            </select>
          </div>
        </nav>
      )
    }
