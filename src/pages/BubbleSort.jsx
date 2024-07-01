import { useState } from "react";
import Bubble from "../helper/Bubble";
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
} from "@mui/material";

import { Timeline } from "@mui/lab";

import TimelineSteps from "../components/Timeline/TimelineSteps";

export default function BubbleSort() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [preview, setPreview] = useState(1);
  const [sortSteps, setSortSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState([]);
  const [positions, setPositions] = useState([]);

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
    setCurrentStep([]);
    setPositions([]);
  };

  const handleInputArr = () => {
    const inputArr = value
      ? value.split(",").map((item) => parseInt(item, 10))
      : [];
    const [steps, pos] = Bubble([...inputArr]);
    setSortSteps(Object.values(steps));
    setPositions(pos);
    setCurrentStep(steps[1]);
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleInputArr}
            disabled={!isEnable || count > 0}
          >
            Bubble Sort
          </Button>
        </div>
        <div>
          <h3>Step {count} :</h3>
          {!isSorted ? (
            <div>
              <List>
                <ListItemText primary="Current State and Target Swap :" />
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
                          backgroundColor:
                            idx === positions[count] ||
                            idx === positions[count] + 1
                              ? "primary.main"
                              : "secondary.main",
                          color:
                            idx === positions[count] ||
                            idx === positions[count] + 1
                              ? "primary.contrastText"
                              : "secondary.contrastText",
                        }}
                      >
                        {item}
                      </Avatar>
                    ))}
                </ListItem>
              </List>
              <Timeline>
                <ListItemText primary="Tree view" />
                {sortSteps.slice(0, count).map((step, id) => (
                  <TimelineSteps key={id} step={step} id={id} />
                  // <TimelineItem key={id}>
                  //   <TimelineSeparator>
                  //     <TimelineDot color={id % 2 ? "primary" : "secondary"} />
                  //     <TimelineConnector />
                  //   </TimelineSeparator>
                  //   {step.map((item, index) => (
                  //     <TimelineContent key={index}>
                  //       <Avatar
                  //         sx={{
                  //           margin: 1,
                  //           backgroundColor: "secondary.main",
                  //           color: "secondary.contrastText",
                  //         }}
                  //       >
                  //         {item}
                  //       </Avatar>
                  //     </TimelineContent>
                  //   ))}
                  // </TimelineItem>
                ))}
              </Timeline>
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
