var collapseNav = false;
var players = [];
var listCounter = 0;
var items = [];
var users = ["freecodecamp", "persianboyswaq", "brunofin"];
/* TEMPORARY CHANGE */
$("#navBtn").css("display", "none");
/* TEMPORARY CHANGE */

/*var e = document.getElementByClass('.item');
e.onmouseover = function() {
  document.getElementById('popup').style.display = 'block';
}
e.onmouseout = function() {
  document.getElementById('popup').style.display = 'none';
}*/
$(document).ready(function() {
  //if not on mobile device, bind functions to some buttons.
  if ($(window).width() > 768) {
    $("#navBtn").on("click", onlineSort);
    $("#list a li a").on("click", function(e) {
      e.stopPropagation();
    });
  }

  //Fetch data with an ajax call.
  getData();
});

//After all ajax requests complete, sort the list just to ensure display quality.


//Player object constructor
var Player = function() {
  this.display_name = "";
  this.name = "";
  this.header = "";
  this.bio = "";
  this.status = "";
  this.followers = "Unknown";
  this.viewers = 0;
  this.channelLink = "#";
  this.game = "";
  this.online = "";
  this.preview = "";
  this.logo = "";
};

//Convert data from the ajax request to Player data if they are online
var organizeData = function(channels) {
  var p;
  var s;
  for (var i = 0; i < channels.length; i++) {
    p = new Player();
    s = channels[i];
    p.display_name = s.channel.display_name;
    p.name = s.channel.name;
    p.status = s.channel.status;
    p.followers = s.channel.followers;
    p.viewers = s.viewers;
    p.channelLink = s.channel.url
    p.game = s.game;
    p.preview = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + s.channel.name + "-500x290.jpg";
    p.logo = s.channel.logo.substring(0, s.channel.logo.lastIndexOf('-')) + "-50x50" + s.channel.logo.substring(s.channel.logo.lastIndexOf("."));
    if (s === null) {
      p.online = "offline";
      p.header = p.name + " is currently offline";
    } else if (s !== null) {
      p.online = "online";
      p.header = '<img  src="' + p.logo + '"/> ' + p.display_name + " is currently streaming <strong><u>" + p.game + "</u></strong>";
    }

    //Append the user to the list
    players.push(p);
    items.push('<li id="' + listCounter + '"  class="item ' + p.online + '" value="' + p.game + '"><img src="' + p.logo + '"/><a href="' + p.channelLink + '"class="wrapLink" target="_blank">' + p.display_name + '<a target="_blank" href="' + p.channelLink + '" class="listBtn"></a></a></li>');

    $("#list").append(items[listCounter++]);
  }
};

//Convert data from the ajax request to Player data if they are offline
var offlineAcc = function(user, num) {
  $.getJSON("https://api.twitch.tv/kraken/users/" + user + "?client_id=8f6k38k6ylmfiqzcncxr9ieh9zsbgtj", function(data1) {
    var u = new Player();
    u.display_name = data1.display_name;
    u.name = data1.name;
    u.online = "offline";

    if (num === 1)
      u.header = u.display_name + " is currently offline";
    else
      u.header = u.display_name + "'s account doesn't exist anymore.";

    if (num === 1) {
      u.channelLink = "http://www.twitch.tv/" + u.display_name;
      u.preview = data1.logo;
      u.logo = data1.logo.substring(0, data1.logo.lastIndexOf('/')) + "/" + u.name + "-" + data1.logo.substring(data1.logo.lastIndexOf("profile"), data1.logo.lastIndexOf("-")) + "-50x50" + data1.logo.substring(data1.logo.lastIndexOf("."));
    }
    else
      u.logo = "http://icons.iconarchive.com/icons/paomedia/small-n-flat/48/sign-ban-icon.png";

    items.push('<li id="' + listCounter + '" class="item offline"><img  src="' + u.logo + '"/><a class="wrapLink" target="_blank" href="' + u.channelLink + '">' + u.display_name + '<a target="_blank" href="' + u.channelLink + '" class="listBtn"></a></a></li>');

    $("#list").append(items[listCounter++]);
    players.push(u);

  }).done(function() {
    offlineHover(num);
  });
}

var getData = function() {
  //Get the list of data by games based on popularity
  getGames(getStreams);

  
  
};

//Get data using game query (most popular that are being live streamed now).
var getGames = function(callback) {
  var games = [];
  $.getJSON("https://api.twitch.tv/kraken/games/top?limit=5&client_id=8f6k38k6ylmfiqzcncxr9ieh9zsbgtj", function(data) 
  {
    for (var i = 0; i < data.top.length; i++)
      games.push(data.top[i].game.name);
    
    callback(games);
    //Get the list of data by users based on the premade array of usernames
    for (var x = 0; x < users.length; x++)
      getUser(users[x]);
    
  }).done(function() {onlineSort(items);}).fail(function() 
    {
      games = ["Overwatch", "Pokémon%20Go", "Hearthstone%3A%20Heroes%20of%20Warcraft"];
      callback(games);
    });
};

