$(document).ready(function () {

    var miniCart = parseLocal('dataCart') || []
    var wishList = parseLocal('WishListProduct') || []
    const products = getAllItemProduct()
    $(function () {

        // Load data storage
        renderMiniCart(miniCart)
        changeStatus(miniCart.length)
        renderCart(miniCart)
        //whist list 
        renderWishList(wishList)
        $('.addWishlist .before').html(wishList.length)

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
        })

        // when you click add ele to cart 
        $(document).on('click', '.addcartitem', function (e) {

            const target = e.target
            const id = +target.dataset.id
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

            renderMiniCart(miniCart)
            changeStatus(miniCart.length)
            $('.cart').addClass('active')
            setLocal(miniCart, 'dataCart')

        });

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

        // add wishlist
        $(document).on('click', '.action .wishlist', function (e) {

            const id = $(this).parents('.product').data('id')
            const ele = products.find(val => val.id == id)
            wishList.push(ele)
            $('.addWishlist .before').html(wishList.length)
            setLocal(wishList, 'WishListProduct')

        })

        $(document).on('click', '#addToWish .erase', function (e) {

            const id = $(this).parents('.product-item').data("id")
            removeWishItem(id)
            $('.addWishlist .before').html(wishList.length)

        });

        // viewDetails Quickview
        $(document).on('click', '.action .detail', function (e) {

            const id = $(this).parents('.product').data('id')
            const ele = products.find(val => val.id == id)
            $('.quickview').addClass('active')
            renderQuickView(ele)

        })

        $('.modal .close').on('click', function (e) {

            $('.quickview').removeClass('active')

        })

    });

    function removeWishItem(id) {

        wishList = wishList.filter(val => val.id != +id)
        renderWishList(wishList)
        setLocal(wishList, 'WishListProduct')

    }

    function removeItemMiniCart(id) {
        // remove ele in miniCart
        miniCart = miniCart.filter(val => val.id != +id)
        renderCart(miniCart)
        // Render again
        setLocal(miniCart, 'dataCart')

    }

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

    function renderCart(datas) {

        const list = $('#addToCard')
        list.empty()
        const total = datas.reduce((acc, val) => {
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
                            <a href=""><i class="bi bi-plus"></i></a>
                            <input type="text" value="${val.quantity}">
                            <a href=""><i class="bi bi-dash"></i></a>
                        </div>
                    </td>
                    <td>${val.price}</td>
                </tr>  
            `
            list.append(htmls)
            return (val.quantity * val.price) + acc
        }, 0)

        $('.sub-totals .subtotal').html(`$${total}.00`)
        $('.total .total-product').html(`$${total}.00`)
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

    function setLocal(datas, name) {

        return localStorage.setItem(`${name}`, JSON.stringify(datas))

    }

    function parseLocal(name) {

        const data = localStorage.getItem(name);
        return JSON.parse(data)

    }

    function renderQuickView(datas) {

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
            <div class="sku">
                SKU:<br>
                FUW237-1<br>
                Categories: Accessories, Fashion, Mens<br>
                Tag: teapot<br>
            </div>
        `)
    }

});