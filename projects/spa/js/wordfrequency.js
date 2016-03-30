	var res = [];
	var words = {};
	var listen = setInterval(inactivityTime,1);
	var listen1 = setInterval(listener,1);
	var listen2 = setInterval(compare,1);
	var t = 0;
	var diff =[];
	var n;
	
		
	function counter(){
 	    var str = $('#text').val();//grabs the text from the textarea and stores it as a string in the variable str
		str = str.toLowerCase();	
		str = str.replace(/\W/g, " "); //removes non alpha-numeric characters
		str = str.replace(/[0-9]/g," ");//removes any numbers
		var res = str.split(' '); //each word is save as an element in the array res
			
		for(i=0; i<res.length; ++i){
		    words[res[i]] = {name:res[i],count:0};	//words object is created 
		}
		
		for(i=0; i<res.length; ++i){
			if(str.search(res[i])!= -1){// checks to see is a word is repeated
				words[res[i]].count += 1; //increments for each repetition found
			}			
		}
      
	    $("ul").empty(); // used to prevent duplications of content
		for(i=0; i<res.length; ++i){
			if(words[res[i]].name!=''){// prevents blank spaces from being counted
				$("#word").append('<li><b>' + words[res[i]].name + '<i class="blue">' + "(" + words[res[i]].count+ '<i>' + ")" +'</b>'+'</li>'+' ');
            }	//each word along with their count is dynamically added to the HTML		
        }
		
		var seen = {}; //creates an empty object 
		$('li').each(function(){  //the each method loops through the li's'
		    var txt = $(this).text(); // stores the text of the each li in the variable txt
			if (seen[txt])  // checks to see if the text already exists (duplicates)
				$(this).remove(); // removes any duplicates
			else
				seen[txt] = true; //the text is set as a key in the object seen and given a value of true
		});
		
	}
	
	var key = {
		pressed: {},

		counter: 32,  //Enter
		counter1: 190, // fullstop
		counter2: 8, //backspace
		
		isDown: function(keyCode){
			return this.pressed[keyCode];
		},
		onKeydown: function(event){
			this.pressed[event.keyCode] = true;
		},
		onKeyup: function(event){
			delete this.pressed[event.keyCode];
		},
	};
        
	window.addEventListener('keyup', function(event) { key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { key.onKeydown(event); }, false);

	
	function listener(){
		if (key.isDown(key.counter)) { counter();}  //call counter whenever enter key is pressed
		if (key.isDown(key.counter1)) { counter();} //call counter whenever full-stop key is pressed
		if (key.isDown(key.counter2)) { counter();} //call counter whenever backspace key is pressed
	};
	
	function inactivityTime() {
	    var d = new Date();
        n = d.getTime(); //gets the current time
	}
		
	function time(){
		diff.push(n); //time of last key stroke is put into the array diff. It listens out for the keyup event
	}
	
	function compare(){
		if((n - diff[diff.length-1])>2000){ //compares current time to the time of the last key stroke
		    counter();
		}
	}