export function buildNRQL(
  eventType,
  attribute,
  aggFunc,
  scope,
  scopeOperator,
  scopeValue,
  facet,
  sinceOption,
  sinceValue
) {
  let easyOperators = ["=", "!=", "<", "<=", ">", ">="];
  let likeOperators = ["LIKE", "NOT LIKE"];
  let nullOperators = ["IS NULL", "IS NOT NULL"];

  let scopeStatement = "";
  let facetStatement = "";
  let nrql = "";

  //build a base structure for the NRQL which should be in this format
  //FROM eventType SELECT aggFunc(attribute)

  let basenrql =
    "FROM " + eventType + " " + "SELECT " + aggFunc + "(" + attribute + ") ";

  //Build the SINCE statement
  let sinceStatement = "SINCE " + sinceValue + " " + sinceOption + " AGO";

  //Build the Facet if it is selected
  if (facet !== "NONE" && facet !== "Facet") {
    facetStatement = 'FACET ' + facet + ' ';
  }

  //build the WHERE statement depending on what options where selected
  //options are in "Narrow your scope (Optional)" section of Define your Event Stream
  console.log('scope is: '+ scope + ' and scope operator is: ' + scopeOperator + ' and scope value is : ' + scopeValue);
  if (scope !== "NONE" && scope !== "Attribute") {
    console.log('Scope was updated to something other than NONE or default Attribute filler');
    if (easyOperators.includes(scopeOperator)) {
      console.log('scope operator is one of the easyOperators');
      scopeStatement = 'WHERE ' + scope + ' ' + scopeOperator + ' ' + scopeValue + ' ' ;
    } else if (likeOperators.includes(scopeOperator)) {
      console.log('Scope operator is one of the like options');
      scopeStatement = 'WHERE ' + scope + ' ' + scopeOperator + ' ' + '%' + scopeValue + '% ' ;
    } else if (nullOperators.includes(scopeOperator)) {
      console.log('scope operator is a Null option ');
      scopeStatement = 'WHERE ' + scope + ' ' + scopeOperator + ' ';
    } else {
      console.log(
        "I have no idea how you ended up here, this shouldn't be possible"
      );
    }
  }

//Build the final NRQL Structure, always start with the baseNRQL, then add:
//WHERE AND / OR FACET depending on if they were selected
// lastly wrap with the SINCE Statement
  if (scopeStatement && facetStatement) {
    console.log("condition includes where and facet");
    nrql = basenrql.concat(scopeStatement, facetStatement, sinceStatement);
    console.log(nrql);
  } else if (!scopeStatement && facetStatement) {
    console.log("matched on no where statement but there is a facet");
    nrql = basenrql.concat(facetStatement, sinceStatement);
    console.log(nrql);
  } else if (scopeStatement && !facetStatement) {
    console.log("matched on no facet statement but there is a where clause");
    nrql = basenrql.concat(scopeStatement, sinceStatement);
    console.log(nrql);
  } else if (!scopeStatement && !facetStatement) {
    console.log("Neither where clause or a facet statement were found");
    nrql = basenrql.concat(sinceStatement);
    console.log(nrql);
  }


  return nrql;
}

