var theme, theme2;
$(document).ready(function(){
    $('ul.theme-colors li').click(function(){
    theme2=$(this).css('background-color');
    $('body').css('background', theme2);
    $('body').css('color', theme2);
    //experimental 
    sessionStorage.setItem('bod',JSON.stringify(theme2));


    });
    $('ul.text-colors li').click(function(){
        theme = $(this).css('background-color');
        $('#leafs div').css('background', theme);
        $('h1,h2,p,a').css('color', theme);
        sessionStorage.setItem('col',JSON.stringify(theme));
    });
    $('#themes-btn').click(function(){
        $('.colors').toggleClass('active');
    });
});

