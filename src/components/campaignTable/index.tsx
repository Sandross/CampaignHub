'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFilteredCampaigns,
  updateCampaign,
  removeCampaign,
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
  Button,
  Chip,
  IconButton,
  Pagination,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import styles from './style.module.scss';
import { Campaign } from '@/types';
import { campaignHeaders } from './headers';
import CampaignModal from '../campaignModal';
import ConfirmationModal from '../confirmationModal'; 
import Loading from '../loading';

const CampaignTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { campaigns, loading, error, meta } = useSelector(
    (state: RootState) => state.campaignData
  );

  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  const [editingCampaignId, setEditingCampaignId] = useState<number | null>(
    null
  );
  const [editedCampaign, setEditedCampaign] = useState<Campaign | null>(null);

  const [dataInicioError, setDataInicioError] = useState<boolean>(false);
  const [dataFimError, setDataFimError] = useState<boolean>(false);

  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getFilteredCampaigns({ page, name: debouncedSearchTerm }));
  }, [dispatch, debouncedSearchTerm, page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        return;
      } else {
        setDataFimError(false);
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
        <TextField
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          className={styles.newButton}
        >
          Nova
        </Button>
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
                <TableRow key={campaign.id} className={styles.tableRow}>
                  <TableCell align="center">{campaign.id}</TableCell>
                  <TableCell align="center">
                    {editingCampaignId === campaign.id ? (
                      <TextField
                        value={editedCampaign?.name || ''}
                        size="small"
                        onChange={(e) =>
                          setEditedCampaign((prev) =>
                            prev ? { ...prev, name: e.target.value } : prev
                          )
                        }
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
                        onChange={(e) => {
                          setEditedCampaign((prev) =>
                            prev ? { ...prev, dataInicio: e.target.value } : prev
                          );
                          setDataInicioError(false);
                        }}
                        error={dataInicioError}
                        helperText={
                          dataInicioError ? 'Data inicial inválida' : ''
                        }
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
                        onChange={(e) => {
                          setEditedCampaign((prev) =>
                            prev ? { ...prev, dataFim: e.target.value } : prev
                          );
                          setDataFimError(false);
                        }}
                        error={dataFimError}
                        helperText={
                          dataFimError
                            ? 'Data final deve ser maior que a data inicial'
                            : ''
                        }
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
                        onChange={(e) =>
                          setEditedCampaign((prev) =>
                            prev ? { ...prev, status: e.target.value } : prev
                          )
                        }
                      >
                        <MenuItem value="ativa">Ativa</MenuItem>
                        <MenuItem value="inativa">Inativa</MenuItem>
                      </Select>
                    ) : (
                      <Chip
                        label={
                          campaign.status === 'ativa' ? 'Ativa' : 'Inativa'
                        }
                        color={
                          campaign.status === 'ativa' ? 'success' : 'error'
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingCampaignId === campaign.id ? (
                      <>
                        <IconButton
                          color="primary"
                          onClick={() => handleSave(campaign.id)}
                          disabled={dataFimError}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={handleCancel}>
                          <CloseIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(campaign.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleOpenDeleteModal(campaign)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
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
      <CampaignModal open={open} handleClose={handleClose} />

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
