import { apiRequest } from '.';
import MockAdapter from 'axios-mock-adapter';
import { fetchCampaigns, createCampaign, editCampaign, deleteCampaign } from './campaign';
import { Campaign, CampaignResponse } from '@/types';

describe('Campaign Services', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(apiRequest);
  });

  afterEach(() => {
    mock.reset();
    window.localStorage.clear();
  });

  afterAll(() => {
    mock.restore();
  });

  describe('fetchCampaigns', () => {
    it('deve buscar campanhas com sucesso', async () => {
      const mockData: CampaignResponse = {
        campaigns: [
          {
            id: 1,
            name: 'Campanha 1',
            dataInicio: '2024-10-01',
            dataFim: '2024-11-01',
            status: 'ativa',
          },
        ],
        meta: {
          totalPages: 1,
          currentPage: 1,
          pageSize: 5,
          totalItems: 1,
        },
      };

      mock.onGet('/campaigns').reply(200, mockData);

      const response = await fetchCampaigns(1);

      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockData);
    });

    it('deve lidar com erro ao buscar campanhas', async () => {
      mock.onGet('/campaigns').reply(500);

      await expect(fetchCampaigns(1)).rejects.toThrow('Request failed with status code 500');
    });

    it('deve buscar campanhas com filtragem por nome', async () => {
      const mockData: CampaignResponse = {
        campaigns: [
          {
            id: 2,
            name: 'Campanha 2',
            dataInicio: '2024-10-01',
            dataFim: '2024-11-01',
            status: 'ativa',
          },
        ],
        meta: {
          totalPages: 1,
          currentPage: 1,
          pageSize: 5,
          totalItems: 1,
        },
      };

      mock.onGet('/campaigns').reply(200, mockData);

      const response = await fetchCampaigns(1, 'Campanha 2');

      expect(response.status).toBe(200);
      expect(response.data).toEqual(mockData);
    });
  });

  describe('createCampaign', () => {

    it('deve lidar com erro ao criar uma campanha', async () => {
      const newCampaignData = {
        name: 'Nova Campanha',
        dataInicio: '2024-12-01',
        dataFim: '2024-12-31',
        status: 'ativa',
      };

      mock.onPost('/campaigns').reply(500);

      await expect(createCampaign(newCampaignData)).rejects.toThrow('Request failed with status code 500');
    });
  });

  describe('editCampaign', () => {

    it('deve lidar com erro ao editar uma campanha', async () => {
      const campaignId = 1;
      const updatedCampaignData: Campaign = {
        id: campaignId,
        name: 'Campanha Atualizada',
        dataInicio: '2024-10-05',
        dataFim: '2024-11-05',
        status: 'inativa',
      };

      mock.onPut(`/campaigns/${campaignId}`).reply(500);

      await expect(editCampaign(campaignId, updatedCampaignData)).rejects.toThrow('Request failed with status code 500');
    });
  });

  describe('deleteCampaign', () => {
    it('deve deletar uma campanha com sucesso', async () => {
      const campaignId = 1;

      mock.onDelete(`/campaigns/${campaignId}`).reply(200, campaignId);

      const response = await deleteCampaign(campaignId);

      expect(response.status).toBe(200);
      expect(response.data).toBe(campaignId);

      const storedCampaigns = JSON.parse(window.localStorage.getItem('campaigns') || '[]');
      expect(storedCampaigns.find((c: Campaign) => c.id === campaignId)).toBeUndefined();
    });

    it('deve lidar com erro ao deletar uma campanha', async () => {
      const campaignId = 1;

      mock.onDelete(`/campaigns/${campaignId}`).reply(500);

      await expect(deleteCampaign(campaignId)).rejects.toThrow('Request failed with status code 500');
    });
  });
});
