function getCookie(name, defaul_value) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1"); }
    let match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)"));
    return match ? match[1] : defaul_value;
}

function setCookie(name, value, options = {}) {
    options = {
        path: "/",
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        "max-age": -1
    })
}
