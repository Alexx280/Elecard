
    (function () {
        var ul = document.querySelectorAll('.treecss > li:not(:only-child) ul, .treecss ul ul, .treecss ul');
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

/*

(function() {
    var div = $('#tree');
    div.onclick = function() {
        this.innerHTML = info[0].image;
    }
})();
*/
