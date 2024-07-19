// react imports
import { useState } from "react";

// helpers
import { convertToEnglishNumber, removeSeparators } from "../helper";

// mui imports
import { IconButton } from "@mui/material";
import {
  AddRounded as AddIcon,
  RemoveRounded as SubIcon,
} from "@mui/icons-material";

function NumberInput({ onInputChange, ...props }) {
  const [value, setValue] = useState(props.value || 0);

  // Function to handle input change
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    // Allow only numbers
    if (/^[۰۱۲۳۴۵۶۷۸۹0-9.,]*$/.test(newValue)) {
      const numericValue = parseFloat(
        convertToEnglishNumber(removeSeparators(newValue))
      );
      if (
        (props.min !== undefined && numericValue < props.min) ||
        (props.max !== undefined && numericValue > props.max)
      ) {
        return;
      }
      setValue(newValue);
      onInputChange && onInputChange(numericValue);
      // if (newValue.includes(".")) {
      //   setValue(newValue);
      //   onInputChange && onInputChange(newValue);
      // } else {
      // }
    }
  };

  // Function to handle increment
  const handleIncrement = () => {
    const newValue =
      (parseInt(convertToEnglishNumber(removeSeparators(value)), 10) || 0) + 1;
    if (props.max !== undefined && newValue > props.max) {
      return;
    }
    setValue(newValue);
    onInputChange && onInputChange(newValue);
  };

  // Function to handle decrement
  const handleDecrement = () => {
    const newValue =
      (parseInt(convertToEnglishNumber(removeSeparators(value)), 10) || 0) - 1;
    if (props.min !== undefined && newValue < props.min) {
      return;
    }
    setValue(newValue);
    onInputChange && onInputChange(newValue);
  };

  // Function to prevent non-numeric characters from being input
  const handleBeforeInput = (event) => {
    // if (event.data.includes(".") && removeSeparators(value).includes(".")) {
    //   event.preventDefault();
    // }
    const newValue = value + event.data;
    const numericValue = Number(
      convertToEnglishNumber(removeSeparators(newValue))
    );
    if (
      !/^[۰۱۲۳۴۵۶۷۸۹0-9.,]*$/.test(event.data) ||
      (props.min !== undefined && numericValue < props.min) ||
      (props.max !== undefined && numericValue > props.max)
    ) {
      event.preventDefault();
    }
  };

  // Function to prevent pasting non-numeric content
  const handlePaste = (event) => {
    const paste = (event.clipboardData || window.clipboardData).getData("text");
    const newValue = value + paste;
    const numericValue = Number(
      convertToEnglishNumber(removeSeparators(newValue))
    );
    if (
      !/^[۰۱۲۳۴۵۶۷۸۹0-9.,]*$/.test(paste) ||
      (props.min !== undefined && numericValue < props.min) ||
      (props.max !== undefined && numericValue > props.max)
    ) {
      event.preventDefault();
    }
  };

  return (
    <div className="numberInput">
      <div className="numberInput--plus">
        <IconButton color="success" onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
      </div>
      <input
        type="text"
        className="numberInput__input"
        onChange={handleInputChange}
        onBeforeInput={handleBeforeInput}
        onPaste={handlePaste}
        value={value}
        min={props.min}
        max={props.max}
        {...props}
      />

      <div className="numberInput--sub">
        <IconButton color="error" onClick={handleDecrement}>
          <SubIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default NumberInput;
