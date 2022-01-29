import react, { Component } from "react";
import {
  Stack,
  StackItem,
  TextField,
  MultilineTextField,
  LineChart,
  AreaChart,
  BlockText,
} from "nr1";
import { buildNRQL } from "../util/misc.js";

class ChartPreview extends Component {
  constructor() {
    super();
    this.state = {};
  }

  _onChange(event, value) {
    this.setState({ value });
  }

  render() {
    let eventType = this.props.data.selectedEventType;
    let attribute = this.props.data.selectedAttribute;
    let aggFunc = this.props.data.selectedAggFunc;
    let scope = this.props.data.selectedScope;
    let scopeOperator = this.props.data.selectedScopeOperator;
    let facet = this.props.data.selectedFacet;

    let nrql = buildNRQL(
      eventType,
      attribute,
      aggFunc,
      scope,
      scopeOperator,
      facet
    );

    let styles = {
      marginBottom: "10px",
    };

    return (
      <div className="ChartPreview">
        <Stack directionType={Stack.DIRECTION_TYPE.VERTICAL}>
          <StackItem>
            <BlockText>{nrql}</BlockText>
          </StackItem>
          <StackItem>
            <LineChart accountIds={[this.props.data.accountId]} query={nrql} />
          </StackItem>
        </Stack>
      </div>
    );
  }
}

export default ChartPreview;
