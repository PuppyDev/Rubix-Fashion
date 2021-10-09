var miniCart = parseLocal('dataCart') || []
var wishList = parseLocal('WishListProduct') || []
var dataCompare = parseLocal('datasCompare') || []

// Back to top
$(".backtotop").on('click', function (e) {

    e.preventDefault()
    $('html,body').animate({
        scrollTop: 0
    }, 0)
})

$(document).ready(function () {

    const products = getAllItemProduct()

    // Load data storage
    renderMiniCart(miniCart)
    changeStatus(miniCart.length)
    renderCart(miniCart)
    $(function () {

        $(document).on('click', '.dropdown-mini', function (e) {
            e.preventDefault()

            $('.menu-level2').removeClass('active')
            $(this).parents('a').siblings('.menu-level2').toggleClass('active')

        })

        // Scroll window
        $(document).scroll(function () {

            const currentPos = $(this).scrollTop()
            $('.main-header').toggleClass('active', currentPos > 150);
            $('.backtotop').toggleClass('active', currentPos > 500);

        })

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

        $(document).click(function (e) {

            const target = e.target
            // when you click somewhere is not a minicart
            if ((target.classList.contains('cart') && target.classList.contains('active')) || target.classList.contains('close')) {

                $('.cart').removeClass('active')

            }

            // cancel quickview
            if (target.classList.contains('close') || target.classList.contains('quickview')) {

                $('.quickview').removeClass('active')

            }

            // cancel main-menu0mobile
            if (target.classList.contains('close') || target.classList.contains('menu-mobile-overlay')) {

                $('.menu-mobile-overlay').removeClass('active')

            }

            if (target.classList.contains('filter-mode') || target.classList.contains('control-filter')) {

                $('.control-filter').toggleClass('active');

            }

        })

        // toggle main-menu-mobile
        $(document).on('click', '.bar .fa-bars', function (e) {

            e.preventDefault()
            $('.menu-mobile-overlay').addClass('active')

        })

        // when you click plus 1 product 
        $(document).on('click', '.plus-1', function (e) {

            e.preventDefault()

            if ($(this).parents('.product-item-cart').data('id')) {

                const id = $(this).parents('.product-item-cart').data('id')
                const input = $(this).siblings('input')
                plus_1(id, input)

            } else if ($(this).parents('.action').data('id')) {

                const input = $('.InputAmountProduct')
                input.val(+input.val() + 1)

            }

            $('.coupon .update').addClass('active');

        })

        $(document).on('click', '.dash-1', function (e) {

            e.preventDefault()
            const input = $(this).siblings('input') || $('.InputAmountProduct')
            const id = $(this).parents('.product-item-cart').data('id')
            const idxSame = miniCart.findIndex(val => val.id == id)

            if (input.val() > 1) {

                if ($(this).parents('.product-item-cart').data('id')) {

                    input.val(+input.val() - 1)
                    miniCart[idxSame].quantity = --miniCart[idxSame].quantity
                    setLocal(miniCart, 'dataCart')
                    $('.coupon .update').addClass('active');

                } else if ($(this).parents('.action').data('id')) {

                    input.val(+input.val() - 1)

                }

            }


        })

        $(document).on('click', '.update.active', function (e) {

            $('html,body').animate({
                scrollTop: 0
            }, 500)

            setTimeout(() => {
                renderCart(miniCart)
            }, 1000);

            $('.coupon .update').removeClass('active');
            $('.update-Complete').addClass('active');

        })

    });

    function plus_1(id, input) {

        const idxSame = miniCart.findIndex(val => val.id == id)
        miniCart[idxSame].quantity = ++miniCart[idxSame].quantity
        input.val(+input.val() + 1)
        setLocal(miniCart, 'dataCart')
    }

})

