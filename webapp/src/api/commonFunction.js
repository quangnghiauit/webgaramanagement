module.exports = {
    formatNumber(number, decimals, dec_point, thousands_sep) {
        var n = number, c = isNaN(decimals === Math.abs(decimals)) ? 2 : decimals;
        var d = dec_point === undefined ? "," : dec_point;
        var t = thousands_sep === undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
        var j;
        var i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "";
        j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },
    rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
};