var request = require("request");
var assert = require('assert');

// Define your authentication credentials
const myAccountId = 1943327;
const nrLicenseKey = $secure.LTA_INSIGHTS_API_KEY;
const nrUserKey = $secure.LTA_USER_KEY;

//hard coded for now, these will be variables from the NR1 App
const nrqlEvent = "solarMonitorSample";
const nrqlAggregator = "latest";
const nrqlAttribute = "site.instant_power";
const nrqlSince = " since 24 hours ago";
const nrqlFacet = "";
const nrqlWhere = "";

const nrql =
  "FROM " +
  nrqlEvent +
  " SELECT " +
  nrqlAggregator +
  "(" +
  nrqlAttribute +
  ")" +
  " as 'ltMetric'" +
  nrqlSince;

const query =  JSON.stringify({
  "query":`{
  actor {
    account(id: ${myAccountId}) {
      nrql(query: "${nrql}") {
        results
      }
    }
  }
}`,
  "variables":null
})

const optionsQuery = {
  // Define endpoint URI, https://api.eu.newrelic.com/graphql for EU accounts
  uri: "https://api.newrelic.com/graphql",
  headers: {
    "API-key": nrUserKey,
    "Content-Type": "application/json",
  },
  body: query
};

function getNrqlResults(optionsQuery) {
  request.post(optionsQuery, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    const result = JSON.parse(response.body).data.actor.account.nrql.results[0]
      .ltMetric;
    sendToNR(result);
  });
}

getNrqlResults(optionsQuery);

function sendToNR(ltMetric) {
  var optionsPost = {
    //Define endpoint URL.
    url:
      "https://insights-collector.newrelic.com/v1/accounts/" +
      myAccountId +
      "/events",
    //Define body of POST request.
    json: [{ eventType: nrqlEvent + nrqlAggregator, "value": ltMetric, "metricName": nrqlAttribute }],
    //Define New Relic license key and expected data type.
    headers: {
      "X-Insert-Key": nrLicenseKey,
      "Content-Type": "application/json",
    },
  };
  request.post(optionsPost, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}