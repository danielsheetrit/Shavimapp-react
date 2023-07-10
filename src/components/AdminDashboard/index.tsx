import { Dispatch, SetStateAction, useState } from "react";
import { Box, Paper, Typography, Stack, Select, MenuItem } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Dayjs } from "dayjs";

// date picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// locals
import EditUserButton from "./EditUserButton";
import FullNameTitle from "./FullNameTitle";
import ValueIndicator from "./ValueIndicator";
import MoodIndicator from "./MoodIndicator";

import { IUserDashboardType } from "../../interfaces/IUserDashboard";
import SendMediaModal from "./SendMediaModal";
import { setLocalStorageItem } from "../../utils";
import useI18n from "../../hooks/useI18n";

type AdminDashboardProps = {
  users: IUserDashboardType[];
  date: Dayjs;
  setDate: Dispatch<SetStateAction<Dayjs>>;
  workGroup: number;
  setWorkGroup: Dispatch<SetStateAction<number>>;
};

export default function AdminDashboard({
  users,
  date,
  setDate,
  workGroup,
  setWorkGroup,
}: AdminDashboardProps) {
  const [currentReceiver, setCurrentReceiver] = useState("");
  const [open, setOpen] = useState(false);

  const { translations, direction } = useI18n();
  const { usersDashboard } = translations.adminPage;

  const handleEdit = (id: string) => {
    setCurrentReceiver(id);
    setOpen(true);
  };

  const handleSelect = (numValue: number) => {
    setWorkGroup(numValue);
    setLocalStorageItem("workGroup", numValue);
  };

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: usersDashboard.usersDatagrid.fullName,
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
      headerName: usersDashboard.usersDatagrid.breaks,
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
      headerName: usersDashboard.usersDatagrid.clicks,
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
      headerName: usersDashboard.usersDatagrid.mood,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <MoodIndicator answer={params.row.latest_answer} />
      ),
    },
    {
      field: "distress",
      headerName: usersDashboard.usersDatagrid.distress,
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
        <EditUserButton
          id={params.row._id}
          handleEdit={handleEdit}
          btnName={usersDashboard.usersDatagrid.sendMediaBtn}
        />
      ),
    },
  ];

  return (
    <Box>
      <SendMediaModal
        open={open}
        setOpen={setOpen}
        currentReceiver={currentReceiver}
      />

      <Typography variant="body1" color="initial">
        {usersDashboard.title}
      </Typography>

      <Stack
        flexDirection="row"
        flexWrap="wrap"
        alignItems="start"
        sx={{ mt: 4.5 }}
      >
        <Paper
          elevation={3}
          sx={{
            width: { xs: "100%", sm: 300 },
            mr: { xs: 0, sm: direction === "left" ? 3 : 0 },
            ml: { xs: 0, sm: direction === "left" ? 0 : 3 },
            mb: 3,
            borderRadius: 2,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DateCalendar
              sx={{
                backgroundColor: "white",
                width: { xs: "100%", sm: 300 },
                borderRadius: 2,
              }}
              disableFuture
              value={date}
              onChange={(value) => value && setDate(value.startOf("d"))}
            />
          </LocalizationProvider>
        </Paper>

        <Stack sx={{ maxWidth: "677px", width: "100%" }}>
          <Paper
            sx={{ width: { xs: "100%", sm: 225 }, borderRadius: 2 }}
            elevation={3}
          >
            <Stack sx={{ width: "100%", p: 3 }}>
              <Typography sx={{ fontSize: 11 }}>
                {usersDashboard.usersDatagrid.workGroupFilterLabel}
              </Typography>
              <Select
                sx={{ mt: 0.5, mr: 1 }}
                value={workGroup}
                onChange={(ev) => handleSelect(ev.target.value as number)}
                size="small"
              >
                {new Array(10).fill("foo").map((_, index) => {
                  return (
                    <MenuItem key={index} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  );
                })}
              </Select>
            </Stack>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              borderRadius: 2,
              mt: 2,
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
        </Stack>
      </Stack>
    </Box>
  );
}
