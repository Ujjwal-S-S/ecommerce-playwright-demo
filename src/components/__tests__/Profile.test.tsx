import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Profile } from '../Profile.js';

describe('Profile Component (Unit Tests)', () => {
  it('renders initial profile fields', () => {
    render(
      <Profile
        initialProfile={{
          id: 'USR-1',
          name: 'Alice Johnson',
          email: 'alice@example.com',
          preferredTheme: 'light',
        }}
      />
    );

    expect(screen.getByTestId('profile-name')).toHaveValue('Alice Johnson');
    expect(screen.getByTestId('profile-email')).toHaveValue('alice@example.com');
    expect(screen.getByTestId('theme-badge')).toHaveTextContent('Theme: LIGHT');
  });

  it('updates profile and invokes onSave callback', () => {
    const handleSave = vi.fn();
    render(<Profile onSave={handleSave} />);

    const nameInput = screen.getByTestId('profile-name');
    const phoneInput = screen.getByTestId('profile-phone');
    const saveBtn = screen.getByTestId('save-profile-btn');

    fireEvent.change(nameInput, { target: { value: 'Jane Updated' } });
    fireEvent.change(phoneInput, { target: { value: '+1 (555) 987-6543' } });
    fireEvent.click(saveBtn);

    expect(screen.getByTestId('profile-status')).toHaveTextContent('Profile saved successfully!');
    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Jane Updated',
        phone: '+1 (555) 987-6543',
      })
    );
  });
});
