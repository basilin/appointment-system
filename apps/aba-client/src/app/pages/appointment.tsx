import * as React from 'react';
import axios from 'axios';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import { Box, Button, Paper, Typography } from '@mui/material';
import { ISeller } from '@aba-workspace/api-services';
import { environment } from '../../environments/environment';

export const Appointment = () => {
  const data: ISeller[] = [];
  const [rows, setRows] = React.useState(data);
  React.useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    const res = await axios.get(`${environment.baseUrl}/appointment`);
    setRows(res.data as ISeller[]);
  };
  const approve = async (id: any) => {
    const result = await axios.put(`${environment.baseUrl}/appointment/${id}`, {
      status: 2,
    });
    getAppointments();
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250, hide: true },
    {
      field: 'sellerName',
      headerName: 'Seller',
      width: 150,
    },
    {
      field: 'statusName',
      headerName: 'Status',
      width: 100,
    },
    {
      field: 'userName',
      headerName: 'User',
      width: 150,
    },
    {
      field: 'slotName',
      headerName: 'Slot',
      width: 150,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams) => {
        return new Date(String(params.value)).toDateString();
      },
    },
    {
      field: '',
      headerName: 'Action',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        if (params.row.status == 1) {
          return (
            <Button variant="contained" onClick={() => approve(params.id)}>
              Approve
            </Button>
          );
        }
        return <></>;
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
          Appointments
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
