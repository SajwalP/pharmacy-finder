export default function Footer() {
      return (
        <footer className="bg-gray-800 p-4 mt-8">
          <div className="container mx-auto text-center text-white">
            <ul className="flex justify-center space-x-4 mb-2">
              <li><a href="#" className="text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-white">Terms of Service</a></li>
              <li>
                <select className="bg-white text-black p-2 rounded">
                  <option>Region 1</option>
                  <option>Region 2</option>
                  <option>Region 3</option>
                </select>
              </li>
            </ul>
            &copy; 2023 Pharmacy Directory
          </div>
        </footer>
      )
    }
