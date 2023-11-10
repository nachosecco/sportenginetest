import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import clienteAxios from '../config/clienteAxios';
import '../styles/generalStyles.css';

function InviteModal({ isOpen, onRequestClose }) {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
  
    clienteAxios.post('/invitations', { email, role: selectedRole })
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
      clienteAxios.get('/roles')
        .then(response => {
          setRoles(response.data);
          if (response.data.length > 0) {
            setSelectedRole(response.data[0]._id);
          }        
        })
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
  className="invite-modal"
>
  <h2 className="invite-modal-title">Invite New Member</h2>
  <form onSubmit={handleSubmit} className="invite-form">
    <label className="invite-form-label">
      Email
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="invite-form-input"
      />
    </label>
    <label className="invite-form-label">
      Role
      <select
        value={selectedRole}
        onChange={e => setSelectedRole(e.target.value)}
        required
        className="invite-form-select"
      >
        {roles.map(role => (
          <option key={role._id} value={role._id}>{role.name}</option>
        ))}
      </select>
    </label>
    <button type="button" onClick={onRequestClose} className="invite-form-button">Cancel</button>
    <button type="submit" className="invite-form-button invite-form-button-submit">Send Invites</button>
  </form>
</Modal>
  );
}

export default InviteModal;