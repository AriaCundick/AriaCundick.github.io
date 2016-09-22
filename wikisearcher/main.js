var nav = true;
var firstSearch = false;
var target="iframe1";
var onCF = "wikiViewer()";

$(document).ready(function() {
if ($(window).width() <= 767) {
  target="_blank";   
  onCF = "";
}

$("#btn").on("click", function() {
  wikiViewer();
});

//If the user presses enter on the search bar, trigger the find button click.
$("#searchBar").keydown(function(event){
    if(event.keyCode == 13){
        $("#findBtn").click();
    }
});

$("#findBtn").click(function() {
  //Hide the initial text.
  if(!firstSearch) {
    $("#load").slideUp();
    firstSearch = true;
  }
  //Get value from search bar and clear it.
  var txt = $("#searchBar").val();
  
  $("#list").empty();

  //Request a list of data related to the keyword from the wiki API.
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&callback=?&srsearch=" + txt + "&srprop=titlesnippet%7Csnippet",
    function(data) {
      var arr = [];
      //Dynamically add new list element
      for (var i = 0; i < data.query.search.length; i++) 
      {
        arr.push('<a onclick="'+ onCF +'"  href="https://en.wikipedia.org/wiki/' + data.query.search[i].title + '" target="'+target+'" style="text-decoration:none;color:black"><li><strong>' + data.query.search[i].title + "</strong><br/><br/>" + data.query.search[i].snippet + '</li></a>')
        $("#list").append(arr[i]);
      }
    });
});


})

var wikiViewer = function() {
  if (nav) {
    nav = false;
    $("#contentSearch").fadeOut(500, function() {
      $(this).css("display", "none");
      $("#contentPrint").css("z-index", "2");
      $("body").css("overflow-y", "visible");
    });
  } else {
    nav = true;
    $("#contentSearch").fadeIn(500).css("display", "inline");
    $("#contentPrint").css("z-index", "-1");
    $("body").css("overflow-y", "hidden");
  }
};