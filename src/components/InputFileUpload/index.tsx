import * as React from "react";
import { ComponentProps } from 'react';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface InputFileUploadProps {
  onFileChange: (file: File) => void;
  disabled?: boolean;
}

const CustomTooltip = styled(({ className, ...props }: ComponentProps<typeof Tooltip>) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 13, // Controla o tamanho do texto
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
}));

export const InputFileUpload: React.FC<InputFileUploadProps> = ({
  onFileChange,
  disabled,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(event.target.files[0]);
    }
  };

  return (
    <CustomTooltip title="Recurso disponível em breve" arrow>
      <span>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          disabled={disabled}
          startIcon={<CloudUploadIcon />}
        >
          Adicionar arquivo
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
      </span>
    </CustomTooltip>
  );
};
