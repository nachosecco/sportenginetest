import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

function InviteModal({ isOpen, onRequestClose }) {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  
    axios.post('/api/invitations', { email, role: selectedRole })
      .then(response => {
        console.log('Invitation sent', response.data);
        onRequestClose();
      })
      .catch(error => {
        console.error('Error sending invitation', error);
      });
  }

  useEffect(() => {
    if (isOpen) {
      axios.get('/api/roles')
        .then(response => {
          setRoles(response.data);
          if (response.data.length > 0) {
            setSelectedRole(response.data[0]._id);
          }        })
        .catch(error => {
          console.error('Error fetching roles', error);
        });
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Invite Modal"
    >
      <h2>Invite New Member</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Role
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            required
          >
            {roles.map(role => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
          </select>
        </label>
        <button type="button" onClick={onRequestClose}>Cancel</button>
        <button type="submit">Send Invites</button>
      </form>
    </Modal>
  );
}

export default InviteModal;