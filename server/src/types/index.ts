export interface User {
    id: number;
    email: string;
    name: string;
    avatar?: string;
    google_id?: string;
    password?: string;
    created_at: Date;
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
    created_at: Date;
  }