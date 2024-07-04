import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure accessibility

const Resume = ({ isOpen, onRequestClose, resumeUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Resume PDF"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
        },
      }}
    >
      <div style={{ textAlign: 'right' }}>
        <button onClick={onRequestClose}>Close</button>
      </div>
      <div style={{ overflow: 'auto', height: '90%' }}>
        <iframe src={resumeUrl} width="100%" height="100%" title="Resume PDF" />
      </div>
    </Modal>
  );
};

export default Resume;