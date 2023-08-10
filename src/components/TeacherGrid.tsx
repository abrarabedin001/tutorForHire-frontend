import * as React from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbar,
  type GridRowsProp,
  type GridColDef,
  type GridFilterModel,
  type GridColumnVisibilityModel,
  type GridValueGetterParams,
} from '@mui/x-data-grid';
import { randomTraderName, randomEmail } from '@mui/x-data-grid-generator';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'bio', headerName: 'Subject', type: 'number' },
  {
    field: 'seecoruses',
    headerName: 'Courses',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => `/tutors/${params.row.id}`,
    renderCell: (params) => (
      <a href={`${params.value}`}>
        <Button>See all Courses</Button>
      </a>
    ),
    // <a href={`/tutors/${params.row.id}`}> See all courses</a>
  },
];

export default function QuickFilteringExcludeHiddenColumns({
  tutors,
}: {
  tutors: { id: string; name: string; email: string; bio: string }[];
}) {
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({});
  console.log('tutors', tutors);
  return (
    <Box sx={{ width: 1 }}>
      <FormControlLabel
        checked={columnVisibilityModel.id !== false}
        onChange={(event) =>
          setColumnVisibilityModel(() => ({
            id: (event.target as any).checked,
          }))
        }
        control={<Switch color="primary" size="small" />}
        label="Show ID column"
      />
      <FormControlLabel
        checked={filterModel.quickFilterExcludeHiddenColumns}
        onChange={(event) =>
          setFilterModel((model) => ({
            ...model,
            quickFilterExcludeHiddenColumns: (event.target as any).checked,
          }))
        }
        control={<Switch color="primary" size="small" />}
        label="Exclude hidden columns"
      />
      <Box sx={{ height: 400 }}>
        <DataGrid
          columns={columns}
          rows={tutors}
          disableColumnFilter
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          filterModel={filterModel}
          onFilterModelChange={(newModel) => setFilterModel(newModel)}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
        />
      </Box>
    </Box>
  );
}
