import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { UserTableProps } from '../types/UserTableProps';

const UserTable: React.FC<UserTableProps> = ({ uniqueUsers, loading, error }) => {
  const columns = [
    { field: 'uniqueId', headerName: '№', width: 100 },
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'name', headerName: 'Full Name', width: 250 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 250 },
  ];

  return (
    <>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <DataGrid
        rows={uniqueUsers.map((user, index) => ({
          ...user,
          uniqueId: index + 1,
          key: user.id,
        }))}
        columns={columns}
        loading={loading}
        autoHeight
        disableSelectionOnClick
        paginationMode="server"
        getRowId={(row) => row.id}
      />
    </>
  );
};

export default UserTable;
