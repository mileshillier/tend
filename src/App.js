import { useState } from 'react';
import { initialContacts } from './data/contacts';
import { BottomNav } from './components/BottomNav';
import { LogInteractionModal } from './components/LogInteractionModal';
import { AddContactModal } from './components/AddContactModal';
import { HomeScreen } from './screens/HomeScreen';
import { ContactsScreen } from './screens/ContactsScreen';
import { ContactDetailScreen } from './screens/ContactDetailScreen';

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [logModalContactId, setLogModalContactId] = useState(null);
  const [showAddContact, setShowAddContact] = useState(false);

  const selectedContact = contacts.find(c => c.id === selectedContactId) || null;

  function openContact(id) {
    setSelectedContactId(id);
  }

  function closeContact() {
    setSelectedContactId(null);
  }

  function openLogModal(contactId) {
    setLogModalContactId(contactId || null);
    setShowLogModal(true);
  }

  function closeLogModal() {
    setShowLogModal(false);
    setLogModalContactId(null);
  }

  function logInteraction(contactId, interaction) {
    setContacts(prev =>
      prev.map(c =>
        c.id === contactId
          ? { ...c, interactions: [interaction, ...c.interactions] }
          : c
      )
    );
  }

  function updateFrequency(contactId, frequency) {
    setContacts(prev =>
      prev.map(c =>
        c.id === contactId ? { ...c, frequency } : c
      )
    );
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSelectedContactId(null);
  }

  function addContact(newContact) {
    setContacts(prev => [...prev, newContact]);
    setSelectedContactId(newContact.id);
  }

  function handleAddPress() {
    setShowAddContact(true);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5' }}>
      {selectedContact ? (
        <ContactDetailScreen
          contact={selectedContact}
          onBack={closeContact}
          onLog={() => openLogModal(selectedContact.id)}
          onFrequencyChange={updateFrequency}
        />
      ) : activeTab === 'home' ? (
        <HomeScreen
          contacts={contacts}
          onOpenContact={openContact}
        />
      ) : (
        <ContactsScreen
          contacts={contacts}
          onOpenContact={openContact}
        />
      )}

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAddPress={handleAddPress}
      />

      {showLogModal && (
        <LogInteractionModal
          contacts={contacts}
          preselectedContactId={logModalContactId}
          onSubmit={logInteraction}
          onClose={closeLogModal}
        />
      )}

      {showAddContact && (
        <AddContactModal
          onAdd={addContact}
          onClose={() => setShowAddContact(false)}
        />
      )}
    </div>
  );
}
