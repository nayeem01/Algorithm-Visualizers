import { useState } from "react";
import mergeSort from "../helper/mergeSort";
import {
  Input,
  Avatar,
  Button,
  ButtonGroup,
  InputLabel,
  InputAdornment,
  FormControl,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";

import { Timeline } from "@mui/lab";

import TimelineSteps from "../components/Timeline/TimelineSteps";

export default function MergeSort() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [preview, setPreview] = useState(1);
  const [sortSteps, setSortSteps] = useState([]);
  const [leftSteps, setLeftSteps] = useState([]);
  const [rightSteps, setRightSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState([]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleNextStep = () => {
    if (preview < sortSteps.length) {
      setCount(count + 1);
      setPreview(preview + 1);
      setCurrentStep(sortSteps[preview]);
    }
  };

  const handleReset = () => {
    setValue("");
    setCount(0);
    setPreview(1);
    setSortSteps([]);
    setLeftSteps([]);
    setRightSteps([]);
    setCurrentStep([]);
  };

  const handleInputArr = () => {
    const inputArr = value
      ? value.split(",").map((item) => parseInt(item, 10))
      : [];
    const { steps, leftArr, rightArr } = mergeSort([...inputArr]);
    setSortSteps(steps);
    setLeftSteps(leftArr);
    setRightSteps(rightArr);
    setCurrentStep(steps[0]);
    setCount(1);
    setPreview(1);
  };

  const isEnable = value !== "";
  const isSorted =
    JSON.stringify(currentStep) ===
    JSON.stringify(
      [...value.split(",").map((item) => parseInt(item, 10))].sort(
        (a, b) => a - b
      )
    );

  return (
    <div>
      <Container
        style={{
          marginTop: 4,
          textAlign: "center",
        }}
        maxWidth="sm"
      >
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
          <Stack direction="row" spacing={2}>
            {value.split(",").map((item, id) => (
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
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleInputArr}
            disabled={!isEnable || count > 0}
          >
            Merge Sort
          </Button>
        </div>
        <div>
          <h3>Step {count} :</h3>
          {!isSorted ? (
            <div>
              <List>
                <ListItemText primary="Current State:" />
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "16px 0",
                  }}
                >
                  {currentStep &&
                    currentStep.map((item, idx) => (
                      <Avatar
                        key={idx}
                        sx={{
                          margin: 1,
                          backgroundColor: "secondary.main",
                          color: "secondary.contrastText",
                        }}
                      >
                        {item}
                      </Avatar>
                    ))}
                </ListItem>
              </List>
              <Stack direction="row" spacing={2}>
                <Timeline>
                  <ListItemText primary="Tree view" />
                  {sortSteps.slice(0, count).map((step, id) => (
                    <TimelineSteps key={id} step={step} id={id} />
                  ))}
                </Timeline>
                <h3>Left Steps</h3>
                <Timeline>
                  {leftSteps.map((stepGroup, id) => (
                    <TimelineSteps key={id} step={stepGroup} id={id} />
                  ))}
                </Timeline>
                <h3>Right Steps</h3>
                <Timeline>
                  {rightSteps.map((stepGroup, id) => (
                    <TimelineSteps key={id} step={stepGroup} id={id} />
                  ))}
                </Timeline>
              </Stack>
            </div>
          ) : (
            <div>
              <h3>SORTED List</h3>
              {[...value.split(",").map((item) => parseInt(item, 10))]
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
    </div>
  );
}
