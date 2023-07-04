function expandToolBubbles() {
    const lists = document.querySelectorAll(".item__tools-used")
    lists.forEach(l => {
        const size = l.querySelectorAll("li").length - 3
        const button = l.getElementsByClassName("item__expand-button")[0]
        button.innerText = `+${size}`
        if (size > 0) {
            button.style.display = "inline-block";
        }

        button.addEventListener("click", changeExpandState)
    })
}

function changeExpandState() {
    const parent = this.parentElement
    const lastChildren = parent.querySelectorAll("li:nth-child(n+4)")
    if (this.innerText !== "-") {
        this.innerText = "-"
        lastChildren.forEach(c => {
            c.style.display = "inline-block"
        })
    } else {
        const size = parent.querySelectorAll("li").length - 3
        this.innerText = `+${size}`
        lastChildren.forEach(c => {
            c.style.display = "none"
        })
    }
};