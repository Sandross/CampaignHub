'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns } from '@/redux/asyncThunks/campaign';
import { RootState, AppDispatch } from '@/redux';
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

const CampaignTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { campaigns, loading, error, meta } = useSelector((state: RootState) => state.campaignData);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCampaigns(page));
  }, [dispatch, page]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <Paper className={styles.tableContainer}>
      <div className={styles.topBar}>
        <input className={styles.searchInput} placeholder="Buscar..." />
        <Button variant="contained" color="primary" className={styles.searchButton}>
          Buscar
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          className={styles.newButton}
        >
          Nova
        </Button>
      </div>
      <TableContainer component={Paper} className={styles.tableWrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Criado em</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign: Campaign) => (
              <TableRow key={campaign.id} className={styles.tableRow}>
                <TableCell>
                  <Avatar src="/path/to/logo.png" alt="Logo" />
                </TableCell>
                <TableCell>{campaign.id}</TableCell>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.dataInicio}</TableCell>
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
      
    </Paper>
  );
};

export default CampaignTable;