// ====== Product Category ========
$(document).ready(function () {

    let viewAmount = 8
    let cols = 4
    renderBtn(products)
    renderProductCate(products)

    $('.form-search ul li').on('click', function (e) {

        $('.form-search ul li.active').removeClass('active')
        $(this).addClass('active')

    });

    $(document).on('click', '.middle-col', function (e) {

        const target = e.target.closest('.three-cols') || e.target.closest('.two-cols') || e.target.closest('.four-cols')


        if (target)
            cols = target.dataset.cols
        if (cols == 4)
            viewAmount = 9
        else
            viewAmount = 8
        renderProductCate(products, viewAmount, cols)


    })

    // filter category type
    $('.list-option input').on('change', function () {
        const type = $('input[name=checkone]:checked').val()

        if (type == 'All') {

            renderProductCate(products)
            renderBtn(products)

        } else {

            const datas = products.filter(val => {
                // console.log(val.type, type);
                return val.type == type
            })

            renderProductCate(datas)
            renderBtn(datas)
        }
    })

    // filter sort
    $('#filterProduct').on('change', function (e) {

        const value = $(this).val();
        const datas = products.sort((a, b) => +a.price - +b.price)

        if (value == 'high') {

            renderProductCate(datas.reverse())

        } else if (value == 'low') {

            renderProductCate(datas)

        } else {

            renderProductCate(products)

        }

    });

    // function render to view 
    function renderProductCate(datas, viewAmount = 9, cols = 4) {

        const current = +$('.group-btn-products ul li a.active').html()
        var start = (current - 1) * viewAmount
        var end = start + viewAmount
        $('#addproductsCate').empty()
        const products = datas.slice(start, end).map(val => `
                <div class="product col-lg-${cols} col-xl-${cols}" data-id=${val.id}>
                    <div class="img">
                        <a href="#" onclick ="return changeUrlDetail(${val.id})">
                            <img src="${val.img}" alt="">
                            <img src="${val.img1}" alt="">
                        </a>
                        <button class="btn a-center d-flex j-between addcartitem" data-id=${val.id}>
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
            </div>`)
        $('#addproductsCate').append(products)

    }

    // render group btn 
    function renderBtn(datas, viewAmount = 9) {

        const btn = $('.group-btn-products')
        btn.empty()
        const amount = Math.ceil(datas.length / viewAmount)
        var html = ` `
        for (let i = 1; i <= amount; i++) {

            html += `<li>
                <a href="#" class ="${i == 1 ? 'active' : ''}" data-id = ${i}> ${i}</a>
            </li>`

        }
        btn.append(`
            <ul class="d-flex a-center">${html}</ul>
        `);
    }

    // when you click on btn pagination
    $(document).on('click', '.group-btn-products ul li a', function (e) {

        e.preventDefault();
        const current = $('.group-btn-products ul li a.active')
        const ele = $(this)

        if (ele) {
            current.removeClass('active')
            ele.addClass('active')
            renderProductCate(products, viewAmount, cols)
        }

        $('html,body').animate({
            scrollTop: 0
        }, 0)

    })

})

/**Get , Set LocalStorage */
function setLocal(datas, name) {

    if (datas)
        return localStorage.setItem(`${name}`, JSON.stringify(datas))

}

function parseLocal(name) {

    const data = localStorage.getItem(name);
    return JSON.parse(data)

}

//======Render Cart============
function renderCart(datas) {

    const list = $('#addToCard')
    const listMb = $('.cart-on-mb')
    list.empty()
    listMb.empty()
    var total = 0

    if (datas.length >= 1) {
        total = datas.reduce((acc, val) => {
            const htmls = `
            <tr class ="product-item-cart" data-id="${val.id}">
                <td>
                    <div class="erase">
                        &times;
                    </div>
                </td>
                <td>
                    <div class="img" onclick ="return changeUrlDetail(${val.id})">
                        <img src="${val.img}" alt="">
                    </div>
                </td>
                <td>
                    <a href="#" class="heading-product" onclick ="return changeUrlDetail(${val.id})">
                        ${val.name}
                    </a>
                </td>
                <td>
                    $${val.price}
                </td>
                <td>
                    <div class="control d-flex a-center">
                        <a class ="dash-1" href=""><i class="bi bi-dash"></i></a>
                        <input type="text"class="InputAmountProduct" value="${val.quantity}">
                        <a class ="plus-1" href=""><i class="bi bi-plus"></i></a>
                    </div>
                </td>
                <td>$${(val.price * val.quantity)}.00</td>
            </tr>  `

            // data render on mobile
            const htmls2 = `
                <div class="product-item-cart" data-id="${val.id}">
                    <div class="remove-item d-flex a-center">
                        <div class="erase">
                            &times;
                        </div>

                    </div>

                    <a href="#" class="product-name d-flex j-between a-center" onclick ="return changeUrlDetail(${val.id})">
                        <span>Product : </span>
                        ${val.name}
                    </a>

                    <div class="price d-flex j-between a-center">
                        <span>Price : </span>
                        $${val.price}
                    </div>

                    <div class="quantity d-flex j-between">
                        <span>Quantity : </span>

                        <div class="control d-flex a-center">
                            <a class="dash-1" href=""><i class="bi bi-dash"></i></a>
                            <input type="text" class="InputAmountProduct" value="${val.quantity}">
                            <a class="plus-1" href=""><i class="bi bi-plus"></i></a>
                        </div>

                    </div>

                </div>
            `

            list.append(htmls)
            listMb.append(htmls2)
            return (val.quantity * val.price) + acc
        }, 0)


    } else {
        $('.cart-list1 .container').html(`
            <h2 class="heading-cart">
                Cart
            </h2>
            <p>Your cart doesn't have any item</p>
            <a href="index.html" class="btn btn-primary comeback">Come Back Home</a>
        `)
    }

    $('.sub-totals .subtotal').html(`$${total}.00`)
    $('.total .total-product').html(`$${total}.00`)
}

