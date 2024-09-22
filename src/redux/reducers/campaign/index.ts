import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCampaigns, addCampaign, updateCampaign, removeCampaign } from '@/redux/asyncThunks/campaign';

export interface CampaignState {
  campaigns: any[];
  loading: boolean;
  error: string | null;
  meta: {
    totalPages: number;
    currentPage: number;
  };
}

const initialState: CampaignState = {
  campaigns: [],
  loading: false,
  error: null,
  meta: {
    totalPages: 0,
    currentPage: 1,
  },
};

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCampaigns.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.campaigns = action.payload.campaigns;
        state.meta = action.payload.meta;
      })
      .addCase(getCampaigns.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCampaign.fulfilled, (state, action: PayloadAction<any>) => {
        state.campaigns.push(action.payload);
      });

    builder
      .addCase(updateCampaign.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.campaigns.findIndex(campaign => campaign.id === action.payload.id);
        if (index !== -1) {
          state.campaigns[index] = { ...state.campaigns[index], ...action.payload };
        }
      });

    builder
      .addCase(removeCampaign.fulfilled, (state, action: PayloadAction<number>) => {
        state.campaigns = state.campaigns.filter(campaign => campaign.id !== action.payload);
      });
  },
});

export const campaignReducer = campaignSlice.reducer;
