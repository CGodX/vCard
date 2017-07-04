(function () {
    var mr = 21;
    var btns = document.querySelectorAll('.btn');

    var curMode = 0;

    window.addEventListener('load', function () {
        document.body.className = 'show';
        toHash();
    });

    document.addEventListener('selectstart', function (ev) {
        ev.preventDefault();
        return false;
    });

    function toAm() {
        for (var i = 0; i < btns.length; i++) {
            am(0 - (i + 0.8) * 37, btns[i]);
        }
    }

    function am(a, btn) {
        var na = 1;
        var s = 1;
        function next() {
            if (curMode != 0) {
                return;
            }
            na = -(Math.abs(na) + s);
            s *= 1.03;

            if (na < a) {
                na = a;
                btn.className = btn.className + ' done';
            }
            var l = xy(na);

            btn.style.bottom = l.y + 'rem';
            btn.style.right = l.x + 'rem';
            if (na > a) {
                requestAnimationFrame(next);
            }
        }
        requestAnimationFrame(next);
    }

    function xy(a) {
        return {
            y: mr * Math.cos(a * Math.PI / 180),
            x: mr * Math.sin(a * Math.PI / 180)
        }
    }

    window.addEventListener('hashchange', toHash);

    function toHash() {
        document.body.className = 'show';

        for (var i = 0; i < btns.length; i++) {
            btns[i].removeAttribute('style');
            btns[i].classList.remove('done');
        }
        if (!location.hash) {
            curMode = 0;
            toAm();
        }
        if (location.hash == '#userinfo') {
            curMode = 1;
            toUserinfo();
        }
    }

    function toUserinfo() {

        document.body.classList.add('show-userinfo');
    }
})();