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
  { field: 'id', headerName: 'Id', width: 150 },

  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  {
    field: 'homework',
    headerName: 'homework',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => `${params.row.homework}`,
    renderCell: (params) => (
      <a href={`http://localhost:5000/files/${params.value}`}>
        <Button>DownLoad</Button>
      </a>
    ),
  },
];

export default function QuickFilteringExcludeHiddenColumns({
  answers,
}: {
  answers: { id: string; name: string; email: string; bio: string }[];
}) {
  const [list, setList] = React.useState<GridRowsProp>([]);
  React.useEffect(() => {
    const mappedAnswers = answers.map((answer) => ({
      id: answer.id,
      name: answer.user.name,
      email: answer.user.email,
      homework: answer.file,
    }));
    console.log('mappedAnswers', mappedAnswers);
    setList(mappedAnswers);
  }, []);
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: [],
  });

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({});
  console.log('answers', answers);
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
          rows={list}
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
