import React, { useState } from "react";
import ItemList from "./ItemList";
import { items } from "src/data/items";
import { Box, Button, Grid2, Typography } from "@mui/material";
import SolutionList from "./SolutionList";
import { solveKnapsack } from "../utils/solveKnapsack";

export default function PackingPage() {
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

    // Transform selectedItems into a map of item name to count
    const selectedItemsMap = solution.selectedItems.reduce(
      (acc, item) => ({
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
    // Reset the state variables
    setItemCounts(
      items.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
    );
    setResult(null);
  };

  return (
    <>
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
            Pack your Cosmetic Bag
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
            Capacity: {capacity}
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
            Pack
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
              Try Again
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
            <Typography variant="h4">Packed Items</Typography>
          </Box>
          {result ? (
            <SolutionList selectedItems={result.selectedItems} />
          ) : (
            <Typography variant="body2" color="text.secondary">
              No items packed yet.
            </Typography>
          )}
          <Box>
            {result && (
              <div>
                <Typography variant="h4" color="primary">
                  Maximum Value: {result.maxValue}
                </Typography>
              </div>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}
