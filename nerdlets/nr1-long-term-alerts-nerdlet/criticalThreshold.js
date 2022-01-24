import react, { Component } from "react";
import {
  Select,
  SelectItem,
  TextField,
  Form,
  Dropdown,
  DropdownItem,
  BlockText
} from "nr1";

let CriticalThresholdOperators = ["above", "below", "equals"];
let CriticalThresholdOccurences = ["ALL", "AT_LEAST_ONCE"];
let TimeType = ["MINUTES", "SECONDS"];

class CriticalThreshold extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      cThresholdOp: "above",
      cThresholdOccurences: "ALL",
      cTimeType: "MINTUES",
    };
  }

  _onChange(event, value) {
    this.setState({ value });
  }

  onCriticalOperatorChange(item) {
    this.setState({ cThresholdOp: item });
  }

  onCriticalThreshOccuranceChange(item) {
      this.setState({ cThresholdOccurences: item });
  }

  onTimeTypeChange(item) {
      this.setState({ cTimeType: item})
  }

  render() {

    let styles = {
        marginBottom: "10px",
      };

    return (
      <div>
        <Form>
        <BlockText style={styles}>
                Open a critical priority violation when the query returns a value
            </BlockText>
            <Dropdown
            items={CriticalThresholdOperators}
            title={this.state.cThresholdOp}
          >
            {({ item, index }) => (
              <DropdownItem
                key={index}
                onClick={() => this.onCriticalOperatorChange(item)}
              >
                {item}
              </DropdownItem>
            )}
          </Dropdown>


          <TextField placeholder="threshold" />

          <Dropdown
            items={CriticalThresholdOccurences}
            title={this.state.cThresholdOccurences}
          >
            {({ item, index }) => (
              <DropdownItem
                key={index}
                onClick={() => this.onCriticalThreshOccuranceChange(item)}
              >
                {item}
              </DropdownItem>
            )}
          </Dropdown>

          <TextField placeholder="15" />

          <Dropdown
            items={TimeType}
            title={this.state.cTimeType}
          >
            {({ item, index }) => (
              <DropdownItem
                key={index}
                onClick={() => this.onTimeTypeChange(item)}
              >
                {item}
              </DropdownItem>
            )}
          </Dropdown>
        </Form>
      </div>
    );
  }
}


export default CriticalThreshold;