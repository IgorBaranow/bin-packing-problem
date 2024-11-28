import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function BadgeVisibility() {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <Box
        sx={{
          color: "action.active",
          display: "flex",
          flexDirection: "column",
          "& > *": {
            marginBottom: 2,
          },
          "& .MuiBadge-root": {
            marginRight: 4,
          },
        }}
      >
        <div>
          <ButtonGroup sx={{ marginLeft: 5 }}>
            <Button
              sx={{ marginTop: 3 }}
              aria-label="reduce"
              onClick={() => {
                setCount(Math.max(count - 1, 0));
              }}
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Button
              sx={{ marginTop: 3 }}
              aria-label="increase"
              onClick={() => {
                setCount(count + 1);
              }}
            >
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </div>
      </Box>
      <Badge
        sx={{
          marginBottom: 10,
          marginRight: 10,
          position: "absolute",
          "& .MuiBadge-badge": {
            fontSize: "1rem",
            width: "25px",
            height: "25px",
            borderRadius: "15px",
          },
        }}
        color="secondary"
        badgeContent={count}
      ></Badge>
    </>
  );
}
