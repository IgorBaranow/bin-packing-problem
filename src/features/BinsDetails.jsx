import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useState } from "react";

function Bins() {
  const [binCapacity, setBinCapacity] = useState(10);

  return (
    <>
      <Flex justify="center" align="center" direction="column" m="10">
        <Flex direction="column" align="center" textAlign="center">
          <Text fontSize="30px" mb="2">
            Enter the weights of the items
          </Text>
          <Box mb="5">
            <PinInput size="sm" m="2">
              {[...Array(binCapacity)].map((_, index) => (
                <PinInputField mx="0.5" key={index} />
              ))}
            </PinInput>
          </Box>
        </Flex>
        <Flex justify="start" align="center" mb="10">
          <Text fontSize="16px" marginRight="2">
            The bin capacity:
          </Text>
          <NumberInput
            size="sm"
            max={24}
            maxW={70}
            value={binCapacity}
            min={1}
            onChange={(value) => setBinCapacity(Number(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </Flex>
    </>
  );
}

export default Bins;
