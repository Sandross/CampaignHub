import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CampaignState {
  campaign: string[];
}

const initialState: CampaignState = {
  campaign: [],
};

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    addCampaign: (state, action: PayloadAction<string>) => {
      state.campaign.push(action.payload);
    },
  },
});

export const { addCampaign } = campaignSlice.actions;
export const campaignReducer = campaignSlice.reducer;
