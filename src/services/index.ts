import axios from 'axios';
import { Campaign } from '@/types';
import MockAdapter from 'axios-mock-adapter';

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
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
});

const mock = new MockAdapter(apiRequest, { delayResponse: 500 });


mock.onGet('/campaigns').reply((config) => {
    const currentPage = Number(new URLSearchParams(config.params).get('page')) || 1;
    const pageSize = 5;

    const paginatedData = campaigns.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    meta = {
        totalPages: Math.ceil(campaigns.length / pageSize),
        currentPage,
        pageSize,
        totalItems: campaigns.length,
    };

    return [200, { campaigns: paginatedData, meta }];
});

mock.onPost('/campaigns').reply((config) => {
    const newCampaign = JSON.parse(config.data);
    const id = campaigns.length + 1;

    campaigns.push({ ...newCampaign, id });

    return [201, { message: 'Campanha criada com sucesso!' }];
});

mock.onPut(/\/campaigns\/\d+/).reply((config) => {
    const campaignId = parseInt(config.url!.split('/').pop()!);
    const updatedCampaign = JSON.parse(config.data);

    campaigns = campaigns.map((campaign) =>
        campaign.id === campaignId ? { ...campaign, ...updatedCampaign } : campaign
    );

    return [200, { message: 'Campanha atualizada com sucesso!' }];
});

mock.onDelete(/\/campaigns\/\d+/).reply((config) => {
    const campaignId = parseInt(config.url!.split('/').pop()!);
    campaigns = campaigns.filter((campaign) => campaign.id !== campaignId);

    return [200, { message: 'Campanha deletada com sucesso!' }];
});
