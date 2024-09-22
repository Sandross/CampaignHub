import axios from 'axios';
import { Campaign } from '@/types';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

let campaigns: Campaign[] = [
  {
    id: 1,
    name: 'Campanha 1',
    dataInicio: '2024-10-01',
    dataFim: '2024-11-01',
    status: 'ativa',
  },
  {
    id: 2,
    name: 'Campanha 2',
    dataInicio: '2024-07-01',
    dataFim: '2024-08-01',
    status: 'expirada',
  },
  {
    id: 3,
    name: 'Campanha 3',
    dataInicio: '2024-11-01',
    dataFim: '2024-12-01',
    status: 'ativa',
  },
];

let meta = {
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  totalItems: campaigns.length,
};

export const apiRequest = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiRequest.interceptors.response.use((response) => {
  const { url, method } = response.config;

  if (url?.includes('/campaigns') && method === 'get') {
    const currentPage = Number(new URLSearchParams(response.config.params).get('page')) || 1;
    const pageSize = 5;

    const paginatedData = campaigns.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    meta = {
      totalPages: Math.ceil(campaigns.length / pageSize),
      currentPage,
      pageSize,
      totalItems: campaigns.length,
    };

    return {
      data: { campaigns: paginatedData, meta },
      status: 200,
      statusText: 'OK',
      headers: response.headers,
      config: response.config,
    };
  }

  if (url?.includes('/campaigns/') && method === 'put') {
    const campaignId = parseInt(url.split('/').pop()!);
    const updatedCampaign = response.config.data ? JSON.parse(response.config.data) : null;

    campaigns = campaigns.map((campaign) =>
      campaign.id === campaignId ? { ...campaign, ...updatedCampaign } : campaign
    );

    return {
      data: { message: 'Campanha atualizada com sucesso!' },
      status: 200,
      statusText: 'OK',
      headers: response.headers,
      config: response.config,
    };
  }

  if (url?.includes('/campaigns/') && method === 'delete') {
    const campaignId = parseInt(url.split('/').pop()!);
    campaigns = campaigns.filter((campaign) => campaign.id !== campaignId);

    return {
      data: { message: 'Campanha deletada com sucesso!' },
      status: 200,
      statusText: 'OK',
      headers: response.headers,
      config: response.config,
    };
  }

  return response;
});
