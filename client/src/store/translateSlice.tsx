import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { TranslateState, TranslationRecord } from '../types/index';
import api from '../services/api';

const initialState: TranslateState = {
  results: [],
  history: [],
  loading: false,
  error: null,
  currentMode: 'corporate',
};

// Translate
export const translateText = createAsyncThunk(
  'translate/text',
  async (data: { text: string; mode: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/translate/', data);
      return response.data.translation;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Translation failed');
    }
  }
);

// Get History
export const fetchHistory = createAsyncThunk(
  'translate/history',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/translate/history');
      return response.data.history;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch history');
    }
  }
);

// Delete Translation
export const deleteTranslation = createAsyncThunk(
  'translate/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/translate/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

const translateSlice = createSlice({
  name: 'translate',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.currentMode = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Translate
    builder
      .addCase(translateText.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.results = [];
      })
      .addCase(translateText.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.output_json;
        state.history.unshift(action.payload);
      })
      .addCase(translateText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // History
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete
    builder
      .addCase(deleteTranslation.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTranslation.fulfilled, (state, action) => {
        state.loading = false;
        state.history = state.history.filter(
          (record: TranslationRecord) => record.id !== action.payload
        );
      })
      .addCase(deleteTranslation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setMode, clearResults, clearError } = translateSlice.actions;
export default translateSlice.reducer;