//======Render miniCart=========

$(document).ready(function () {

    // when you remove ele from minicart
    $(document).on('click', '.erase', function (e) {

        const target = e.target
        // Get ID 
        const id = target.parentNode.dataset.id
        removeItemMiniCart(id)
        changeStatus(miniCart.length)
        renderMiniCart(miniCart)

    });

    // when you remove ele from cart
    $(document).on('click', '.products-cart .erase', function (e) {

        const id = $(this).parents('.product-item-cart').data("id")
        removeItemMiniCart(id)

    });

    function removeItemMiniCart(id) {
        // remove ele in miniCart
        miniCart = miniCart.filter(val => val.id != +id)
        renderCart(miniCart)
        // Render again
        setLocal(miniCart, 'dataCart')

    }

})

// change status of minicart
function changeStatus(length) {

    if (length > 0) {

        $('.mini-cart').addClass('active')
        $('.no-product').addClass('active')

    } else {

        $('.no-product').removeClass('active')
        $('.mini-cart').removeClass('active')

    }
}

function renderMiniCart(datas) {

    const mini_cart = $('#mini-cart-product')
    const subTotal = $('.total .sub-total')
    const amount = $('.cart-item .before')
    mini_cart.empty()
    const total = datas.reduce((acc, val) => {
        const htmls = `
        <li class="d-flex" data-id=${val.id}>
            <a href="#" class="img " onclick ="return changeUrlDetail(${val.id})">
                <img src="${val.img}" alt="">
            </a>
            <div class="quantity">
                <a href="#" onclick ="return changeUrlDetail(${val.id})">${val.name}</a>
                <p> <span class="countEle"> ${val.quantity} </span> × $${val.price}</p>
            </div>
            <span class ="erase">&times;</span>
        </li>
    `
        mini_cart.append(htmls);
        return (+val.price * val.quantity) + acc
    }, 0)

    const length = datas.reduce((acc, val) => {
        return acc + val.quantity
    }, 0)
    // render sum of ele
    amount.html(length)
    // render subtotal in minicart
    subTotal.html(`$${total}.00`)

}

function addMiniCart(id) {


    const idxSame = miniCart.findIndex(val => val.id == id)
    // get a product = id and push miniCart
    const ele = products.find(val => val.id == id)
    // have ID 
    if (idxSame != -1) {

        miniCart[idxSame].quantity = ++miniCart[idxSame].quantity

    } else {

        const newValue = {
            ...ele,
            quantity: 1
        }

        miniCart.push(newValue)
    }

    $('.loaded').removeClass('active')

    setLocal(miniCart, 'dataCart')
}

// when you click add ele to Minicart 
$(document).on('click', '.product .addcartitem', function (e) {

    e.preventDefault()
    const id = $(this).parents('.product').data('id')

    // Add ele to Arrray
    addMiniCart(id)
    $('.loaded').addClass('active')

    setTimeout(() => {
        // Render
        renderMiniCart(miniCart)
        changeStatus(miniCart.length)
        $('.cart').addClass('active')
        $('.loaded').removeClass('active')

    }, 500);
});

$(document).on('click', '.comparelist .addcartitem', function (e) {

    e.preventDefault()
    const id = $(this).data('id')
    addMiniCart(id)
    $('.loaded').addClass('active')

    setTimeout(() => {
        renderMiniCart(miniCart)
        $(this).html('View Cart')
        $('.loaded').removeClass('active')

    }, 500);

});

