import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type EditUserButtonProps = {
  id: string;
  handleEdit: (id: string) => void;
};

export default function EditUserButton({
  handleEdit,
  id,
}: EditUserButtonProps) {
  const theme = useTheme();
  return (
    <Button
      sx={{
        backgroundColor: "white",
        color: theme.palette.primary.main,
        border: "1px solid #E14E10",
        "&:hover": {
          color: "white",
        },
      }}
      size="small"
      onClick={() => handleEdit(id)}
    >
      Send Media
    </Button>
  );
}
