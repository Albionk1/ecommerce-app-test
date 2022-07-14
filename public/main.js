const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler")

// import {Orders} from 'order.js'

//show sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
})

//close sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
})

//change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span').classList.toggle('active');

    // themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    // themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
})

//fill orders in table 
for (let index = 0; index < Orders.length; index++) {
    const tr = document.createElement('tr');
    const trContent = `
                                <td>${Orders[index].productName}</td>
                                <td>${Orders[index].productNumber}</td>
                                <td>${Orders[index].paymentStatus}</td>
                                <td class="${Orders[index].shipping === 'Refuzim' ? 'danger' : Orders[index].shipping === 'Ne Pritje' ? 'warning' : 'primary'}
                                ">${Orders[index].shipping}</td>
                                <td class="primary">Details</td>
                                `;
    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);

}



