// JavaScript Document

/*********************/



//Check to see if the window is top if not then display button

jQuery(window).scroll(function(){

    if (jQuery(this).scrollTop() > 100) {
        //jQuery('.scrollToTop').fadeIn();
        jQuery('.scrollToTop').addClass('show');
        // console.log("hiii");

    } else {
        //jQuery('.scrollToTop').fadeOut();
        jQuery('.scrollToTop').removeClass('show');
        // console.log("hiiii");
    }

    jQuery('.scrollToTop').click(function() {
        // jQuery(window).animate({scrollTop : 0}, 1000);
        // console.log("hiiii");
        // jQuery('body').animate({scrollTop : 0}, 'slow');

        $('html').animate({ scrollTop: 0 }, 'slow'); return true; 
        $('body').animate({ scrollTop: 0 }, 'slow'); return true; 
        $('document').animate({ scrollTop: 0 }, 'slow'); return true; 
        $('window').animate({ scrollTop: 0 }, 'slow'); return true;
        // return false;
    });
});

// jQuery(".scrollToTop").click(function() {
//     jQuery("html").scrollTop(0);
// })

// jQuery('.scrollToTop').click(function(){
//     jQuery('html, body').animate({scrollTop : 0},700);
//     // return false;

// });

//endScrollToTop







jQuery(document).ready(function() {

    //Sticky Menu
    jQuery('#nav_bg').stickit({scope: StickScope.Document, zIndex: 101});

    //Side Menu

    $(document).on('click', '.offcanvas-backdrop', function(){
      $("body").removeClass("nav_open");
      $(".navbar_wrap").removeClass("hamburg");
      $(".hamburger_btn").removeClass("nOpen");
      // console.log("done")
    });

    $('#dismiss, .overlay').on('click', function () {
        // $("body").removeClass("nav_open");
        // $("#sidebarCollapse").removeClass("nOpen");
        // $('#sidebar').removeClass('active');
        // $('.overlay').removeClass('active');
        // $('#nav_media').removeClass('stick_bg');
    });

    $('#sidebarCollapse, #showhide_mob, .hamburger_btn').on('click', function () {
        $("body").toggleClass("nav_open");
        // $("#sidebarCollapse").toggleClass("nOpen");
        // $('#sidebar').addClass('active');
        // $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $(".navbar_wrap").addClass("hamburg");
    });



    $("#sidebarCollapse, .btn-close").on('click', function () {
        $("#sidebarCollapse").toggleClass("nOpen");
        $("body").removeClass("nav_open");
        //$('#sidebar').toggleClass('active');
        $('.overlay').toggleClass('active');
        //$('#nav_media').toggleClass('stick_bg');
        $(".navbar_wrap").removeClass("hamburg");

    });



    //on Click Sub Menu

    $(".has_submenu").each(function(){
        $(this).append('<span class="tigger_icon"></span>');

    });

    $(".has_submenu span").on("click", function(){
        //$(this).siblings("ul").addClass("showinMedia");
        //$(".sidebar-submenu").slideUp(200);
        if (
            $(this).parent().hasClass("active")
        ) {
            $(".has_submenu").removeClass("active");
            $(this).parent().removeClass("active");
            //$(this).find("ul").removeClass("showinMedia").css({'height': '0px'});
        } else {
            $(".has_submenu").removeClass("active");
            //$(this).next(".showinMedia").slideDown(200);
            $(this).parent().addClass("active");
            //$(this).siblings("ul").addClass("showinMedia").css({'height': 'auto'});
        }
    });

    //endMobile menu



    //Team Slider

    var owl = jQuery('.post_list .owl-carousel');
      owl.owlCarousel({
        items: 4,
        loop: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause:true,
        smartSpeed: 1000,
        center: false,
        navRewind: true,
        dots: false,
        nav: true,
        navText : ["<i class='icon linearicons-arrow-left'></i>","<i class='icon linearicons-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 3
            },
            1024: {
                items: 4
            }
        }
    })

    //Animation
    new WOW().init();

    //end all Animation



    // let len = $(".media_nav li").length;
    // $(".media_nav li").each(function(i){
    //     $(this).width($(this).width())
    //     console.log( i);
    //     if(len <= (i+1)){
    //     // console.log("done")
    //     $(".media_nav").mCustomScrollbar({
    //         axis:"x",
    //         theme:"thin"
    //     });
    //     }        

    // });

    // $(".goToVisit").on("click", function(e){
    //     e.preventDefault();
    //     var id = $(this).attr("href");
    //     var offset = $("#nav_bg").outerHeight();
    //     var target = $(id).offset().top - offset;
    //     $('html, body').animate({scrollTop:target}, 600, "linear");
    // })

})

























