$(document).ready(function () {
    $("#main-slider").owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        margin: 20,
        dots: true,
        items: 1,
        navText: [
            `<i class="fas fa-chevron-left"></i>`,
            `<i class="fas fa-chevron-right"></i>`
        ],
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        responsive: {
            0: {
                nav: false,
            },
            992: {
                nav: false,
            },
            1024: {
                nav: true
            }
        }
    });

    // This is slider list products
    $(".listproduct").owlCarousel({
        margin: 20,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 2,
            },
            640: {
                items: 3,
            },
            992: {
                items: 3,
                nav: true
            },
            1200: {
                items: 4,
                nav: false,
            },
        },
    });

    $("#quickviewSl").owlCarousel({
        loop: true,
        nav: true,
        margin: 20,
        items: 1,
        dots: false,
        navText: [
            `<i class="fas fa-chevron-left"></i>`,
            `<i class="fas fa-chevron-right"></i>`
        ],
    });

    // brand
    $("#brand").owlCarousel({
        loop: true,
        margin: 70,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                margin: 20
            },
            500: {
                items: 2,
                margin: 150
            },
            630: {
                items: 3,
                margin: 70
            },
            765: {
                items: 4,

            },
            992: {
                items: 5
            },
            1200: {
                items: 6,
                margin: 100
            },
        },

    });

    // this is list blog
    $("#blog").owlCarousel({
        margin: 30,
        nav: true,
        items: 3,
        dots: false,
        navText: [
            `<i class="fas fa-chevron-left"></i>`,
            `<i class="fas fa-chevron-right"></i>`
        ],
        responsive: {
            0: {
                margin: 20,
                items: 1,
                nav: false,
            },
            576: {
                items: 2,
                margin: 30
            },
            992: {
                items: 3,
                nav: true,
            },
        },

    });

    renderOwl(products, $('#products1'))
    renderOwl(bestSale, $('#products2'))
    renderOwlBlog(blogs, $('#blog'))

    // render main slider 
    checkWidth()
    $(window).resize(function () {
        checkWidth()
    });

})

// Declare valiable of products or blogs post
var products = [{
    id: 1,
    name: 'Women’s classic glasses',
    price: '80.00',
    img: './img/product/20-copy-600x745.jpg',
    img1: './img/product/20_1-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
    type: 'Accessories'
}, {
    id: 2,
    name: 'Daily Ritual Women’s',
    price: '80.00',
    img: './img/product/3_1-600x745.jpg',
    img1: './img/product/2_4-copy-600x745.jpg',
    isSale: true,
    priceSale: '$65.00',
    isbest: false,
    type: 'Womens'
}, {
    id: 3,
    name: 'Cotton Fleece Jogging',
    price: '39.00',
    img: './img/product/10_1-copy-600x745.jpg',
    img1: './img/product/10_2-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: false,
    type: 'Mens'
}, {
    id: 4,
    name: 'Sweeper and Funnel',
    price: '80.00',
    img: './img/product/9-copy-600x745.jpg',
    img1: './img/product/9_2-copy-1-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: false,
    type: 'Womens'
}, {
    id: 5,
    name: 'Unisex Fashion Show',
    price: '39.00',
    img: './img/product/1_1-600x745.jpg',
    img1: './img/product/2_4-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: false,
    type: 'Mens'
}, {
    id: 6,
    name: 'Mogens Koch Bookcase',
    price: '28.00',
    img: './img/product/8_1-copy-600x745.jpg',
    img1: './img/product/8_2-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
    type: 'Womens'
}, {
    id: 7,
    name: 'Neocro backpack in canvas',
    price: '259.00',
    img: './img/product/17_1-copy-600x745.jpg',
    img1: './img/product/17-copy-600x745.jpg',
    isSale: true,
    priceSale: '$220.00',
    isbest: false,
    type: 'Backpack'
}, {
    id: 8,
    name: 'Small Zip Tote Bag',
    price: '80.00',
    img: './img/product/11_1-copy-600x745.jpg',
    img1: '',
    isSale: false,
    priceSale: '$',
    isbest: false,
    type: 'Backpack'
}, {
    id: 9,
    name: 'Casual Embossed Lettering',
    price: '79.00',
    img: './img/product/19_1-copy-600x745.jpg',
    img1: './img/product/19_2-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
    type: 'Backpack'
}, {
    id: 10,
    name: 'Checked Cotton Shirt',
    price: '79.00',
    img: './img/product/12-copy-600x745.jpg',
    img1: './img/product/12_2-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
    type: 'Mens'
}, {
    id: 11,
    name: 'Menerva Elite Textile',
    price: '79.00',
    img: './img/product/22_1-copy-600x745.jpg',
    img1: './img/product/21-copy-600x745.jpg',
    isSale: false,
    priceSale: '$',
    isbest: true,
    type: 'Shoes'
}, {
    id: 12,
    name: 'Mogens Koch Bookca',
    price: '28.00',
    img: './img/product/7_1-copy-600x745.jpg',
    img1: './img/product/7-copy-600x745.jpg',
    isSale: false,
    priceSale: '',
    isbest: true,
    type: 'Accessories'
}, {
    id: 13,
    name: 'Daily Ritual Women’s',
    price: '220.00',
    img: './img/product/2_1-copy-600x745.jpg',
    img1: './img/product/2_3-copy-600x745.jpg',
    isSale: true,
    priceSale: '$',
    isbest: true,
    type: 'Womens'
}, {
    id: 14,
    name: 'Fashion Show Edition',
    price: '39.00',
    img: './img/product/6_1-copy-600x745.jpg',
    img1: '',
    isSale: false,
    priceSale: '$',
    isbest: true,
    type: 'Womens'
}]

