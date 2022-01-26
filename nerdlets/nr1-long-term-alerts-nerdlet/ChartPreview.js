import react, { Component } from "react";
import { Stack, StackItem, TextField, MultilineTextField, LineChart, AreaChart, BlockText } from "nr1";

class ChartPreview extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
//   this.state = {
//     accountId: null,
//     eventTypes: [],
//     selectedEventType: "Event Type",
//     selectedAggFunc: "Aggregation Functions",
//     attributesArray: [],
//     selectedAttribute: "Attribute",
//     selectedScope: "Attribute",
//     selectedScopeOperator: "Operators",
//     selectedFacet: "Facet",
//     showHideWarning: false,
//     checked: false,
//   };

  _onChange(event, value) {
    this.setState({ value });
  }

  render() {
      console.log(this.props.data.accountId)
    let styles = {
      marginBottom: "10px",
    };

    return (
      <div className="ChartPreview">
          <BlockText>From {this.props.data.selectedEventType} select {this.props.data.selectedAggFunc}({this.props.data.selectedAttribute})</BlockText>
      </div>
    );
  }
}

export default ChartPreview;
