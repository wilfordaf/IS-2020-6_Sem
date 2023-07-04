// execute function on window load
window.addEventListener('load', () => {
    // get header element
    var myElement = document.querySelector("header");
    // create Headroom object instance
    // passing the header element as an argument
    var headroom = new Headroom(myElement);
    // initialize Headroom
    headroom.init();
});