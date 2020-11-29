$(document).ready(function() {
    // get current day
    var today = new Date();
    var index = today.getDay();
    var year = today.getFullYear();

    // set welcome text with different video for each day of the week
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    $("#welcome").html("Happy " + days[index] + "! 🎉");

    // put current year in footer text
    $("#footer").html($("#footer").html().replace("####", year));

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

    // adaptive dark mode
    toggleDarkMode();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        toggleDarkMode();
    });

    // manual dark mode override
    $("#dark_switch").click(function() {
        document.getElementById("darkmode").disabled = !document.getElementById("darkmode").disabled
        $("#dark_switch").attr("src", document.getElementById("darkmode").disabled ? "images/moon.png" : "images/sun.png")
    });
})

function isDarkModeEnabled() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function toggleDarkMode() {
    document.getElementById("darkmode").disabled = !isDarkModeEnabled();
    $("#dark_switch").prop("checked", isDarkModeEnabled());
    $("#dark_switch").attr("src", isDarkModeEnabled() ? "images/sun.png" : "images/moon.png")
}

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
    } else if (current === "interests.html" || current === "interests") {
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
        
        $(".topnav").html("<a href=\"/\" id=\"logo\">kylejohnson<\/a><a href=\"\" id=\"blank\"><\/a><a href=\"/\" id=\"" + a + "\">about me<\/a><a href=\"apps\" id=\"" + b + "\">my apps<\/a><a href=\"resume\" id=\"" + c + "\">resume<\/a><a href=\"interests\" id=\"" + d + "\">interests<\/a><a href=\"contact\" id=\"" + e + "\">contact<\/a><a href=\"javascript:void(0);\" id=\"icon\" onclick=\"responsiveNavBar()\">&#9776;<\/a>");
        
    } else {
        x.className = "topnav";
        
        $("#container").css("-webkit-transform", "");
        $("#container").css("-webkit-transform", "");
        $("#container").css("-webkit-perspective", "");
        $(".topnav").css("border-bottom-color", "#fff");
        $(".topnav").css("border-bottom-style", "none");
        $(".topnav").css("border-bottom-width", "0px");
        
        $(".topnav").html("<a href=\"/\" id=\"logo\">kylejohnson<\/a><a href=\"javascript:void(0);\" id=\"icon\" onclick=\"responsiveNavBar()\">&#9776;<\/a><a href=\"contact\" id=\"" + e + "\">contact<\/a><a href=\"interests\" id=\"" + d + "\">interests<\/a><a href=\"resume\" id=\"" + c + "\">resume<\/a><a href=\"apps\" id=\"" + b + "\">my apps<\/a><a href=\"/\" id=\"" + a + "\">about me<\/a>");
    }
    
    ajaxRedirect();
}

function submitForm() {
    document.getElementById("honeypot").value = "human";    // spam protection
    $("input[type=submit]").hide();
    return true;
}

function getCurrentFileName() {
    var pagePathName = window.location.pathname;
    return pagePathName.substring(pagePathName.lastIndexOf("/") + 1);
}
