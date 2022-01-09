import * as React from 'react';
import axios from 'axios';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, Paper, Typography } from '@mui/material';
import { ISeller } from '@aba-workspace/api-services';
import { Link } from 'react-router-dom';
import { environment } from '../../environments/environment';

export const Seller = () => {
  const data: ISeller[] = [];
  const [rows, setRows] = React.useState(data);
  React.useEffect(() => {
    axios.get(`${environment.baseUrl}/seller`).then((res) => {
      setRows(res.data as ISeller[]);
    });
  }, []);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250, hide: true },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 270,
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 250,
    },
    {
      field: '',
      headerName: 'Action',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Button
            variant="contained"
            component={Link}
            to={`/slot/${params.id}`}
          >
            Slots
          </Button>
        );
      },
    },
  ];
  return (
    <Paper sx={{ mt: 4, mb: 4, mr: 4, ml: 4 }}>
      <Box component="div" sx={{ p: 2 }}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Sellers
        </Typography>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </Paper>
  );
};
