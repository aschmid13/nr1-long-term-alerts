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

//maybe this would be better as a straight up function instead of this. the function creates the NRQL Object and returns that plus a string.

class NRQLBuilder extends Component {
  constructor() {
    super();
    this.state = {};

  }

  _onChange(event, value) {
    this.setState({ value });
  }

  buildNRQL() {
    let nrql = [
      'FROM ',
      this.props.data.selectedEventType,
      " ",
      "SELECT ",
      this.props.data.selectedAggFunc,
      "(",
      this.props.data.selectedAttribute,
      ") ",
      "WHERE ",
      this.props.data.selectedScope,
      " ",
      this.props.data.selectedScopeOperator,
      " Value ",
      "FACET ",
      this.props.data.selectedFacet,
    ].join('');

    return nrql;
  }

  render() {
    let accountId = this.props.data.accountId;
    let eventType = this.props.data.selectedEventType;
    let attribute = this.props.data.selectedAttribute;
    let aggFunc = this.props.data.selectedAggFunc;
    let scope = this.props.data.selectedScope;
    let scopeOperator = this.props.data.selectedScopeOperator;
    let facet = this.props.data.selectedFacet;

    console.log(this.props.data.accountId);

    let nrql = [
        "FROM ",
        this.props.data.selectedEventType,
        " ",
        "SELECT ",
        this.props.data.selectedAggFunc,
        "(",
        this.props.data.selectedAttribute,
        ") ",
        "WHERE ",
        this.props.data.selectedScope,
        " ",
        this.props.data.selectedScopeOperator,
        " Value ",
        "FACET ",
        this.props.data.selectedFacet,
      ].join('');
    
    return (
      <div className="NRQLBlock">
        <BlockText>
            {nrql}
        </BlockText>
      </div>
    );
  }
}

export default NRQLBuilder;
