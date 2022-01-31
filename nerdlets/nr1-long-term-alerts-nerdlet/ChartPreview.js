import react, { Component } from "react";
import {
  Stack,
  StackItem,
  TextField,
  MultilineTextField,
  LineChart,
  AreaChart,
  BlockText,
  BillboardChart,
  ChartGroup,
  HeadingText,
} from "nr1";
import { buildNRQL } from "../util/nrqlBuilder";

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
    let scopeValue = this.props.data.scopeValue;
    let facet = this.props.data.selectedFacet;
    let sinceOption = this.props.data.selectedSinceOption;
    let sinceValue = this.props.data.selectedSinceValue;

    let nrql = buildNRQL(
      eventType,
      attribute,
      aggFunc,
      scope,
      scopeOperator,
      scopeValue,
      facet,
      sinceOption,
      sinceValue
    );
    console.log('NRQL FOR THE CHART IS: ' + nrql)

    let styles = {
      marginBottom: "10px",
    };
    const billboardStyle = { height: 100 };

    return (
      <div className="ChartPreview">
        <Stack directionType={Stack.DIRECTION_TYPE.VERTICAL}
        fullWidth>
          <StackItem>
            <HeadingText type={HeadingText.TYPE.HEADING_3} >Your NRQL Query</HeadingText>
          </StackItem>
          <StackItem>
            <BlockText type={BlockText.TYPE.PARAGRAPH}>{nrql}</BlockText>
          </StackItem>
          <StackItem>
            <BillboardChart
            style = {billboardStyle} 
            accountIds={[this.props.data.accountId]}
            query= {nrql} />
          </StackItem>
          <StackItem>
            <LineChart 
            accountIds={[this.props.data.accountId]} 
            query={nrql + ' TIMESERIES'} />
          </StackItem>
        </Stack>
      </div>
    );
  }
}

export default ChartPreview;
