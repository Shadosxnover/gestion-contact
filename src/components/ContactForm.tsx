import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Contact } from '../types/contact';

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (contact: Omit<Contact, 'id'>) => Promise<string>;
}

export default function ContactForm({ contact, onSubmit }: ContactFormProps) {
  const navigate = useNavigate();
  const isEditing = !!contact;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const contactId = await onSubmit({
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        twitterHandle: formData.get('twitterHandle') as string,
        avatarUrl: formData.get('avatarUrl') as string,
        notes: formData.get('notes') as string,
        favorite: contact?.favorite || false,
      });
      
      // Redirect to the contact details page
      navigate(`/contacts/${contactId}`);
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto p-4 md:p-6"
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isEditing ? 'Edit Contact' : 'New Contact'}
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={contact?.firstName}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={contact?.lastName}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="twitterHandle" className="block text-sm font-medium text-gray-700">
              Twitter Handle
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                @
              </span>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="twitterHandle"
                id="twitterHandle"
                defaultValue={contact?.twitterHandle}
                className="block w-full pl-8 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
              Avatar URL
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="url"
              name="avatarUrl"
              id="avatarUrl"
              defaultValue={contact?.avatarUrl}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              name="notes"
              id="notes"
              rows={4}
              defaultValue={contact?.notes}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isEditing ? 'Save Changes' : 'Create Contact'}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}