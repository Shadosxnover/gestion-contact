import React, { useState } from 'react';
import { Search, Star, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Contact } from '../types/contact';

interface SidebarProps {
  contacts: Contact[];
  onToggleFavorite: (id: string) => void;
}

export default function Sidebar({ contacts, onToggleFavorite }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const filteredContacts = contacts
    .filter(contact => 
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.favorite === b.favorite) {
        return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      }
      return a.favorite ? -1 : 1;
    });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMobileMenu}
          className="p-2 bg-green-600 text-white rounded-full shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.div
        initial={false}
        animate={{ 
          x: isMobileMenuOpen ? 0 : -320,
          width: 320
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed md:sticky md:top-0 left-0 top-0 h-screen bg-white border-r border-gray-200 z-40 md:translate-x-0 shadow-lg md:shadow-none overflow-hidden flex flex-col w-80"
      >
        <div className="p-4 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link
            to="/contacts/new"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            New Contact
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/contacts/${contact.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 hover:bg-green-50 transition-colors ${
                    location.pathname === `/contacts/${contact.id}` ? 'bg-green-50 border-r-4 border-green-600' : ''
                  }`}
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={contact.avatarUrl || 'https://via.placeholder.com/40'}
                    alt={`${contact.firstName} ${contact.lastName}`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-green-100"
                  />
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {contact.firstName} {contact.lastName}
                    </p>
                    {contact.twitterHandle && (
                      <p className="text-sm text-gray-500 truncate">
                        @{contact.twitterHandle}
                      </p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleFavorite(contact.id);
                    }}
                    className="p-1 hover:bg-green-100 rounded-full transition-colors"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        contact.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                      }`}
                    />
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredContacts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 text-center text-gray-500"
            >
              No contacts found
            </motion.div>
          )}
        </nav>
      </motion.div>
    </>
  );
}