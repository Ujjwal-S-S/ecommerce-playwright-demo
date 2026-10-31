export interface UserProfile {
  name: string;
  email: string;
  themePreference: 'light' | 'dark';
}

export class ProfileComponent {
  private profile: UserProfile = {
    name: 'Alice Doe',
    email: 'alice@example.com',
    themePreference: 'dark',
  };

  public getProfile(): UserProfile {
    return { ...this.profile };
  }

  public updateProfile(updates: Partial<UserProfile>): UserProfile {
    this.profile = { ...this.profile, ...updates };
    return this.getProfile();
  }
}
