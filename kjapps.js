$(document).ready(function() {
    
    /* Welcome Message */
    
    today = new Date();
    dayIndex = today.getDay();
    
    if (dayIndex == 0) {
        $("#welcome").html("<a target='_blank' href=\"https://www.youtube.com/watch?v=S2Cti12XBw4\" id='video'>Happy Sunday!</a>")
    } else if (dayIndex == 1) {
        $("#welcome").html("<a target='_blank' href=\"https://www.youtube.com/watch?v=U7k-_T-lxTk\" id='video'>Happy Monday!</a>")
    } else if (dayIndex == 2) {
        $("#welcome").html("<a target='_blank' href=\"https://www.youtube.com/watch?v=avFq9errZCk\" id='video'>Happy Tuesday!</a>")
    } else if (dayIndex == 3) {
        $("#welcome").html("<a target='_blank' href=\"https://www.youtube.com/watch?v=7LtjzQaFZ3k\" id='video'>Happy Wednesday!</a>")
    } else if (dayIndex == 4) {
        $("#welcome").html("<a target='_blank' href=\"https://www.youtube.com/watch?v=ZyBa3cYx6ZY\" id='video'>Happy Thursday!</a>")
    } else if (dayIndex == 5) {
        $("#welcome").html("<a target='_blank' href=\"https://www.youtube.com/watch?v=kfVsfOSbJY0\" id='video'>Happy Friday!</a>")
    } else if (dayIndex == 6) {
        $("#welcome").html("<a target='_blank' href=\"https://www.youtube.com/watch?v=2B4_P7LjOxE\" id='video'>Happy Saturday!</a>")
    }

    
    
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
    
    $(".comments").click(function() {
       alert("Haha, I don't read comments... Just use the contact tab!"); 
    });
    
    $(".report").click(function() {
       alert("You gotta be kidding me."); 
    });
    
})

function ajaxRedirect(event) {
    /* Page Transitions (continued) */
    
    $(".topnav a").click(function(event) {
        
        var from = getCurrentFileName();
        var to = this.href.substring(this.href.lastIndexOf("/") + 1);
        event.preventDefault();
        
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
    
    var x = document.getElementById("navbar");
    var current = getCurrentFileName();
    var a = "", b = "", c = "", d = "", e = "";
    
    if (current === "index.html") {
        a = "current";
    } else if (current === "apps.html") {
        b = "current"
    } else if (current === "resume.html") {
        c = "current"
    } else if (current === "blog.html") {
        d = "current"
    } else if (current === "contact.html") {
        e = "current"
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
        
        $(".topnav").html("<a href=\"index.html\" id=\"logo\">kylejohnson<\/a><a href=\"\" id=\"blank\"><\/a><a href=\"index.html\" id=\"" + a + "\">about me<\/a><a href=\"apps.html\" id=\"" + b + "\">my apps<\/a><a href=\"resume.html\" id=\"" + c + "\">resume<\/a><a href=\"blog.html\" id=\"" + d + "\">blog<\/a><a href=\"contact.html\" id=\"" + e + "\">contact<\/a><a href=\"javascript:void(0);\" id=\"icon\" onclick=\"responsiveNavBar()\">&#9776;<\/a>");
        
    } else {
        x.className = "topnav";
        
        $("#container").css("-webkit-transform", "");
        $("#container").css("-webkit-transform", "");
        $("#container").css("-webkit-perspective", "");
        $(".topnav").css("border-bottom-color", "#fff");
        $(".topnav").css("border-bottom-style", "none");
        $(".topnav").css("border-bottom-width", "0px");
        
        $(".topnav").html("<a href=\"index.html\" id=\"logo\">kylejohnson<\/a><a href=\"javascript:void(0);\" id=\"icon\" onclick=\"responsiveNavBar()\">&#9776;<\/a><a href=\"contact.html\" id=\"" + e + "\">contact<\/a><a href=\"blog.html\" id=\"" + d + "\">blog<\/a><a href=\"resume.html\" id=\"" + c + "\">resume<\/a><a href=\"apps.html\" id=\"" + b + "\">my apps<\/a><a href=\"index.html\" id=\"" + a + "\">about me<\/a>");
    }
    
    ajaxRedirect();
}


/* Helper Method */

function getCurrentFileName() {
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}


/* Contact Form Validation */

function validateForm() {
    
    if ($("#gform").find("#name").val().length == 0) {
        alert("Please enter your name.");
        return false;
    }
    
    if ($("#gform").find("#email").val().length == 0) {
        alert("Please enter your email address.");
        return false;
    }
    
    if ($("#gform").find("#message").val().length == 0) {
        alert("Please enter a message.");
        return false;
    }
    
    return true;
}
