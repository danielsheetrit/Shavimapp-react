import { Dispatch, SetStateAction } from "react";
import Modal from "../Modal";

type EditModalType = {
  open: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
};

export default function EditModal({ open, setModal }: EditModalType) {
  return <Modal open={open}>New Div</Modal>;
}
