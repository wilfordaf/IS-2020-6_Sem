function applyFilter() {
    const tagsCount = {}
    const toolsUsed = document.querySelectorAll(".item__tools-used")
    let itemsAmount = 0
    toolsUsed.forEach(l => {
        const items = l.querySelectorAll("li")
        itemsAmount++
        items.forEach(i => {
            if (!(i.innerText in tagsCount)) {
                tagsCount[i.innerText] = 1
                return
            }

            tagsCount[i.innerText]++
        })
    })
    tagsCount["All"] = itemsAmount

    const filterOptions = document.getElementsByClassName("filter-bar__options")[0]
    for (const key in tagsCount) {
        const li = document.createElement("li")
        const button = document.createElement("button")
        button.innerText = `${key} (${tagsCount[key]})`
        button.classList.add("filter-bar__button")
        button.type = "button"
        button.addEventListener("click", changeButtonState)
        li.appendChild(button)
        filterOptions.appendChild(li)
        if (key === "All") {
            button.classList.add("button-active")
        }
    }
}

function changeButtonState() {
    const active = "button-active"
    this.classList.contains(active) ? this.classList.remove(active) : this.classList.add(active)
    updateSort() 
}

function updateSort() {
    const buttons = document.querySelectorAll(".filter-bar__button")
    const activeButtons = Array.prototype.filter.call(buttons, b => b.classList.contains("button-active"))
    const activeButtonNames = activeButtons.map(b => b.innerText.split(" ")[0])
    const projectColumns = document.getElementsByClassName("project__column")

    Array.prototype.forEach.call(projectColumns, i => {
        if (activeButtonNames.includes("All")) {
            i.style.display = "flex"
            return
        }

        const tools = i.querySelectorAll(".item__tools-used li")
        const relatedTools = Array.prototype.filter.call(tools, t => activeButtonNames.includes(t.innerText))
        if (relatedTools.length !== 0) {
            i.style.display = "flex"
            return
        }
        
        i.style.display = "none"
    })
}