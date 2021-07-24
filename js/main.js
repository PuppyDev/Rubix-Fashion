$(function () {

    const products = [{
            id: 1,
            name: 'Women’s classic glasses',
            price: '$80.00',
            img: '../img/product/20-copy-600x745.jpg',
            img1: '../img/product/20_1-copy-600x745.jpg',
            isSale: false,
            priceSale: '$'
        },
        {
            id: 2,
            name: 'Daily Ritual Women’s',
            price: '$80.00',
            img: '../img/product/2_3-copy-600x745.jpg',
            img1: '../img/product/2_4-copy-600x745.jpg',
            isSale: true,
            priceSale: '$65.00'
        },
        {
            id: 3,
            name: 'Cotton Fleece Jogging',
            price: '$39.00',
            img: '../img/product/10_1-copy-600x745.jpg',
            img1: '../img/product/10_2-copy-600x745.jpg',
            isSale: false,
            priceSale: '$'
        },
        {
            id: 4,
            name: 'Sweeper and Funnel',
            price: '$80.00',
            img: '../img/product/9-copy-600x745.jpg',
            img1: '../img/product/9_2-copy-1-600x745.jpg',
            isSale: false,
            priceSale: '$'
        },
        {
            id: 5,
            name: 'Mogens Koch Bookcase',
            price: '$28.00',
            img: '../img/product/8_1-copy-600x745.jpg',
            img1: '../img/product/8_2-copy-600x745.jpg',
            isSale: false,
            priceSale: '$'
        },
        {
            id: 6,
            name: 'Unisex Fashion Show',
            price: '$39.00',
            img: '../img/product/1_1-600x745.jpg',
            img1: '../img/product/2_4-copy-600x745.jpg',
            isSale: false,
            priceSale: '$'
        }, {
            id: 7,
            name: 'Neocroc backpack in canvas',
            price: '$259.00',
            img: '../img/product/17_1-copy-600x745.jpg',
            img1: '../img/product/17-copy-600x745.jpg',
            isSale: true,
            priceSale: '$220.00'
        }, {
            id: 8,
            name: 'Small Zip Tote Bag',
            price: '$80.00',
            img: '../img/product/11_1-copy-600x745.jpg',
            img1: '../img/product/20_1-copy-600x745.jpg',
            isSale: false,
            priceSale: '$'
        }
    ]

    const blogs = {

        items: [{
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
        }],
        renderBlog: function () {

            $('#add-items-blog').empty();
            this.items.forEach(val => {
                const htmls = `
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
                `
                $('#add-items-blog').append(htmls)
            })
        },
        start: function () {

            this.renderBlog()

        }
    }

    blogs.start()

    // Scroll window
    $(document).scroll(function () {
        const currentPos = $(this).scrollTop()
        $('.main-header').toggleClass('active', currentPos > 150);
        $('.backtotop').toggleClass('active', currentPos > 500);

    })


    $('document').click(function (e) {
        e.preventDefault();



    });

    // when search click
    $('#search').on('click', function (e) {

        e.preventDefault()
        $('.form-search').addClass('active')

    })

    $('.form-search .close').click(function (e) {

        e.preventDefault()
        $('.form-search').removeClass('active')

    })

    // when user click on cart 
    $('.cart-item').on('click', function (e) {

        e.preventDefault()
        $('.cart').addClass('active')

    })

    $('.cart .products-cart .close').on('click', function (e) {

        e.preventDefault()
        $('.cart').removeClass('active')

    })

});