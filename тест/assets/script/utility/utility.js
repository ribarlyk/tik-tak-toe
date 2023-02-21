function createElement(type, content = null) {
    let elem = document.createElement(type);

    if (type === "img") {
        elem.src = content;
    } else if (type === "input") {
        elem.value = content;
    } else {
        elem.textContent = content;
    }

    return elem;
}
