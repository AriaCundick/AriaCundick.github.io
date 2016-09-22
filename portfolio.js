$(document).ready( function() {

	$("#nav1").css("background-color", "rgba(43, 42, 36, 1)");
	$("#nav1").mouseover( function() 
	{
		//Keep light color on active page
		$("#nav1").css("background-color", "rgba(43, 42, 36, 1)");
		$("#nav2").css("background-color", "rgba(43, 42, 36, 0)");
		$("#nav3").css("background-color", "rgba(43, 42, 36, 0)");

		$("#slide1").css("display", "flex");
		$("#slide2").css("display", "none");
		$("#slide3").css("display", "none");

	});

	$("#nav2").mouseover( function() 
	{
		//Keep light color on active page
		$("#nav1").css("background-color", "rgba(43, 42, 36, 0)");
		$("#nav2").css("background-color", "rgba(43, 42, 36, 1)");
		$("#nav3").css("background-color", "rgba(43, 42, 36, 0)");

		$("#slide1").css("display", "none");
		$("#slide2").css("display", "block");
		$("#slide3").css("display", "none");
	});

	$("#nav3").mouseover( function() 
	{
		//Keep light color on active page
		$("#nav1").css("background-color", "rgba(43, 42, 36, 0)");
		$("#nav2").css("background-color", "rgba(43, 42, 36, 0)");
		$("#nav3").css("background-color", "rgba(43, 42, 36, 1)");

		$("#slide1").css("display", "none");
		$("#slide2").css("display", "none");
		$("#slide3").css("display", "block");
	});

	$(".btnMain").on("click", function(event) {
		if($(window).width() <= 767) {
			$(".btnMain").attr("target", "_blank");
			$(".btnMain").attr("onclick", "blank()");
		}
		
	});


	$("#closeBtn").on("click", function() {
		$("#popup").fadeOut(500, function() {
			$(this).css("display", "none");
			$("iframe").attr("src", "");
		});
	});

})

var createPopup = function() {
	$("#popup").fadeIn().css("display", "block");
}

var blank = function (){};