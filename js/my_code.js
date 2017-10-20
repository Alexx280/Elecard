
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
                //console.log(response[0]);
                info = response
            }
            else {
                console.log('не работает');
            }
        }
    };
    request.send(null);

    // Получение массива категорий, не уникальных
    function my_array() {
        var list = [];
        for (var i = 0; i < info.length; i++) {
            list.push(info[i]['category'])
        }
        return list;
    }
    // Получение массива уникальных категорий
    function Unique(A)
    {
        var n = A.length, k = 0, B = [];
        for (var i = 0; i < n; i++)
        { var j = 0;
            while (j < k && B[j] !== A[i]) j++;
            if (j == k) B[k++] = A[i];
        }
        return B;
    }

    //Перевод даты в формат для чтения
    function see_date(get_day) {
        var date = new Date(get_day * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var year = date.getFullYear();
        var month = "0" + date.getMonth();
        var day = date.getDate();
        var formattedTime = year+'-'+month+'-'+day+', '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime }

    //Получение html разметки для дерева по каждой категории
    function get_list(name_good) {
        var ul_0 = document.createElement('ul');
        var li_0 = document.createElement('li');
        var ul_a = document.createElement('ul');
        var li_a = document.createElement('li');
        var ul_b = document.createElement('ul');
        for(var i=0; i<info.length; i++) {
            if (info[i]['category'] == name_good) {
                var li_b = document.createElement('li');
                var ul_c = document.createElement('ul');
                for (elem in info[i]) {
                    if (elem != 'category') {
                        var li = document.createElement('li');
                        if (elem == 'image') {$(li).html('<a target="_blank" href="'+info[i]["image"]+'"><img src="'+info[i]["image"]+'" style="width: 25px" alt="Image"></a>');
                            $(li).appendTo(ul_c);}
                        else{
                            if (elem == 'timestamp'){
                                $(li).text(see_date(info[i][elem]));
                                $(li).appendTo(ul_c);
                            }else {
                                $(li).text(info[i][elem]);
                                $(li).appendTo(ul_c);
                            }
                        }
                    } else {};
                }
                $(ul_c).appendTo(li_b);
                $(li_b).html(info[i]['filesize']+ $(li_b).html());
                //$(li_b).html('<img src="'+info[i]["image"]+'" style="width:25px" alt="Image">'+ $(li_b).html());
                //$(li_b).html('<p><img src="do/i_am2.jpg" style="width:25px" alt="Image"></p>'+ $(li_b).html());
                $(li_b).appendTo(ul_b);
            }
        }
        $(ul_b).appendTo(li_a);
        $(li_a).html(name_good+ $(li_a).html());
        $(li_a).appendTo(ul_a);
        $(ul_a).appendTo(li_0);
        $(li_0).appendTo(ul_0);
        $(ul_0).addClass('treecss');
        $(ul_0).appendTo('#tree')
    }

    //(function () {
    //$('#tree').click(function(){

    $( document ).ready(function() {
        $('.footer').click(function(){
            var gg = Unique(my_array()); //Составление уникального массима категорий
            //Вывод списков всех категорий
            for (var s=0; s<gg.length; s++)
            {get_list(gg[s]);}

            $('#tree').html('Список'+ $('#tree').html());
            //Формирование дерева
            (function () {
                var ul = document.querySelectorAll('.treecss > li:not(:only-child) ul, .treecss ul ul');
                for (var i = 0; i < ul.length; i++) {
                    var div = document.createElement('div');
                    div.className = 'drop';
                    div.innerHTML = '+';
                    ul[i].parentNode.insertBefore(div, ul[i].previousSibling);
                    div.onclick = function () {
                        this.innerHTML = (this.innerHTML == '+' ? '−' : '+');
                        this.className = (this.className == 'drop' ? 'drop dropM' : 'drop');
                    }
                }
            })();
        });
    });
});



