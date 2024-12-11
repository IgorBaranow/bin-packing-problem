import { Item, solveKnapsack } from "../solveKnapsack";
import { items } from "../../../../data/items";
import { performance } from "perf_hooks";

const capacities = [
  0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
];

const itemCounts = Array(items.length).fill(100);

const benchmarkKnapsack = (capacity: number) => {
  console.log(`Testing capacity: ${capacity}`);
  const start = performance.now();

  const result = solveKnapsack(items, capacity, itemCounts);

  const end = performance.now();
  console.log(
    `Capacity: ${capacity}, Execution Time: ${(end - start).toFixed(2)} ms`
  );
  console.log(`Max Value: ${result.maxValue}`);
  console.log(
    `Selected Items:`,
    result.selectedItems.map((item) => item.name)
  );
  console.log("------------------------");
};

capacities.forEach((capacity) => {
  benchmarkKnapsack(capacity);
});
