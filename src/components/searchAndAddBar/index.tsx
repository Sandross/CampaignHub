import React from 'react';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

interface SearchAndAddBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddClick: () => void;
}

const SearchAndAddBar: React.FC<SearchAndAddBarProps> = ({
  searchTerm,
  onSearchChange,
  onAddClick,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', width: '100%' }}>
      <TextField
        placeholder="Buscar..."
        value={searchTerm}
        onChange={onSearchChange}
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
        onClick={onAddClick}
      >
        Nova
      </Button>
    </div>
  );
};

export default SearchAndAddBar;
