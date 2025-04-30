import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Activity, Zap, Database, HeartPulse, BookOpen, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-black py-3 text-white border-b-2 border-primary sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-3">
              <HeartPulse className="h-8 w-8 text-primary pulse-animation" />
              <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-40"></div>
            </div>
            <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
              BreastCare <span className="text-white">Predict</span>
            </h1>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 bg-opacity-70 backdrop-blur-md border border-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-primary" />
            ) : (
              <Menu className="h-5 w-5 text-primary" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:block bg-gray-900 p-2 rounded-full bg-opacity-70 backdrop-blur-md border border-gray-800 glow-border">
            <ul className="flex space-x-1 lg:space-x-2">
              <li>
                <Link 
                  href="/" 
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-2 lg:px-3 py-1.5 rounded-full transition-colors font-medium flex items-center text-sm lg:text-base"
                >
                  <Activity className="h-4 w-4 mr-1.5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <a 
                  href="#prediction" 
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-2 lg:px-3 py-1.5 rounded-full transition-colors font-medium flex items-center text-sm lg:text-base"
                >
                  <Zap className="h-4 w-4 mr-1.5" />
                  <span>Analysis</span>
                </a>
              </li>
              <li>
                <a 
                  href="#resources" 
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-2 lg:px-3 py-1.5 rounded-full transition-colors font-medium flex items-center text-sm lg:text-base"
                >
                  <Database className="h-4 w-4 mr-1.5" />
                  <span>Resources</span>
                </a>
              </li>
              <li>
                <a 
                  href="#assistant"
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-2 lg:px-3 py-1.5 rounded-full transition-colors font-medium flex items-center text-sm lg:text-base"
                >
                  <div className="h-4 w-4 bg-gradient-to-r from-primary to-accent rounded-full mr-1.5 flex items-center justify-center">
                    <span className="text-xs">AI</span>
                  </div>
                  <span>Assistant</span>
                </a>
              </li>
              <li>
                <Link 
                  href="/blog"
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-2 lg:px-3 py-1.5 rounded-full transition-colors font-medium flex items-center text-sm lg:text-base"
                >
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <nav className="mt-4 bg-gray-900 rounded-xl bg-opacity-90 backdrop-blur-md border border-gray-800 overflow-hidden animate-in slide-in-from-top">
            <ul className="flex flex-col divide-y divide-gray-800/70">
              <li>
                <Link 
                  href="/" 
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-4 py-3 transition-colors font-medium flex items-center"
                >
                  <Activity className="h-5 w-5 mr-3 text-primary" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <a 
                  href="#prediction" 
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-4 py-3 transition-colors font-medium flex items-center"
                >
                  <Zap className="h-5 w-5 mr-3 text-primary" />
                  <span>Analysis</span>
                </a>
              </li>
              <li>
                <a 
                  href="#resources" 
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-4 py-3 transition-colors font-medium flex items-center"
                >
                  <Database className="h-5 w-5 mr-3 text-primary" />
                  <span>Resources</span>
                </a>
              </li>
              <li>
                <a 
                  href="#assistant" 
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-4 py-3 transition-colors font-medium flex items-center"
                >
                  <div className="h-5 w-5 bg-gradient-to-r from-primary to-accent rounded-full mr-3 flex items-center justify-center">
                    <span className="text-xs">AI</span>
                  </div>
                  <span>Assistant</span>
                </a>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  onClick={handleLinkClick}
                  className="hover:bg-primary/20 px-4 py-3 transition-colors font-medium flex items-center"
                >
                  <BookOpen className="h-5 w-5 mr-3 text-primary" />
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
