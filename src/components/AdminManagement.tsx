import { useState } from "react";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";

import { IUser } from "../interfaces/IUser";
import FullNameTitle from "./AdminDashboard/FullNameTitle";
import EditUserButton from "./AdminDashboard/EditUserButton";
import Modal from "./Modal";
import axiosInstance from "../utils/axios";
import useI18n from "../hooks/useI18n";

type AdminMenegamentProps = {
  managementUsers: IUser[];
  getUsersForManagement: () => Promise<void>;
};

export default function AdminMenegament({
  managementUsers,
  getUsersForManagement,
}: AdminMenegamentProps) {
  const [selectedRows, setSelectedRows] = useState<GridRowId[] | []>([]);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [workGroup, setWorkGroup] = useState(0);
  const [language, setLanguage] = useState("");

  const { translations } = useI18n();
  const { managementDashboard } = translations.adminPage;

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: translations.adminPage.usersDashboard.usersDatagrid.fullName,
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
      field: "user_type",
      headerName: managementDashboard.userTypeLabel,
      align: "center",
      headerAlign: "center",
      valueFormatter: (params) => {
        if (params.value === "admin") {
          return "B";
        }
        if (params.value === "chief") {
          return "C";
        }
        return "A";
      },
    },
    {
      field: "work_group",
      headerName: managementDashboard.workGroupLabel,
      align: "center",
      headerAlign: "center",
      valueFormatter: (params) => {
        if (params.value === 0) {
          return " ";
        }
        return params.value;
      },
    },
    {
      field: "language",
      headerName: managementDashboard.languageLabel,
      align: "center",
      headerAlign: "center",
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
          handleEdit={() => {
            setOpen(true);
            setUserId(params.row._id);
            setLanguage(params.row.language);
            setWorkGroup(params.row.work_group);
          }}
          btnName={managementDashboard.editBtn}
        />
      ),
    },
  ];

  const deleteUsers = async () => {
    if (!selectedRows.length) {
      return;
    }

    try {
      await axiosInstance.put("/users/delete", { idsArr: selectedRows });
      await getUsersForManagement();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put("/users/update", {
        id: userId,
        workGroup,
        language,
      });

      setOpen(false);
      await getUsersForManagement();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal open={open} anotherStyle={{ p: 3 }}>
        <Stack flexDirection="row">
          <Stack sx={{ width: 130, textAlign: "left" }}>
            <Typography sx={{ fontSize: 11 }}>
              {managementDashboard.workGroupLabel}
            </Typography>
            <Select
              sx={{ mt: 0.5, mr: 1 }}
              value={workGroup.toString()}
              onChange={(ev) => setWorkGroup(parseInt(ev.target.value, 10))}
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

          <Stack sx={{ width: 150, textAlign: "left" }}>
            <Typography sx={{ fontSize: 11 }}>
              {managementDashboard.languageLabel}
            </Typography>
            <Select
              sx={{ mt: 0.5, mr: 1 }}
              value={language}
              onChange={(ev) => setLanguage(ev.target.value)}
              size="small"
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"he"}>Hebrew</MenuItem>
              <MenuItem value={"ru"}>Russian</MenuItem>
              <MenuItem value={"ar"}>Arabic</MenuItem>
            </Select>
          </Stack>
        </Stack>

        <Stack flexDirection="row" sx={{ mt: 3 }}>
          <Button
            onClick={() => handleUpdate()}
            sx={{ flexBasis: 100, mr: 1 }}
            size="small"
          >
            {managementDashboard.updateBtn}
          </Button>
          <Button
            size="small"
            sx={{
              flexBasis: 75,
              backgroundColor: "#ccc",
              "&:hover": {
                backgroundColor: "#ccc",
              },
            }}
            onClick={() => setOpen(false)}
          >
            {managementDashboard.cancelBtn}
          </Button>
        </Stack>
      </Modal>

      <Paper
        elevation={3}
        sx={{
          maxWidth: "626px",
          width: "100%",
          borderRadius: 2,
          mt: 2,
          position: "relative",
        }}
      >
        <DataGrid
          sx={{
            borderRadius: 2,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          rows={managementUsers}
          columns={columns}
          getRowId={(row) => row._id}
          hideFooter
          checkboxSelection
          onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
          disableRowSelectionOnClick
        />

        <Button
          onClick={() => deleteUsers()}
          disabled={!selectedRows.length}
          size="small"
          sx={{
            m: 1,
            px: 1,
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          {managementDashboard.deleteUsersBtn}
        </Button>
      </Paper>
    </>
  );
}
