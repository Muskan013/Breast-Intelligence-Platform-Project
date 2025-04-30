import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-accent-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 mr-3"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          <h1 className="text-2xl font-bold">BreastCare Predict</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">
                <a className="hover:text-blue-100 transition-colors font-medium">Home</a>
              </Link>
            </li>
            <li>
              <a href="#prediction" className="hover:text-blue-100 transition-colors font-medium">
                Prediction
              </a>
            </li>
            <li>
              <a href="#resources" className="hover:text-blue-100 transition-colors font-medium">
                Resources
              </a>
            </li>
            <li>
              <a href="#assistant" className="hover:text-blue-100 transition-colors font-medium">
                AI Assistant
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
