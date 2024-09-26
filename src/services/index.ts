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
        dataInicio: '2024-10-01',
        dataFim: '2024-11-01',
        status: 'ativa',
    },
    {
        id: 3,
        name: 'Campanha 3',
        dataInicio: '2024-10-01',
        dataFim: '2024-11-01',
        status: 'ativa',
    },
    {
        id: 4,
        name: 'Campanha 4',
        dataInicio: '2024-10-01',
        dataFim: '2024-11-01',
        status: 'ativa',
    },
    {
        id: 5,
        name: 'Campanha 5',
        dataInicio: '2024-10-01',
        dataFim: '2024-11-01',
        status: 'ativa',
    },
    {
        id: 6,
        name: 'Campanha 6',
        dataInicio: '2024-10-01',
        dataFim: '2024-11-01',
        status: 'ativa',
    },
    {
        id: 7,
        name: 'Campanha 7',
        dataInicio: '2024-10-01',
        dataFim: '2024-11-01',
        status: 'ativa',
    },
];

let meta = {
    totalPages: 1,
    currentPage: 1,
    pageSize: 5,
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
    const params = new URLSearchParams(config.params);
    const currentPage = Number(params.get('page')) || 1;
    const pageSize = 5;
    const name = params.get('name')?.toLowerCase();

    let filteredCampaigns = campaigns;

    if (name) {
        filteredCampaigns = campaigns.filter((campaign) =>
            campaign.name.toLowerCase().includes(name)
        );
    }

    const totalItems = filteredCampaigns.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const paginatedData = filteredCampaigns.slice(startIndex, endIndex);

    meta = {
        totalPages,
        currentPage,
        pageSize,
        totalItems,
    };

    return [200, { campaigns: paginatedData, meta }];
});


mock.onPost('/campaigns').reply((config) => {
    const newCampaign = JSON.parse(config.data);
    const id = campaigns.length > 0 ? campaigns[campaigns.length - 1].id + 1 : 1;
    const campaignToAdd = { ...newCampaign, id };
    campaigns.push(campaignToAdd);

    const pageSize = 5;
    const totalItems = campaigns.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    console.log(totalPages);
    meta = {
        totalPages,
        currentPage: totalPages,
        pageSize,
        totalItems,
    };

    const startIndex = (meta.currentPage - 1) * pageSize;
    const endIndex = meta.currentPage * pageSize;
    const paginatedData = campaigns.slice(startIndex, endIndex);
    console.log(paginatedData, meta);
    return [201, { campaigns: paginatedData, meta }];
});

mock.onPut(/\/campaigns\/\d+/).reply((config) => {
    const campaignId = parseInt(config.url!.split('/').pop()!);
    const updatedCampaign = JSON.parse(config.data);

    campaigns = campaigns?.map((campaign) =>
        campaign.id === campaignId ? { ...campaign, ...updatedCampaign } : campaign
    );

    const pageSize = 5;
    const startIndex = (meta.currentPage - 1) * pageSize;
    const endIndex = meta.currentPage * pageSize;
    const paginatedData = campaigns.slice(startIndex, endIndex);

    return [200, { campaigns: paginatedData, meta }];
});

mock.onDelete(/\/campaigns\/\d+/).reply((config) => {
    const campaignId = parseInt(config.url!.split('/').pop()!);
    campaigns = campaigns.filter((campaign) => campaign.id !== campaignId);
    const pageSize = 5;
    const totalItems = campaigns.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (meta.currentPage > totalPages) {
        meta.currentPage = totalPages;
    }

    meta = {
        totalPages,
        currentPage: meta.currentPage,
        pageSize,
        totalItems,
    };

    const startIndex = (meta.currentPage - 1) * pageSize;
    const endIndex = meta.currentPage * pageSize;
    const paginatedData = campaigns.slice(startIndex, endIndex);
    console.log(paginatedData, 'paginatedData')
    return [200, { campaigns: paginatedData, meta }];
});
