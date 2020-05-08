const context = {
    // Made these in the same scope as handlebars so you can render them with conditionals
    // 0 by default, might need to do some checks if the context is ever empty later on
    "activeCategory": 0,
    "activeSubCategory": 0,
    "currentInput": "",

    // Rest of context is the same except no manual ids
    "categories": [
        {
            "title": "Code References",
            "content": "something in the category notes page",
            "subcategories": [
                {
                    "title": "powershell",
                    "content": ""
                },
                {
                    "title": "bash", 
                    "content": ""
                }
            ],
        },
        {
            "title": "Misc Notes",
            "content": "something in",
            "subcategories": [
                {
                    "title": "notes",
                    "content": ""
                },
                {
                    "title": "todo", 
                    "content": ""
                },
                {
                    "title": "funstuff", 
                    "content": ""
                }

            ],
        },
        {
            "title": "Study References",
            "content": "something in the category notes page",
            "subcategories": [
                {
                    "title": "law",
                    "content": ""
                },
                {
                    "title": "cs", 
                    "content": ""
                }
            ],
        },
    ],
}

// quill editor toolbar options
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  
    ['clean'],  
    // ['custom']                                   // remove formatting button
  ];

// Shorthand for current location 
// var currentLocation = context.categories[context.activeCategory].subcategories[context.activeSubCategory];

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

// quill editor instance in gobal scope
var quill = "";

const editor = document.getElementById('editor');

const saveContent = () => {
    context.categories[context.activeCategory].subcategories[context.activeSubCategory].content = quill.getContents();
    console.log("Saved")
}

// recompile Hanldlebars template
function compileTemplate() {
    const compiledHtml = template(context);
    app.innerHTML = (compiledHtml);

    // reinit quill editor instance with each select
    quill = new Quill("#editor", {
        modules: {
            toolbar: {
                container: toolbarOptions,
                handlers: {
                    // 'custom': function() {
                    //     // placeholder
                    // }
                }
            },
        },
        theme: "snow",
    });
    console.log("Recompiled DOM")
}

// initial recompile
compileTemplate();


// CRUD LOGIC
function selectCategory(index) {
    if (context.activeCategory == index)
        return

    context.activeCategory = index;
    context.activeSubCategory = 0;
    selectSubCategory(0);

    compileTemplate();

    quill.setContents(context.categories[context.activeCategory].subcategories[context.activeSubCategory].content);
}

function selectSubCategory(index) {
    if (context.activeSubCategory == index) {
        return
    }

    context.activeSubCategory = index;
            
    compileTemplate();
    
    quill.setContents(context.categories[context.activeCategory].subcategories[context.activeSubCategory].content);
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
	
	confirmed = confirm("Are you sure?");
	
	if (confirmed != true)
		return;
	
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

// insert control buttons into quillbar
// const quillbar = document.getElementsByClassName("ql-toolbar");
// const controlButtons = document.createElement('div');
// controlButtons.id = "controlButtons";
// controlButtons.innerHTML = "<div id='save' onclick='saveNoteEntries()'>Save</div>"
// quillbar[0].appendChild(controlButtons)
// console.log(quillbar)




