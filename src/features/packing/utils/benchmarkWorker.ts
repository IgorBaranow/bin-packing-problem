import { items } from "src/data/items";
import { solveKnapsack } from "./solveKnapsack";

self.onmessage = (e: MessageEvent) => {
  console.log("Worker received message:", e.data);
  const { capacities, itemCounts } = e.data;

  for (const capacity of capacities) {
    let totalTime = 0;
    for (let i = 0; i < 20; i++) {
      const start = performance.now();
      solveKnapsack(items, capacity, itemCounts);
      const end = performance.now();
      totalTime += end - start;
    }
    const avgTime = totalTime / 20;

    self.postMessage({ capacity, avgTime });
    console.log(`Capacity ${capacity}: Avg time = ${avgTime.toFixed(2)} ms`);
  }

  self.postMessage({ finalResult: true });
};
