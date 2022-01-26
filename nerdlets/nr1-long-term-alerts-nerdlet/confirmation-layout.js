import react, { Component } from "react";
import { Stack, StackItem, TextField, MultilineTextField } from "nr1";

class ConfirmationLayout extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  _onChange(event, value) {
    this.setState({ value });
  }

  render() {
    let styles = {
      marginBottom: "10px",
    };

    return (
      <div className="ConfirmationDetails">
        <Stack directionType={Stack.DIRECTION_TYPE.VERTICAL}>
          <StackItem>
            <MultilineTextField
              defaultValue="FROM EVENTTYPE SELECT MAX(ATTRIBUTE) WHERE X > 2 FACET BY"
              label="NRQL Query"
              readOnly
            />
          </StackItem>
          <StackItem>
            <TextField
              defaultValue="NEWEVENTTYPENAME"
              label="New EventType"
              readOnly
            />
          </StackItem>
          <StackItem>
            <MultilineTextField
              defaultValue="Average CPUPercent higher than 90 for at least 15 minutes"
              label="Alert Summary"
              readOnly
            />
          </StackItem>
        </Stack>
      </div>
    );
  }
}

export default ConfirmationLayout;
