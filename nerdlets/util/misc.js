export function buildNRQL( eventType, attribute, aggFunc, scope, scopeOperator, facet ) {
    let nrql = [
      'FROM ',
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
      facet
    ].join('');

    return nrql;
  }

