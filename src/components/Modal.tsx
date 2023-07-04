import { ReactNode, useMemo } from "react";
import { Modal as ModalBox, Box, useMediaQuery } from "@mui/material";

type ModalProps = {
  open: boolean;
  children: ReactNode;
  anotherStyle?: object;
};

export default function Modal({ open, children, anotherStyle }: ModalProps) {
  const isMobile = !useMediaQuery("(min-width:420px)");

  const style = useMemo(
    () => ({
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: isMobile ? "90%" : 400,
      bgcolor: "background.paper",
      borderRadius: 1,
      boxShadow: 24,
      p: { xs: 1, sm: 4 },
      ...{...anotherStyle}
    }),
    [anotherStyle, isMobile]
  );

  return (
    <ModalBox open={open}>
      <Box sx={style}>{children}</Box>
    </ModalBox>
  );
}
