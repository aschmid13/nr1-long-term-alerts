import react, { Component } from "react";
import {
  Select,
  SelectItem,
  TextField,
  Form,
  Dropdown,
  DropdownItem,
  BlockText,
  Stack,
  StackItem,
} from "nr1";

let WarningThresholdOperators = ["above", "below", "equals"];
let WarningThresholdOccurences = ["ALL", "AT_LEAST_ONCE"];
let TimeType = ["MINUTES", "SECONDS"];

class WarningThreshold extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      wThresholdOp: "above",
      wThresholdOccurences: "ALL",
      wTimeType: "MINTUES",
      wDuration: "15",
    };
  }

  _onChange(event, value) {
    this.setState({ value });
  }

  onWarningOperatorChange(item) {
    this.setState({ wThresholdOp: item });
  }

  onWarningThreshOccuranceChange(item) {
    this.setState({ wThresholdOccurences: item });
  }

  onTimeTypeChange(item) {
    this.setState({ wTimeType: item });
  }

  onDurationChange(eventvalue) {
    this.setState({ wDuration: eventvalue });
  }

  onThresholdChange(eventvalue) {
    this.setState({ wThreshold: eventvalue });
  }

  render() {
    let styles = {
      marginBottom: "10px",
    };
    return (
      <div>
        <BlockText style={styles}>
          Open a warning violation when the query returns a value
        </BlockText>
        <Stack directionType={Stack.DIRECTION_TYPE.HORIZONTAL}>
          <StackItem>
            <Dropdown
              items={WarningThresholdOperators}
              title={this.state.wThresholdOp}
            >
              {({ item, index }) => (
                <DropdownItem
                  key={index}
                  onClick={() => this.onWarningOperatorChange(item)}
                >
                  {item}
                </DropdownItem>
              )}
            </Dropdown>
          </StackItem>

          <StackItem>
            <TextField
              placeholder="threshold"
              onChange={() => this.onThresholdChange(event.target.value)}
            />
          </StackItem>

          <StackItem>
            <Dropdown
              items={WarningThresholdOccurences}
              title={this.state.wThresholdOccurences}
            >
              {({ item, index }) => (
                <DropdownItem
                  key={index}
                  onClick={() => this.onWarningThreshOccuranceChange(item)}
                >
                  {item}
                </DropdownItem>
              )}
            </Dropdown>
          </StackItem>
          <StackItem>
            <TextField
              placeholder="15"
              onChange={() => this.onDurationChange(event.target.value)}
            />
          </StackItem>
          <StackItem>
            <Dropdown items={TimeType} title={this.state.wTimeType}>
              {({ item, index }) => (
                <DropdownItem
                  key={index}
                  onClick={() => this.onTimeTypeChange(item)}
                >
                  {item}
                </DropdownItem>
              )}
            </Dropdown>
          </StackItem>
        </Stack>
      </div>
    );
  }
}

export default WarningThreshold;
