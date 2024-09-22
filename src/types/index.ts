export interface Campaign {
    id: number;
    name: string;
    dataInicio: string;
    dataFim: string;
    status: 'ativa' | 'expirada';
  }
  
  export interface CampaignMeta {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalItems: number;
  }
  
  export interface CampaignResponse {
    campaigns: Campaign[];
    meta: CampaignMeta;
  }
  