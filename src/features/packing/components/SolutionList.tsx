import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { useTranslation } from "react-i18next";

interface SolutionListProps {
  selectedItems: { [key: string]: number };
}

export default function SolutionList({ selectedItems }: SolutionListProps) {
  const images = {
    Mascara: "/mascara.png",
    Powder: "/powder.png",
    "Eye-shadow": "/eye-shadows.png",
    Lipstick: "/lipstick.png",
    Concealer: "/concealer.png",
    Blush: "/blush.png",
    Foundation: "/foundation.png",
    "Eyebrow gel": "/eyebrow-gel.png",
  };

  const { t } = useTranslation();

  return (
    <List sx={{ width: "100%", maxWidth: 450 }}>
      {Object.entries(selectedItems).map(([name, count], index) => (
        <ListItem
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            marginBottom: 1.5,
          }}
        >
          <ListItemAvatar>
            <Avatar
              src={images[name]}
              alt={name}
              sx={{
                width: 80,
                height: 80,
                borderRadius: 0,
                marginRight: 2,
                marginLeft: 1,
              }}
            />
          </ListItemAvatar>
          <ListItemText primary={t(`items.${name}`)} />
          <Badge
            badgeContent={count}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "1rem",
                width: "40px",
                height: "40px",
                borderRadius: "40px",
                marginRight: 10,
                backgroundColor: "#C96868",
              },
            }}
          ></Badge>
        </ListItem>
      ))}
    </List>
  );
}