$(document).on('click', '.addcartitem2', function (e) {

    e.preventDefault()
    const id = $(this).parents('.product').data('id')
    addMiniCart(id)
    $('.loaded').addClass('active')

    setTimeout(() => {
        renderMiniCart(miniCart)
        changeStatus(miniCart.length)
        $('.cart').addClass('active')
        $('.loaded').removeClass('active')

    }, 500);

})

/*=========wishlist========== */
$(document).ready(function () {

    //whist list render when website load the first 
    renderWishList(wishList)
    $('.addWishlist .before').html(wishList.length)

    // add wishlist
    $(document).on('click', '.action .wishlist', function (e) {

        const id = $(this).parents('.product').data('id')
        const isSame = wishList.findIndex(val => val.id == id)
        if (isSame != -1) {
            $('.popup-product-added').fadeIn().fadeOut(2000);
        } else {

            const ele = products.find(val => val.id == id)
            wishList.push(ele)
            $('.addWishlist .before').html(wishList.length)
            setLocal(wishList, 'WishListProduct')
        }

    })

    // add product to minicart 
    $(document).on('click', '.products-cart .addcartitem', function (e) {

        e.preventDefault()
        const id = $(this).parents('.product-item').data('id')
        addMiniCart(id)
        $('.loaded').addClass('active')
        removeWishItem(id)
        renderMiniCart(miniCart)

        setTimeout(() => {
            changeStatus(miniCart.length)
            $('.cart').addClass('active')
            $('.products-cart .update-Complete').addClass('active')

        }, 500);

        setTimeout(() => {

            $('.loaded').removeClass('active')
        }, 700);

    })


    // Remove item in wishlist
    $(document).on('click', '.products-cart .erase', function (e) {

        const id = $(this).parents('.product-item').data("id")
        removeWishItem(id)
        $('.addWishlist .before').html(wishList.length)
        $('.products-cart .update-Complete').addClass('active')

    });


    /*Function*/

    function removeWishItem(id) {

        wishList = wishList.filter(val => val.id != +id)
        renderWishList(wishList)
        $('.addWishlist .before').html(wishList.length)
        setLocal(wishList, 'WishListProduct')
    }

    function renderWishList(datas) {
        const list = $('#addToWish')
        const cartmb = $('.cart-mobile')
        list.empty()
        cartmb.empty()
        if (datas.length >= 1) {
            datas.forEach(val => {
                // render > 768
                var htmls = `
                        <tr class ="product-item" data-id="${val.id != null ? val.id : ''}">
                            <td>
                                <div class="erase">
                                    &times;
                                </div>
                            </td>
                            <td>
                                <div class="img" onclick ="return changeUrlDetail(${val.id})">
                                    <img src="${val.img}" alt="">
                                </div>
                            </td>
                            <td>
                                <a href="#" class="heading-product" onclick ="return changeUrlDetail(${val.id})">
                                    ${val.name}
                                </a>
                            </td>
                            <td>
                                $${val.price}
                            </td>
                            <td class ="stocked">
                                In Stock
                            </td>
                            <td>
                                <button class ="addcartitem" data-id="${val.id}">Add to card</button>
                            </td>
                        </tr>  
                    `
                list.append(htmls)

                // render < 768
                htmls = `
                    <div class="product-item" data-id="${val.id}">
                        <div class="item-wrapper d-flex">
                            <a href="#" class="product-thumbnail" onclick ="return changeUrlDetail(${val.id})">
                                <img src="${val.img}" alt="">
                            </a>
                            <div class="item-details">
                                <h3 class="product-name" onclick ="return changeUrlDetail(${val.id})">
                                    ${val.name}
                                </h3>
                                <div class="price d-flex a-center j-between">
                                    <span class="head-price">Price</span>
                                    $${val.price}
                                </div>
                            </div>
                        </div>
                        <div class="stock d-flex a-center j-between">
                            <p>Stock</p>
                            <span>In Stock</span>
                        </div>

                        <div style="text-align: center;">
                            <button class="addcartitem" data-id="${val.id}">Add to card</button>
                        </div>

                        <div class="erase">
                            &times;
                        </div>
                    </div>
                `
                cartmb.append(htmls)


            }, 0)
            $('.share-wishlist').css('display', 'block');

        } else {

            list.html(`
                <tr>
                    <td style="margin-top:20px; font-size: 16px"> No products added to the wishlist </td>
                <tr>
            `)
            $('.share-wishlist').css('display', 'none');
        }

    }

})

