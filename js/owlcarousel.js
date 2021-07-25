$(document).ready(function () {
    $("#main-slider").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        nav: true,
        margin: 20,
        dots: true,
        items: 1,
        navText: [
            `<i class="fas fa-chevron-left"></i>`,
            `<i class="fas fa-chevron-right"></i>`
        ],
    });

    // This is slider list products
    $(".listproduct").owlCarousel({
        loop: true,
        nav: false,
        margin: 20,
        responsive: {

            600: {
                items: 2,
            },
            1000: {
                items: 4,
            },
        },
    });

    $("#quickviewSl").owlCarousel({
        loop: false,
        nav: false,
        margin: 20,
        items: 1,
        dots: false
    });

    // brand
    $("#brand").owlCarousel({
        loop: true,
        margin: 100,
        nav: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 2
            },
            630: {
                items: 3,
            },
            765: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6,
            },
        },

    });

    // this is list blog
    $("#blog").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        items: 3,
        dots: false,
        navText: [
            `<i class="fas fa-chevron-left"></i>`,
            `<i class="fas fa-chevron-right"></i>`
        ],
        responsive: {
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        },

    });

    renderOwl(products, $('#products1'))
    renderOwl(bestSale, $('#products2'))
    renderOwlBlog(blogs, $('#blog'))
})

// Declare valiable of products or blogs post
var products = [{
    id: 1,
    name: 'Women’s classic glasses',
    price: '80.00',
    img: '../img/product/20-copy-600x745.jpg',
    img1: '../img/product/20_1-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
}, {
    id: 2,
    name: 'Daily Ritual Women’s',
    price: '80.00',
    img: '../img/product/3_1-600x745.jpg',
    img1: '../img/product/2_4-copy-600x745.jpg',
    isSale: true,
    priceSale: '$65.00',
    isbest: false,
}, {
    id: 3,
    name: 'Cotton Fleece Jogging',
    price: '39.00',
    img: '../img/product/10_1-copy-600x745.jpg',
    img1: '../img/product/10_2-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: false,
}, {
    id: 4,
    name: 'Sweeper and Funnel',
    price: '80.00',
    img: '../img/product/9-copy-600x745.jpg',
    img1: '../img/product/9_2-copy-1-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: false,
}, {
    id: 5,
    name: 'Unisex Fashion Show',
    price: '39.00',
    img: '../img/product/1_1-600x745.jpg',
    img1: '../img/product/2_4-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: false,
}, {
    id: 6,
    name: 'Mogens Koch Bookcase',
    price: '28.00',
    img: '../img/product/8_1-copy-600x745.jpg',
    img1: '../img/product/8_2-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
}, {
    id: 7,
    name: 'Neocroc backpack in canvas',
    price: '259.00',
    img: '../img/product/17_1-copy-600x745.jpg',
    img1: '../img/product/17-copy-600x745.jpg',
    isSale: true,
    priceSale: '$220.00',
    isbest: false,
}, {
    id: 8,
    name: 'Small Zip Tote Bag',
    price: '80.00',
    img: '../img/product/11_1-copy-600x745.jpg',
    img1: '',
    isSale: false,
    priceSale: '$',
    isbest: false,
}, {
    id: 9,
    name: 'Casual Embossed Lettering',
    price: '79.00',
    img: '../img/product/19_1-copy-600x745.jpg',
    img1: '../img/product/19_2-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
}, {
    id: 10,
    name: 'Checked Cotton Shirt',
    price: '79.00',
    img: '../img/product/12-copy-600x745.jpg',
    img1: '../img/product/12_2-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
}, {
    id: 11,
    name: 'Menerva Elite Textile',
    price: '79.00',
    img: '../img/product/22_1-copy-600x745.jpg',
    img1: '../img/product/21-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
}, {
    id: 12,
    name: 'Mogens Koch Bookca',
    price: '28.00',
    img: '../img/product/7_1-copy-600x745.jpg',
    img1: '../img/product/7-copy-600x745.jpg',
    isSale: false,
    priceSale: '',
    isbest: true,
}, {
    id: 13,
    name: 'Daily Ritual Women’s',
    price: '220.00',
    img: '../img/product/2_1-copy-600x745.jpg',
    img1: '../img/product/2_3-copy-600x745.jpg',
    isSale: true,
    priceSale: '$',
    isbest: true,
}, {
    id: 14,
    name: 'Fashion Show Edition',
    price: '39.00',
    img: '../img/product/6_1-copy-600x745.jpg',
    img1: '',
    isSale: false,
    priceSale: '$',
    isbest: true,
}]
const blogs = [{
    id: "b1",
    img: '../img/banner/8-500x321.jpg',
    head: 'Note to wear well in the workplace',
    des: 'A being too greedy for accessories to Ms. B who looks too old because of the carefulness and dullness of …',
}, {
    id: "b2",
    img: '../img/banner/7-500x321.jpg',
    head: '5 ways coordination for puff sleeves',
    des: 'You are a girl who loves gentle, feminine style, “dirt bread” and you love gentle pastel tones and feminine designs. …'
}, {
    id: "b3",
    img: '../img/banner/6-500x321.jpg',
    head: 'How to mix with tunic shoulders',
    des: 'How do you wear a shirt on your shoulders every day? Or slip off and maybe not comfortable with that …'
}, {
    id: "b4",
    img: '../img/banner/5-500x321.jpg',
    head: '7 ways to wear the shoulder blouse',
    des: 'Shorts, skirts, earrings, hats, … are one of the ways to wear a shoulder- length shirt that any girl can …'
}]
const bestSale = products.filter(val => val.isbest)

