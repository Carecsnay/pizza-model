let modalQT = 1;
let cart = [];
let modalKey = 0;

//Função da priguicite aguda.
const DQS = (el) => document.querySelector(el);
const DQSA = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  let pizzaItem = DQS(".models .pizza-item").cloneNode(true);
  pizzaItem.setAttribute("data-key", index);
  pizzaItem.querySelector(".pizza-item--img img").src = item.img;
  pizzaItem.querySelector(
    ".pizza-item--price"
  ).innerHTML = `R$ ${item.price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  })}`;
  pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
  pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;

  pizzaItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    modalQT = 1;
    let key = e.target.closest(".pizza-item").getAttribute("data-key");
    modalKey = key;

    DQS(".pizzaBig img").src = pizzaJson[key].img;
    DQS(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
    DQS(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
    DQS(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[
      key
    ].price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

    DQS(".pizzaInfo--size.selected").classList.remove("selected");
    DQSA(".pizzaInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 2) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
    });
    DQS(".pizzaInfo--qt").innerHTML = modalQT;
    DQS(".pizzaWindowArea").style.opacity = 0;
    DQS(".pizzaWindowArea").style.display = "flex";
    setTimeout(() => {
      DQS(".pizzaWindowArea").style.opacity = 1;
    }, 200);
  });
  DQS(".pizza-area").append(pizzaItem);
});

// Events modal
const closeModal = () => {
  DQS(".pizzaWindowArea").style.opacity = 0;
  setTimeout(() => {
    DQS(".pizzaWindowArea").style.display = "none";
  }, 500);
};

DQSA(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach(
  (item) => item.addEventListener("click", closeModal)
);

DQS(".pizzaInfo--qtmenos").addEventListener("click", () => {
  if (modalQT > 1) {
    modalQT--;
    DQS(".pizzaInfo--qt").innerHTML = modalQT;
  }
});

DQS(".pizzaInfo--qtmais").addEventListener("click", () => {
  modalQT++;
  DQS(".pizzaInfo--qt").innerHTML = modalQT;
});

DQSA(".pizzaInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener("click", () => {
    DQS(".pizzaInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

DQS(".pizzaInfo--addButton").addEventListener("click", () => {
  let size = parseInt(
    DQS(".pizzaInfo--size.selected").getAttribute("data-key")
  );
  let identifier = pizzaJson[modalKey].id + "@" + size;
  let key = cart.findIndex((item) => item.identifier == identifier);

  if (key > -1) {
    cart[key].qt += modalQT;
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      qt: modalQT,
    });
  }
  updateCart();
  closeModal();
});

DQS(".menu-openner").addEventListener("click", () => {
  if (cart.length > 0) {
    DQS("aside").style.left = "0"; //abrir aside
  }
});

DQS(".menu-closer").addEventListener("click", () => {
  DQS("aside").style.left = "100vw"; //fechar aside
});
const updateCart = () => {
  DQS(".menu-openner span").innerHTML = cart.length;

  if (cart.length > 0) {
    DQS("aside").classList.add("show");
    DQS(".cart").innerHTML = "";

    let subtotal = 0;
    let discount = 0;
    let total = 0;

    for (let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      subtotal += pizzaItem.price * cart[i].qt; //calculo subtotal

      let cartItem = DQS(".models .cart--item").cloneNode(true);
      let pizzaSizeName;
      switch (cart[i].size) {
        case 0:
          pizzaSizeName = "P";
          break;
        case 1:
          pizzaSizeName = "M";
          break;
        case 2:
          pizzaSizeName = "G";
          break;
        default:
          pizzaSizeName = "";
          break;
      }
      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector("img").src = pizzaItem.img;
      cartItem.querySelector(".cart--item-nome").innerHTML = pizzaName;
      cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;
      cartItem
        .querySelector(".cart--item-qtmenos")
        .addEventListener("click", () => {
          if (cart[i].qt > 1) {
            cart[i].qt--;
          } else {
            cart.splice(i, 1); //remover item com qtd zero
          }
          updateCart();
        });
      cartItem
        .querySelector(".cart--item-qtmais")
        .addEventListener("click", () => {
          cart[i].qt++;
          updateCart();
        });

      DQS(".cart").append(cartItem);
    }

    discount = subtotal * 0.1; //10% de desconto
    total = subtotal - discount;

    DQS(".subtotal span:last-child").innerHTML = `R$ ${subtotal.toFixed(2)}`;
    DQS(".desconto span:last-child").innerHTML = `R$ ${discount.toFixed(2)}`;
    DQS(".total span:last-child").innerHTML = `R$ ${total.toFixed(2)}`;
  } else {
    DQS("aside").classList.remove("show");
    DQS("aside").style.left = "100vw";
  }
};
