var myModal = document.getElementById("myModal");
var myModal2 = document.getElementById("myModal-2");
var addNewTask = document.getElementById("addNewTask");
var span = document.getElementsByClassName("close")[0];
var ul = document.getElementById("myUl");
var searchInput = document.getElementById("searchInput");
var i;
var myInput = document.getElementById("myInput");
var themeToggle = document.getElementById("mode");
//Theme Change
var isDarkMode = false;
themeToggle.addEventListener("click", function (event) {
    event.preventDefault();
    var body = document.body;
    var popupTask = document.getElementById("modal-content");
    var popupTask2 = document.getElementById("modal-content-2");
    if (popupTask) {
        if (isDarkMode) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            popupTask.classList.add('light-theme');
            popupTask.classList.remove('dark-theme');
            popupTask2.classList.add('light-theme');
            popupTask2.classList.remove('dark-theme');
        }
        else {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            popupTask.classList.remove('light-theme');
            popupTask.classList.add('dark-theme');
            popupTask2.classList.remove('light-theme');
            popupTask2.classList.add('dark-theme');
        }
    }
    isDarkMode = !isDarkMode;
});
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") { // 13 is the keycode for Enter key
        event.preventDefault();
    }
});
// Add new Task
addNewTask.onclick = function () {
    myModal.style.display = "block";
};
span.onclick = function () {
    myModal.style.display = "none";
    myModal2.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == myModal || event.target == myModal2) {
        myModal.style.display = "none";
        myModal2.style.display = "none";
    }
};
// Searching in LI
if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        var searchText = this.value.toLowerCase().trim();
        var listItems = Array.from(document.querySelectorAll("li"));
        listItems.forEach(function (li) {
            var _a;
            var textContent = (_a = li.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            if (textContent === null || textContent === void 0 ? void 0 : textContent.includes(searchText))
                li.style.display = "block";
            else
                li.style.display = "none";
        });
    });
}
// Showing results of searchBar
var select = document.getElementById("selectTask");
if (select) {
    select.addEventListener("change", function () {
        var selectedValue = this.value;
        var checkboxes = Array.from(document.querySelectorAll("#myUl .checkbox"));
        checkboxes.forEach(function (element) {
            var liElement = element.parentElement;
            if (liElement) {
                if (selectedValue === "all" || (selectedValue === "complete" && element.checked) || (selectedValue === "incomplete" && !element.checked)) {
                    liElement.style.display = "block";
                }
                else {
                    liElement.style.display = "none";
                }
            }
        });
    });
}
//To add new element
var newElement = function () {
    var _a;
    var removeImage = document.getElementById("removeId");
    var checkbox = document.createElement("input");
    var edit = document.createElement("button");
    var li = document.createElement("li");
    var hr = document.createElement("hr");
    var ul = document.getElementById("myUl");
    var input = document.getElementById("myInput");
    (_a = removeImage === null || removeImage === void 0 ? void 0 : removeImage.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(removeImage);
    if (input.value !== null && input.value !== ' ') {
        var t = document.createTextNode(input.value);
        li.appendChild(checkbox);
        checkbox.setAttribute('type', "checkbox");
        checkbox.setAttribute('class', "checkbox");
        checkbox.setAttribute('id', "checkbox");
        li.append(t);
        li.append(edit);
        edit.setAttribute('id', "edit");
        edit.setAttribute('class', "btn");
        edit.setAttribute('onclick', "editTheTask(this.parentNode)");
        li.appendChild(hr);
        li.setAttribute("id", "myLi");
        ul.appendChild(li);
        input.value = '';
    }
    // Strike-Through the task if completed
    if (ul) {
        var checkbox_1 = document.getElementById("checkbox");
        var listItems = Array.from(ul.getElementsByTagName("li"));
        listItems.forEach(function (listItem) {
            var li_checkbox = listItem.querySelector("input");
            if (li_checkbox) {
                if (checkbox_1.checked)
                    listItem.style.textDecoration = "line-through";
                li_checkbox.addEventListener("change", function () {
                    if (this.checked)
                        listItem.style.textDecoration = "line-through";
                    else
                        listItem.style.textDecoration = "none";
                });
            }
        });
    }
};
myInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter")
        newElement();
});
// Edit the task
var editTheTask = function (liElement) {
    var myModal2 = document.getElementById("myModal-2");
    var myInput2 = document.getElementById("myInput-2");
    var confirmButton = document.getElementById('updateButton');
    myModal2.style.display = "block";
    // Define the event listener outside the function to avoid multiple listener attachment
    var confirmButtonClickHandler = function (event) {
        event.preventDefault();
        var x = myInput2.value;
        liElement.childNodes[1].textContent = x;
        myModal2.style.display = 'none';
        confirmButton.removeEventListener('click', confirmButtonClickHandler); // Remove the event listener
    };
    confirmButton.addEventListener('click', confirmButtonClickHandler);
    myInput2.value = "";
};
var cancel2 = function () {
    var myModal2 = document.getElementById("myModal-2");
    myModal2.style.display = 'none';
};
var cancel = function () {
    var myModal = document.getElementById("myModal");
    myModal.style.display = 'none';
};
