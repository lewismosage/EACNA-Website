import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react';
import eacna from "../../assets/eacnaLogo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
            <img src={eacna} alt="EACNA Logo" className="h-16 w-16 rounded-full object-cover" />
              <div>
                <span className="text-xl font-bold tracking-tight block text-white">EACNA</span>
                <span className="text-xs text-primary-200 tracking-wider block">East African Child Neurology Association</span>
              </div>
            </Link>
            <p className="text-primary-100 mb-4">
              Advancing Child Neurology in East Africa through Collaboration, Education, and Advocacy.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="X">
                {/* X icon (formerly Twitter) */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-primary-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/training" className="text-primary-200 hover:text-white transition-colors">Training & Conferences</Link></li>
              <li><Link to="/membership" className="text-primary-200 hover:text-white transition-colors">Membership</Link></li>
              <li><Link to="/resources" className="text-primary-200 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/gallery" className="text-primary-200 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link to="/find-specialist" className="text-primary-200 hover:text-white transition-colors">Find a Specialist</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-2 text-primary-300 flex-shrink-0 mt-0.5" />
                <span className="text-primary-100">Nairobi, Kenya</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-2 text-primary-300 flex-shrink-0 mt-0.5" />
                <span className="text-primary-100">info@eacna.org</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-2 text-primary-300 flex-shrink-0 mt-0.5" />
                <span className="text-primary-100">+254 123 456 789</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-primary-100 mb-4">Subscribe to our newsletter for the latest updates and insights.</p>
            <form className="space-y-2">
              <div>
                <input 
                  type="text" 
                  placeholder="Your full name" 
                  className="w-full px-4 py-2 rounded-md bg-primary-800 border border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 text-white placeholder-primary-400"
                  required
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 rounded-md bg-primary-800 border border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 text-white placeholder-primary-400"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-primary-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} East African Child Neurology Association (EACNA). All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-primary-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;