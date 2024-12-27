import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Star, Twitter } from 'lucide-react';
import { Contact } from '../types/contact';
import { motion } from 'framer-motion';

interface ContactDetailsProps {
  contact: Contact;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  isLoading?: boolean;
}

const SkeletonLoading = () => (
  <div className="animate-pulse p-6 max-w-2xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="w-20 h-20 rounded-full bg-gray-200" />
        <div className="ml-4">
          <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
    <div className="mt-6">
      <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
      <div className="h-20 bg-gray-200 rounded" />
    </div>
  </div>
);

export default function ContactDetails({ contact, onDelete, onToggleFavorite, isLoading }: ContactDetailsProps) {
  const navigate = useNavigate();

  if (isLoading) return <SkeletonLoading />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-sm"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={contact.avatarUrl || 'https://via.placeholder.com/80'}
            alt={`${contact.firstName} ${contact.lastName}`}
            className="w-20 h-20 rounded-full object-cover border-4 border-green-100"
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {contact.firstName} {contact.lastName}
            </h2>
            {contact.twitterHandle && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={`https://twitter.com/${contact.twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-700"
              >
                <Twitter className="h-4 w-4 mr-1" />
                @{contact.twitterHandle}
              </motion.a>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleFavorite(contact.id)}
            className="p-2 hover:bg-green-50 rounded-full transition-colors"
          >
            <Star
              className={`h-6 w-6 ${
                contact.favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
              }`}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/contacts/${contact.id}/edit`)}
            className="p-2 hover:bg-green-50 rounded-full text-green-600 transition-colors"
          >
            <Pencil className="h-6 w-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this contact?')) {
                onDelete(contact.id);
                navigate('/');
              }
            }}
            className="p-2 hover:bg-red-50 rounded-full text-red-600 transition-colors"
          >
            <Trash2 className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      {contact.notes && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-green-50 p-4 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-2 text-green-800">Notes</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{contact.notes}</p>
        </motion.div>
      )}
    </motion.div>
  );
}