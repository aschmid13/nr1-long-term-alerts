export function buildNRQL(
  eventType,
  attribute,
  aggFunc,
  scope,
  scopeOperator,
  scopeValue,
  facet,
  selectedSinceValue,
  selectedSinceOption
) {
  let easyOperators = ["=", "!=", "<", "<=", ">", ">="];
  let likeOperators = ["LIKE", "NOT LIKE"];
  let nullOperators = ["IS NULL", "IS NOT NULL"];
  let scopeStatementArray = [];

  //build a base structure for the NRQL which should be in this format
  //FROM eventType SELECT aggFunc(attribute)

  let basenrql = [
    "FROM ",
    eventType,
    " ",
    "SELECT ",
    aggFunc,
    "(",
    attribute,
    ") ",
  ].join("");

  //Build the SINCE statement
  let sinceStatement = "SINCE ${selectedSinceValue} ${selectedSinceOption} AGO";

    //Build the Facet if it is selected
    if (facet !== "NONE" && facet !== "Facet") {
      let facetStatement = "FACET ${facet}";
    }
  

  //build the WHERE statement depending on what options where selected
  //options are in "Narrow your scope (Optional)" section of Define your Event Stream

  if (scope !== "NONE" && scope !== "Attribute") {
    if (easyOperators.includes(scopeOperator)) {
      scopeStatementArray = [
        "WHERE ",
        scope,
        " ",
        scopeOperator,
        " ",
        scopeValue,
      ];
    } else if (likeOperators.includes(scopeOperator)) {
      scopeStatementArray = [
        "WHERE ",
        scope,
        " ",
        scopeOperator,
        " ",
        "%",
        scopeValue,
        "%",
      ];
    } else if (nullOperators.includes(scopeOperator)) {
      scopeStatementArray = ["WHERE ", scope, " ", scopeOperator, " "];
    } else {
      console.log(
        "I have no idea how you ended up here, this shouldn't be possible"
      );
    }
    let scopeStatement = scopeStatementArray.join("");
  }


  let nrql = [
    "FROM ",
    eventType,
    " ",
    "SELECT ",
    aggFunc,
    "(",
    attribute,
    ") ",
    "WHERE ",
    scope,
    " ",
    scopeOperator,
    " Value ",
    "FACET ",
    facet,
  ].join("");

  return nrql;
}
