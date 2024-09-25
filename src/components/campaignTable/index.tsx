'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredCampaigns } from '@/redux/asyncThunks/campaign';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './style.module.scss';
import { Campaign } from '@/types';
import { campaignHeaders } from './headers';
import CampaignModal from '../campaignModal';
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
                  <TableCell align="center">{campaign.name}</TableCell>
                  <TableCell align="center">{campaign.dataInicio}</TableCell>
                  <TableCell align="center">{campaign.dataFim}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={campaign.status === 'ativa' ? 'Ativa' : 'Inativa'}
                      color={campaign.status === 'ativa' ? 'success' : 'error'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" className={styles.actionButton}>
                      <ArrowForwardIcon />
                    </IconButton>
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
    </Paper>
  );
};

export default CampaignTable;
