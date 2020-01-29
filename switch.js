
$(document).ready(function(){
    $('ul.theme-colors li').click(function(){
        $('body').css('background',$(this).css('color'));
        //experimental 
        
    });
    $('ul.text-colors li').click(function(){
        var theme = $(this).css('background-color');
        $('#leafs div').css('background', theme);
        $('h1,h2,p,a').css('color', theme);
    });
    $('#themes-btn').click(function(){
        $('.colors').toggleClass('active');
    });
});

