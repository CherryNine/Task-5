import React from 'react';
import { Button, Box } from '@mui/material';
import Papa from 'papaparse';
import { ExportToCSVButtonProps } from '../types/CSVButtonProps';

const ExportToCSVButton: React.FC<ExportToCSVButtonProps> = ({ users }) => {
  const exportToCSV = () => {
    const csv = Papa.unparse(users);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'transparent', zIndex: 1, padding: 2 }}>
      <Button variant="contained" color="primary" onClick={exportToCSV}>
        Export to CSV
      </Button>
    </Box>
  );
};

export default ExportToCSVButton;
