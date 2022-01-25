import react, { Component } from "react";

class AlertClass {
    constructor(
        nrql,
        runbookURL,
        cOperator, 
        cThreshold,
        cTDuration,
        cTOccurance,
        includeWarning,
        wOperator,
        wThreshold,
        wTDuration,
        wTOccurance,
        description) {
      this.nrql = nrql;
      this.runbookURL = runbookURL;
      this.cOperator = cOperator;
      this.cThreshold = cThreshold;
      this.cTDuration = cTDuration;
      this.cTOccurance = cTOccurance;
      this.includeWarning = includeWarning;
      this.wOperator = wOperator;
      this.wThreshold = wThreshold;
      this.wTDuration = wTDuration;
      this.wTOccurance = wTOccurance;
      this.description = description

    }
  }


export default AlertClass;