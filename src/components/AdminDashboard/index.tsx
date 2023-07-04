import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";

// locals
import EditUserButton from "./EditUserButton";
import FullNameTitle from "./FullNameTitle";
import ValueIndicator from "./ValueIndicator";
import MoodIndicator from "./MoodIndicator";

import { IUserDashboardType } from "../../interfaces/IUserDashboard";
import SendMediaModal from "./SendMediaModal";

export default function AdminManagement({
  users,
}: {
  users: IUserDashboardType[];
}) {
  const [currentReceiver, setCurrentReceiver] = useState("");
  const [open, setOpen] = useState(false);

  const handleEdit = (id: string) => {
    setCurrentReceiver(id);
    setOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 175,
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
    {
      field: "breaks_count",
      headerName: "Breaks",
      align: "center",
      headerAlign: "center",
      valueFormatter(params: GridValueFormatterParams<number>) {
        if (!params.value) {
          return 0;
        }

        return params.value;
      },
    },
    {
      field: "clicks_count",
      headerName: "Counter",
      align: "center",
      headerAlign: "center",
      valueFormatter(params: GridValueFormatterParams<number>) {
        if (!params.value) {
          return 0;
        }

        return params.value;
      },
    },
    {
      field: "mood",
      headerName: "Mood",
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <MoodIndicator answer={params.row.latest_answer} />
      ),
    },
    {
      field: "distress",
      headerName: "Distress",
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <ValueIndicator
          oldVal={params.row.prev_distress_count}
          currentVal={params.row.distress_count}
        />
      ),
    },
    {
      field: "",
      headerName: "",
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <EditUserButton id={params.row._id} handleEdit={handleEdit} />
      ),
    },
  ];

  return (
    <Box>
      <SendMediaModal open={open} setOpen={setOpen} currentReceiver={currentReceiver} />

      <Typography variant="body1" color="initial">
        Users
      </Typography>

      <Paper
        elevation={3}
        sx={{
          maxWidth: "677px",
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
          hideFooter
        />
      </Paper>
    </Box>
  );
}
