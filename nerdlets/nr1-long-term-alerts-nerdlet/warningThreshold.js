import react, { Component } from "react";
import { Select, SelectItem, TextField, Form } from "nr1";

class WarningThreshold extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }

  render() {
    return (
      <div>
        <Form>
          <Select
            label="Warning"
            info="Info value"
            onChange={this._onChange}
            value={this.state.value}
          >
            <SelectItem value="ABOVE">above</SelectItem>
            <SelectItem value="BELOW">below</SelectItem>
            <SelectItem value="EQUALS">equals</SelectItem>
          </Select>
          <TextField placeholder="threshold" />
          <Select onChange={this._onChange} value={this.state.value}>
            <SelectItem value="ALL">for at least</SelectItem>
            <SelectItem value="AT_LEAST_ONCE">At least once in</SelectItem>
          </Select>
          <TextField placeholder="15" />
          <Select onChange={(evt, value) => alert(value)}>
            <SelectItem value="MINUTES">minutes</SelectItem>
            <SelectItem value="SECONDS">seconds</SelectItem>
          </Select>
        </Form>
      </div>
    );
  }
}

export default WarningThreshold;
