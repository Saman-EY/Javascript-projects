let TodoInput = document.querySelector("#addt");
let addBtn = document.getElementById("add-btn");
let darkmodeBtn = document.getElementById("theme-switcher");
let ulList = document.querySelector(".todos");
let itemLeft = document.getElementById("items-left");
let filter = document.querySelector(".filter");
let removeCheck = document.getElementById("clear-completed");

// SWITCH THEME 
function ThemeSwitcher() {
  let bodyTag = document.querySelector("body");
  let darkmodeimg = darkmodeBtn.children[0];
  darkmodeimg.setAttribute("src",
    (darkmodeimg.getAttribute("src") === "./assets/images/icon-sun.svg") ? './assets/images/icon-moon.svg' : './assets/images/icon-sun.svg'
  )
  bodyTag.classList.toggle("light");
}

// ADD TODO 
function AddTodo() {
  let item = TodoInput.value.trim();

  if (item) {
    let todos = (!localStorage.getItem("todos")) ? [] : JSON.parse(localStorage.getItem("todos"));
    let currentTodo = {
      item: item,
      isCompleted: false,
    }
    todos.push(currentTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    TodoInput.value = "";
    MakeElement([currentTodo]);
  }
}

// REMOVE Todo 
function removeTodo(index) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  itemLeft.textContent = [...document.querySelectorAll(".todos .card:not(.checked)")].length;
}

// Remove completed todo 
function RemoveMultiTodo(array) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter((item, index) => {
    return !array.includes(index);
  })
  localStorage.setItem("todos", JSON.stringify(todos));
}

// change position of card
ulList.addEventListener("dragover", (e) => {
  e.preventDefault();
  // set pos in ul List 
  if (e.target.classList.contains("card") && !e.target.classList.contains("dragging")) {
    let cards = [...ulList.querySelectorAll(".card")];
    let draggingcard = ulList.querySelector(".dragging");
    let currentPos = cards.indexOf(draggingcard);
    let newPos = cards.indexOf(e.target);
    if (currentPos < newPos) {
      ulList.insertBefore(draggingcard, e.target.nextSibling)
    } else {
      ulList.insertBefore(draggingcard, e.target)
    }
    // set POS in localStorage 
    let todos = JSON.parse(localStorage.getItem("todos"));
    let removed = todos.splice(currentPos, 1);
    todos.splice(newPos, 0, removed[0]);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

});

// set state 
function setState(index, isCheck) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].isCompleted = isCheck;
  localStorage.setItem("todos", JSON.stringify(todos));
}

// MAKE TO DO Element 
function MakeElement(item) {

  item.forEach(element => {
    // create element 
    let liCard = document.createElement("li");
    let divContainer = document.createElement("div");
    let input = document.createElement("input");
    let spanCheck = document.createElement("span");
    let pItem = document.createElement("p");
    let clearBtn = document.createElement("button");
    let BtnImg = document.createElement("img");

    // Add class 
    liCard.classList.add("card");
    divContainer.classList.add("cb-container");
    input.classList.add("cb-input");
    spanCheck.classList.add("check");
    pItem.classList.add("item");
    clearBtn.classList.add("clear");

    // Set Attribute
    liCard.setAttribute("draggable", true);
    input.setAttribute("type", "checkbox");
    BtnImg.setAttribute("src", "./assets/images/icon-cross.svg");
    BtnImg.setAttribute("alt", "Clear it");
    pItem.textContent = element.item;

    // Append childs
    ulList.appendChild(liCard);
    liCard.appendChild(divContainer);
    divContainer.appendChild(input);
    divContainer.appendChild(spanCheck);
    liCard.appendChild(pItem);
    liCard.appendChild(clearBtn);
    clearBtn.appendChild(BtnImg);

    // elements Event 
    liCard.addEventListener("dragstart", (e) => {
      e.target.classList.add("dragging");
    })
    liCard.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    })
    input.addEventListener("click", () => {
      let currentCard = input.parentElement.parentElement;
      let isCheck = input.checked;
      let ul = [...ulList.querySelectorAll(".card")];
      let cardIndex = ul.indexOf(currentCard);

      setState(cardIndex, isCheck);
      (isCheck) ? currentCard.classList.add("checked"): currentCard.classList.remove("checked");
      itemLeft.textContent = [...document.querySelectorAll(".todos .card:not(.checked)")].length;
    })
    // remove Btn 
    clearBtn.addEventListener("click", () => {
      let card = clearBtn.parentElement;
      let cards = [...document.querySelectorAll(".todos .card")];
      let index = cards.indexOf(card)

      card.classList.add("fall")
      card.addEventListener("animationend", () => {
        card.remove();
        itemLeft.textContent = [...document.querySelectorAll(".todos .card:not(.checked)")].length;
      })
      removeTodo(index);

    })

    if (element.isCompleted) {
      liCard.classList.add("checked")
      input.setAttribute("checked", true);
    }
    itemLeft.textContent = [...document.querySelectorAll(".todos .card:not(.checked)")].length;
  });

}

///////// EVENTS 
// onload 
document.addEventListener("DOMContentLoaded", () => {
  let item = JSON.parse(localStorage.getItem("todos"));
  if (item) {
    MakeElement(item);
    itemLeft.textContent = [...document.querySelectorAll(".todos .card:not(.checked)")].length;
  }
});
// switch theme 
darkmodeBtn.addEventListener("click", ThemeSwitcher);
// add todo 
addBtn.addEventListener("click", AddTodo);
// add with enter key 
TodoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addBtn.click();
  }
});
// filter 
filter.addEventListener("click", (e) => {
  let BtnId = e.target.id;
  if (BtnId) {
    document.querySelector(".todos").className = `todos ${BtnId}`;
    document.querySelector(".on").classList.remove("on");
    document.getElementById(BtnId).classList.add("on");
  }

})
// remove checked 
removeCheck.addEventListener("click", () => {
  let cards = [...document.querySelectorAll(".todos .card")];
  let checkedCards = [...document.querySelectorAll(".todos .card.checked")]
  let deletedIndex = [];
  checkedCards.forEach((item) => {
    let index = cards.indexOf(item);
    deletedIndex.push(index);
    item.classList.add("fall")
    item.addEventListener("animationend", () => {
      item.remove();
    })
  });
  RemoveMultiTodo(deletedIndex);
})