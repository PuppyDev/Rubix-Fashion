// when you click item to details id 
const id = localStorage.getItem('id-item')

const item = products.find(val => val.id == id)

const htmls = `

    <h2 class="heading">
        ${item.name}
    </h2>

    <div class="rate">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        (1 customer review)
    </div>
    <p class="price">
        $${item.price}
    </p>
    <p class="description-products">
        Tailored line. Wool mix fabric. Long design. Long buttoned sleeve. Lapel with notch. <br>
        Back slit.Two pockets with flaps on the front. Button up. Inner lining. Inner pocket.<br>
        Back length 95.0 cm.<br>
        Summer tops for women<br>
        Cheetah kimonos ,beach cover ups<br>
        Lightweight chiffon casual shirts<br>
        Open front outwear,short sleeve blouse.
    </p>

    <div class="action d-flex a-center" data-id=${item.id}>
        <div class="cotrol-item d-flex a-center">
            <a class="dash-1" href=""><i class="bi bi-dash"></i></a>
            <input type="text" class="InputAmountProduct" value="1">
            <a class="plus-1" href=""><i class="bi bi-plus"></i></a>
        </div>
        <button class="btn a-center d-flex addcartitem">
            <i class="bi bi-handbag"></i> Add To Card
        </button>
    </div>
    <div class="sku">
        <span>SKU :</span> FUW237-1<br>
        <span>Categories :</span> Accessories, Fashion, Mens<br>
        <span>Tag :</span> teapot<br>
    </div>

`

const listimg = listImgItem.find(val => val.id == id)

const sliderItem = listimg.img.map(val => {

    return `<div class="swiper-slide">
        <div class="swiper-slide-container">
            <img src="${val}" alt="">
        </div>
    </div>`

}).join('')

const htmlSlider = `
    <div class="swiper-container gallery-top">
        <div class="swiper-wrapper">
            ${sliderItem}
        </div>
    </div>
    <div class="swiper-container gallery-thumbs">
        <div class="swiper-wrapper">
            ${sliderItem}
        </div>
    </div>

`

$('section.top .container .nav-top').html(`

    <li><a href="index.html">Home <span>/</span></a></li>
    <li><a href="products.html">Shop <span>/</span></a></li>
    <li><a href="products.html">Fashion <span>/</span></a></li>
    <li><a href="products.html">${item.type}<span>/</span></a></li>
    <li><a class ="active" > ${item.name} </a></li>

`)

$('.right').append(htmls)

$('.left').append(htmlSlider)