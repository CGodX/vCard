(function () {
    var mr = 21;
    var btns = __('.btn');

    var curMode = 0;

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

    function toHash() {
        document.body.className = 'show';

        for (var i = 0; i < btns.length; i++) {
            btns[i].removeAttribute('style');
            btns[i].classList.remove('done');
        }

        if (location.hash == '#userinfo') {
            curMode = 1;
            toUserinfo();
        } else {
            curMode = 0;
            toAm();
        }
    }

    function toUserinfo() {

        document.body.classList.add('show-userinfo');
    }


    window.addEventListener('hashchange', toHash);

    window.addEventListener('load', function () {
        document.body.className = 'show';
        toHash();
    });

    document.addEventListener('selectstart', function (ev) {
        ev.preventDefault();
        return false;
    });

    _('#openSaveUser').addEventListener('click', function () {
        _('.save-user').classList.add('open');
    });

    _('.save-user .close').addEventListener('click', function () {
        _('.save-user').classList.remove('open');
    });

    function _(a) {
        return document.querySelector(a);
    }

    function __(a) {
        return document.querySelectorAll(a);
    }
})();