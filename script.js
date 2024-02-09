//Função da priguicite aguda.
const DQS = (el) => document.querySelector(el);
const DQSA = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
    let pizzaItem = DQS('.models .pizza-item').cloneNode(true);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2).replace('.', ',')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        DQS('.pizzaWindowArea').style.opacity = 0;
        DQS('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            DQS('.pizzaWindowArea').style.opacity = 1;
        }, 200);
        
    });
    DQS('.pizza-area').append(pizzaItem);
});