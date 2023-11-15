let input = document.querySelector("input");
    let myList = document.querySelector(".myList ol");
    let addBtn = document.querySelector(".add-button");
    let inputContainer = document.querySelector(".input-container");
    let sortButton = document.querySelector(".sortirovka");
    let listItems = [];


    function hideInput() {
        input.value = "";
        inputContainer.style.display = "none";
    }
    function showInput() {
        inputContainer.style.display = "flex";
        input.focus();
    }

    input.addEventListener("input", function () {
        myList.style.display = "block";
    });

    addBtn.addEventListener("click", function () {
        let taskText = input.value;
        if (taskText) {
            let taskItem = document.createElement("li");
            taskItem.textContent = taskText;

            let deleteIcon = document.createElement("img");
            deleteIcon.src = "x.png";
            deleteIcon.className = "x";


            deleteIcon.addEventListener("mouseenter", function () {
                deleteIcon.src = 'fx.png';
            });
            deleteIcon.addEventListener("mouseleave", function () {
                deleteIcon.src = "x.png";
            });
            deleteIcon.addEventListener("click", function () {
                myList.removeChild(taskItem);
                updateListNumbering();
                if (myList.children.length === 0) {
                    myList.style.display = "none";
                }
            });

            taskItem.appendChild(deleteIcon);
            myList.appendChild(taskItem);

            hideInput();
            updateListNumbering();
        }
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addBtn.click();
        }
    });

    addBtn.addEventListener("click", function () {
        showInput();
    });

    let observer = new MutationObserver(function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                myList.style.border = "1px solid #C4C4C4";
                myList.style.display = "flex";
                myList.style.alignItems = "center";
                myList.style.flexDirection = "column";
                myList.style.justifyContent = "center";
                myList.style.flexShrink = 0;
                myList.style.borderRadius = "5px";
                myList.style.width = "100%";
                myList.style.margin = "5px auto";
                myList.style.padding = "0";
                myList.style.fontFamily = "Roboto";
                myList.style.fontSize = "14px";
                updateListNumbering();
            }
            if ((mutation.type === "childList") && (mutation.removedNodes.length > 0)) {
                if (myList.children.length === 0) {
                    myList.style.display = "none";
                } else {
                    updateListNumbering();
                }
            }
        }
    });

    let config = { childList: true };
    observer.observe(myList, config);

    function updateListNumbering() {
        let items = myList.querySelectorAll("li");
        items.forEach((item, index) => {
            let number = index + 1;
            let numberElement = item.querySelector(".number");
            if (numberElement) {
                numberElement.textContent = number + ". ";
            } else {
                const newNumberElement = document.createElement("span");
                newNumberElement.className = "number";
                newNumberElement.textContent = number + ". ";
                item.insertBefore(newNumberElement, item.firstChild);
            }
        });
    }