// Function render a lot of things 
function renderOwl(datas, owl) {

    datas.map((val, index) => {
        if (index % 2 != 1 && index < 8) {
            owl.trigger('add.owl.carousel', [`
                <div class="item">
                    <div class="product" data-id = ${val.id}>
                        <div class="img">
                            <a href="#">
                                <img src="${val.img}" alt="">
                                <img src="${val.img1}" alt="">
                            </a>
                            <button class="btn a-center d-flex j-between addcartitem" data-id = ${val.id} >
                                <i class="bi bi-handbag"></i> Add To Card 
                            </button>
                            <ul class="action">
                                <li class="wishlist"><i class="far fa-heart"></i><span>Add to Wishlist</span>
                                </li>
                                <li class="compare"><i class="fas fa-sliders-h"></i> <span>Compare</span> </li>
                                <li class="detail"><i class="fas fa-eye"></i><span>View Details</span></li>
                            </ul>
                        </div>

                        <div class="content-pro">
                            <h4>${val.name}</h4>
                            <div class="price">
                                $${val.price}
                            </div>
                        </div>
                    </div>

                    <div class="product" data-id = ${datas[index + 1].id}>
                        <div class="img">
                            <a href="#">
                                <img src="${datas[index + 1].img}" alt="">
                                <img src="${datas[index + 1].img1}" alt="">
                            </a>
                            <button class="btn a-center d-flex j-between addcartitem" data-id = ${datas[index + 1].id} >
                                <i class="bi bi-handbag"></i> Add To Card
                            </button>
                            <ul class="action">
                                <li class="wishlist"><i class="far fa-heart"></i><span> Add to Wishlist</span></li>
                                <li class="compare"><i class="fas fa-sliders-h"></i> <span>Compare</span> </li>
                                <li class="detail"><i class="fas fa-eye"></i><span>View Details</span></li>
                            </ul>
                        </div>

                        <div class="content-pro">
                            <h4>${datas[index + 1].name}</h4>
                            <div class="price">
                                $${datas[index + 1].price}
                            </div>
                        </div>
                    </div>
                </div>
            `]).trigger("refresh.owl.carousel")
        }
    })
}

function renderOwlBlog(datas, owl) {
    datas.map((val, index) => {
        owl.trigger('add.owl.carousel', [`
            <div class="owl-item">
                <div class="item">
                    <a href="#" class="link">
                        <div class="img">
                            <img src="${val.img}" alt="">
                        </div>
                        <p>Admin. <span class="date">June 10, 2021</span></p>
                        <h2 class="heading">${val.head}</h2>
                    </a>
                    <p class="des">${val.des}</p>
                    <a href="#" class="btn">Read More</a>
                </div>
            </div>
        `]).trigger("refresh.owl.carousel")
    })
}

function getAllItemProduct() {

    return products

}