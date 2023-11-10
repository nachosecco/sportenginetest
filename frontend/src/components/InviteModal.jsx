import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import clienteAxios from '../config/clienteAxios';
import '../styles/generalStyles.css';

function InviteModal({ isOpen, onRequestClose }) {
  const [roles, setRoles] = useState([]);
  const [invitees, setInvitees] = useState([{ email: '', role: '' }]);
  const isSendButtonEnabled = invitees.some(invitee => invitee.email.trim() !== '');

  useEffect(() => {
    if (isOpen) {
      clienteAxios.get('/roles')
        .then(response => {
          setRoles(response.data);
          setInvitees(invitees.map(invitee => ({
            ...invitee,
            role: response.data[0]._id
          })));
        })
        .catch(error => {
          console.error('Error fetching roles', error);
        });
    }
  }, [isOpen]);

  function handleAddInvitee() {
    if (invitees[invitees.length - 1].email !== '') {
      setInvitees([...invitees, { email: '', role: roles.length > 0 ? roles[0]._id : '' }]);
    }
  }

  function handleRemoveInvitee(index) {
    setInvitees(invitees.filter((_, i) => i !== index));
  }

  function handleInviteeChange(index, event, field) {
    const newInvitees = [...invitees];
    newInvitees[index][field] = event.target.value;
    setInvitees(newInvitees);
  }

  const handleSubmit = e => {
    e.preventDefault();
    // Filter out any invitees with empty emails
    const validEmails = invitees.filter(invitee => invitee.email.trim() !== '');
    if (validEmails.length > 0) {
      // Proceed with sending invites
    }
    onRequestClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Invite Modal"
      className="invite-modal"
    >
      <h2 className="invite-modal-title">Invite New Member</h2>
      <form onSubmit={handleSubmit} className="invite-form">
        {invitees.map((invitee, index) => (
          <div key={index} className="invite-row">
            <input
              type="email"
              value={invitee.email}
              onChange={(e) => handleInviteeChange(index, e, 'email')}
              required
              className="invite-form-input"
              placeholder="Email"
            />
            <select
              value={invitee.role}
              onChange={(e) => handleInviteeChange(index, e, 'role')}
              required
              className="invite-form-select"
            >
              {roles.map(role => (
                <option key={role._id} value={role._id}>{role.name}</option>
              ))}
            </select>
            {invitees.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveInvitee(index)}
                className="invite-remove-button"
                title="Remove invite"
              >
                <img src="/icons/icons8-delete-94.png" alt="Remove invite" className="invite-remove-icon" />
              </button>
            )}
            {index === invitees.length - 1 && (
              <button
                type="button"
                onClick={handleAddInvitee}
                className="invite-add-button"
                disabled={invitee.email === ''}
                title="Add more rows"
              >
                <img src="/icons/plus-member-icon.png" alt="Add more rows" className="invite-add-icon" />
              </button>
            )}
          </div>
        ))}
        <div className="invite-form-actions">
          <button type="button" onClick={onRequestClose} className="invite-form-button">Cancel</button>
          <button
            type="submit"
            disabled={!isSendButtonEnabled}
            className={`invite-form-button-submit ${!isSendButtonEnabled ? 'disabled-button-class' : ''}`}
          >
            Send Invites
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default InviteModal;