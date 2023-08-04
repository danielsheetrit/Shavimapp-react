import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type EditUserButtonProps = {
  id: string;
  handleEdit: (id: string) => void;
  btnName: string;
  questionedUsers: string[];
};

export default function EditUserButton({
  handleEdit,
  id,
  btnName,
  questionedUsers,
}: EditUserButtonProps) {
  const theme = useTheme();

  const isQuestionSent = questionedUsers.includes(id);
  return (
    <Button
      sx={{
        backgroundColor: isQuestionSent ? theme.palette.primary.main : "white",
        color: isQuestionSent ? "white" : theme.palette.primary.main,
        border: "1px solid #E14E10",
        "&:hover": {
          color: "white",
        },
        "&:disabled": {
          color: 'white'
        }
      }}
      size="small"
      onClick={() => handleEdit(id)}
      disabled={isQuestionSent}
    >
      {isQuestionSent ? "✅" : btnName}
    </Button>
  );
}
