import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';
import ContactDetailsWrapper from './components/ContactDetailsWrapper';
import { Contact } from './types/contact';

// Create a separate component for the app content
function AppContent() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      twitterHandle: 'johndoe',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      notes: 'Full-stack developer',
      favorite: true,
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      twitterHandle: 'janesmith',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      notes: 'UI/UX Designer',
      favorite: false,
    },
  ]);

  const handleAddContact = async (newContact: Omit<Contact, 'id'>) => {
    const id = crypto.randomUUID();
    setContacts(prev => [...prev, { ...newContact, id }]);
    return id;
  };

  const handleUpdateContact = async (id: string, updatedContact: Omit<Contact, 'id'>) => {
    setContacts(prev =>
      prev.map(contact => (contact.id === id ? { ...updatedContact, id } : contact))
    );
    return id;
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setContacts(prev =>
      prev.map(contact =>
        contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
      )
    );
  };

  // Wrapper component for edit form
  const EditContactWrapper = () => {
    const { id } = useParams();
    const contact = contacts.find(c => c.id === id);
    
    if (!contact) {
      return <Navigate to="/contacts" replace />;
    }

    return (
      <ContactForm
        contact={contact}
        onSubmit={(updatedContact) => handleUpdateContact(id!, updatedContact)}
      />
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar contacts={contacts} onToggleFavorite={handleToggleFavorite} />
      <main className="flex-1 bg-white md:ml-80">
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" replace />} />
          <Route
            path="/contacts"
            element={
              <div className="p-4 text-gray-600">
                Select a contact to view details or create a new contact.
              </div>
            }
          />
          <Route
            path="/contacts/new"
            element={<ContactForm onSubmit={handleAddContact} />}
          />
          <Route
            path="/contacts/:id/edit"
            element={<EditContactWrapper />}
          />
          <Route
            path="/contacts/:id"
            element={
              <ContactDetailsWrapper
                contacts={contacts}
                onDelete={handleDeleteContact}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

// Main App component that provides the Router context
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;