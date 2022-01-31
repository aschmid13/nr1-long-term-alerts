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
console.log(selectedSinceValue);
console.log(selectedSinceOption);
  //Build the SINCE statement
  let sinceStatement = "SINCE ${selectedSinceValue} ${selectedSinceOption} AGO";

    //Build the Facet if it is selected
    if (facet !== "NONE" && facet !== "Facet") {
      let facetStatement = "FACET ${facet}";
    }

  let scopeStatement = "";
  let facetStatement = "";
  let nrql = "";
 
  

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


  if (scopeStatement && facetStatement) {
    console.log("condition includes where and facet")
    let nrql = basenrql.concat(scopeStatement, facetStatement,sinceStatement);
    console.log(nrql);
  }else if (!scopeStatement && facetStatement ) {
    console.log("matched on no where statement but there is a facet")
    let nrql = basenrql.concat(facetStatement,sinceStatement);
    console.log(nrql);
  }else if (scopeStatement && !facetStatement) {
    console.log("matched on no facet statement but there is a where clause");
    let nrql = basenrql.concat(scopeStatement,sinceStatement);
    console.log(nrql);
  } else if(!scopeStatement && !facetStatement) { 
    console.log("Neither where clause or a facet statement where found");
    let nrql = basenrql.concat(sinceStatement);
    console.log(nrql);
    console.log(sinceStatement);
  }


  // let nrql = [
  //   "FROM ",
  //   eventType,
  //   " ",
  //   "SELECT ",
  //   aggFunc,
  //   "(",
  //   attribute,
  //   ") ",
  //   "WHERE ",
  //   scope,
  //   " ",
  //   scopeOperator,
  //   " Value ",
  //   "FACET ",
  //   facet,
  // ].join("");

  return nrql;
}


// //this is how it should go I think
//FROM EVENTSOURCE SELECT AGG(ATTR) WHERE ATTR OP SCOPEVALUE FACET ATTR SINCE X AGO
//Required part: FROM EVENTTYPE SELECT AGG(ATTR) SINCE X AGO
//Optional part 1: WHERE SCOPEATTR OP SCOPEVALUE
//Optional part 2: WHERE 

// testing this line too

