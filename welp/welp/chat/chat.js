$(document).ready(function(){
	var msg; 
	var i = 0;
	var name = "";
	var oldmsg;
$("#chat-popup , #text_here , #send_msg ,#onlylab , #btn").hide();
$('#submitname').click(function(){
	name = $("#getname").val();
	if(name != ""){
		$("#cont").remove();
		$("#chat-popup , #text_here , #send_msg ,#onlylab , #btn").show();
	}
});


$("#btn").click(function(){

	if(name != ""){
	msg = $("#send_msg").val();
	if ( msg != '' && msg.charAt(0) != " ") {

const xhr = new XMLHttpRequest();
xhr.open('POST', '/cmd/toserv');
xhr.setRequestHeader('name', name);
xhr.setRequestHeader('message' , msg);
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.send(msg); 

	}
}
});
var old = "";
var pos;
var names;
setInterval(function(){

	$.get("../chat.txt" , {} , function(data){
		if(old != data){

		pos = data.search("&");
		names = data.slice(0,pos);

		msg = data.slice(pos+1,data.length);
		names = names.replace(/[+]/g," ");	
		msg = msg.replace(/[+]/g," ");	
		if (name != names) {
		$("<div>" + names+' : '+msg + "</div><br>").appendTo("#text_here").addClass("mines");
			i++;
		}
		else{
		$("<div>" + names+' : '+msg + "</div><br>").appendTo("#text_here")
		.addClass("yours");
			i++;
		}
			old = data ;
			
		}
	});

},1000);




});
