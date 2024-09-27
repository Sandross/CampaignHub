import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { AppDispatch } from '@/redux';
import { useDispatch } from 'react-redux';
import { addCampaign } from '@/redux/asyncThunks/campaign';
import campaignSchema from './validation';
import AddIcon from '@mui/icons-material/Add';
import { InferType } from 'yup';
import { setCampaigns } from '@/redux/reducers/campaign';

type CampaignFormData = InferType<typeof campaignSchema>;

const CampaignModal: React.FC<{ open: boolean; handleClose: () => void; setPage: Dispatch<SetStateAction<number>> }> = ({ open, handleClose, setPage }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: yupResolver<CampaignFormData>(campaignSchema),
    defaultValues: {
      name: '',
      dataInicio: dayjs().toDate(),
      dataFim: dayjs().add(7, 'day').toDate(),
      status: 'ativa',
    },
  });

  const dataInicio = useWatch({
    control,
    name: 'dataInicio',
  });
  const dataFim = useWatch({
    control,
    name: 'dataFim',
  });

  useEffect(() => {
    const today = dayjs().startOf('day');

    if (dayjs(dataInicio).isBefore(today)) {
      setValue('status', 'expirada');
    } else if (dayjs(dataFim).isBefore(today)) {
      setValue('status', 'expirada');
    }
  }, [dataInicio, dataFim, setValue]);

  const onSubmit = (data: CampaignFormData) => {
    const campaignData = {
      ...data,
      dataInicio: dayjs(data.dataInicio).format('YYYY-MM-DD'),
      dataFim: dayjs(data.dataFim).format('YYYY-MM-DD'),
    };
  
    const existingCampaigns = window.localStorage.getItem('campaigns');
    const campaignsArray = existingCampaigns ? JSON.parse(existingCampaigns) : [];
  
    campaignsArray.push(campaignData);
  
    window.localStorage.setItem('campaigns', JSON.stringify(campaignsArray));
  
    dispatch(setCampaigns(campaignsArray));
  
    dispatch(addCampaign(campaignData)).then((response: any) => {
      handleClose();
      setPage(response.payload.meta.currentPage);
      setValue('name', '')
    });
  };
  

  const today = dayjs().startOf('day');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova Campanha</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Nome"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  margin="dense"
                  label="Status"
                  fullWidth
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="ativa" disabled={dayjs(dataInicio).isBefore(today)}>
                    Ativa
                  </MenuItem>
                  <MenuItem value="pausada" disabled={dayjs(dataInicio).isBefore(today)}>
                    Pausada
                  </MenuItem>
                  <MenuItem value="expirada" disabled={!dayjs(dataInicio).isBefore(today)}>
                    Expirada
                  </MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="dataInicio"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Data de Início"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => field.onChange(newValue ? newValue.toDate() : null)}
                  slotProps={{
                    textField: {
                      margin: 'dense',
                      fullWidth: true,
                      error: !!errors.dataInicio,
                      helperText: errors.dataInicio?.message,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="dataFim"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Data de Fim"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => field.onChange(newValue ? newValue.toDate() : null)}
                  slotProps={{
                    textField: {
                      margin: 'dense',
                      fullWidth: true,
                      error: !!errors.dataFim,
                      helperText: errors.dataFim?.message,
                    },
                  }}
                />
              )}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button type="submit" color="primary" variant="contained" startIcon={<AddIcon />}>
                Adicionar Campanha
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default CampaignModal;
