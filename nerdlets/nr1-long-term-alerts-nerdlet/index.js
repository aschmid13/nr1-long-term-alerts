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
  BlockText,
  CheckboxGroup,
  Checkbox,
} from "nr1";
import {
  buildAttributeQueries,
  buildEventTypeQueries,
} from "../util/graphqlbuilders";
import { EventSelector } from "../form-components/event-selector";
import "../util/config-create.js";
import { submitConfig } from "../util/config-create.js";

//supported aggregation types that will be used in a drop down.
//The selected aggreagation function will be used to build a query
let AggregateOptions = [
  "Average",
  "Count",
  "Sum",
  "latest",
  "Median",
  "Max",
  "Min",
  "UniqueCount",
];

let Operators = [
  "=",
  "!=",
  "<",
  "<=",
  ">",
  ">=",
  "LIKE",
  "NOT LIKE",
  "IS NULL",
  "IS NOT NULL",
];

export default class Nr1LongTermAlertsNerdletNerdlet extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      accountId: null,
      eventTypes: [],
      selectedEventType: "Event Type",
      selectedAggFunc: "Aggregation Functions",
      attributesArray: [],
      selectedAttribute: "Attribute",
      selectedScope: "Attribute",
      selectedScopeOperator: "Operators",
      selectedFacet: "Facet",
      checked: false,
    };

    this.onChangeAccount = this.onChangeAccount.bind(this);

    this._onChange = this._onChange.bind(this);
  }

  //When an account from the drop down is selected:
  //We run a query to get the Eventtypes from teh account and
  //set the account ID to the state as well.
  onChangeAccount(_, value) {
    NerdGraphQuery.query(buildEventTypeQueries(value)).then(({ data }) => {
      const eventTypeSet = new Set();
      console.log(data.actor.query);
      Object.keys(data.actor)
        .filter((i) => i.includes("query"))
        .forEach((query) => {
          data.actor[query].nrql.results.forEach((eventTypeObj) => {
            eventTypeSet.add(eventTypeObj.eventType);
          });
        });
      const eventTypes = Array.from(eventTypeSet).sort();
      this.setState({
        eventTypes,
      });
    });

    this.setState({ accountId: value });
  }

  _onChange(event, value) {
    this.setState({ value });
  }

  //EventType the user selects is added to the state
  //will be used to build a NRQL query
  //Also making a Nerdgraph call to pull attributes within the event.
  onChangeEvent(evt) {
    NerdGraphQuery.query(buildAttributeQueries(this.state.accountId, evt)).then(
      ({ data }) => {
        const attributeSet = new Set();
        Object.keys(data.actor)
          .filter((i) => i.includes("query"))
          .forEach((query) => {
            data.actor[query].nrql.results.forEach((attributeObj) => {
              attributeSet.add(attributeObj.key);
            });
          });
        const attributesArray = Array.from(attributeSet).sort();
        this.setState({
          attributesArray,
        });
      }
    );

    this.setState({ selectedEventType: evt });
  }

  //Aggreagation Function the user selects is added to the state
  //will be used to build a NRQL query
  onChangeAggFunc(aggFunc) {
    this.setState({ selectedAggFunc: aggFunc });
  }

  onChangeAttr(attr) {
    this.setState({ selectedAttribute: attr });
  }

  onChangeScope(attr) {
    this.setState({ selectedScope: attr });
  }

  onChangeOperator(operator) {
    this.setState({ selectedScopeOperator: operator });
  }

  onChangeFacet(attr) {
    this.setState({ selectedFacet: attr });
  }
  //This doesn't work!!!
  // onWarningSwitch() {
  //   let initialChecked;
  //   this.setState(({ checked }) => {
  //     initialChecked = checked;

  //     return {
  //       checked : !checked
  //     }
  //   })
  // }

  render() {
    let styles = {
      marginRight: "20px",
      marginLeft: "20px",
      marginTop: "20px",
    };
    let elementStyle = {
      marginBottom: "10px",
    };
    return (
      <div style={styles}>
        <Steps defaultValue="Event-Stream">
          <StepsItem label="HII Define Your Event Stream" value="Event-Stream">
            <p style={elementStyle}>
              Build a NRQL Query that will be used under the hood. A constructed
              NRQL Query will be shared with you below.
            </p>
            <Form>
              {/* <TextField
                label="Name"
                description="This name will be used for your alert name, and the underlying Events and Synthetic checks that will be setup"
              /> */}
              <AccountPicker
                label="Account"
                labelInline
                value={this.state.accountId}
                onChange={this.onChangeAccount}
              />

              <Dropdown
                items={this.state.eventTypes}
                title={this.state.selectedEventType}
                label="Select the EventType the alert will be based on"
              >
                {({ item, index }) => (
                  <DropdownItem
                    key={index}
                    onClick={() => this.onChangeEvent(item)}
                  >
                    {item}
                  </DropdownItem>
                )}
              </Dropdown>
              <Dropdown
                items={this.state.attributesArray}
                title={this.state.selectedAttribute}
                label="What is the attribute that is being analyzed?"
              >
                {({ item, index }) => (
                  <DropdownItem
                    key={index}
                    onClick={() => this.onChangeAttr(item)}
                  >
                    {item}
                  </DropdownItem>
                )}
              </Dropdown>
              <Dropdown
                items={AggregateOptions}
                title={this.state.selectedAggFunc}
                label="Choose your aggregation function"
              >
                {({ item, index }) => (
                  <DropdownItem
                    key={index}
                    onClick={() => this.onChangeAggFunc(item)}
                  >
                    {item}
                  </DropdownItem>
                )}
              </Dropdown>
              <Dropdown
                items={this.state.attributesArray}
                title={this.state.selectedScope}
                label="Narrow your Scope (optional)"
              >
                {({ item, index }) => (
                  <DropdownItem
                    key={index}
                    onClick={() => this.onChangeScope(item)}
                  >
                    {item}
                  </DropdownItem>
                )}
              </Dropdown>
              <Stack verticalType={Stack.VERTICAL_TYPE.FILL_EVENLY}>
                <StackItem>
                  <Dropdown
                    items={this.state.attributesArray}
                    title={this.state.selectedScope}
                    label="Narrow your Scope (optional)"
                  >
                    {({ item, index }) => (
                      <DropdownItem
                        key={index}
                        onClick={() => this.onChangeScope(item)}
                      >
                        {item}
                      </DropdownItem>
                    )}
                  </Dropdown>
                </StackItem>
                <StackItem>
                  <Dropdown
                    items={Operators}
                    title={this.state.selectedScopeOperator}
                    label="Operators"
                  >
                    {({ item, index }) => (
                      <DropdownItem
                        key={index}
                        onClick={() => this.onChangeOperator(item)}
                      >
                        {item}
                      </DropdownItem>
                    )}
                  </Dropdown>
                </StackItem>
                <StackItem>
                  <TextField label="Value" />
                </StackItem>
              </Stack>

              <Dropdown
                items={this.state.attributesArray}
                title={this.state.selectedFacet}
                label="Select your Facet, or GroupBy (Optional)"
              >
                {({ item, index }) => (
                  <DropdownItem
                    key={index}
                    onClick={() => this.onChangeFacet(item)}
                  >
                    {item}
                  </DropdownItem>
                )}
              </Dropdown>
            </Form>
          </StepsItem>
          <StepsItem label="Configure Your Alert" value="Alert-Data">
            {/* Tell us about what you'd like to alert on. */}
            <Form>
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
              <Switch label="Add a warning threshold" />
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
              <MultilineTextField label="Description" placeholder="Optional" />
              <TextField label="runbookUrl" />
            </Form>
          </StepsItem>
          <StepsItem label="Confirm & Complete Setup" value="monitor-workflows">
            <Stack
              directionType={Stack.DIRECTION_TYPE.VERTICAL}
              gapType={Stack.GAP_TYPE.LARGE}
            >
              <StackItem>
                How's your config look?
              </StackItem>
              <StackItem>
                <Button
                  type={Button.TYPE.PRIMARY}
                  iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__FILE__A_ADD}
                  onClick={() => submitConfig()}
                >
                  Confirm and Create
                </Button>
              </StackItem>
            </Stack>
          </StepsItem>
        </Steps>
        <Form
          layoutType={Form.LAYOUT_TYPE.SPLIT}
          splitSizeType={Form.SPLIT_SIZE_TYPE.LARGE}
        ></Form>
      </div>
    );
  }
}
