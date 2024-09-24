'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredCampaigns, addCampaign } from '@/redux/asyncThunks/campaign';
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
  Avatar,
  IconButton,
  Pagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './style.module.scss';
import { Campaign } from '@/types';
import { campaignHeaders } from './headers';
import CampaignModal from '../campaignModal';

const CampaignTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { campaigns, loading, error, meta } = useSelector((state: RootState) => state.campaignData);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

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


  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <Paper className={styles.tableContainer}>
      <div className={styles.topBar}>
        <input
          className={styles.searchInput}
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
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
              {campaignHeaders.map((e: string, index: number) => (
                <TableCell key={index}>{e}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign: Campaign) => (
              <TableRow key={campaign.id} className={styles.tableRow}>
                <TableCell>
                  <Avatar src="https://raichu-uploads.s3.amazonaws.com/logo_mamba-culture-publicidade-e-consultoria_7N90Dn.png" alt="Logo" />
                </TableCell>
                <TableCell>{campaign.id}</TableCell>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.dataInicio}</TableCell>
                <TableCell>{campaign.dataFim}</TableCell>
                <TableCell>
                  <Chip
                    label={campaign.status === 'ativa' ? 'Ativa' : 'Inativa'}
                    color={campaign.status === 'ativa' ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" className={styles.actionButton}>
                    <ArrowForwardIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
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
    </Paper>
  );
};

export default CampaignTable;
