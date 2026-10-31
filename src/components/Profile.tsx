import React, { useState } from 'react';
import { UserProfile } from '../types.js';

interface ProfileProps {
  initialProfile?: UserProfile;
  onSave?: (profile: UserProfile) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  initialProfile = {
    id: 'USR-101',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    preferredTheme: 'light',
  },
  onSave,
}) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('Profile saved successfully!');
    onSave?.(profile);
  };

  return (
    <div className="card profile-card" data-testid="profile-section">
      <div className="card-header">
        <h2>User Profile</h2>
        <span className="badge" data-testid="theme-badge">
          Theme: {profile.preferredTheme.toUpperCase()}
        </span>
      </div>

      <form onSubmit={handleSave} className="profile-form">
        <div className="form-group">
          <label htmlFor="profile-name">Full Name</label>
          <input
            id="profile-name"
            type="text"
            className="input-field"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            data-testid="profile-name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="profile-email">Email Address</label>
          <input
            id="profile-email"
            type="email"
            className="input-field"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            data-testid="profile-email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="theme-select">Theme Preference</label>
          <select
            id="theme-select"
            className="input-field"
            value={profile.preferredTheme}
            onChange={(e) =>
              setProfile({ ...profile, preferredTheme: e.target.value as 'light' | 'dark' })
            }
            data-testid="theme-select"
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          data-testid="save-profile-btn"
        >
          Save Profile Changes
        </button>
      </form>

      {statusMessage && (
        <div className="status-badge status-success" data-testid="profile-status">
          {statusMessage}
        </div>
      )}
    </div>
  );
};
