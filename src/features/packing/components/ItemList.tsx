import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTranslation } from "react-i18next";

interface Item {
  name: string;
  value: number;
  weight: number;
}

interface ItemListProps {
  items: Item[];
  itemCounts: { [key: string]: number };
  onAddItem: (itemName: string) => void;
  onRemoveItem: (itemName: string) => void;
}

export default function ItemList({
  items,
  itemCounts,
  onAddItem,
  onRemoveItem,
}: ItemListProps) {
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
      {items.map((item, index) => (
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
            paddingLeft: 3,
            paddingRight: 5,
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
              transform: "scale(1.02)",
            },
          }}
        >
          <ListItemAvatar>
            <Badge
              badgeContent={itemCounts[item.name]}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "1rem",
                  width: "25px",
                  height: "25px",
                  borderRadius: "12px",
                  position: "absolute",
                  backgroundColor: "#C96868",
                },
              }}
            >
              <Avatar
                src={images[item.name as keyof typeof images]}
                alt={item.name}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 0,
                  marginRight: 2,
                }}
              />
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={t(`items.${item.name}`)}
            secondary={`${t("labels.value")}: ${item.value}, ${t(
              "labels.weight"
            )}: ${item.weight}`}
            sx={{ flex: 1 }}
          />
          <ButtonGroup>
            <Button
              aria-label="reduce"
              onClick={() => onRemoveItem(item.name)}
              disabled={itemCounts[item.name] === 0} // Disable if count is 0
            >
              <RemoveIcon fontSize="small" />
            </Button>
            <Button aria-label="increase" onClick={() => onAddItem(item.name)}>
              <AddIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </ListItem>
      ))}
    </List>
  );
}
