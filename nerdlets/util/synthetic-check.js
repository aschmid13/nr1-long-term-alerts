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
  // body: JSON.stringify({
  //   query: `
  //     "query" getNrqlResults($accountId: Int!, $nrql: Nrql!) {
  //       actor {
  //         account(id: $accountId) {
  //           nrql(query: $nrql) {
  //             results
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   variables: {
  //     accountId: Number(myAccountId),
  //     nrql: nrql,
  //   },
  // }),
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

// // Define expected results using callback function
// function callback(err, response, body) {
//   // Log JSON results from endpoint to Synthetics console
//   console.log(JSON.parse(body).data.actor.account.nrql.results[0].ltMetric);
//   console.log("Script execution completed");

//   //Make POST request, passing in options and callback.
//   $http.post(optionsPost, callback);
// }

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

// // Make POST request, passing in options and callback
// $http.post(optionsQuery, callback);
