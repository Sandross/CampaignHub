'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns } from '@/redux/asyncThunks/campaign';
import { RootState, AppDispatch } from '@/redux';
import 
{
Paper,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
} from '@mui/material';
import styles from './style.module.scss';
import { Campaign } from '@/types';

const CampaignTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { campaigns, loading, error } = useSelector((state: RootState) => state.campaignData);

  useEffect(() => {
    dispatch(getCampaigns(1));
  }, [dispatch]);


  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Data Início</TableCell>
              <TableCell>Data Fim</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign: Campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.id}</TableCell>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.dataInicio}</TableCell>
                <TableCell>{campaign.dataFim}</TableCell>
                <TableCell>{campaign.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CampaignTable;
