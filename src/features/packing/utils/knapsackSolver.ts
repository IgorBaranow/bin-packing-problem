export interface Item {
  value: number;
  weight: number;
  name: string;
}

export const solveKnapsack = (
  items: Item[],
  capacity: number,
  itemCounts: number[]
): { maxValue: number; selectedItems: Item[] } => {
  const n = items.length;
  const dp = Array(capacity + 1).fill(0);
  const selectedItemsTracker: { [key: number]: number[] } = {};

  for (let i = 0; i <= capacity; i++) {
    selectedItemsTracker[i] = [];
  }

  // Iterate through items and quantities
  for (let i = 0; i < n; i++) {
    const { value, weight } = items[i];
    const count = itemCounts[i];

    // Iterate from capacity downwards
    for (let w = capacity; w >= 0; w--) {
      for (let k = 1; k <= count && k * weight <= w; k++) {
        const newValue = dp[w - k * weight] + k * value;
        if (newValue > dp[w]) {
          dp[w] = newValue;

          // Track selected items
          selectedItemsTracker[w] = [
            ...selectedItemsTracker[w - k * weight],
            ...Array(k).fill(i),
          ];
        }
      }
    }
  }

  // Construct the selected items list from the tracker
  const selectedItems: Item[] = [];
  for (const idx of selectedItemsTracker[capacity]) {
    selectedItems.push(items[idx]);
  }

  return {
    maxValue: dp[capacity],
    selectedItems,
  };
};
