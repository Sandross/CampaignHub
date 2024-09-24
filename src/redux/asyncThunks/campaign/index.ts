import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCampaigns, createCampaign, editCampaign, deleteCampaign } from '@/services/campaign';
import { Campaign, CampaignResponse } from '@/types';

export const getCampaigns = createAsyncThunk<CampaignResponse, number>(
  'campaign/getCampaigns',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetchCampaigns(page);
      return response.data;
    } catch (error) {
      return rejectWithValue('Erro ao buscar campanhas');
    }
  }
);

export const addCampaign = createAsyncThunk<Campaign, Omit<Campaign, 'id'>>(
  'campaign/addCampaign',
  async (campaignData, { rejectWithValue }) => {
    try {
      const response = await createCampaign(campaignData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Erro ao criar campanha');
    }
  }
);


export const updateCampaign = createAsyncThunk<Campaign, { id: number; campaignData: Campaign }>(
  'campaign/updateCampaign',
  async ({ id, campaignData }, { rejectWithValue }) => {
    try {
      const response = await editCampaign(id, campaignData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Erro ao editar campanha');
    }
  }
);

export const removeCampaign = createAsyncThunk<number, number>(
  'campaign/removeCampaign',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteCampaign(id);
      return id;
    } catch (error) {
      return rejectWithValue('Erro ao deletar campanha');
    }
  }
);

export const getFilteredCampaigns = createAsyncThunk(
    'campaign/getFilteredCampaigns',
    async ({ page, name }: { page: number; name?: string }, { rejectWithValue }) => {
      try {
        const response = await fetchCampaigns(page, name);
        return response.data;
      } catch (error) {
        return rejectWithValue('Erro ao buscar campanhas');
      }
    }
  );
