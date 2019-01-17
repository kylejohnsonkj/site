$(document).ready(function() {
    // get current day
    var today = new Date();
    var index = today.getDay();
    var year = today.getFullYear();

    // set welcome text with different video for each day of the week
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var urls = [
        "https://www.youtube.com/watch?v=LTTlczKbTYA", // Sun: National Treasure
        "https://www.youtube.com/watch?v=gKftzAbfcGU", // Mon: Programmers
        "https://www.youtube.com/watch?v=j25tkxg5Vws", // Tue: La Biblioteca
        "https://www.youtube.com/watch?v=7LtjzQaFZ3k", // Wed: Hump Day
        "https://www.youtube.com/watch?v=sXBAXyBC4C8", // Thu: Foosball
        "https://www.youtube.com/watch?v=SsoOG6ZeyUI", // Fri: Tabs vs Spaces
        "https://www.youtube.com/watch?v=igz3LvsARSc"  // Sat: Up - Kevin
    ];
    $("#welcome").html("<a target='_blank' href=\"" + urls[index] + "\" id='video'>Happy " + days[index] + "!</a>");

    // put current year in footer text
    $("#footer").html("&#9400; " + year + " Kyle Johnson. All rights reserved.")

    /* Page Transitions */
    $("#header").hide();
    $(".content").hide();
    $("#header").css("visibility", "visible");
    $(".content").css("visibility", "visible");
    $("#header").show(1000);
    $(".content").show(1000);

    /* Play Embedded YouTube Video */
    $("#video").click(function(event) {
        event.preventDefault();
        
        var link = this.href.substring(this.href);
        var embeddedLink = link.replace("watch?v=", "embed/");
        var flags = "?autoplay=1&iv_load_policy=3";
        var newLink = embeddedLink.concat(flags);
        
	   if ($("#fullContainer").css('opacity') == 1) {
		  $("#fullContainer").animate({opacity:0.3}, 1000);
          $("#videoContainer").html("<iframe allowfullscreen=\"allowfullscreen\" style=\"border: 3px solid #EEE;\" src=\"" + newLink + "\"></iframe>");
          $("#videoContainer").css("display", "inline");
	   }
    });

    /* Hide Embedded YouTube Video */
    $("#fullContainer").click(function() {
	   if ($("#fullContainer").css('opacity') != 1) {
		  $("#fullContainer").animate({opacity:1}, 1000);
           $("#videoContainer").html("");
          $("#videoContainer").css("display", "none"); 
	   }
    });

    ajaxRedirect();
    
    // just my
    $(".comments").click(function() {
       alert("Haha, I don't read comments... Just use the contact tab!"); 
    });
    
    // sense of humor
    $(".report").click(function() {
       alert("Nice try.");
    });
})

/* Fancy Page Redirects */
function ajaxRedirect(event) {

    /* Page Transitions (continued) */
    $(".topnav a").click(function(event) {
        event.preventDefault();
        
        var from = getCurrentFileName();
        var to = this.href.substring(this.href.lastIndexOf("/") + 1);
        if (to === "") {
            to = "/";
        }
        
        $("#header").hide(1000);
        $(".content").hide(1000, function() {
            $.ajax({
               url: to,
               type: 'GET',
               success: function(data) {
                   $('.content').html($(data).find('.content').html());
                   window.location.replace(to);
               }
            }); 
        });
        
        if ($(window).width() <= 820 && event.target.id != "logo") {
            responsiveNavBar();
        }
    });
}

/* Responsive Navigation Bar */
function responsiveNavBar() {
    
    // dirty but it works
    var x = document.getElementById("navbar");
    var current = getCurrentFileName();
    var a = "", b = "", c = "", d = "", e = "";
    
    if (current === "index.html" || current === "index" || current === "/") {
        a = "current";
    } else if (current === "apps.html" || current === "apps") {
        b = "current";
    } else if (current === "resume.html" || current === "resume") {
        c = "current";
    } else if (current === "blog.html" || current === "blog") {
        d = "current";
    } else if (current === "contact.html" || current === "contact") {
        e = "current";
    } else {
	   a = "current";
    }
    
    if (x.className === "topnav") {
        x.className += " responsive";
        
        $("#container").css("-webkit-transform", "translateZ(0px)");
        $("#container").css("-webkit-transform", "translate3d(0,0,0)");
        $("#container").css("-webkit-perspective", "1000");
        $(".topnav").css("border-bottom-color", "rgb(81, 174, 255)");
        $(".topnav").css("border-bottom-style", "solid");
        $(".topnav").css("border-bottom-width", "2px");
        $(window).scrollTop(0);
        
        $(".topnav").html("<a href=\"/\" id=\"logo\">kylejohnson<\/a><a href=\"\" id=\"blank\"><\/a><a href=\"/\" id=\"" + a + "\">about me<\/a><a href=\"apps\" id=\"" + b + "\">my apps<\/a><a href=\"resume\" id=\"" + c + "\">resume<\/a><a href=\"blog\" id=\"" + d + "\">blog<\/a><a href=\"contact\" id=\"" + e + "\">contact<\/a><a href=\"javascript:void(0);\" id=\"icon\" onclick=\"responsiveNavBar()\">&#9776;<\/a>");
        
    } else {
        x.className = "topnav";
        
        $("#container").css("-webkit-transform", "");
        $("#container").css("-webkit-transform", "");
        $("#container").css("-webkit-perspective", "");
        $(".topnav").css("border-bottom-color", "#fff");
        $(".topnav").css("border-bottom-style", "none");
        $(".topnav").css("border-bottom-width", "0px");
        
        $(".topnav").html("<a href=\"/\" id=\"logo\">kylejohnson<\/a><a href=\"javascript:void(0);\" id=\"icon\" onclick=\"responsiveNavBar()\">&#9776;<\/a><a href=\"contact\" id=\"" + e + "\">contact<\/a><a href=\"blog\" id=\"" + d + "\">blog<\/a><a href=\"resume\" id=\"" + c + "\">resume<\/a><a href=\"apps\" id=\"" + b + "\">my apps<\/a><a href=\"/\" id=\"" + a + "\">about me<\/a>");
    }
    
    ajaxRedirect();
}

function isRobot() {
    var honeypot = $('input#honeypot').val();
    if (honeypot) {
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Go Ahead, Human!");
      $('div#honeypot_container').hide();
      return false;
    }
}

function submitForm() {
    if (isRobot() == false) {  // if form is filled, form will not be submitted
        $("input[type=submit]").hide();
        return true;
    } else {
        return false;
    }
}

function getCurrentFileName() {
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}
