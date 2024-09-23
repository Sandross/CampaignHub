import { apiRequest } from '@/services';


export const fetchCampaigns = (page: number) => apiRequest.get('/campaigns', { params: { page } });
export const createCampaign = (campaignData: object) => apiRequest.post('/campaigns', campaignData);
export const editCampaign = (id: number, campaignData: object) => apiRequest.put(`/campaigns/${id}`, campaignData);
export const deleteCampaign = (id: number) => apiRequest.delete(`/campaigns/${id}`);

