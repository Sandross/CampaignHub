import { apiRequest } from '@/services';


export const fetchCampaigns = (page: number) => apiRequest.get(`?page=${page}`);
export const createCampaign = (campaignData: object) => apiRequest.post('/', campaignData);
export const editCampaign = (id: number, campaignData: object) => apiRequest.put(`/${id}`, campaignData);
export const deleteCampaign = (id: number) => apiRequest.delete(`/${id}`);
