$(document).ready(function(){

	$("#code").val("") ;
    console.log($("#send").is(":disabled"));
var i = 0;
var message;
var timerId;
	var sliced ="";
    $("#send").click(function(){
    	document.getElementById("send").disabled = true;
    	is_done = false;
    	i = 0;
    	console.log("you clicked");
    	message = $("#code").val().replace(/\n/g, "$");
    	mypost(message.length);
    	timerId = setInterval(wait_run , 300);
    });

    $("#clear").click(function(){
    	if (is_compiled) {
    		document.getElementById("clear").disabled = true;
    		$.post("/upload/sketch" , {} , 
    			function(data , status){
    				console.log("uploaded: ",status);
    		});
    	}
    });

    setInterval(test_text, 300);

var is_done = false;
var is_compiled = false;
function wait_run(){
	    if((sliced =  message.substring(i, i+10)) != ""){
    	console.log(sliced);
    	mypost(sliced);
    	i = i + 10;
    	}else{
    		if(!is_done){
    		mypost("done");
    		setTimeout(function(){
    			$.get("../erreurs.txt" , function(data , status){
    				console.log(data);
    				console.log("done");
    				document.getElementById("send").disabled = false;
    				is_compiled = true;
    				document.getElementById("clear").disabled = false;
    		});
    		} , 6000);
    		clearInterval(timerId);
    		is_done = true;
    	}
    }
}
	
   	function mypost(message_tosend){
   		this.message_tosend = message_tosend;
   		if(this.message_tosend.length != 0){
    	 const xhr = new XMLHttpRequest();		
		xhr.open('POST', '/ihave/sketch');
		xhr.setRequestHeader('message' , this.message_tosend);
		xhr.setRequestHeader('Content-Type', 'application/xml');
		xhr.send(this.message_tosend);
	}
	}


    function test_text(){
    	    if($("#code").val().length == 0){
    	document.getElementById("send").disabled = true;
    }
    else{
    	document.getElementById("send").disabled = false;
    }

    if ($("#send").is(":disabled")) {
    	$("#send").css({"cursor" : "not-allowed" });
    }
    else{
    	$("#send").css({"cursor" : "pointer" });
    }
    
    if ($("#clear").is(":disabled")) {
    	$("#clear").css({"cursor" : "not-allowed" });
    }
    else{
    	$("#clear").css({"cursor" : "pointer" });
    }
    }
    
    


    $(document).delegate('#code', 'keydown', function(e) {
  var keyCode = e.keyCode || e.which;

  if (keyCode == 9) {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    $(this).val($(this).val().substring(0, start)
                + "\t"
                + $(this).val().substring(end));

    // put caret at right position again
    this.selectionStart =
    this.selectionEnd = start + 1;
  }
});


});