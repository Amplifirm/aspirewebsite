import bcrypt from 'bcryptjs';

// Helper function to hash password with SHA-256 (matching Supabase implementation)
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message + 'aspire2025_salt'); // Same salt as Supabase!
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// SheetDB API Configuration
const SHEETDB_USER_API = 'https://sheetdb.io/api/v1/mlu51j0tyyhvx';
const SHEETDB_SESSIONS_API = 'https://sheetdb.io/api/v1/fz2g4gbzaea7z';

// Types
interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  company?: string;
  job_title?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

interface RegisteredSession {
  id: string;
  user_id: string;
  session_id: string;
  session_title?: string;
  track?: string;
  time?: string;
  registered_at: string;
  created_at: string;
  updated_at: string;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  jobTitle?: string;
  phone?: string;
  registeredSessions?: Array<{
    sessionId: string;
    sessionTitle?: string;
    track?: string;
    time?: string;
  }>;
}

// Helper function to generate UUID (simple version)
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Helper function to format date for sheets
const formatDate = (date: Date = new Date()): string => {
  return date.toISOString();
};

// Transform SheetDB user to frontend format
const transformUser = (profile: UserProfile, sessions: RegisteredSession[] = []): UserData => {
  return {
    id: profile.id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: profile.email,
    company: profile.company,
    jobTitle: profile.job_title,
    phone: profile.phone,
    registeredSessions: sessions.map(s => ({
      sessionId: s.session_id,
      sessionTitle: s.session_title,
      track: s.track,
      time: s.time
    }))
  };
};