/*=======Compare List Product========*/
function renderCompare() {

    $('.comparelist.content').empty()

    // load defaul
    $('.comparelist.content').append(`
        <tr class="remove">
            <td class ="odd"></td>
        </tr>
        <tr class="image">
            <td class ="odd"></td>
        </tr>
        <tr class="title">
            <td class ="odd">Title</td>
        </tr>
        <tr class="price">
            <td class ="odd">Price</td>
        </tr>
        <tr class="add">
            <td class ="odd">Add to cart</td>
        </tr>
        <tr class="description">
            <td class ="odd">Description</td>
        </tr>
        <tr class="sku ">
            <td class ="odd">Sku</td>
        </tr>
        <tr class="stock ">
            <td class ="odd">Availability</td>
        </tr>
        <tr class="weight ">
            <td class ="odd">Weight</td>
        </tr>
        <tr class="dimensions ">
            <td class ="odd">Dimensions</td>
        </tr>
        <tr class="colors">
            <td class ="odd">Color</td>
        </tr>
        <tr class="size ">
            <td class ="odd">Size</td>
        </tr>
        
    `)

    dataCompare.map((val, index) => {

        $(`<td class ="removeCompareItem ${index % 2 != 1 ? 'odd' : ''}" data-id="${val.id}"> &times;</td>`).appendTo(".comparelist.content .remove")
        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}"><img src="${val.img}"></td>`).appendTo(".comparelist.content .image")
        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">${val.name}</td>`).appendTo(".comparelist.content .title")
        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">$${val.price}</td>`).appendTo(".comparelist.content .price")
        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">
            <a href="#" data-id="${val.id}" class="btn btn-primary addcartitem">Add to cart</a>
            </td>`).appendTo(".comparelist.content .add")

        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">Summer tops for women<br>
                Cheetah kimonos ,beach cover ups<br>
                Lightweight chiffon casual shirts<br>
                Open front outwear,short sleeve blouse.
            </td>`).appendTo(".comparelist.content .description")

        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">FUW243-1</td>`).appendTo(".comparelist.content .sku")
        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">In stock</td>`).appendTo(".comparelist.content .stock")
        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">-</td>`).appendTo(".comparelist.content .weight")
        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">N/A</td>`).appendTo(".comparelist.content .dimensions")
        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">-</td>`).appendTo(".comparelist.content .colors")
        $(`<td class ="${index % 2 != 1 ? 'odd' : ''}">-</td>`).appendTo(".comparelist.content .size")

    })

}

$(document).ready(function () {
    renderCompare()

    $(document).on('click', '.action .compare', function (e) {

        e.preventDefault()
        const id = $(this).parents('.product').data('id')
        console.log(id);
        const idxSame = dataCompare.findIndex(val => val.id == id)
        // have ID 
        if (idxSame == -1) {

            $('.compare-product').addClass('active')

            const val = products.find(val => val.id == id)

            dataCompare.push(val)
            renderCompare()
            setLocal(dataCompare, 'datasCompare')

        } else {

            $('.compare-product').addClass('active')

        }

    })

    $(document).on('click', '.compare-product-box .close', function (e) {

        $(this).parents('.compare-product').removeClass('active')

    })

    // remove item 
    $(document).on('click', '.remove .removeCompareItem', function (e) {

        const id = $(this).data('id')
        const index = dataCompare.findIndex(val => val.id == id)
        dataCompare.splice(index, 1)

        if (dataCompare.length >= 1)
            renderCompare()
        else {

            $('.comparelist.content').html(`
                <p style = "font-size: 30px; text-align: center; margin: 20px">
                    No products added in the compare table.
                </p>
            `)

        }
        setLocal(dataCompare, 'datasCompare')

    })
})

