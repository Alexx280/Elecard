
$( document ).ready(function() {
    //console.log('test');\
    $('.one_card').click(function(){
        $('input:checked').closest('.one_card').find('.cover_card').addClass('view');
        $( "input:checked" ).parents('.one_card').delay( 2000 ).fadeOut();
        //$( "input:checked" ).parents('.one_card').css('display', 'none');
        console.log('test');
        //$( "input:checked" ).parents('.one_card').addClass('see')
    });

    //$( "input:checked" ).addClass('see')
        //.on( "click", countChecked );
    var info;
    var request = new XMLHttpRequest();
    request.open('GET', 'do/catalog.json');
    request.onreadystatechange = function(e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                console.log(response[0]);
                info = response
            }
            else {
                console.log('не работает');
            }
        }
    };
    request.send(null);


    //(function () {
    //$('#tree').click(function(){
    $( document ).ready(function() {
        $('.footer').click(function(){
        for(var i=200; i<203; i++) {
            var ul_a = document.createElement('ul');
                var li_a = document.createElement('li');
                    var ul_b = document.createElement('ul');
                        var li_b = document.createElement('li');
                            var ul_c = document.createElement('ul');
                            for (elem in info[i]) {
                                if (elem != 'category') {
                                    var li = document.createElement('li');
                                    $(li).text(info[i][elem]);
                                    $(li).appendTo(ul_c);
                                }else{};
                            }
                            $(ul_c).appendTo(li_b);
                        $(li_b).html(info[i]['category']+ $(li_b).html());
                        $(li_b).appendTo(ul_b);
                    $(ul_b).appendTo(li_a);
                $(li_a).html('Карта'+ $(li_a).html());
                $(li_a).appendTo(ul_a);
            $(ul_a).addClass('treecss');
            $(ul_a).appendTo('#tree');
        }
            (function () {
                var ul = document.querySelectorAll('.treecss > li:not(:only-child) ul, .treecss ul ul');
                for (var i = 0; i < ul.length; i++) {
                    var div = document.createElement('div');
                    div.className = 'drop';
                    div.innerHTML = '+'; // картинки лучше выравниваются, т.к. символы на одном браузере ровно выглядят, на другом — чуть съезжают
                    ul[i].parentNode.insertBefore(div, ul[i].previousSibling);
                    div.onclick = function () {
                        this.innerHTML = (this.innerHTML == '+' ? '−' : '+');
                        this.className = (this.className == 'drop' ? 'drop dropM' : 'drop');
                    }
                }
            })();
        });
    });

    /*$(function (){
        $('.tree').click(function(){
            var html = $('.tree').text();
            alert(html);
            $('.tree').text(response[0])
        });
    });*/



});
