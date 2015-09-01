/**
 * Created by lmq on 2015/8/30.
 */

$(document).ready(function(){
    ResetCenterHeight();

    $(window).resize(function(){
        ResetCenterHeight();
    });

    $('#MapInfoTab').click(function(){
        SetLeftPanel($(this));
    });
});

function ResetCenterHeight(){
    var window_height=$('body').height();
    var header_height=$('.header').height();
    var footer_height=$('.footer').height();
    $('.center').height(window_height-header_height-footer_height);
}

function SetLeftPanel(btn){
    if (btn.attr("title")=="显示左栏") {
        $('.workcenter').animate({ marginLeft: "0px" }, "normal");
        $('.mapholder').animate({ marginLeft: "385px" }, "normal");
        btn.attr("title", "收起左栏");
        $('.mapinfo_but_span').css("background-position", "-109px -167px");
    }
    else if (btn.attr("title") == "收起左栏")
    {
        $('.workcenter').animate({ marginLeft: "-385px" }, "normal");
        $('.mapholder').animate({ marginLeft: "0px"},"normal");
        btn.attr("title", "显示左栏");
        $('.mapinfo_but_span').css("background-position", "-139px -167px");
    }
}