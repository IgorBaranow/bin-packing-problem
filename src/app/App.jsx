import { ChakraProvider } from "@chakra-ui/react";
import Bins from "src/features/BinsDetails";

function App() {
  return (
    <ChakraProvider>
      <Bins></Bins>
    </ChakraProvider>
  );
}

export default App;
