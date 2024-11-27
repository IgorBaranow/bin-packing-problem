import React, { useState } from "react";
import { Item, solveKnapsack } from "../utils/knapsackSolver";

const PackingPage: React.FC = () => {
  const [capacity] = useState<number>(25); // Fixed capacity
  const [items] = useState<Item[]>([
    { value: 4, weight: 2, name: "Mascara" },
    { value: 3, weight: 1, name: "Powder" },
    { value: 7, weight: 3, name: "Eye-shadow" },
    { value: 11, weight: 8, name: "Lipstick" },
    { value: 15, weight: 7, name: "Concealer" },
    { value: 9, weight: 5, name: "Blush" },
    { value: 13, weight: 6, name: "Foundation" },
    { value: 8, weight: 4, name: "Eyebrow gel" },
  ]);

  const [selectedItemsCount, setSelectedItemsCount] = useState<number[]>(
    new Array(items.length).fill(0) // Initialize counts for all items to 0
  );

  const [result, setResult] = useState<{
    maxValue: number;
    selectedItems: Item[];
  } | null>(null);

  const handleAddItem = (index: number) => {
    const updatedCounts = [...selectedItemsCount];
    updatedCounts[index]++;
    setSelectedItemsCount(updatedCounts);
  };

  const handleRemoveItem = (index: number) => {
    const updatedCounts = [...selectedItemsCount];
    if (updatedCounts[index] > 0) updatedCounts[index]--;
    setSelectedItemsCount(updatedCounts);
  };

  const handleSolve = () => {
    const solution = solveKnapsack(items, capacity, selectedItemsCount);
    setResult(solution);
  };

  return (
    <div>
      <h1>Knapsack Problem Solver</h1>
      <h2>Fixed Capacity: {capacity}</h2>
      <div>
        <h2>Items</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name}: Value = {item.value}, Weight = {item.weight}
              <button onClick={() => handleAddItem(index)}>+</button>
              <button onClick={() => handleRemoveItem(index)}>-</button>
              <span> Selected: {selectedItemsCount[index]}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSolve}>Solve</button>
      {result && (
        <div>
          <h2>Solution</h2>
          <p>Maximum Value: {result.maxValue}</p>
          <h3>Selected Items:</h3>
          <ul>
            {result.selectedItems.map((item, index) => (
              <li key={index}>
                {item.name}: Value = {item.value}, Weight = {item.weight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PackingPage;
