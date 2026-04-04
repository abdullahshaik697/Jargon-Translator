export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string | null;
  created_at?: string;
}

export interface TranslationResult {
  original: string;
  translation: string;
  red_flag: boolean;
  severity: 'mild' | 'spicy' | 'alarm';
}

export interface TranslationRecord {
  id: number;
  user_id: number;
  mode: string;
  input_text: string;
  output_json: TranslationResult[];
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface TranslateState {
  results: TranslationResult[];
  history: TranslationRecord[];
  loading: boolean;
  error: string | null;
  currentMode: string;
}