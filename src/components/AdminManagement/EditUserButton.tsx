import { Button } from "@mui/material";

type EditUserButtonProps = {
  id: string;
  handleEdit: (id: string) => void;
};

export default function EditUserButton({
  handleEdit,
  id,
}: EditUserButtonProps) {
  return (
    <Button size="small" onClick={() => handleEdit(id)}>
      Edit
    </Button>
  );
}
