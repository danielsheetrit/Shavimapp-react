import { useEffect, useState, useMemo } from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridRowId,
} from "@mui/x-data-grid";

// locals
import axiosInstance from "../../utils/axios";
import EditUserButton from "./EditUserButton";
import FullNameTitle from "./FullNameTitle";

export default function AdminManagement() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState<GridRowId[] | GridRowId>([]);

  const handleEdit = (id: string) => {
    console.log(id);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "fullName",
        headerName: "Full name",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 200,
        renderCell: (params: GridCellParams) => {
          const {
            onBreak,
            connected,
            last_login,
            first_name,
            last_name,
            avatar,
          } = params.row;

          return (
            <FullNameTitle
              onBreak={onBreak}
              connected={connected}
              lastLogin={last_login}
              firstName={first_name}
              lastName={last_name}
              avatar={avatar}
            />
          );
        },
      },
      // {
      //   field: "user_type",
      //   headerName: "User Type",
      //   // width: 150,
      //   editable: true,
      //   flex: 1,
      //   renderCell: (params: GridCellParams) => {
      //     return
      //   }
      // },
      {
        field: "",
        headerName: "",
        // width: 80,
        flex: 1,
        sortable: false,
        renderCell: (params: GridCellParams) => (
          <EditUserButton id={params.row._id} handleEdit={handleEdit} />
        ),
      },
    ],
    []
  );

  const getUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/users");
      setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
      <Typography variant="body1" color="initial">
        Users Management
      </Typography>

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          mt: 4.5,
          borderRadius: 2,
        }}
      >
        <DataGrid
          sx={{ borderRadius: 2 }}
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          checkboxSelection
          hideFooter
          disableRowSelectionOnClick
          onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
        />
      </Paper>
    </Box>
  );
}
