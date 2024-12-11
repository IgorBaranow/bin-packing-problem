import React, { useState } from "react";
import ItemList from "./ItemList";
import { items } from "src/data/items";
import { Box, Button, Grid2, Typography } from "@mui/material";
import SolutionList from "./SolutionList";
import { solveKnapsack } from "../utils/solveKnapsack";
import { useTranslation } from "react-i18next";
import AppNavbar from "./AppNavbar";
import ToggleLanguage from "./toggleLanguage";

export default function PackingPage() {
  const { t, i18n } = useTranslation();

  const [capacity] = useState<number>(25);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(
    items.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
  );

  const [result, setResult] = useState<{
    maxValue: number;
    selectedItems: { [key: string]: number };
  } | null>(null);

  const handleAddItem = (itemName: string) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemName]: prevCounts[itemName] + 1,
    }));
  };

  const handleRemoveItem = (itemName: string) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemName]: Math.max(prevCounts[itemName] - 1, 0),
    }));
  };

  const handleSolve = () => {
    const selectedItemsCount = items.map((item) => itemCounts[item.name]);
    const solution = solveKnapsack(items, capacity, selectedItemsCount);

    const selectedItemsMap = solution.selectedItems.reduce(
      (acc: { [key: string]: number }, item) => ({
        ...acc,
        [item.name]: (acc[item.name] || 0) + 1,
      }),
      {}
    );

    setResult({
      maxValue: solution.maxValue,
      selectedItems: selectedItemsMap,
    });
  };

  const handleReset = () => {
    setItemCounts(
      items.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
    );
    setResult(null);
  };

  return (
    <>
      <AppNavbar pageTitle="Benchmark" pageLink="/benchmark" />
      <Box marginTop={"100px"}>
        <Grid2 container spacing={2}>
          <Grid2
            size={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <ItemList
              items={items}
              itemCounts={itemCounts}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          </Grid2>
          <Grid2
            size={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography component="h1" variant="h1">
              {t("title")}
            </Typography>
            <Box
              component="img"
              src="/cosmetic-bag.png"
              alt="Descriptive text for your image"
              sx={{
                width: "400px",
                height: "auto",
                marginTop: "5rem",
              }}
            />
            <Typography variant="body1" color="text.secondary">
              {t("capacity")}: {capacity}
            </Typography>
            <Button
              onClick={handleSolve}
              variant="contained"
              color="primary"
              sx={{
                marginTop: 10,
                width: "250px",
                height: "60px",
                fontSize: "1rem",
              }}
            >
              {t("packButton")}
            </Button>
            {result && (
              <Button
                onClick={handleReset}
                variant="outlined"
                color="secondary"
                sx={{
                  marginTop: 2,
                  fontSize: "0.8rem",
                }}
              >
                {t("tryAgainButton")}
              </Button>
            )}
          </Grid2>
          <Grid2
            size={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                margin: "2rem 0",
              }}
            >
              <Typography variant="h4">{t("packedItemsHeader")}</Typography>
            </Box>
            {result ? (
              <SolutionList selectedItems={result.selectedItems} />
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t("noItemsPacked")}
              </Typography>
            )}
            <Box>
              {result && (
                <div>
                  <Typography variant="h4" color="primary">
                    {t("maxValue")}: {result.maxValue}
                  </Typography>
                </div>
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
}
