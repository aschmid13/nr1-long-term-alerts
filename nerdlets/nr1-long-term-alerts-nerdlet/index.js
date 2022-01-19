import React from "react";
import {
  Grid,
  GridItem,
  TextField,
  AccountPicker,
  Form,
  MultilineTextField,
  Button,
  HeadingText,
  Select,
  SelectItem,
} from "nr1";

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Nr1LongTermAlertsNerdletNerdlet extends React.Component {
  constructor() {
    super(...arguments);

    this.state = { accountId: null };

    this.onChangeAccount = this.onChangeAccount.bind(this);
  }

  onChangeAccount(_, value) {
    alert(`Selected account: ${value}`);

    this.setState({ accountId: value });
  }

  render() {
    return (
      <div>
        <Form
          layoutType={Form.LAYOUT_TYPE.SPLIT}
          splitSizeType={Form.SPLIT_SIZE_TYPE.LARGE}
        >
          <TextField
            placeholder="will be used for your alert name"
            label="Name"
          />
          <AccountPicker
            label="Account"
            labelInline
            value={this.state.accountId}
            onChange={this.onChangeAccount}
          />
          <MultilineTextField
            label="Description"
            info="Info tooltip"
            placeholder="Placeholder text"
          />
          <TextField
            placeholder="1 Day Ago"
            label="SINCE"
            info="This will be used as part of you NRQL, this is the Since statement, be aware of the retention period of the underlying data."
          />
          <TextField label="runbookUrl" />
          <Select
            label="Critical"
            info="Info value"
            onChange={(evt, value) => alert(value)}
          >
            <SelectItem value="Above">above</SelectItem>
            <SelectItem value="Below">below</SelectItem>
            <SelectItem value="Equals">equals</SelectItem>
          </Select>
          <TextField placeholder="threshold"/>
          <Select
            onChange={(evt, value) => alert(value)}
          >
            <SelectItem value="ALL">for at least</SelectItem>
            <SelectItem value="AT_LEAST_ONCE">At least once in</SelectItem>
          </Select> 
        </Form>
      </div>
    );
  }
}
