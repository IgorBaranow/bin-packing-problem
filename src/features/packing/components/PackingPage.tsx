import React, { useState } from "react";
import ItemList from "./ItemList";
import { items } from "src/data/items";
import { Box, Button, Grid2, Typography } from "@mui/material";
import SolutionList from "./SolutionList";
import { solveKnapsack } from "../utils/solveKnapsack";

export default function PackingPage() {
  const [capacity] = useState<number>(25);
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(
    // из массива с объектами делает объект, где acc, аккамулятор, в который копит себя все последующие item, тем самым получается один массив со всеми айтемс
    // в теле функции создаю новый объект, копирую свойство из acc и добавляю новое свойство со значением 0.
    // получается создаю обект {sasha: 0, igor: 0, ...}, этот 0 нужен для управления состоянием каждого айтема, 0 начальный отсчет и дальше мы его меняем для каждого айтема
    items.reduce((acc, item) => ({ ...acc, [item.name]: 0 }), {})
  );

  // состояние результат может быть объектом состоящим из 2 свойств или нулл, чтобы показать, что данных пока нет
  const [result, setResult] = useState<{
    maxValue: number;
    selectedItems: { [key: string]: number };
  } | null>(null);

  // функция на кнопку плюсик, нажимая на плюсик вызываю функцию setItemCounts, которая меняет состояние itemCounts на 1
  const handleAddItem = (itemName: string) => {
    setItemCounts((prevCounts) => ({
      // создаю копию текущего состояния (соблюдая принцип иммутабельности) и обновляю значение для ключа itemName
      ...prevCounts,
      [itemName]: prevCounts[itemName] + 1,
    }));
  };

  // функция на уменьшение, тоже самое, но если меньше 0, устанавливаю 0
  const handleRemoveItem = (itemName: string) => {
    setItemCounts((prevCounts) => ({
      ...prevCounts,
      [itemName]: Math.max(prevCounts[itemName] - 1, 0),
    }));
  };

  //функция на кнопку спаковать. меняет массив айтемс в массив содержащий количество выбранных элементов для каждого айтема, например после нажатий плюсов получилось
  // [{igor: 2}, {sasha: 1}], selectedItemsCount вернет [2, 1]
  const handleSolve = () => {
    const selectedItemsCount = items.map((item) => itemCounts[item.name]);
    //передает в функцию 3 параметра, функция решает и возвращает maxValue и selectedItems
    const solution = solveKnapsack(items, capacity, selectedItemsCount);

    // преобразует селектед айтемс в селектед айтемс мап, где ключи это имена, а значение колличество раз, которое каждый элемент встречается в массиве

    const selectedItemsMap = solution.selectedItems.reduce(
      (acc, item) => ({
        ...acc,
        [item.name]: (acc[item.name] || 0) + 1,
      }),
      {}
    );

    // функция меняет состояние результата на результат переданный с решения
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
