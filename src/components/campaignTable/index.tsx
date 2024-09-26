'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getFilteredCampaigns,
    updateCampaign,
    removeCampaign,
    getCampaigns,
} from '@/redux/asyncThunks/campaign';
import { RootState, AppDispatch } from '@/redux';
import { useDebounce } from '@/hooks';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Pagination,
} from '@mui/material';
import dayjs from 'dayjs';
import styles from './style.module.scss';
import { Campaign } from '@/types';
import { campaignHeaders } from './headers';
import CampaignModal from '../campaignModal';
import ConfirmationModal from '../confirmationModal';
import Loading from '../loading';
import SearchAndAddBar from '../searchAndAddBar';
import CampaignRow from '../campaignRow';

const CampaignTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { campaigns, loading, error, meta } = useSelector(
        (state: RootState) => state.campaignData
    );

    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 1000);
    const [page, setPage] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);

    const [editingCampaignId, setEditingCampaignId] = useState<number | null>(null);
    const [editedCampaign, setEditedCampaign] = useState<Campaign | null>(null);

    const [dataInicioError, setDataInicioError] = useState<boolean>(false);
    const [dataFimError, setDataFimError] = useState<boolean>(false);

    const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getFilteredCampaigns({ page, name: debouncedSearchTerm }));
    }, [dispatch, debouncedSearchTerm, page]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(1);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEdit = (id: number) => {
        const campaignToEdit = campaigns.find((campaign) => campaign.id === id);
        setEditedCampaign(campaignToEdit ? { ...campaignToEdit } : null);
        setEditingCampaignId(id);
        setDataInicioError(false);
        setDataFimError(false);
    };

    const handleSave = (id: number) => {
        if (editedCampaign) {
            const { dataInicio, dataFim } = editedCampaign;

            if (dayjs(dataFim).isBefore(dayjs(dataInicio))) {
                setDataFimError(true);
                setEditedCampaign((prev) => prev ? { ...prev, status: 'expirada' } : prev);
                return;
            } else {
                setDataFimError(false);
            }

            const today = dayjs().startOf('day');
            if (dayjs(dataInicio).isBefore(today)) {
                setEditedCampaign((prev) => prev ? { ...prev, status: 'expirada' } : prev);
            }

            dispatch(updateCampaign({ id, campaignData: editedCampaign }));
            setEditingCampaignId(null);
            setEditedCampaign(null);
        }
    };

    const handleCancel = () => {
        setEditingCampaignId(null);
        setEditedCampaign(null);
        setDataInicioError(false);
        setDataFimError(false);
    };

    const handleDataInicioChange = (newDate: string) => {
        const today = dayjs().startOf('day');
        setEditedCampaign((prev) =>
            prev ? { ...prev, dataInicio: newDate } : prev
        );

        if (dayjs(newDate).isBefore(today)) {
            setEditedCampaign((prev) =>
                prev ? { ...prev, status: 'expirada' } : prev
            );
        } else {
            setEditedCampaign((prev) =>
                prev ? { ...prev, status: 'ativa' } : prev
            );
        }
    };

    const handleOpenDeleteModal = (campaign: Campaign) => {
        setCampaignToDelete(campaign);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setCampaignToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (campaignToDelete) {
            dispatch(removeCampaign(campaignToDelete.id));
            setIsDeleteModalOpen(false);
            setCampaignToDelete(null);
        }
    };

    if (error) return <p>Erro: {error}</p>;

    return (
        <Paper className={styles.tableContainer}>
            <div className={styles.topBar}>
                <SearchAndAddBar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onAddClick={handleOpen}
                />
            </div>
            <TableContainer component={Paper} className={styles.tableWrapper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {campaignHeaders.map((header: string, index: number) => (
                                <TableCell align="center" key={index}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={campaignHeaders.length} align="center">
                                    <Loading />
                                </TableCell>
                            </TableRow>
                        ) : (
                            campaigns.map((campaign: Campaign) => (
                                <CampaignRow
                                    key={campaign.id}
                                    campaign={campaign}
                                    editingCampaignId={editingCampaignId}
                                    editedCampaign={editedCampaign}
                                    dataInicioError={dataInicioError}
                                    dataFimError={dataFimError}
                                    handleNameChange={(e) =>
                                        setEditedCampaign((prev) =>
                                            prev ? { ...prev, name: e.target.value } : prev
                                        )
                                    }
                                    handleDataInicioChange={handleDataInicioChange}
                                    handleDataFimChange={(value) =>
                                        setEditedCampaign((prev) =>
                                            prev ? { ...prev, dataFim: value } : prev
                                        )
                                    }
                                    handleStatusChange={(e) =>
                                        setEditedCampaign((prev) =>
                                            prev ? { ...prev, status: e.target.value as string} : prev
                                        )
                                    }
                                    handleSave={() => handleSave(campaign.id)}
                                    handleCancel={handleCancel}
                                    handleEdit={() => handleEdit(campaign.id)}
                                    handleOpenDeleteModal={() => handleOpenDeleteModal(campaign)}
                                    disableSave={dataFimError}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
                <div className={styles.pagination}>
                    <Pagination
                        count={meta.totalPages}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </div>
            </TableContainer>
            <CampaignModal open={open} handleClose={handleClose}/>

            <ConfirmationModal
                open={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                title="Confirmar Exclusão"
                message={`Deseja realmente excluir a campanha "${campaignToDelete?.name}"?`}
            />
        </Paper>
    );
};

export default CampaignTable;
