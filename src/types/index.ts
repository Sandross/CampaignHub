import { SelectChangeEvent } from '@mui/material';
import { Dayjs } from 'dayjs';
import { ReactNode } from 'react';

export interface Campaign {
    id: number;
    name: string;
    dataInicio: string;
    dataFim: string;
    status: string;
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
  
  export interface Props {
    children?: ReactNode;
  }
  
  export interface State {
    hasError: boolean;
  }


  export interface INewCampaign {
    name: string;
    status: string;
    dataInicio: Dayjs | null;
    dataFim: Dayjs | null;
  }
  
  export interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
  }

  export interface CampaignActionsProps {
    isEditing: boolean;
    onSave: () => void;
    onCancel: () => void;
    onEdit: () => void;
    onDelete: () => void;
    disableSave: boolean;
  }

  export interface CampaignRowProps {
    campaign: Campaign;
    editingCampaignId: number | null;
    editedCampaign: Campaign | null;
    dataInicioError: boolean;
    dataFimError: boolean;
    handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDataInicioChange: (value: string) => void;
    handleDataFimChange: (value: string) => void;
    handleStatusChange: (event: SelectChangeEvent<string>, child: ReactNode) => void
    handleSave: () => void;
    handleCancel: () => void;
    handleEdit: () => void;
    handleOpenDeleteModal: () => void;
    disableSave: boolean;
}

export interface SearchAndAddBarProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddClick: () => void;
  }