var listImgItem = [{
        id: 1,
        img: ['./img/product/20-copy-600x745.jpg', './img/product/20_1-copy-600x745.jpg']
    },
    {
        id: 2,
        img: ['./img/product/3_1-600x745.jpg', './img/product/2_4-copy-600x745.jpg']
    },
    {
        id: 3,
        img: ['./img/product/10_1-copy-600x745.jpg',
            './img/product/10_2-copy-600x745.jpg',
            './img/product/10_3-copy-700x870.jpg',
            './img/product/10_4-copy-700x870.jpg',
            './img/product/10_5-copy-700x870.jpg',
        ]
    },
    {
        id: 4,
        img: ['./img/product/9-copy-600x745.jpg',
            './img/product/9_2-copy-1-600x745.jpg',
        ]
    },
    {
        id: 5,
        img: ['./img/product/1_1-600x745.jpg', './img/product/2_4-copy-600x745.jpg']
    },
    {
        id: 6,
        img: ['./img/product/8_1-copy-600x745.jpg',
            './img/product/8_2-copy-600x745.jpg',
            './img/product/8_3-copy-700x870.jpg'
        ]
    },
    {
        id: 7,
        img: ['./img/product/17_1-copy-600x745.jpg', './img/product/17-copy-600x745.jpg']
    },
    {
        id: 8,
        img: ['./img/product/11_1-copy-600x745.jpg']
    }, {
        id: 9,
        img: ['./img/product/19_1-copy-600x745.jpg', './img/product/19_2-copy-600x745.jpg']
    },
    {
        id: 10,
        img: ['./img/product/12-copy-600x745.jpg', './img/product/12_2-copy-600x745.jpg']
    },
    {
        id: 11,
        img: ['./img/product/22_1-copy-600x745.jpg', './img/product/21-copy-600x745.jpg']
    },
    {
        id: 12,
        img: ['./img/product/7_1-copy-600x745.jpg',
            './img/product/7-copy-600x745.jpg',
            './img/product/7_3-copy-700x870.jpg',
        ]
    },
    {
        id: 13,
        img: ['./img/product/2_1-copy-600x745.jpg',
            './img/product/2_2-copy-700x870.jpg',
            './img/product/2_3-copy-600x745.jpg',
            './img/product/2_4-copy-600x745.jpg'
        ],
    },
    {
        id: 14,
        img: ['./img/product/6_1-copy-600x745.jpg', '']
    }
]

