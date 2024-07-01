import { useState } from "react";
import Insertion from "../helper/Insertion";
import {
  Input,
  Avatar,
  Button,
  ButtonGroup,
  InputLabel,
  InputAdornment,
  FormControl,
  Container,
} from "@mui/material";
import { Timeline } from "@mui/lab";

import TimelineSteps from "../components/Timeline/TimelineSteps";

export default function InsertionSort() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [sortSteps, setSortSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState([]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleNextStep = () => {
    if (count < sortSteps.length - 1) {
      setCount(count + 1);
      setCurrentStep(sortSteps[count + 1]);
    }
  };

  const handleReset = () => {
    setValue("");
    setCount(0);
    setSortSteps([]);
    setCurrentStep([]);
  };

  const handleInputArr = () => {
    const inputArr = value
      ? value.split(",").map((item) => parseInt(item, 10))
      : [];
    const steps = Insertion([...inputArr]);
    setSortSteps(steps);
    setCurrentStep(steps[0]);
    setCount(0);
  };

  const isEnable = value !== "";
  const inputArr = value
    ? value.split(",").map((item) => parseInt(item, 10))
    : [];
  const isSorted =
    JSON.stringify(currentStep) ===
    JSON.stringify([...inputArr].sort((a, b) => a - b));

  return (
    <Container sx={{ marginTop: 4, textAlign: "center" }} maxWidth="sm">
      <FormControl fullWidth sx={{ margin: "16px 0" }}>
        <InputLabel htmlFor="standard-adornment-amount">
          Input Ex: 5,3,2,4,1
        </InputLabel>
        <Input
          id="standard-adornment-amount"
          value={value}
          onChange={onChange}
          startAdornment={
            <InputAdornment position="start">list</InputAdornment>
          }
          disabled={count > 0}
        />
      </FormControl>
      <div>
        {inputArr.map((item, id) => (
          <Avatar
            key={id}
            sx={{
              margin: 1,
              backgroundColor: "secondary.main",
              color: "secondary.contrastText",
            }}
          >
            {item}
          </Avatar>
        ))}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleInputArr}
          disabled={!isEnable || count > 0}
        >
          Insertion Sort
        </Button>
      </div>
      <div>
        <h3>Step {count} :</h3>
        {!isSorted ? (
          <Timeline>
            {sortSteps.slice(0, count + 1).map((step, id) => (
              <TimelineSteps key={id} step={step} id={id} />
            ))}
          </Timeline>
        ) : (
          <div>
            <h3>SORTED List</h3>
            {[...inputArr]
              .sort((a, b) => a - b)
              .map((item, id) => (
                <Avatar
                  key={id}
                  sx={{
                    margin: 1,
                    backgroundColor: "success.main",
                    color: "success.contrastText",
                  }}
                >
                  {item}
                </Avatar>
              ))}
          </div>
        )}
        <ButtonGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextStep}
            disabled={!isEnable || isSorted}
          >
            Next Step
          </Button>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}
