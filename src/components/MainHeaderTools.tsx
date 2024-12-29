import { Box, Button, styled } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

type Props = {
  height: string;
  isDrawEditInteraction: boolean;
  isModifyEditInteraction: boolean;
  toggleDrawEdit: () => void;
  toggleModifyEdit: () => void;
};

// アイコンや Draw と Modify の起動ボタンを表示するコンポーネント
export const MainHeaderTools = ({
  height,
  isModifyEditInteraction,
  isDrawEditInteraction,
  toggleDrawEdit,
  toggleModifyEdit,
}: Props) => {
  const IconWrapper = styled("div")(() => ({
    "& svg": {
      width: "100%",
      height: "100%",
    },
  }));
  const CustomButton = styled(Button)({ width: "100%" });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        bgcolor: "#FFF",
        padding: "0px 8px",
        boxSizing: "border-box",
      }}
      height={height}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "middle",
          width: "60vw",
          height: "80%",
        }}
      >
        <IconWrapper>
          <AddLocationAltIcon color="primary" />
        </IconWrapper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          width: "40vw",
          height: "80%",
          gap: 2,
        }}
      >
        <CustomButton
          variant="contained"
          onClick={toggleModifyEdit}
          color={isModifyEditInteraction ? "secondary" : "primary"}
        >
          Modify
        </CustomButton>
        <CustomButton
          variant="contained"
          onClick={toggleDrawEdit}
          color={isDrawEditInteraction ? "secondary" : "primary"}
        >
          Draw
        </CustomButton>
      </Box>
    </Box>
  );
};