/**======Quick View */
$(document).ready(function () {

    // add ele from quickview
    $(document).on('click', '.action .addcartitem', function (e) {

        $('.quickview').removeClass('active')
        const id = $(this).parents('.action').data('id')

        const valueCurrent = +$('.InputAmountProduct').val()
        const idxSame = miniCart.findIndex(val => val.id == id)

        if (idxSame != -1) {

            miniCart[idxSame].quantity = valueCurrent

        } else {
            const ele = {
                ...products.find(val => val.id == id),
                quantity: 1
            }
            ele.quantity = valueCurrent
            miniCart.push(ele)
        }

        $('.loaded').addClass('active')

        setTimeout(() => {

            renderMiniCart(miniCart)
            changeStatus(miniCart.length)
            $('.cart').addClass('active')
            $('.loaded').removeClass('active')

        }, 500);
        setLocal(miniCart, 'dataCart')

    });

    // viewDetails Quickview
    $(document).on('click', '.action .detail', function (e) {

        const id = $(this).parents('.product').data('id')
        $('.loaded').addClass('active')

        setTimeout(() => {
            $('.quickview').addClass('active')
            renderQuickView(id)
            $('.loaded').removeClass('active')
        }, 1000);

    })

    function renderQuickView(id) {

        const datas = products.find(val => val.id == id)
        const listImg = getAllimg().find(val => val.id == id)
        const owl = $('#quickviewSl')
        for (let index = 0; index < 5; index++) {
            owl.owlCarousel('remove', index).owlCarousel('update');

        }

        listImg.img.forEach(val => {
            owl.trigger('add.owl.carousel', [`
                <div class="item">
                    <img src="${val}" alt="">
                </div>
            `]).trigger("refresh.owl.carousel")
        });

        // add ưhen you click details
        $('.modal .item-modal').append(`
            <a href="#" class="btn btn-primary viewDetails" onclick ="changeUrlDetail(${id})">
                View Details
            </a>
        `);

        $('.modal .content').html(`
            <a href="#">${datas.name}</a>
            <div class="star">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i> (1 customer review)
            </div>
            <p class="price">$${datas.price}</p>
            <p class="des">
                .Tailored line. Wool mix fabric. Long design. Long buttoned sleeve. Lapel with notch. Back slit.
                Two pockets with flaps on the front. Button up. Inner lining. Inner pocket. Back length 95.0
                cm.<br>
                Summer tops for women<br>
                Cheetah kimonos ,beach cover ups<br>
                Lightweight chiffon casual shirts<br>
                Open front outwear,short sleeve blouse.<br>
            </p>
            <div class="action d-flex a-center" data-id = ${datas.id}>
                <div class="cotrol-item d-flex a-center"> 
                    <a class ="dash-1" href=""><i class="bi bi-dash"></i></a>
                    <input type="text"class="InputAmountProduct" value="1">
                    <a class ="plus-1" href=""><i class="bi bi-plus"></i></a>
                </div>
                <button class="btn a-center d-flex addcartitem">
                    <i class="bi bi-handbag"></i> Add To Card 
                </button>
            </div>
            <div class="sku">
                SKU:<br>
                FUW237-1<br>
                Categories: Accessories, Fashion, Mens<br>
                Tag: teapot<br>
            </div>
        `)
    }
})

//======Render Checkout============
renderCheckOut(miniCart)

function renderCheckOut(datas = []) {

    $('#ListCheckOut').empty()

    const total = datas.reduce((acc, val) => {

        $('#ListCheckOut').append(`
            <tr>
                <td>${val.name} × ${val.quantity}</td>
                <td>${val.price}</td>
            </tr>
        `)
        return acc + (val.quantity * +val.price)
    }, 0)

    $('#ListCheckOut').append(`
        <tr class="Subtotal-price item">
            <th>Subtotal</th>
            <td>$${total}.00</td>
        </tr>
        <tr class="total-price item">
            <th>Total</th>
            <td>$${total}.00</td>
        </tr>
    `)


}

//=====Add animation when webpage scroll======

$(document).scroll(function (e) {

    const scrollHeigh = window.scrollY
    if (scrollHeigh > 150)
        $('.trending-top .trending-product').addClass('animation1');
    if (scrollHeigh > 1240)
        $('.element').addClass('animation2');
    if (scrollHeigh > 1800)
        $('.trending-bottom .trending-product').addClass('animation1');
    // if (scrollHeigh > 3105)
    //     $('.subcriber .element-container').addClass('animation3');
    // if (scrollHeigh > 3530)
    //     $('.serve .services').addClass('animation1');
    if (scrollHeigh > 3800)
        $('.blog .title').addClass('animation1');
    if (scrollHeigh > 3960)
        $('.blog #blog').addClass('animation1');

})