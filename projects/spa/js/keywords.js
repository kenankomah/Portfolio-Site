    function keywordExtraction(){
	    $("#key").empty(); //used to prevent duplication by refreshing the elements contents
		var str = $('#text').val();
		var URL = encodeURI(str);
		$.getJSON("http://access.alchemyapi.com/calls/html/HTMLGetRankedKeywords?apikey=8f623214cff2bb60307f9b80227833cc8cb4b5dd&outputMode=json&extract=entity,keyword&language=english&html="+URL, 
		function(result){
		//console.log(str);
			for(i=0;i<result.keywords.length; ++i){
				$("#key").append('<tr><td>' + result.keywords[i].text + '</td>'+ '<td>' + result.keywords[i].relevance + '</td>'+'</tr>');	
			}
		});
	}

	
	function entityExtraction(){
	    $("#ent").empty(); //used to prevent duplication by refreshing the elements contents
	   	var str = $('#text').val();
		var URL = encodeURI(str);
		$.getJSON("http://access.alchemyapi.com/calls/html/HTMLGetRankedNamedEntities?apikey=8f623214cff2bb60307f9b80227833cc8cb4b5dd&outputMode=json&extract=entity,keyword&language=english&html="+URL, 
		function(result){
			for(i=0;i<result.entities.length; ++i){
				$("#ent").append('<tr><td>' + result.entities[i].text + '</td>'+ '<td>' + result.entities[i].type + '</td>'+'</tr>');	
			}
		});	
	}