(function reload() {
    var doc = document;
    var iframe = doc.createElement("iframe");
    doc.body.appendChild(iframe);
    var iwin = iframe.contentWindow;
    var idoc = iframe.contentDocument;
    idoc.open();
    idoc.close();
    idoc.write('<!doctype html><head><meta charset="utf-8"><body>');
    idoc.head.innerHTML 
    = `
        <style>
        html, body {
            margin: 0;padding: 0;border: 0;width: 100 % ;height: 100 % ;
        }
        </ style >
    `;
    idoc.body.innerHTML = `<canvas id="c"></canvas>
    < script > </ script >
    `;

    var Audio = iwin.Audio;
    iwin.Audio = function (x) {
        return new Audio(x)
    };
    var canvas = idoc.getElementsByTagName("canvas")[0];
    iwin.a = canvas.getContext("2d");
    iwin.b = idoc.body;
    iwin.c = canvas;
    var p2d = iwin.Path2D;

    function wrap(ctx) {
        var fill = ctx.fill,
            clip = ctx.clip,
            stroke = ctx.stroke;
        ctx.scale = ctx.scale;
        ctx.drawFocusIfNeeded = ctx.drawFocusIfNeeded;
        ctx.ellipse = ctx.ellipse;
        ctx.fill = function (r) {
            fill.call(ctx, r === "evenodd" ? "evenodd" : "nonzero")
        };
        ctx.stroke = function (p) {
            if (p && p2d && p instanceof p2d)
                stroke.call(ctx, p);
            else stroke.call(ctx)
        };
        ctx.clip = function (p) {
            if (p && p2d && p instanceof p2d) clip.call(ctx, p);
            else clip.call(ctx)
        };
        return ctx;
    }
    wrap(iwin.a)
    idoc.body.clientWidth;
    var demo = idoc.createElement("script");
    var scrpt = doc.querySelector('script[type="demo"]')
                .textContent.replace(/m.location=m.location;/, "top.reload();");
    demo.textContent = scrpt;
    idoc.body.appendChild(demo);
    idoc.close();
    iframe.contentWindow.focus();
})();