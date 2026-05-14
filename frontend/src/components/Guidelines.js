import React from 'react';

const Guidelines = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '48px', color: '#1e293b' }}>Community Guidelines</h1>
      <p style={{ fontSize: '24px', color: '#64748b', marginBottom: '30px' }}>
        To keep SkillSwap safe and fair, all members must follow these rules:
      </p>
      
      <ul style={{ fontSize: '22px', lineHeight: '1.6', color: '#334155' }}>
        <li style={{ marginBottom: '20px' }}>
          <strong>Skill-for-Skill Only:</strong> SkillSwap is purely for trading expertise. No money or financial transactions are allowed[cite: 9, 17].
        </li>
        <li style={{ marginBottom: '20px' }}>
          <strong>Respectful Exchanges:</strong> Be professional and polite when teaching or learning from others[cite: 16].
        </li>
        <li style={{ marginBottom: '20px' }}>
          <strong>Honest Reviews:</strong> Only rate your partner after a session is marked complete to help build community trust[cite: 25, 36].
        </li>
        <li style={{ marginBottom: '20px' }}>
          <strong>No Spam or Inappropriate Content:</strong> Listings that violate community standards will be removed by admins[cite: 30, 43].
        </li>
      </ul>
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '12px' }}>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Need Help?</p>
        <p>Contact the admin team if you encounter any issues during an exchange[cite: 47].</p>
      </div>
    </div>
  );
};

export default Guidelines;