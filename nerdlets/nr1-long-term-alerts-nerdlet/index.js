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
  Stack,
  StackItem,
  Switch,
  Steps,
  StepsItem,
  Dropdown,
  DropdownSection,
  DropdownItem,
  NerdGraphQuery,
  Spinner,
  Toast,
  BlockText
} from "nr1";
import { buildEventTypeQueries } from "../util/graphqlbuilders";
import { EventSelector } from "../form-components/event-selector";

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Nr1LongTermAlertsNerdletNerdlet extends React.Component {
  constructor() {
    super(...arguments);

    this.state = { accountId: null, eventTypes: null};

    this.onChangeAccount = this.onChangeAccount.bind(this);

    this._onChange = this._onChange.bind(this);
  }

  onChangeAccount(_, value) {
    this.setState({ accountId: value });
  }

  _onChange(event, value) {
    this.setState({ value });
  }


  render() {
    let styles = {
      marginRight: "20px",
      marginLeft: "20px",
      marginTop: "20px",
    };

    return (
      <div style={styles}>
        <Steps defaultValue="Get-Started">
          <StepsItem label="High Level Info" value="Get-Started">
            <Form>
              <TextField
                label="Name"
                description="This name will be used for your alert name, and the underlying Events and Synthetic checks that will be setup"
              />
              <AccountPicker
                label="Account"
                labelInline
                value={this.state.accountId}
                onChange={this.onChangeAccount}
              />
              <MultilineTextField label="Description" placeholder="Optional" />
              {/* <Dropdown onOpen={() => NerdGraphQuery.query(buildEventTypeQueries(this.state.accountId)).then(({data}) => this.setState( {eventTypes: data.actor.query.nrql.results}))}> */}
              <Dropdown onOpen={() => NerdGraphQuery.query(buildEventTypeQueries(this.state.accountId)).then(({data}) => console.log( {eventTypes: data.actor.query.nrql.results}))}>
                <DropdownItem></DropdownItem>
              </Dropdown>
            </Form>
          </StepsItem>
          <StepsItem label="Your Alerting Scenario" value="Alert-Data">
            Tell us about what you'd like to alert on.
            <Form>
              <Dropdown Title="EventPicker" label="Event Type" LabelInline>
                <DropdownItem>4</DropdownItem>
              </Dropdown>
            </Form>
          </StepsItem>
          <StepsItem
            label="Monitor critical workflows"
            value="monitor-workflows"
          >
            <Stack
              directionType={Stack.DIRECTION_TYPE.VERTICAL}
              gapType={Stack.GAP_TYPE.LARGE}
            >
              <StackItem>
                Detect outages and poor performance before your users notice.
              </StackItem>
              <StackItem>
                <Button sizeType={Button.SIZE_TYPE.SMALL}>Learn more</Button>
              </StackItem>
            </Stack>
          </StepsItem>
          <StepsItem label="Configure an alert" value="configure-alert">
            Configure an alert and we'll tell you when to worry.
          </StepsItem>
          <StepsItem label="Query your data" value="query-data">
            Write your first query in our powerful New Relic Query Language
            (NRQL).
          </StepsItem>
          <StepsItem label="Set up a dashboard" value="setup-dashboard">
            Create and share dashboards that matter to you and your team.
          </StepsItem>
        </Steps>
        <Form
          layoutType={Form.LAYOUT_TYPE.SPLIT}
          splitSizeType={Form.SPLIT_SIZE_TYPE.LARGE}
        >
          <TextField
            label="Name"
            description="This name will be used for your alert name, and the underlying Events and Synthetic checks that will be setup"
          />
          <AccountPicker
            label="Account"
            labelInline
            value={this.state.accountId}
            onChange={this.onChangeAccount}
          />
          <MultilineTextField label="Description" placeholder="Optional" />
          <MultilineTextField
            label="NRQL"
            description="Paste your NRQL query here. You can remove the SINCE statement from your query as you will have option further below"
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
          <Switch
            label="Add a Warning Threshold"
            onChange={(e) => alert(`Toggle to: ${e.target.checked}`)}
          />
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
