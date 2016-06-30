var queryHelper = {
	queries: {},
}

queryHelper.fetchQuery = function() {
	$.each(document.location.search.substr(1).split('&'), function(c,q) {
    	var i = q.split('=');
    	if(i.length >= 2)
    	{
    		queryHelper.queries[i[0].toString()] = i[1].toString();
    	}
  });
  console.log(queryHelper.queries);
}
  