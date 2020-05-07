const context = {
    // Made these in the same scope as handlebars so you can render them with conditionals
    // 0 by default, might need to do some checks if the context is ever empty later on
    "activeCategory": 0,
    "activeSubCategory": 0,

    // Rest of context is the same except no manual ids
    "categories": [
        {
            "title": "Code References",
            "content": "something in the category notes page",
            "subcategories": [
                {
                    "title": "powershell",
                    "content": "some notes on powershell",
                },
                {
                    "title": "bash", 
                    "content": "some notes on bash", 
                }
            ],
        },
        {
            "title": "Misc Notes",
            "content": "something in",
            "subcategories": [
                {
                    "title": "notes",
                    "content": "some notes",
                },
                {
                    "title": "todo", 
                    "content": "some notes on eggs", 
                },
                {
                    "title": "funstuff", 
                    "content": "some notes on vr", 
                }

            ],
        },
        {
            "title": "Study References",
            "content": "something in the category notes page",
            "subcategories": [
                {
                    "title": "law",
                    "content": "some notes on rat law",
                },
                {
                    "title": "cs", 
                    "content": "some notes on hoops", 
                }
            ],
        },
    ],
}

// https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value
// Handlebars should really have this stuff by default imho
Handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

// Handlebars setup
const source = document.getElementById("templateHB").innerHTML;
const template = Handlebars.compile(source);
const compiledHtml = template(context);
const app = document.getElementById("app")
app.innerHTML = (compiledHtml);

// recompile Hanldlebars template
function compileTemplate() {
    const compiledHtml = template(context);
    app.innerHTML = (compiledHtml);
    console.log("Recompiled DOM")
}

function selectCategory(index) {
    if (context.activeCategory == index)
        return

    context.activeCategory = index;
    context.activeSubCategory = 0;
    compileTemplate();
}

function selectSubCategory(index) {
    if (context.activeSubCategory == index)
        return

    context.activeSubCategory = index;
    compileTemplate();
}

function createEntry() {
    const title = prompt("New entry: ");
	
    if(title == "") { // prompt was empty
        alert("Input field can't be empty")
        return;
    }
	if(!title) // prompt was cancelled
		return;

    id = event.target.id;

    if (id == "newCategoryButton") {
        const newCategory = {
                "title": title,
                "content": "",
                "subcategories": [],
            }
        context.categories.push(newCategory);
        console.log("Category created")
        } else {
        const newSubcategory = {
            "title": title,
            "content": "",
        }
        context.categories[context.activeCategory].subcategories.push(newSubcategory);
        console.log("Subcategory created")
    }
    compileTemplate();
}

function deleteEntry() {
    const type = event.target.parentNode.parentNode.dataset.type;
    const id = event.target.parentNode.parentNode.id;
    if(type == "category") {
        context.categories.splice(id,1);
        console.log("Category removed");
    }
    if(type == "subcategory") {
        context.categories[context.activeCategory].subcategories.splice(id,1);
        console.log("Subcategory removed");
    }
    compileTemplate();
}

function updateEntry() {
    const newTitle = prompt("New title: ")
    const type = event.target.parentNode.parentNode.dataset.type;
    const id = event.target.parentNode.parentNode.id;

    if (newTitle == "") {
        alert("Can't be empty!");
        return
    }
	if (!newTitle) // prompt was cancelled, not empty
		return;
	
    if (type == "category") {
        context.categories[id].title = newTitle;
        console.log("Category updated")
    } else if (type == "subcategory") {
        context.categories[context.activeCategory].subcategories[id].title = newTitle;
        console.log("Subcategory updated")
    }
    compileTemplate();
}