class SheetDBService {
  // Register new user
  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company?: string;
    jobTitle?: string;
    phone?: string;
  }): Promise<{ success: boolean; user?: UserData; error?: string }> {
    try {
      // Check if email already exists
      const existingUserResponse = await fetch(
        `${SHEETDB_USER_API}/search?email=${encodeURIComponent(userData.email)}`
      );
      
      if (existingUserResponse.ok) {
        const existingUsers = await existingUserResponse.json();
        if (existingUsers && existingUsers.length > 0) {
          return { success: false, error: 'Email already registered' };
        }
      }

      // Hash password with SHA-256 (to match existing Supabase hashes)
      const passwordHash = await sha256(userData.password);
      console.log('Generated SHA-256 hash for new user');

      // Create new user profile
      const userId = generateUUID();
      const now = formatDate();
      
      const newProfile: UserProfile = {
        id: userId,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password_hash: passwordHash,
        company: userData.company || '',
        job_title: userData.jobTitle || '',
        phone: userData.phone || '',
        created_at: now,
        updated_at: now
      };

      // Insert into SheetDB
      const response = await fetch(SHEETDB_USER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [newProfile] })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('SheetDB registration error:', errorData);
        return { success: false, error: 'Failed to register user' };
      }

      const result = await response.json();
      console.log('User registered successfully:', result);

      const user = transformUser(newProfile);
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  }

  // Login user
  async login(email: string, password: string): Promise<{ success: boolean; user?: UserData; error?: string }> {
    try {
      console.log('Attempting login for:', email);
      
      // Search for user by email
      const searchUrl = `${SHEETDB_USER_API}/search?email=${encodeURIComponent(email)}`;
      console.log('Search URL:', searchUrl);
      
      const response = await fetch(searchUrl);
      console.log('Response status:', response.status);

      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        return { success: false, error: 'User not found' };
      }

      const users = await response.json();
      console.log('Users found:', users);
      
      if (!users || users.length === 0) {
        console.error('No users found with email:', email);
        return { success: false, error: 'Invalid email or password' };
      }

      const userProfile: UserProfile = users[0];
      console.log('User profile:', userProfile);
      console.log('Password hash from DB:', userProfile.password_hash);

      // Detect hash type and verify password accordingly
      let passwordMatch = false;
      
      // Check if it's a bcrypt hash (starts with $2a$, $2b$, etc.)
      if (userProfile.password_hash.startsWith('$2')) {
        console.log('Detected bcrypt hash, using bcrypt.compare...');
        passwordMatch = await bcrypt.compare(password, userProfile.password_hash);
      } 
      // Otherwise assume it's SHA-256 (64 hex characters)
      else if (userProfile.password_hash.length === 64 && /^[a-f0-9]+$/.test(userProfile.password_hash)) {
        console.log('Detected SHA-256 hash, using SHA-256 comparison...');
        const passwordHash = await sha256(password);
        console.log('Generated hash:', passwordHash);
        passwordMatch = passwordHash === userProfile.password_hash;
      }
      else {
        console.error('Unknown hash format:', userProfile.password_hash);
        return { success: false, error: 'Invalid password hash format' };
      }
      
      console.log('Password match:', passwordMatch);
      
      if (!passwordMatch) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Get user's registered sessions
      console.log('Fetching user sessions...');
      const sessions = await this.getUserSessions(userProfile.id);
      console.log('Sessions loaded:', sessions.length);
      
      const user = transformUser(userProfile, sessions);
      console.log('Login successful!');
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed: ' + (error as Error).message };
    }
  }

  // Get current user (from localStorage ID)
  async getCurrentUser(): Promise<{ success: boolean; user?: UserData; error?: string }> {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        return { success: false, error: 'No user logged in' };
      }

      const parsedUser = JSON.parse(userData);
      const userId = parsedUser.id;

      // Fetch fresh user data
      const response = await fetch(
        `${SHEETDB_USER_API}/search?id=${encodeURIComponent(userId)}`
      );

      if (!response.ok) {
        return { success: false, error: 'User not found' };
      }

      const users = await response.json();
      if (!users || users.length === 0) {
        return { success: false, error: 'User not found' };
      }

      const userProfile: UserProfile = users[0];
      const sessions = await this.getUserSessions(userId);
      
      const user = transformUser(userProfile, sessions);
      return { success: true, user };
    } catch (error) {
      console.error('Get current user error:', error);
      return { success: false, error: 'Failed to get user data' };
    }
  }

  // Get user's registered sessions
  async getUserSessions(userId: string): Promise<RegisteredSession[]> {
    try {
      const response = await fetch(
        `${SHEETDB_SESSIONS_API}/search?user_id=${encodeURIComponent(userId)}`
      );

      if (!response.ok) {
        return [];
      }

      const sessions = await response.json();
      console.log('Raw sessions from SheetDB:', sessions);
      console.log('Session fields:', sessions[0] ? Object.keys(sessions[0]) : 'No sessions');
      return sessions || [];
    } catch (error) {
      console.error('Get user sessions error:', error);
      return [];
    }
  }

  // Get user registrations (returns in expected format)
  async getUserRegistrations(userId: string): Promise<{
    success: boolean;
    registeredSessions?: Array<{
      sessionId: string;
      sessionTitle?: string;
      track?: string;
      time?: string;
    }>;
    error?: string;
  }> {
    try {
      const sessions = await this.getUserSessions(userId);
      
      const registeredSessions = sessions.map(s => ({
        sessionId: s.session_id,
        sessionTitle: s.session_title,
        track: s.track,
        time: s.time
      }));

      return { success: true, registeredSessions };
    } catch (error) {
      console.error('Get user registrations error:', error);
      return { success: false, error: 'Failed to get registrations' };
    }
  }

  // Register for a session
  async registerSession(sessionData: {
    sessionId: string;
    sessionTitle: string;
    track: string;
    time: string;
  }): Promise<{
    success: boolean;
    registeredSessions?: Array<{
      sessionId: string;
      sessionTitle?: string;
      track?: string;
      time?: string;
    }>;
    error?: string;
  }> {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        return { success: false, error: 'User not logged in' };
      }

      const user = JSON.parse(userData);
      const userId = user.id;

      // Check if already registered
      const existingSessions = await this.getUserSessions(userId);
      const alreadyRegistered = existingSessions.some(
        s => s.session_id === sessionData.sessionId
      );

      if (alreadyRegistered) {
        return { success: false, error: 'Already registered for this session' };
      }

      // Create new registration
      const registrationId = generateUUID();
      const now = formatDate();

      const newRegistration: RegisteredSession = {
        id: registrationId,
        user_id: userId,
        session_id: sessionData.sessionId,
        session_title: sessionData.sessionTitle,
        track: sessionData.track,
        time: sessionData.time,
        registered_at: now,
        created_at: now,
        updated_at: now
      };

      // Insert into SheetDB
      const response = await fetch(SHEETDB_SESSIONS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [newRegistration] })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('SheetDB session registration error:', errorData);
        return { success: false, error: 'Failed to register for session' };
      }

      // Get updated sessions
      const updatedSessions = await this.getUserSessions(userId);
      const registeredSessions = updatedSessions.map(s => ({
        sessionId: s.session_id,
        sessionTitle: s.session_title,
        track: s.track,
        time: s.time
      }));

      return { success: true, registeredSessions };
    } catch (error) {
      console.error('Register session error:', error);
      return { success: false, error: 'Session registration failed' };
    }
  }

  // Unregister from a session
  async unregisterSession(sessionId: string): Promise<{
    success: boolean;
    registeredSessions?: Array<{
      sessionId: string;
      sessionTitle?: string;
      track?: string;
      time?: string;
    }>;
    error?: string;
  }> {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        return { success: false, error: 'User not logged in' };
      }

      const user = JSON.parse(userData);
      const userId = user.id;

      // Find the registration to delete
      const sessions = await this.getUserSessions(userId);
      const sessionToDelete = sessions.find(s => s.session_id === sessionId);

      if (!sessionToDelete) {
        return { success: false, error: 'Session not found' };
      }

      // Delete from SheetDB using the row ID
      const response = await fetch(`${SHEETDB_SESSIONS_API}/id/${sessionToDelete.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('SheetDB session unregistration error:', errorData);
        return { success: false, error: 'Failed to unregister from session' };
      }

      // Get updated sessions
      const updatedSessions = await this.getUserSessions(userId);
      const registeredSessions = updatedSessions.map(s => ({
        sessionId: s.session_id,
        sessionTitle: s.session_title,
        track: s.track,
        time: s.time
      }));

      return { success: true, registeredSessions };
    } catch (error) {
      console.error('Unregister session error:', error);
      return { success: false, error: 'Session unregistration failed' };
    }
  }
}

// Export singleton instance
export const authService = new SheetDBService();