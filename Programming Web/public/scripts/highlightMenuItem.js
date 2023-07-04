(() => {
    const locationNames = {
        "projects-page": "Projects",
        "discussions": "Discussions",
        "rules": "Rules",
        "author": "About"
    }

    const menuItems = document.querySelectorAll(".header-navbar-menu__item")
    const documentName = document.location.href.split("/").pop();
    const pageName = documentName.split(".")[0]


    menuItems.forEach(i => {
        if (locationNames[pageName] === i.innerText) {
            i.classList.add("active");
        }
    })
})();