const blogs = [{
    id: "b1",
    img: './img/banner/8-500x321.jpg',
    head: 'Note to wear well in the workplace',
    des: 'A being too greedy for accessories to Ms. B who looks too old because of the carefulness and dullness of …',
}, {
    id: "b2",
    img: './img/banner/7-500x321.jpg',
    head: '5 ways coordination for puff sleeves',
    des: 'You are a girl who loves gentle, feminine style, “dirt bread” and you love gentle pastel tones and feminine designs. …'
}, {
    id: "b3",
    img: './img/banner/6-500x321.jpg',
    head: 'How to mix with tunic shoulders',
    des: 'How do you wear a shirt on your shoulders every day? Or slip off and maybe not comfortable with that …'
}, {
    id: "b4",
    img: './img/banner/5-500x321.jpg',
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
                    <div class="product" data-id = ${val.id} >
                        <div class="img">
                            <a href="#" onclick ="return changeUrlDetail(${val.id})">
                                <img src="${val.img}" alt="">
                                <img src="${val.img1}" alt="">
                            </a>
                            <button class="btn a-center d-flex j-between addcartitem">
                                <i class="bi bi-handbag"></i> Add To Card 
                            </button>
                            <ul class="action action1">
                                <li class="wishlist"><i class="far fa-heart"></i><span>Add to Wishlist</span>
                                </li>
                                <li class="compare"><i class="fas fa-sliders-h"></i> <span>Compare</span> </li>
                                <li class="detail"><i class="fas fa-eye"></i><span>View Details</span></li>
                            </ul>
                            <ul class="action action2">
                                <li class="wishlist"><i class="far fa-heart"></i><span></span>
                                </li>
                                <li class="addcartitem2"><i class="bi bi-handbag"></i></li>
                            </ul>
                        </div>

                        <div class="content-pro">
                            <h4>${val.name}</h4>
                            <div class="price">
                                $${val.price}
                            </div>
                        </div>
                    </div>

                    <div class="product" data-id = ${datas[index + 1].id} >
                        <div class="img">
                            <a href="#" onclick ="return changeUrlDetail(${datas[index + 1].id})">
                                <img src="${datas[index + 1].img}" alt="">
                                <img src="${datas[index + 1].img1}" alt="">
                            </a>
                            <button class="btn a-center d-flex j-between addcartitem" >
                                <i class="bi bi-handbag"></i> Add To Card
                            </button>
                            <ul class="action action1">
                                <li class="wishlist"><i class="far fa-heart"></i><span> Add to Wishlist</span></li>
                                <li class="compare"><i class="fas fa-sliders-h"></i> <span>Compare</span> </li>
                                <li class="detail"><i class="fas fa-eye"></i><span>View Details</span></li>
                            </ul>
                            <ul class="action action2">
                                <li class="wishlist"><i class="far fa-heart"></i>
                                </li>
                                <li class="addcartitem2"><i class="bi bi-handbag"></i></li>
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

function renderMainSlider(datas, owl) {

    for (let index = 0; index < 5; index++) {
        owl.owlCarousel('remove', index).owlCarousel('update');

    }
    datas.map((val) => {
        owl.trigger('add.owl.carousel', [`
            <div class="item">
                <img src="${val.img}" alt="">
                <div class="content">
                    <div class="container">
                        <p class="title-sale">
                            Quick parcel delivery, <span>from $25</span>
                        </p>
                        <h2>
                            ${val.content}
                        </h2>
                        <a href="#" class="btn btn-primary">Start Shopping</a>
                    </div>
                </div>
            </div>
        `]).trigger("refresh.owl.carousel")
    })

}

function checkWidth() {

    if ($(window).width() > 768) {

        const datas = [{
            id: 1,
            img: `./img/slider/slider81.jpg`,
            content: `Everyone's Talking About <br> Collection AW 2020`
        }, {
            id: 2,
            img: `./img/slider/slider82.jpg`,
            content: `Cover Up! Spring is coming <br>
            Extra 40% off now`
        }, {
            id: 3,
            img: `./img/slider/slider83.jpg`,
            content: `New Season Women's Fashion <br>
            Up to 70% off now!`
        }]
        renderMainSlider(datas, $('#main-slider'))

    } else {

        const datas = [{
            id: 1,
            img: `./img/slider/slider81_mb.jpg`,
            content: `Everyone's Talking About <br> Collection AW 2020`
        }, {
            id: 2,
            img: `./img/slider/home8-slide-mobile-2.jpg`,
            content: `Cover Up! Spring is coming <br>
            Extra 40% off now`
        }, {
            id: 3,
            img: `./img/slider/home8-slide-mobile-1.jpg`,
            content: `New Season Women's Fashion <br>
            Up to 70% off now!`
        }]
        renderMainSlider(datas, $('#main-slider'))

    }
}

function getAllItemProduct() {

    return products

}

function getAllimg() {
    return listImgItem
}

function changeUrlDetail(e) {

    localStorage.setItem('id-item', e)
    window.location.pathname = './Rubix-Fashion/details.html'

}