import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCampaigns, addCampaign, updateCampaign, removeCampaign, getFilteredCampaigns } from '@/redux/asyncThunks/campaign';
import { Campaign } from '@/types';

export interface CampaignState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  meta: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

const initialState: CampaignState = {
  campaigns: [],
  loading: false,
  error: null,
  meta: {
    totalPages: 0,
    currentPage: 1,
    pageSize: 10,
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
        const newCampaigns = action.payload.campaigns.filter(
          (apiCampaign: Campaign) => !state.campaigns.some((stateCampaign) => stateCampaign.id === apiCampaign.id)
        );
        state.campaigns = [...state.campaigns, ...newCampaigns];
        state.meta = action.payload.meta;
      })
      .addCase(getCampaigns.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getFilteredCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFilteredCampaigns.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.campaigns = action.payload.campaigns;
        state.meta = action.payload.meta;
      })
      .addCase(getFilteredCampaigns.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCampaign.fulfilled, (state, action: PayloadAction<any>) => {
        const pageSize = state.meta.pageSize;
        const totalItems = state.campaigns.length + 1;

        const totalPages = Math.ceil(totalItems / pageSize);
        state.meta.totalPages = totalPages;
        state.meta.currentPage = totalPages;

        const startIndex = (totalPages - 1) * pageSize;
        const endIndex = totalPages * pageSize;
        
        state.campaigns = [
          ...state.campaigns.slice(0, startIndex),
          action.payload,
          ...state.campaigns.slice(startIndex, endIndex - 1)
        ];
      });

      builder
      .addCase(updateCampaign.fulfilled, (state, action: PayloadAction<Campaign>) => {
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
