//Auto play boolean for yt video.
playOnClick = false;  

//New Quote button
$("#qtBtn").on("click", function() {
  if (location.protocol === 'https:') 
    $("#quoteText").html("Please change your URL protocol to http")
  else {
  //start the video only once.
  if(!playOnClick)
  {
    $("#wanderly").attr("src", "https://www.youtube.com/embed/VGNwXq6vPoI?autoplay=1");
    playOnClick=true;
  }
  
  //Fade out text before requesting for a new JSON-object quote
  $("#quoteText").fadeOut(1000, function() {
    var html = "";
    $.getJSON('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=35', function(json) {
      
      //Randomize the index for the quotes pulled from the database
      var index = Math.floor(Math.random() * 35)
      while((json[index].content + " -" + json[index].title).length > 147)
        index = Math.floor(Math.random() * 35)
      html = json[index].content + "-" + json[index].title + "";
      
      //Change the quote
      $("#quoteText").html(html)
      
      //find index of </p> for the quote substring.
      var twitterQuote = json[index].content;
      var endQuote = 7;
      var match = /<\/p>/.exec(twitterQuote);
      if(match) 
        endQuote = twitterQuote.length - (match.index);
      
  twitterQuote = twitterQuote.substring(3,twitterQuote.length-endQuote);
      //freplace all special chars with html code
      var tweet = encodeURIComponent(twitterQuote + " -" + json[index].title);
      //Update twitter link
      $("#twitterQuote").attr("href", "https://twitter.com/intent/tweet/?text=" + tweet );
    });
    
    //Fade in the quote
    $(this).fadeIn(1000);
  });
  }
});