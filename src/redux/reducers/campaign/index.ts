import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getCampaigns,
    addCampaign,
    updateCampaign,
    removeCampaign,
    getFilteredCampaigns,
} from '@/redux/asyncThunks/campaign';
import { Campaign } from '@/types';

export interface CampaignState {
    campaigns: Campaign[];
    loading: boolean;
    error: string | null;
    meta: {
        totalPages: number;
        currentPage: number;
        pageSize: number;
        totalItems: number;
    };
}

const initialState: CampaignState = {
    campaigns: [],
    loading: false,
    error: null,
    meta: {
        totalPages: 1,
        currentPage: 1,
        pageSize: 5,
        totalItems: 0,
    },
};

export const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        setCampaigns: (state, action: PayloadAction<Campaign[]>) => {
            state.campaigns = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCampaigns.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCampaigns.fulfilled, (state, action: PayloadAction<{ campaigns: Campaign[], meta: CampaignState['meta'] }>) => {
                state.loading = false;
                state.campaigns = action.payload.campaigns;
                state.meta = action.payload.meta;
            })
            .addCase(getCampaigns.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getFilteredCampaigns.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFilteredCampaigns.fulfilled, (state, action: PayloadAction<{ campaigns: Campaign[], meta: CampaignState['meta'] }>) => {
                state.loading = false;
                state.campaigns = action.payload.campaigns;
                state.meta = action.payload.meta;
            })
            .addCase(getFilteredCampaigns.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addCampaign.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCampaign.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.campaigns = action.payload.campaigns;
                state.meta = action.payload.meta;
            })
            .addCase(addCampaign.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCampaign.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCampaign.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.campaigns = action.payload.campaigns;
                state.meta = action.payload.meta;
            })
            .addCase(updateCampaign.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeCampaign.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCampaign.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.campaigns = action.payload.campaigns;
                state.meta = action.payload.meta;
            })
            .addCase(removeCampaign.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCampaigns } = campaignSlice.actions;
export const campaignReducer = campaignSlice.reducer;
