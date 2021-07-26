var miniCart = parseLocal('dataCart') || []
var wishList = parseLocal('WishListProduct') || []
var dataCompare = parseLocal('datasCompare') || []

$(document).ready(function () {

    const products = getAllItemProduct()

    // Load data storage
    renderMiniCart(miniCart)
    changeStatus(miniCart.length)
    renderCart(miniCart)
    $(function () {

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
        })

        // add ele from quickview
        $(document).on('click', '.action .addcartitem', function (e) {

            $('.quickview').removeClass('active')
            const id = $(this).parents('.action').data('id')

            const valueCurrent = +$('.InputAmountProduct').val()
            const idxSame = miniCart.findIndex(val => val.id == id)
            console.log(idxSame);

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

            renderMiniCart(miniCart)
            changeStatus(miniCart.length)
            $('.cart').addClass('active')
            setLocal(miniCart, 'dataCart')

        });

        // viewDetails Quickview
        $(document).on('click', '.action .detail', function (e) {

            const id = $(this).parents('.product').data('id')
            $('.quickview').addClass('active')
            renderQuickView(id)

        })

        // when you click plus 1 product 
        $(document).on('click', '.plus-1', function (e) {

            e.preventDefault()


            if ($(this).parents('tr').data('id')) {

                const id = $(this).parents('tr').data('id')
                const input = $(this).siblings('input')
                plus_1(id, input)

            } else if ($(this).parents('.action').data('id')) {

                const input = $('.InputAmountProduct')
                input.val(+input.val() + 1)

            }


        })

        $(document).on('click', '.dash-1', function (e) {

            e.preventDefault()
            const input = $(this).siblings('input') || $('.InputAmountProduct')
            const id = $(this).parents('tr').data('id')
            const idxSame = miniCart.findIndex(val => val.id == id)

            if (input.val() > 1) {

                if ($(this).parents('tr').data('id')) {
                    input.val(+input.val() - 1)
                    miniCart[idxSame].quantity = --miniCart[idxSame].quantity
                    setLocal(miniCart, 'dataCart')
                } else if ($(this).parents('.action').data('id')) {

                    input.val(+input.val() - 1)

                }


            }

        })

        $(document).on('click', '.update', function (e) {

            renderCart(miniCart)

        })

    });

    function plus_1(id, input) {

        const idxSame = miniCart.findIndex(val => val.id == id)
        miniCart[idxSame].quantity = ++miniCart[idxSame].quantity
        input.val(+input.val() + 1)
        setLocal(miniCart, 'dataCart')
    }

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
});


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
    list.empty()
    var total = 0

    if (datas.length >= 1)
        total = datas.reduce((acc, val) => {
            const htmls = `
            <tr class ="product-item" data-id="${val.id}">
                <td>
                    <div class="erase">
                        &times;
                    </div>
                </td>
                <td>
                    <div class="img">
                        <img src="${val.img}" alt="">
                    </div>
                </td>
                <td>
                    <div class="heading-product">
                        ${val.name}
                    </div>
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
            </tr>  
        `
            list.append(htmls)
            return (val.quantity * val.price) + acc
        }, 0)
    else {
        $('.products-cart .container').html(`
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
            <a href="#" class="img ">
                <img src="${val.img}" alt="">
            </a>
            <div class="quantity">
                <a href="#">${val.name}</a>
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
    // have ID 
    if (idxSame != -1) {

        miniCart[idxSame].quantity = ++miniCart[idxSame].quantity

    } else {

        // get a product = id and push miniCart
        const ele = products.find(val => val.id == id)
        miniCart.push({
            ...ele,
            quantity: 1
        })
    }

    setLocal(miniCart, 'dataCart')

}

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
    $(document).on('click', '#addToCard .erase', function (e) {

        const id = $(this).parents('.product-item').data("id")
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

// when you click add ele to cart 
$(document).on('click', '.product .addcartitem', function (e) {

    e.preventDefault()
    const id = $(this).data('id')
    const ele = $(this)
    // Add ele to Arrray
    addMiniCart(id)

    // Render
    renderMiniCart(miniCart)
    changeStatus(miniCart.length)
    $('.cart').addClass('active')

});

$(document).on('click', '.comparelist .addcartitem', function (e) {

    e.preventDefault()
    const id = $(this).data('id')
    const ele = $(this)
    addMiniCart(id)
    renderMiniCart(miniCart)
    setLocal(miniCart, 'dataCart')
    $(this).html('View Cart')

});

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
            alert('WishList have a this item!')
        } else {

            const ele = products.find(val => val.id == id)
            wishList.push(ele)
            $('.addWishlist .before').html(wishList.length)
            setLocal(wishList, 'WishListProduct')
        }

    })

    // Remove item in wishlist
    $(document).on('click', '#addToWish .erase', function (e) {

        const id = $(this).parents('.product-item').data("id")
        removeWishItem(id)
        $('.addWishlist .before').html(wishList.length)

    });


    /*Function*/

    function removeWishItem(id) {

        wishList = wishList.filter(val => val.id != +id)
        renderWishList(wishList)
        setLocal(wishList, 'WishListProduct')

    }


    function renderWishList(datas) {

        const list = $('#addToWish')
        list.empty()
        datas.map(val => {
            const htmls = `
                <tr class ="product-item" data-id="${val.id}">
                    <td>
                        <div class="erase">
                            &times;
                        </div>
                    </td>
                    <td>
                        <div class="img">
                            <img src="${val.img}" alt="">
                        </div>
                    </td>
                    <td>
                        <div class="heading-product">
                            ${val.name}
                        </div>
                    </td>
                    <td>
                        $${val.price}
                    </td>
                    <td>
                        In Stock
                    </td>
                    <td>
                        <button class ="addcartitem" data-id="${val.id}">Add to card</button>
                    </td>
                </tr>  
            `
            list.append(htmls)
        }, 0)

    }

})


/*=======Compare List Product========*/
$(document).ready(function () {
    renderCompare()
    $('.action .compare').on('click', function (e) {

        e.preventDefault()
        const id = $(this).parents('.product').data('id')

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

    $('.compare-product-box .close').on('click', function (e) {

        $(this).parents('.compare-product').removeClass('active')

    })

    // remove item 
    $(document).on('click', '.remove .close', function (e) {

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

    function renderCompare() {

        $('.comparelist.content').empty()

        // load defaul
        $('.comparelist.content').append(`
            <tr class="remove">
                <td></td>
            </tr>
            <tr class="image">
                <td></td>
            </tr>
            <tr class="title">
                <td>Title</td>
            </tr>
            <tr class="price">
                <td>Price</td>
            </tr>
            <tr class="add">
                <td>Add to cart</td>
            </tr>
            <tr class="description">
                <td>Description</td>
            </tr>
            <tr class="sku ">
                <td>Sku</td>
            </tr>
            <tr class="stock ">
                <td>Availability</td>
            </tr>
            <tr class="weight ">
                <td>Weight</td>
            </tr>
            <tr class="dimensions ">
                <td>Dimensions</td>
            </tr>
            <tr class="colors">
                <td>Color</td>
            </tr>
            <tr class="size ">
                <td>Size</td>
            </tr>
            
        `)

        dataCompare.map(val => {

            $(`<td class ="close" data-id="${val.id}"> &times;</td>`).appendTo(".comparelist.content .remove")
            $(`<td><img src="${val.img}"></td>`).appendTo(".comparelist.content .image")
            $(`<td>${val.name}</td>`).appendTo(".comparelist.content .title")
            $(`<td>$${val.price}</td>`).appendTo(".comparelist.content .price")
            $(`<td>
                <a href="#" data-id="${val.id}" class="btn btn-primary addcartitem">Add to cart</a>
                </td>`).appendTo(".comparelist.content .add")

            $(`<td>Summer tops for women<br>
                    Cheetah kimonos ,beach cover ups<br>
                    Lightweight chiffon casual shirts<br>
                    Open front outwear,short sleeve blouse.
                </td>`).appendTo(".comparelist.content .description")

            $(`<td>FUW243-1</td>`).appendTo(".comparelist.content .sku")
            $(`<td>In stock</td>`).appendTo(".comparelist.content .stock")
            $(`<td>-</td>`).appendTo(".comparelist.content .weight")
            $(`<td>N/A</td>`).appendTo(".comparelist.content .dimensions")
            $(`<td>-</td>`).appendTo(".comparelist.content .colors")
            $(`<td>-</td>`).appendTo(".comparelist.content .size")

        })

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
        console.log(val.quantity);
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