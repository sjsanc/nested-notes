const context = {
    "categories": [
        {
            "id": 0,
            "title": "Code References",
            "selected": true,
            "content": "something in the category notes page",
            "subcategories": [
                {
                    "id": 0,
                    "title": "powershell",
                    "content": "some notes on github",
                },
                {
                    "id": 1,
                    "title": "bash", 
                    "content": "some notes on powershell", 
                }
            ],
        },
        {
            "id": 1,
            "title": "Misc Notes",
            "selected": false,
            "content": "something in",
            "subcategories": [
                {
                    "id": 0,
                    "title": "notes",
                    "content": "some notes",
                },
                {
                    "id": 1,
                    "title": "todo", 
                    "content": "some notes on powershell", 
                },
                {
                    "id": 2,
                    "title": "funstuff", 
                    "content": "some notes on powershell", 
                }

            ],
        },
        {
            "id": 2,
            "title": "Study References",
            "selected": false,
            "content": "something in the category notes page",
            "subcategories": [
                {
                    "id": 0,
                    "title": "law",
                    "content": "some notes on github",
                },
                {
                    "id": 1,
                    "title": "cs", 
                    "content": "some notes on powershell", 
                }
            ],
        },
    ],
}

// Handlebars logic
const source = document.getElementById("templateHB").innerHTML;
const template = Handlebars.compile(source);
const compiledHtml = template(context);
const app = document.getElementById("app")
app.innerHTML = (compiledHtml);

// recompile Hanldlebars template
const compileTemplate = () => {
    const compiledHtml = template(context);
    app.innerHTML = (compiledHtml);
    console.log("Recompiled DOM")
}

// global
var activeCategory = "";
var activeSubcategory = "";

// set active to 1st category
window.onload = (event) => {
    if(document.getElementById("0")) {
        activeCategory = document.getElementById("0")
        activeCategory.classList.add("active");
    } 
    if(document.getElementById("s0")) {
        activeSubcategory = document.getElementById("s0");
        activeSubcategory.classList.add("active");
    }
};

// Select Logic 
const selectCategory = () => {
    const entry = event.target;

    if (entry.id != activeCategory.id) {
        activeCategory.classList.remove("active");
        activeCategory = entry;
        activeCategory.classList.add("active")
    }

    console.log(entry.id + activeCategory.id);
}

















// CRUD logic
const createEntry = () => {
    // get user input
    const entry = prompt("New entry:");

    if(entry == null) {
        alert("Can't be empty")
    } else {
        if(event.target.id == "newCategoryButton") {
            context.categories.push({
                "id": context.categories.length,
                "title": entry,
                "selected": false,
                "subcategories": [],
            })
        } else if (event.target.id == "newSubcategoryButton") {
            context.categories[activeCategory.id].subcategories.push({
                "id": context.categories[activeCategory.length],
                "title": entry,
                "selected": false,
            })
        }
    }
    assignID();
    compileTemplate();
    console.log("Entry created")
    console.log(event.target.id)
    console.log(context);
}

const deleteEntry = () => {
    // remove from DOM
    activeCategory.parentNode.removeChild(activeCategory)

    // remove from context
    context.categories.splice(entry.id, 1);
    assignID();

    console.log("Entry deleted")
}

const updateEntry = () => {
    // broken logic;

}

// reassign IDs to be linearly consisten
const assignID = () => {
    for(i = 0; i < context.categories.length; i++) {
        if(context.categories[i].id != i) {
            context.categories[i].id = i;
        }
    }
};




