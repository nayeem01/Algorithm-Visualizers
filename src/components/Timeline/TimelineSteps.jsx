import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

import { Avatar } from "@mui/material";

import PropTypes from "prop-types";

export default function TimelineSteps({ step, id }) {
  return (
    <TimelineItem key={id}>
      <TimelineSeparator>
        <TimelineDot color={id % 2 ? "primary" : "secondary"} />
        <TimelineConnector />
      </TimelineSeparator>
      {step.map((item, index) => (
        <TimelineContent key={index}>
          <Avatar
            sx={{
              margin: 1,
              backgroundColor: "secondary.main",
              color: "secondary.contrastText",
            }}
          >
            {item}
          </Avatar>
        </TimelineContent>
      ))}
    </TimelineItem>
  );
}

TimelineSteps.propTypes = {
  step: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
};
