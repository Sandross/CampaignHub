import React from 'react';
import { TextField, TableCell, TableRow, Select, MenuItem, Chip } from '@mui/material';
import dayjs from 'dayjs';
import { CampaignRowProps } from '@/types';
import CampaignActions from '../campaignActions';

const CampaignRow: React.FC<CampaignRowProps> = ({
    campaign,
    editingCampaignId,
    editedCampaign,
    dataInicioError,
    dataFimError,
    handleNameChange,
    handleDataInicioChange,
    handleDataFimChange,
    handleStatusChange,
    handleSave,
    handleCancel,
    handleEdit,
    handleOpenDeleteModal,
    disableSave,
}) => {
    const isBeforeToday = dayjs(editedCampaign?.dataInicio).isBefore(dayjs().startOf('day'));
    
    return (
        <TableRow key={campaign.id}>
            <TableCell align="center">{campaign.id}</TableCell>
            <TableCell align="center">
                {editingCampaignId === campaign.id ? (
                    <TextField
                        value={editedCampaign?.name || ''}
                        size="small"
                        onChange={handleNameChange}
                    />
                ) : (
                    campaign.name
                )}
            </TableCell>
            <TableCell align="center">
                {editingCampaignId === campaign.id ? (
                    <TextField
                        type="date"
                        size="small"
                        value={editedCampaign?.dataInicio || ''}
                        onChange={(e) => handleDataInicioChange(e.target.value)}
                        error={dataInicioError}
                    />
                ) : (
                    campaign.dataInicio
                )}
            </TableCell>
            <TableCell align="center">
                {editingCampaignId === campaign.id ? (
                    <TextField
                        type="date"
                        size="small"
                        value={editedCampaign?.dataFim || ''}
                        onChange={(e) => handleDataFimChange(e.target.value)}
                        error={dataFimError}
                    />
                ) : (
                    campaign.dataFim
                )}
            </TableCell>
            <TableCell align="center">
                {editingCampaignId === campaign.id ? (
                    <Select
                        value={editedCampaign?.status || ''}
                        size="small"
                        onChange={handleStatusChange}
                        disabled={isBeforeToday}
                    >
                        <MenuItem value="ativa" disabled={isBeforeToday}>
                            Ativa
                        </MenuItem>
                        <MenuItem value="inativa" disabled={isBeforeToday}>
                            Inativa
                        </MenuItem>

                        <MenuItem value="expirada" disabled={!isBeforeToday}>
                            Expirada
                        </MenuItem>
                    </Select>
                ) : (
                    <Chip
                        label={
                            campaign.status === 'ativa'
                                ? 'Ativa'
                                : campaign.status === 'expirada'
                                    ? 'Expirada'
                                    : 'Inativa'
                        }
                        color={
                            campaign.status === 'ativa'
                                ? 'success'
                                : campaign.status === 'expirada'
                                    ? 'default'
                                    : 'error'
                        }
                    />
                )}
            </TableCell>
            <CampaignActions
                isEditing={editingCampaignId === campaign.id}
                onSave={handleSave}
                onCancel={handleCancel}
                onEdit={handleEdit}
                onDelete={handleOpenDeleteModal}
                disableSave={disableSave}
            />
        </TableRow>
    );
};

export default CampaignRow;
