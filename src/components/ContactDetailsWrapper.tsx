import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContactDetails from './ContactDetails';
import { Contact } from '../types/contact';

interface ContactDetailsWrapperProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function ContactDetailsWrapper({
  contacts,
  onDelete,
  onToggleFavorite,
}: ContactDetailsWrapperProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const contact = contacts.find(c => c.id === id);

  if (!contact) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-red-500">Contact Not Found</h1>
        <p className="mt-4">The contact you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/contacts')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back to Contacts
        </button>
      </div>
    );
  }

  return (
    <ContactDetails
      contact={contact}
      onDelete={onDelete}
      onToggleFavorite={onToggleFavorite}
    />
  );
}