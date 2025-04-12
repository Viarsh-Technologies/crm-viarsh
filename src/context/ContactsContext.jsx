// src/context/ContactsContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import initialData from '../data/contacts-data.json'; // Your initial data

const ContactsContext = createContext();

export const useContacts = () => {
    return useContext(ContactsContext);
};

export const ContactsProvider = ({ children }) => {
    const [contacts, setContacts] = useState([]);

    // Load initial data only once on mount
    useEffect(() => {
        // Basic check to avoid resetting if context is re-rendered unnecessarily
        if (contacts.length === 0) {
             // Add a unique temporary ID to each initial item if they don't have one
             const dataWithIds = initialData.map((item, index) => ({
                ...item,
                id: item.id || `initial-${index}-${Date.now()}` // Ensure unique ID
            }));
            setContacts(dataWithIds);
        }
    }, []); // Empty dependency array ensures this runs only once

    const addContact = (newContact) => {
        // Add a unique temporary ID to the new contact
        const contactWithId = {
            ...newContact,
            id: `new-${Date.now()}-${Math.random()}` // Simple unique temporary ID
        };
        setContacts(prevContacts => [...prevContacts, contactWithId]);
    };

     const deleteContact = (contactId) => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    };

    // You might add updateContact, deleteContact etc. here later

    const value = {
        contacts,
        addContact,
        deleteContact // Expose delete function if needed
    };

    return (
        <ContactsContext.Provider value={value}>
            {children}
        </ContactsContext.Provider>
    );
};