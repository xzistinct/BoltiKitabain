import React, { useState } from "react";

import { View, TextInput, useWindowDimensions } from "react-native";

export default function NumberPad({
  numbers,
  setNumbers,
  onChangeNumber,
}: {
  numbers: Array<number | null>;
  onChangeNumber?: () => void;
  setNumbers: React.Dispatch<React.SetStateAction<Array<number | null>>>;
}) {
  const { width, height } = useWindowDimensions();

  const numberInputs: Array<TextInput | null> = Array(10).fill(null);

  const handleNumberChange = (index: number, value: string) => {
    const newNumbers = [...numbers];
    if (value.length > 1) {
      if (index === numbers.length - 1) {
        return;
      }
      newNumbers[index + 1] = parseInt(value[1]);
      setNumbers(newNumbers);
      numberInputs[index + 1]?.focus();
      return;
    }
    if (value === "") {
      newNumbers[index] = null;
      setNumbers(newNumbers);
      return;
    }
    if (isNaN(parseInt(value))) {
      return;
    }
    newNumbers[index] = parseInt(value);

    setNumbers(newNumbers);

    if (value && index < numbers.length - 1) {
      numberInputs[index + 1]?.focus();
    }

    if (onChangeNumber) {
      onChangeNumber();
    }
  };

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {numbers.map((num, index) => (
        <TextInput
          key={index}
          style={{
            borderBottomWidth: 1,
            color: "black",
            marginRight: 5,
            width: 5 * (width / 100),

            fontSize: 20,
            height: 25,
            textAlign: "center",
          }}
          keyboardType="numeric"
          value={num !== null ? num.toString() : ""}
          ref={(input) => {
            numberInputs[index] = input;
          }}
          onChangeText={(value) => {
            handleNumberChange(index, value);
          }}
          onKeyPress={({ nativeEvent: { key: keyValue } }) => {
            if (keyValue === "Backspace" && num === null && index > 0) {
              numberInputs[index - 1]?.focus();
            }
          }}
        />
      ))}
    </View>
  );
}
