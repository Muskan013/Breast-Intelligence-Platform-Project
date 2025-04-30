import { Link } from "wouter";
import { Activity, Zap, Database, HeartPulse } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-black py-3 text-white border-b-2 border-primary sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative mr-3">
            <HeartPulse className="h-8 w-8 text-primary pulse-animation" />
            <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-40"></div>
          </div>
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
            NeuroMedica<span className="text-white">AI</span>
          </h1>
        </div>
        
        <nav className="bg-gray-900 p-2 rounded-full bg-opacity-70 backdrop-blur-md border border-gray-800 glow-border">
          <ul className="flex space-x-1 md:space-x-2">
            <li>
              <Link href="/">
                <a className="hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors font-medium flex items-center">
                  <Activity className="h-4 w-4 mr-1.5" />
                  <span>Home</span>
                </a>
              </Link>
            </li>
            <li>
              <a 
                href="#prediction" 
                className="hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors font-medium flex items-center"
              >
                <Zap className="h-4 w-4 mr-1.5" />
                <span>Analysis</span>
              </a>
            </li>
            <li>
              <a 
                href="#resources" 
                className="hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors font-medium flex items-center"
              >
                <Database className="h-4 w-4 mr-1.5" />
                <span>Resources</span>
              </a>
            </li>
            <li>
              <a 
                href="#assistant" 
                className="hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors font-medium flex items-center"
              >
                <div className="h-4 w-4 bg-gradient-to-r from-primary to-accent rounded-full mr-1.5 flex items-center justify-center">
                  <span className="text-xs">AI</span>
                </div>
                <span>Assistant</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