//Callback function for finding current, popular streams.
var getStreams = function(games) {
  for (var i = 0; i < games.length; i++)
    getStream(games[i]);
};

//Get data using the stream query
var getStream = function(game) {

  $.getJSON("https://api.twitch.tv/kraken/streams?game=" + game + "&limit=3&client_id=8f6k38k6ylmfiqzcncxr9ieh9zsbgtj", function(data) 
  {
    var channels = [];
    channels.push(data.streams[0], data.streams[1], data.streams[2]);
    organizeData(channels);
  }).done(function() { onlineHover(); /*update the event handlers*/});
};

//get stream by username
var getUser = function(user) {
  $.getJSON("https://api.twitch.tv/kraken/streams/" + user + "?client_id=8f6k38k6ylmfiqzcncxr9ieh9zsbgtj", function(data) 
  {
    if (data.stream !== null) 
    {
      var channels = [];
      channels.push(data.stream)
      organizeData(channels);
    } 
    else if (data.stream === null)
      offlineAcc(user, 1);

  }).done(function() {onlineSort(items);}).fail(function() { offlineAcc(user, 2);/* update event handlers*/});
}

var collapse = function() {
  /*if (!collapseNav) {
    $("#navBtn").hide();
    $("#list li a").fadeOut(400);
    collapseNav = true;
    $("#frame").css("min-width", "100%");
    $("#navBtn").delay(900).show(0);
  } else {
    $("#navBtn").hide(0);
    collapseNav = false;
    $("#frame").css("min-width", "calc(100% - 600px)");
    $("#list li a").fadeIn(1000);
    
    if (!isBelow())
      $("#navBtn").delay(900).show(0);
  }*/
};

var isBelow = function() {
  return $("#sideNav").scrollTop() > $("#navBtnWrapper").offset().top;
};

//bubble sort for # of viewers.
/*var sortViewers = function(arr) {
  var temp, a, b;
  var swapped = false;
      //$("#channelHeader").append(arr[i].substring(9, arr[i].substring(9).firstIndexOf('"')))

  do {
    swapped = false;
    
    for(var i = 0; i < arr.length - 1; i++)
      {
        
        a = players[arr[i].substring(arr[i].substring(9, arr[i].substring(9).firstIndexOf('"')))];
        
        b =  players[arr[i+1].substring(arr[i+1].substring(9, arr[i+1].substring(9).firstIndexOf('"')))];
        if(a.viewers < b.viewers)
          {
            temp = arr[i+1];
            arr[i+1] = arr[i];
            arr[i] = temp;
            swapped = true;
          }
        
      }
    
  }while(swapped);
  
  return arr;
}*/

//bubble sort for online players to offline players.
var sort = function(arr) {
  var temp;

  for (var x = 0; x < arr.length; x++)
    for (var i = x + 1; i < arr.length - 1; i++) 
      if (arr[i].search("offline") > 0) {
        temp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = temp;
      }
    
  return arr;
}

var onlineSort = function() {
  $("#list").empty();
  var temp = sort(items);
  for (var i = 0; i < items.length; i++)
    $("#list").append(temp[i]);

  //recall handler functions
  onlineHover();
  offlineHover(1);
};

//Event handler for hovering over an online list item.
var onlineHover = function() {
  if ($(window).width() > 768) {
    var html = "";
    $(".online").on("mouseover", function() {
      var i = $(this).attr("id");
      $("#channelHeader").html(players[i].header);
      $("#status").html("<span style=\"font-size:25px\">STATUS:</span></span><br/>" + players[i].status);
      $("#followers").html("<span style=\"font-size:25px\">FOLLOWERS:</span><br/>" + players[i].followers);
      $("#viewers").html("<span style=\"font-size:25px\">VIEWERS:</span><br/>" + players[i].viewers);
      //$("#video").attr("src",  players[i].channelLink  );
      $("#video").css("background", 'url(' + players[i].preview + ') center no-repeat');
      
    });
    
    
  }
}

//Event handler for hovering over an offline list item.
var offlineHover = function(num) {
  if ($(window).width() > 768) {
    $(".offline").on("mouseover", function() {
      var i = $(this).attr("id");
      $("#channelHeader").html(players[i].header);
      $("#status").html("<span style=\"font-size:25px\">STATUS:</span><br/>" + players[i].status);
      $("#followers").html("<span style=\"font-size:25px\">FOLLOWERS:</span><br/>" + players[i].followers);
      $("#viewers").html("<span style=\"font-size:25px\">VIEWERS:</span><br/>" + players[i].viewers);
      $("#video").css("background", 'url(' + players[i].preview + ') center no-repeat');
    });
  }
}

/*$("#sideNav").scroll(function() {
  if (isBelow() && !collapseNav)
    $("#navBtn").css("display", "none");
  else
    $("#navBtn").css("display", "inline");
});*/