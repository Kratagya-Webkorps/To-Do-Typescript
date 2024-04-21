let myModal = document.getElementById("myModal") as HTMLFormElement
let myModal2 = document.getElementById("myModal-2") as HTMLFormElement
let addNewTask = document.getElementById("addNewTask") as HTMLFormElement
let span = document.getElementsByClassName("close")[0] as HTMLFormElement;
let ul = document.getElementById("myUl")
let searchInput: HTMLInputElement | null = document.getElementById("searchInput") as HTMLInputElement
let i: number;
let myInput = document.getElementById("myInput") as HTMLInputElement
let themeToggle: HTMLButtonElement | null = document.getElementById("mode") as HTMLButtonElement

//Theme Change
let isDarkMode = false;
themeToggle.addEventListener("click", (event) => {
    event.preventDefault()
    const body = document.body
    let popupTask = document.getElementById("modal-content")
    let popupTask2 = document.getElementById("modal-content-2") as HTMLElement
    if (popupTask) {
        if (isDarkMode) {
            body.classList.remove('dark-theme')
            body.classList.add('light-theme')
            popupTask.classList.add('light-theme')
            popupTask.classList.remove('dark-theme')
            popupTask2.classList.add('light-theme')
            popupTask2.classList.remove('dark-theme')
        }
        else {
            body.classList.add('dark-theme')
            body.classList.remove('light-theme')
            popupTask.classList.remove('light-theme')
            popupTask.classList.add('dark-theme')
            popupTask2.classList.remove('light-theme')
            popupTask2.classList.add('dark-theme')
        }
    }
    isDarkMode = !isDarkMode
})

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") { // 13 is the keycode for Enter key
        event.preventDefault();
    }
});

// Add new Task
addNewTask.onclick = () => {
    myModal.style.display = "block"
}
span.onclick = function () {
    myModal.style.display = "none";
    myModal2.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == myModal || event.target == myModal2) {
        myModal.style.display = "none";
        myModal2.style.display = "none";
    }
}

// Searching in LI
if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        let searchText = this.value.toLowerCase().trim()
        let listItems = Array.from(document.querySelectorAll("li"))
        listItems.forEach((li) => {
            let textContent = li.textContent?.toLowerCase()
            if (textContent?.includes(searchText))
                li.style.display = "block"
            else
                li.style.display = "none"
        })

    })
}
// Showing results of searchBar
let select: HTMLSelectElement | null = document.getElementById("selectTask") as HTMLSelectElement
if (select) {
    select.addEventListener("change", function () {
        let selectedValue: string = this.value
        let checkboxes: HTMLInputElement[] = Array.from(document.querySelectorAll("#myUl .checkbox"))
        checkboxes.forEach((element: HTMLInputElement) => {
            let liElement = element.parentElement
            if (liElement) {
                if (selectedValue === "all" || (selectedValue === "complete" && element.checked) || (selectedValue === "incomplete" && !element.checked)) {
                    liElement.style.display = "block"
                }
                else {
                    liElement.style.display = "none"
                }
            }
        })
    })
}


//To add new element
const newElement = () => {
    let removeImage = document.getElementById("removeId")
    let checkbox = document.createElement("input")
    let edit = document.createElement("button")
    let li = document.createElement("li")
    let hr = document.createElement("hr")
    let ul = document.getElementById("myUl") as HTMLDataElement
    let input = document.getElementById("myInput") as HTMLDataElement;
    removeImage?.parentElement?.removeChild(removeImage)
    if (input.value !== null && input.value !== ' ') {
        let t = document.createTextNode(input.value);
        li.appendChild(checkbox)
        checkbox.setAttribute('type', "checkbox");
        checkbox.setAttribute('class', "checkbox");
        checkbox.setAttribute('id', "checkbox");
        li.append(t)
        li.append(edit)
        edit.setAttribute('id', "edit");
        edit.setAttribute('class', "btn");
        edit.setAttribute('onclick', "editTheTask(this.parentNode)");
        li.appendChild(hr)
        li.setAttribute("id", "myLi")
        ul.appendChild(li)
        input.value = ''
    }
    // Strike-Through the task if completed

    if (ul) {
        let checkbox = document.getElementById("checkbox") as HTMLInputElement
        let listItems: HTMLElement[] = Array.from(ul.getElementsByTagName("li"))
        listItems.forEach((listItem: HTMLElement) => {
            let li_checkbox = listItem.querySelector("input")
            if (li_checkbox) {
                if (checkbox.checked)
                    listItem.style.textDecoration = "line-through"

                li_checkbox.addEventListener("change", function () {
                    if (this.checked)
                        listItem.style.textDecoration = "line-through"
                    else
                        listItem.style.textDecoration = "none"
                })
            }
        })
    }
}

myInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter")
        newElement()

})


// Edit the task

const editTheTask = (liElement: HTMLLIElement) => {

    let myModal2 = document.getElementById("myModal-2") as HTMLFormElement;
    let myInput2 = document.getElementById("myInput-2") as HTMLInputElement ;
    const confirmButton = document.getElementById('updateButton') as HTMLButtonElement;

    myModal2.style.display = "block";

    // Define the event listener outside the function to avoid multiple listener attachment
    const confirmButtonClickHandler = (event: Event) => {
        event.preventDefault();
        let x = myInput2.value;
        liElement.childNodes[1].textContent = x;
        myModal2.style.display = 'none';
        confirmButton.removeEventListener('click', confirmButtonClickHandler); // Remove the event listener
    };

    confirmButton.addEventListener('click', confirmButtonClickHandler);
    myInput2.value = "";
};

const cancel2 = ()=>{
    let myModal2 = document.getElementById("myModal-2") as HTMLFormElement;
    myModal2.style.display = 'none'

}
const cancel = ()=>{
    let myModal = document.getElementById("myModal") as HTMLFormElement;
    myModal.style.display = 'none'
}







