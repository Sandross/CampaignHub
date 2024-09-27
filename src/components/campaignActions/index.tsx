import React from 'react';
import { IconButton, TableCell } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { CampaignActionsProps } from '@/types/index';

const CampaignActions: React.FC<CampaignActionsProps> = ({
  isEditing,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  disableSave,
}) => {
  return (
    <TableCell align="center">
      {isEditing ? (
        <>
          <IconButton color="primary" onClick={onSave} disabled={disableSave} data-testid="save-button">
            <CheckIcon />
          </IconButton>
          <IconButton color="secondary" onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton color="primary" onClick={onEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </TableCell>
  );
};

export default CampaignActions;
