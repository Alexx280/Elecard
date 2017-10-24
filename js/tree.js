$(document).ready(function () {
    //скрытие индикатора загрузки
    $('.load').fadeOut('fast', function () {
    });
    var info;//для массива объектов полученых из JSON
    var elems = [];
    var request = new XMLHttpRequest();
    request.open('GET', 'do/catalog.json');
    request.onreadystatechange = function (e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                info = response
            } else {
                console.log('не работает');
            }
        }
    };
    request.send(null);

    // Получение массива категорий, не уникальных
    function get_array(item) {
        var list = [];
        for (var i = 0; i < info.length; i++) {
            list.push(info[i][item])
        }
        return list;
    }

    // Получение массива уникальных категорий
    function Unique(A) {
        var n = A.length, k = 0, B = [];
        for (var i = 0; i < n; i++) {
            var j = 0;
            while (j < k && B[j] !== A[i]) j++;
            if (j == k) B[k++] = A[i];
        }
        return B;
    }

    //сортировка массива
    function sort_array(sort_type) {
        info.sort(function (obj1, obj2) {
            return obj1[sort_type] - obj2[sort_type];
        });
        for (var e = 0; e < info.length; e++) {
            console.log(info[e][sort_type]);
        }
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
        var formattedTime = year + '-' + month + '-' + day + ', ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    //Получение html разметки для дерева по каждой категории
    function get_list(name_good) {
        var ul_0 = $('<ul/>');
        var li_0 = $('<li/>');
        var ul_a = $('<ul/>');
        var li_a = $('<li/>');
        var ul_b = $('<ul/>');
        for (var i = 0; i < info.length; i++) {
            if (info[i]['category'] == name_good) {
                var li_b = $('<li/>');
                var ul_c = $('<ul/>');

                //Вывод структуры как в файле
                /*for (elem in info[i]) {
                 if (elem != 'category') {
                 var li = $('<li/>');
                 //if (elem == 'image') {$(li).html('<a target="_blank" href="'+info[i]["image"]+'"><img do="'+info[i]["image"]+'" style="width: 25px" alt="Image"></a>');
                 if (elem == 'image') {$(li).html('<a target="_blank" href="do/i_am2.jpg"><img do="do/i_am2.jpg" style="width: 25px" alt="Image"></a>');
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
                 }*/
                //Вывод упорядоченной структуры
                var li = $('<li/>');
                $(li).html('<a target="_blank" href="' + info[i]["image"] + '"><img src="' + info[i]["image"] + '" style="width: 25px" alt="Image"></a>');
                $(li).appendTo(ul_c);
                $(ul_c).html($(ul_c).html() + '<li>' + see_date(info[i]['timestamp']));
                $(ul_c).html($(ul_c).html() + '<li>' + info[i]['filesize'] + ' байт');
                //конец вывода

                $(ul_c).appendTo(li_b);
                $(li_b).html(info[i]['image'] + $(li_b).html());
                $(li_b).appendTo(ul_b);
            }
        }
        $(ul_b).appendTo(li_a);
        $(li_a).html(name_good + $(li_a).html());
        $(li_a).appendTo(ul_a);
        $(ul_a).appendTo(li_0);
        $(li_0).appendTo(ul_0);
        $(ul_0).addClass('treecss');
        $(ul_0).appendTo('#imagine');
    }

    //Запись удалённых картинок в локальное хранилище
    function record_storage() {
        var count = []; // для массива имён файлов оставшихся элементов
        elems = $('[class = one_card]');//поиск оставшихся элементов
        //составление массива имён файлов оставшихся элементов
        for (var j = 0; j < info.length; j++) {
            if (elems[j]) {
                count.push(elems[j]['dataset']['name']);
                Unique(count);
            } else {
            }
        }
        var save = JSON.stringify(count);//перевод в текст списка имён файлов оствашихся элементов
        localStorage.setItem("Key", save); //записб в локальную память списка имён имён файлов оствашихся элементов
        var returnSave1 = JSON.parse(localStorage.getItem("Key"))
        console.log(returnSave1);
    }

    //получение html разметки для вывода изображений
    function get_image() {
        //Извлечение списка карточек (имён картинок) оставшихся из предыдущей загрузки
        var returnSave = JSON.parse(localStorage.getItem("Key"));
        //Получение массива имён картинок из целого файла JSON
        var name_image = [];
        for (var z = 0; z < info.length; z++) {
            //if(info[z]['image']) {console.log(z + ';' +info[z]['image'])} else{};
            name_image.push(info[z]['image'])
        }
        //console.log(name_image);

        function Difference(A, B)//Функция разности массивов
        {
            if (B == null || A == null) {
                return 0
            } else {
                var M = A.length, N = B.length, C = [];
                for (var i = 0; i < M; i++) {
                    var j = 0, k = 0;
                    while (B[j] !== A[i] && j < N) j++;
                    while (C[k] !== A[i] && k < C.length) k++;
                    if (j == N && k == C.length) C[C.length] = A[i];
                }
                return C;
            }
        }

        //Массив имён изображений, карточки с которми удалены в предыдущей загрузке
        var out_image = Difference(name_image, returnSave);
        console.log(out_image);

        //создание области где будут выстроены все карточки
        var div = $('<div/>').addClass('look_image').appendTo('#imagine');

        //создание карточек с изображениями из JSON
        for (var i = 0; i < info.length; i++) {
            var card = $('<div/>').html('<a target="_blank" href="' + info[i]["image"] + '"><img src="' + info[i]["image"] + '" style="width: 150px" alt="Image"></a>');
            $(card).attr('data-name', info[i]["image"]);
            $(card).addClass('one_card').appendTo('.look_image');
        }
        ;
        //отображение крестика
        var closed = $('<div/>').addClass('close_image');
        $(closed).html('' +
            '<label style="cursor: pointer">' +
            '<input type="checkbox" style="display: none">' +
            '<img src="do/close1.png" style="width: 25px" alt="Image">' +
            '</label>').appendTo('.one_card');

        //поиск выведенных карточек с картинками равныме картинкам из массива удалённых карточек и их удаление
        for (var s = 0; s < out_image.length; s++) {
            for (var r = 0; r < $('[class = one_card]').length; r++) {
                if ($('[class = one_card]')[r]['dataset']['name'] == out_image[s]) {
                    //console.log('yes');
                    $('[class = one_card]')[r].remove();
                } else {
                }
            }
        }

        //Закрытие картинки при нажатии на крестик
        $('.close_image').click(function () {
            $('input:checked').closest('.one_card').attr('datacheck', 'yes').addClass('del_card');
            $('input:checked').closest('.one_card').css('display', 'none');
            record_storage()
        });

        record_storage();
    }

    //Вывод изображений
    $('.image').click(function () {
        $('.load').fadeIn('fast', function () {
            $('#select').css('display', 'flex');
            $('#imagine').html('');
            get_image();
        });
        $('.load').delay(500).fadeOut('fast', function () {
        });
    });

    //вывод дерева
    $('.tree').click(function () {
        $('.load').fadeIn('fast', function () {
            $('#select').css('display', 'none');
            info.sort(function (obj1, obj2) {
                if (obj1['category'] < obj2['category']) return -1;
                if (obj1['category'] > obj2['category']) return 1;
                return 0;
            });
            for (var e = 0; e < info.length; e++) {
                console.log(info[e]['category']);
            }

            $('#imagine').html('');
            var arr_category = Unique(get_array('category'));
            for (var s = 0; s < arr_category.length; s++) {
                get_list(arr_category[s]);
            }
            $('#imagine').html('Список' + $('#imagine').html());
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
        $('.load').delay(1500).fadeOut('fast', function () {
        });
    });

    //Сортировка по размеру
    $('.select_size').click(function () {
        $('.load').fadeIn('fast', function () {
            sort_array('filesize');
            $('#imagine').html('');
            get_image();
        });
        $('.load').delay(500).fadeOut('fast', function () {
        });
    });
    //Сортировка по дате
    $('.select_date').click(function () {
        $('.load').fadeIn('fast', function () {
            sort_array('timestamp');
            $('#imagine').html('');
            get_image();
        });
        $('.load').delay(500).fadeOut('fast', function () {
        });
    });
    //Сортировка по категории
    $('.select_category').click(function () {
        $('.load').fadeIn('fast', function () {
            info.sort(function (obj1, obj2) {
                if (obj1['category'] < obj2['category']) return -1;
                if (obj1['category'] > obj2['category']) return 1;
                return 0;
            });
            for (var e = 0; e < info.length; e++) {
                console.log(info[e]['category']);
            }
            $('#imagine').html('');
            get_image();
        });
        $('.load').delay(500).fadeOut('fast', function () {
        });
    });
    //Сортировка по имени файла
    $('.select_name').click(function () {
        $('.load').fadeIn('fast', function () {
            info.sort(function (obj1, obj2) {
                if (obj1['image'] < obj2['image']) return -1;
                if (obj1['image'] > obj2['image']) return 1;
                return 0;
            });
            for (var e = 0; e < info.length; e++) {
                console.log(info[e]['image']);
            }

            $('#imagine').html('');
            get_image();
        });
        $('.load').delay(500).fadeOut('fast', function () {
        });
    });
    //Сброс удалённых картинок, вывод всех
    $('.reset').click(function () {
        $('.load').fadeIn('fast', function () {
            localStorage.removeItem("Key");
            console.log(JSON.parse(localStorage.getItem("Key")));
            $('#imagine').html('');
            get_image();
        });
        $('.load').delay(500).fadeOut('fast', function () {
        });
    });
});