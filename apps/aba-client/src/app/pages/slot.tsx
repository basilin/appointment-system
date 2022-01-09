import * as React from 'react';
import axios from 'axios';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridValueFormatterParams,
  GridValueSetterParams,
} from '@mui/x-data-grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import TimePicker from '@mui/lab/TimePicker';
import { ISeller, ISlot } from '@aba-workspace/api-services';
import { useParams } from 'react-router-dom';
import { environment } from '../../environments/environment';

export const Slot = () => {
  const slotDefault: ISlot[] = [];
  const sellerDefault: ISeller = {
    email: '',
    location: '',
    name: '',
  };
  const [rows, setRows] = React.useState(slotDefault);
  const [seller, setSeller] = React.useState(sellerDefault);
  const [isActive, setIsActive] = React.useState(true);
  const [name, setName] = React.useState('');
  const [fromTime, setFromTime] = React.useState<Date | null>(new Date());
  const [toTime, setToTime] = React.useState<Date | null>(new Date());
  const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);
  let { sellerId } = useParams();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250, hide: true },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'timeFrom',
      headerName: 'Start',
      width: 100,
      valueFormatter: (params: GridValueFormatterParams) => {
        const epohTime = Number(params.value)
        let h = new Date(epohTime).getHours();
        let m = new Date(epohTime).getMinutes();
        return `${h} : ${m}`
      },
    },
    {
      field: 'timeTo',
      headerName: 'End',
      width: 100,
      valueFormatter: (params: GridValueFormatterParams) => {
        const epohTime = Number(params.value)
        let h = new Date(epohTime).getHours();
        let m = new Date(epohTime).getMinutes();
        return `${h} : ${m}`
      },
    },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 100,
    },
    {
      field: '',
      headerName: 'Action',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Button variant="contained" onClick={() => deleteRow(params.id)}>
            Delete
          </Button>
        );
      },
    },
  ];
  const deleteRow = async (id: any) => {
    await axios.delete(`${environment.baseUrl}/slot/${id}`);
    await getSlots();
  };
  React.useEffect(() => {
    getSlots();
    axios.get(`${environment.baseUrl}/seller/${sellerId}`).then((res) => {
      setSeller(res.data as ISeller);
    });
  }, []);

  const getSlots = async () => {
    const response = await axios.get(
      `${environment.baseUrl}/slot?sellerId=${sellerId}`
    );
    setRows(response.data as ISlot[]);
    return response.data;
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleFromChange = (newValue: Date | null) => {
    setFromTime(newValue);
  };

  const handleToChange = (newValue: Date | null) => {
    setToTime(newValue);
  };

  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
  };

  const handleSelectionChange = (selection: GridRowId[]) => {
    if (selection.length > 1) {
      const selectionSet = new Set(selectionModel);
      const result = selection.filter((s) => !selectionSet.has(s));
      setSelectionModel(result);
    } else {
      setSelectionModel(selection);
    }
  };

  const handleSubmit = async () => {
    const currentSlot = {
      name,
      isActive,
      timeFrom: fromTime?.getTime(),
      timeTo: toTime?.getTime(),
      sellerId,
    };
    await axios.post(`${environment.baseUrl}/slot`, currentSlot);
    setIsActive(true);
    setName('');
    setFromTime(new Date());
    setToTime(new Date());
    await getSlots();
  };
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
          {seller.name} | Slots
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="Name"
            id="outlined-size-normal"
            onChange={handleNameChange}
            value={name}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="From"
              value={fromTime}
              onChange={handleFromChange}
              renderInput={(params: any) => <TextField {...params} />}
            />
            <TimePicker
              label="To"
              value={toTime}
              onChange={handleToChange}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControlLabel
            control={
              <Checkbox
                checked={isActive}
                onChange={handleIsActiveChange}
                name="isActive"
              />
            }
            label="IsActive"
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          selectionModel={selectionModel}
          onSelectionModelChange={handleSelectionChange}
        />
      </div>
    </Paper>
  );
};
