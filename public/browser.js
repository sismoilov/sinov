console.log("web browserni boshlash");

function itemTemplate(item) {
    return `
        <li 
            class="list-group-item list-group-item-info d-flex align-items-center justify-content-between ">
            <span class="item-text">${item.reja}</span>
            <div>
                <button data-id="${item._id}" 
                   class="edit-me btn btn-secondary btn-sm mr-1">
                    O'zgartirish
                </button>
                <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">
                    O'chirish
                </button>
            </div>
        </li>
    `;
}

let createField = document.getElementById("create-field");
// input uchun yozilgan code
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();
    axios.post("/create-item", {
        reja: createField.value
    }).then((response) => {
        document
        .getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data));
    

        createField.value = "";
        createField.focus();
    })     

    .catch((err) => {
        console.log("ERROR:  Iltimos boshidan harakat qiling !");
    });
});
//ochirish uchun yozilgan code
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-me")) {
        if (confirm("O'chirilsinmi ?")) {
            axios.post("/delete-item", {
                id: e.target.getAttribute("data-id")
            }).then((response) => {
                e.target.parentElement.parentElement.remove();
            })
            .catch((err) => {
                console.log("ERROR:  Iltimos boshidan harakat qiling !");
            });
        }
    }//tahrirlash uchun yozilgan code
    else if (e.target.classList.contains("edit-me")) {
        let userInput = prompt("Tahrirlash uchun qanday reja qilmoqchisiz ?");
        if (userInput) {
            axios.post("/edit-item", {
                id: e.target.getAttribute("data-id"),
                reja: userInput
            }).then((response) => {
                e.target.parentElement.previousElementSibling.textContent = userInput;
            })
            .catch((err) => {
                console.log("ERROR:  Iltimos boshidan harakat qiling !");
            });
        }
    }
});
//hammasini ochirish uchun yozilgan code
document.getElementById("clean-all").addEventListener("click", function () {
      axios.post("/delete-all",{delete_all:true})
        .then((response) => {
          alert(response.data.state);
          document.location.reload();
        })
        .catch((err) => {
          console.log("ERROR:  Iltimos boshidan harakat qiling !");
        });
  });