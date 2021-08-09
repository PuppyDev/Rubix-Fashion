"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var miniCart = parseLocal('dataCart') || [];
var wishList = parseLocal('WishListProduct') || [];
var dataCompare = parseLocal('datasCompare') || [];
$(document).ready(function () {
  var products = getAllItemProduct(); // Load data storage

  renderMiniCart(miniCart);
  changeStatus(miniCart.length);
  renderCart(miniCart);
  $(function () {
    // Back to top
    $(".backtotop").on('click', function (e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 1000);
    });
    $(document).on('click', '.dropdown-mini', function (e) {
      e.preventDefault();
      $('.menu-level2').removeClass('active');
      $(this).parents('a').siblings('.menu-level2').toggleClass('active');
    }); // Scroll window

    $(document).scroll(function () {
      var currentPos = $(this).scrollTop();
      $('.main-header').toggleClass('active', currentPos > 150);
      $('.backtotop').toggleClass('active', currentPos > 500);
    }); // when search click

    $('#search').on('click', function (e) {
      e.preventDefault();
      $('.form-search').addClass('active');
    });
    $('.form-search .close').click(function (e) {
      e.preventDefault();
      $('.form-search').removeClass('active');
    }); // when user click on cart 

    $('.cart-item').on('click', function (e) {
      e.preventDefault();
      $('.cart').addClass('active');
    });
    $(document).click(function (e) {
      var target = e.target; // when you click somewhere is not a minicart

      if (target.classList.contains('cart') && target.classList.contains('active') || target.classList.contains('close')) {
        $('.cart').removeClass('active');
      } // cancel quickview


      if (target.classList.contains('close') || target.classList.contains('quickview')) {
        $('.quickview').removeClass('active');
      } // cancel main-menu0mobile


      if (target.classList.contains('close') || target.classList.contains('menu-mobile-overlay')) {
        $('.menu-mobile-overlay').removeClass('active');
      }

      if (target.classList.contains('filter-mode') || target.classList.contains('control-filter')) {
        $('.control-filter').toggleClass('active');
      }
    }); // toggle main-menu-mobile

    $(document).on('click', '.bar .fa-bars', function (e) {
      e.preventDefault();
      $('.menu-mobile-overlay').addClass('active');
    }); // when you click plus 1 product 

    $(document).on('click', '.plus-1', function (e) {
      e.preventDefault();

      if ($(this).parents('.product-item-cart').data('id')) {
        var id = $(this).parents('.product-item-cart').data('id');
        var input = $(this).siblings('input');
        plus_1(id, input);
      } else if ($(this).parents('.action').data('id')) {
        var _input = $('.InputAmountProduct');

        _input.val(+_input.val() + 1);
      }

      $('.coupon .update').addClass('active');
    });
    $(document).on('click', '.dash-1', function (e) {
      e.preventDefault();
      var input = $(this).siblings('input') || $('.InputAmountProduct');
      var id = $(this).parents('.product-item-cart').data('id');
      var idxSame = miniCart.findIndex(function (val) {
        return val.id == id;
      });

      if (input.val() > 1) {
        if ($(this).parents('.product-item-cart').data('id')) {
          input.val(+input.val() - 1);
          miniCart[idxSame].quantity = --miniCart[idxSame].quantity;
          setLocal(miniCart, 'dataCart');
          $('.coupon .update').addClass('active');
        } else if ($(this).parents('.action').data('id')) {
          input.val(+input.val() - 1);
        }
      }
    });
    $(document).on('click', '.update.active', function (e) {
      $('html,body').animate({
        scrollTop: 0
      }, 500);
      setTimeout(function () {
        renderCart(miniCart);
      }, 1000);
      $('.coupon .update').removeClass('active');
      $('.update-Complete').addClass('active');
    });
  });

  function plus_1(id, input) {
    var idxSame = miniCart.findIndex(function (val) {
      return val.id == id;
    });
    miniCart[idxSame].quantity = ++miniCart[idxSame].quantity;
    input.val(+input.val() + 1);
    setLocal(miniCart, 'dataCart');
  }
}); // ====== Product Category ========

$(document).ready(function () {
  var viewAmount = 9;
  renderBtn(products);
  renderProductCate(products);
  $('.list-option input').on('change', function () {
    var type = $('input[name=checkone]:checked').val();

    if (type == 'All') {
      renderProductCate(products);
      renderBtn(products);
    } else {
      var datas = products.filter(function (val) {
        // console.log(val.type, type);
        return val.type == type;
      });
      renderProductCate(datas);
      renderBtn(datas);
    }
  }); // filter  

  $('#filterProduct').on('change', function (e) {
    var value = $(this).val();
    var datas = products.sort(function (a, b) {
      return +a.price - +b.price;
    });

    if (value == 'high') {
      renderProductCate(datas.reverse());
    } else if (value == 'low') {
      renderProductCate(datas);
    } else {
      renderProductCate(products);
    }
  }); // function render to view 

  function renderProductCate(datas) {
    var current = +$('.group-btn-products ul li a.active').html();
    var start = (current - 1) * viewAmount;
    var end = start + viewAmount;
    $('#addproductsCate').empty();
    var products = datas.slice(start, end).map(function (val) {
      return "\n            <div class=\"col-sm-6 col-lg-4 col-xl-4\">\n                <div class=\"product\" data-id=".concat(val.id, ">\n                    <div class=\"img\">\n                        <a href=\"#\">\n                            <img src=\"").concat(val.img, "\" alt=\"\">\n                            <img src=\"").concat(val.img1, "\" alt=\"\">\n                        </a>\n                        <button class=\"btn a-center d-flex j-between addcartitem\" data-id=").concat(val.id, ">\n                            <i class=\"bi bi-handbag\"></i> Add To Card\n                        </button>\n                        <ul class=\"action action1\">\n                            <li class=\"wishlist\"><i class=\"far fa-heart\"></i><span>Add to Wishlist</span>\n                            </li>\n                            <li class=\"compare\"><i class=\"fas fa-sliders-h\"></i> <span>Compare</span> </li>\n                            <li class=\"detail\"><i class=\"fas fa-eye\"></i><span>View Details</span></li>\n                        </ul>\n                        <ul class=\"action action2\">\n                            <li class=\"wishlist\"><i class=\"far fa-heart\"></i><span></span>\n                            </li>\n                            <li class=\"addcartitem2\"><i class=\"bi bi-handbag\"></i></li>\n                        </ul>\n                    </div>\n\n                    <div class=\"content-pro\">\n                        <h4>").concat(val.name, "</h4>\n                        <div class=\"price\">\n                            $").concat(val.price, "\n                        </div>\n                    </div>\n                </div>\n            </div>");
    });
    $('#addproductsCate').append(products);
  } // render group btn 


  function renderBtn(datas) {
    var btn = $('.group-btn-products');
    btn.empty();
    var amount = Math.ceil(datas.length / viewAmount);
    var html = " ";

    for (var i = 1; i <= amount; i++) {
      html += "<li>\n                <a href=\"#\" class =\"".concat(i == 1 ? 'active' : '', "\" data-id = ").concat(i, "> ").concat(i, "</a>\n            </li>");
    }

    btn.append("\n            <ul class=\"d-flex a-center\">".concat(html, "</ul>\n        "));
  } // when you click on a tag active 


  $(document).on('click', '.group-btn-products ul li a', function (e) {
    e.preventDefault();
    var current = $('.group-btn-products ul li a.active');
    var ele = $(this);

    if (ele) {
      current.removeClass('active');
      ele.addClass('active');
      renderProductCate(products);
    }
  });
});
/**Get , Set LocalStorage */

function setLocal(datas, name) {
  if (datas) return localStorage.setItem("".concat(name), JSON.stringify(datas));
}

function parseLocal(name) {
  var data = localStorage.getItem(name);
  return JSON.parse(data);
} //======Render Cart============


function renderCart(datas) {
  var list = $('#addToCard');
  var listMb = $('.cart-on-mb');
  list.empty();
  listMb.empty();
  var total = 0;

  if (datas.length >= 1) {
    total = datas.reduce(function (acc, val) {
      var htmls = "\n            <tr class =\"product-item-cart\" data-id=\"".concat(val.id, "\">\n                <td>\n                    <div class=\"erase\">\n                        &times;\n                    </div>\n                </td>\n                <td>\n                    <div class=\"img\" onclick =\"return changeUrlDetail(").concat(val.id, ")\">\n                        <img src=\"").concat(val.img, "\" alt=\"\">\n                    </div>\n                </td>\n                <td>\n                    <a href=\"#\" class=\"heading-product\" onclick =\"return changeUrlDetail(").concat(val.id, ")\">\n                        ").concat(val.name, "\n                    </a>\n                </td>\n                <td>\n                    $").concat(val.price, "\n                </td>\n                <td>\n                    <div class=\"control d-flex a-center\">\n                        <a class =\"dash-1\" href=\"\"><i class=\"bi bi-dash\"></i></a>\n                        <input type=\"text\"class=\"InputAmountProduct\" value=\"").concat(val.quantity, "\">\n                        <a class =\"plus-1\" href=\"\"><i class=\"bi bi-plus\"></i></a>\n                    </div>\n                </td>\n                <td>$").concat(val.price * val.quantity, ".00</td>\n            </tr>  "); // data render on mobile

      var htmls2 = "\n                <div class=\"product-item-cart\" data-id=\"".concat(val.id, "\">\n                    <div class=\"remove-item d-flex a-center\">\n                        <div class=\"erase\">\n                            &times;\n                        </div>\n\n                    </div>\n\n                    <a href=\"#\" class=\"product-name d-flex j-between a-center\" onclick =\"return changeUrlDetail(").concat(val.id, ")\">\n                        <span>Product : </span>\n                        ").concat(val.name, "\n                    </a>\n\n                    <div class=\"price d-flex j-between a-center\">\n                        <span>Price : </span>\n                        $").concat(val.price, "\n                    </div>\n\n                    <div class=\"quantity d-flex j-between\">\n                        <span>Quantity : </span>\n\n                        <div class=\"control d-flex a-center\">\n                            <a class=\"dash-1\" href=\"\"><i class=\"bi bi-dash\"></i></a>\n                            <input type=\"text\" class=\"InputAmountProduct\" value=\"").concat(val.quantity, "\">\n                            <a class=\"plus-1\" href=\"\"><i class=\"bi bi-plus\"></i></a>\n                        </div>\n\n                    </div>\n\n                </div>\n            ");
      list.append(htmls);
      listMb.append(htmls2);
      return val.quantity * val.price + acc;
    }, 0);
  } else {
    $('.cart-list1 .container').html("\n            <h2 class=\"heading-cart\">\n                Cart\n            </h2>\n            <p>Your cart doesn't have any item</p>\n            <a href=\"index.html\" class=\"btn btn-primary comeback\">Come Back Home</a>\n        ");
  }

  $('.sub-totals .subtotal').html("$".concat(total, ".00"));
  $('.total .total-product').html("$".concat(total, ".00"));
} //======Render miniCart=========
// change status of minicart


$(document).ready(function () {
  // when you remove ele from minicart
  $(document).on('click', '.erase', function (e) {
    var target = e.target; // Get ID 

    var id = target.parentNode.dataset.id;
    removeItemMiniCart(id);
    changeStatus(miniCart.length);
    renderMiniCart(miniCart);
  }); // when you remove ele from cart

  $(document).on('click', '.products-cart .erase', function (e) {
    var id = $(this).parents('.product-item-cart').data("id");
    removeItemMiniCart(id);
  });

  function removeItemMiniCart(id) {
    // remove ele in miniCart
    miniCart = miniCart.filter(function (val) {
      return val.id != +id;
    });
    renderCart(miniCart); // Render again

    setLocal(miniCart, 'dataCart');
  }
});

function changeStatus(length) {
  if (length > 0) {
    $('.mini-cart').addClass('active');
    $('.no-product').addClass('active');
  } else {
    $('.no-product').removeClass('active');
    $('.mini-cart').removeClass('active');
  }
}

function renderMiniCart(datas) {
  var mini_cart = $('#mini-cart-product');
  var subTotal = $('.total .sub-total');
  var amount = $('.cart-item .before');
  mini_cart.empty();
  var total = datas.reduce(function (acc, val) {
    var htmls = "\n        <li class=\"d-flex\" data-id=".concat(val.id, ">\n            <a href=\"#\" class=\"img \" onclick =\"return changeUrlDetail(").concat(val.id, ")\">\n                <img src=\"").concat(val.img, "\" alt=\"\">\n            </a>\n            <div class=\"quantity\">\n                <a href=\"#\" onclick =\"return changeUrlDetail(").concat(val.id, ")\">").concat(val.name, "</a>\n                <p> <span class=\"countEle\"> ").concat(val.quantity, " </span> \xD7 $").concat(val.price, "</p>\n            </div>\n            <span class =\"erase\">&times;</span>\n        </li>\n    ");
    mini_cart.append(htmls);
    return +val.price * val.quantity + acc;
  }, 0);
  var length = datas.reduce(function (acc, val) {
    return acc + val.quantity;
  }, 0); // render sum of ele

  amount.html(length); // render subtotal in minicart

  subTotal.html("$".concat(total, ".00"));
}

function addMiniCart(id) {
  var idxSame = miniCart.findIndex(function (val) {
    return val.id == id;
  }); // get a product = id and push miniCart

  var ele = products.find(function (val) {
    return val.id == id;
  }); // have ID 

  if (idxSame != -1) {
    miniCart[idxSame].quantity = ++miniCart[idxSame].quantity;
  } else {
    var newValue = _objectSpread({}, ele, {
      quantity: 1
    });

    miniCart.push(newValue);
  }

  setLocal(miniCart, 'dataCart');
} // when you click add ele to Minicart 


$(document).on('click', '.product .addcartitem', function (e) {
  e.preventDefault();
  var id = $(this).parents('.product').data('id'); // Add ele to Arrray

  addMiniCart(id); // Render

  renderMiniCart(miniCart);
  changeStatus(miniCart.length);
  $('.cart').addClass('active');
});
$(document).on('click', '.comparelist .addcartitem', function (e) {
  e.preventDefault();
  var id = $(this).data('id');
  addMiniCart(id);
  renderMiniCart(miniCart);
  $(this).html('View Cart');
});
$(document).on('click', '.addcartitem2', function (e) {
  e.preventDefault();
  var id = $(this).parents('.product').data('id');
  addMiniCart(id);
  renderMiniCart(miniCart);
  changeStatus(miniCart.length);
  $('.cart').addClass('active');
});
/*=========wishlist========== */

$(document).ready(function () {
  //whist list render when website load the first 
  renderWishList(wishList);
  $('.addWishlist .before').html(wishList.length); // add wishlist

  $(document).on('click', '.action .wishlist', function (e) {
    var id = $(this).parents('.product').data('id');
    var isSame = wishList.findIndex(function (val) {
      return val.id == id;
    });

    if (isSame != -1) {
      $('.popup-product-added').fadeIn().fadeOut(2000);
    } else {
      var ele = products.find(function (val) {
        return val.id == id;
      });
      wishList.push(ele);
      $('.addWishlist .before').html(wishList.length);
      setLocal(wishList, 'WishListProduct');
    }
  }); // add product to minicart 

  $(document).on('click', '.products-cart .addcartitem', function (e) {
    e.preventDefault();
    var id = $(this).parents('.product-item').data('id');
    addMiniCart(id);
    renderMiniCart(miniCart);
    changeStatus(miniCart.length);
    removeWishItem(id);
    $('.cart').addClass('active');
    $('.products-cart .update-Complete').addClass('active');
  }); // Remove item in wishlist

  $(document).on('click', '.products-cart .erase', function (e) {
    var id = $(this).parents('.product-item').data("id");
    removeWishItem(id);
    $('.addWishlist .before').html(wishList.length);
    $('.products-cart .update-Complete').addClass('active');
  });
  /*Function*/

  function removeWishItem(id) {
    wishList = wishList.filter(function (val) {
      return val.id != +id;
    });
    renderWishList(wishList);
    setLocal(wishList, 'WishListProduct');
  }

  function renderWishList(datas) {
    var list = $('#addToWish');
    var cartmb = $('.cart-mobile');
    list.empty();
    cartmb.empty();

    if (datas.length >= 1) {
      datas.forEach(function (val) {
        // render > 768
        var htmls = "\n                        <tr class =\"product-item\" data-id=\"".concat(val.id != null ? val.id : '', "\">\n                            <td>\n                                <div class=\"erase\">\n                                    &times;\n                                </div>\n                            </td>\n                            <td>\n                                <div class=\"img\" onclick =\"return changeUrlDetail(").concat(val.id, ")\">\n                                    <img src=\"").concat(val.img, "\" alt=\"\">\n                                </div>\n                            </td>\n                            <td>\n                                <a href=\"#\" class=\"heading-product\" onclick =\"return changeUrlDetail(").concat(val.id, ")\">\n                                    ").concat(val.name, "\n                                </a>\n                            </td>\n                            <td>\n                                $").concat(val.price, "\n                            </td>\n                            <td class =\"stocked\">\n                                In Stock\n                            </td>\n                            <td>\n                                <button class =\"addcartitem\" data-id=\"").concat(val.id, "\">Add to card</button>\n                            </td>\n                        </tr>  \n                    ");
        list.append(htmls); // render < 768

        htmls = "\n                    <div class=\"product-item\" data-id=\"".concat(val.id, "\">\n                        <div class=\"item-wrapper d-flex\">\n                            <a href=\"#\" class=\"product-thumbnail\" onclick =\"return changeUrlDetail(").concat(val.id, ")\">\n                                <img src=\"").concat(val.img, "\" alt=\"\">\n                            </a>\n                            <div class=\"item-details\">\n                                <h3 class=\"product-name\" onclick =\"return changeUrlDetail(").concat(val.id, ")\">\n                                    ").concat(val.name, "\n                                </h3>\n                                <div class=\"price d-flex a-center j-between\">\n                                    <span class=\"head-price\">Price</span>\n                                    $").concat(val.price, "\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"stock d-flex a-center j-between\">\n                            <p>Stock</p>\n                            <span>In Stock</span>\n                        </div>\n\n                        <div style=\"text-align: center;\">\n                            <button class=\"addcartitem\" data-id=\"").concat(val.id, "\">Add to card</button>\n                        </div>\n\n                        <div class=\"erase\">\n                            &times;\n                        </div>\n                    </div>\n                ");
        cartmb.append(htmls);
      }, 0);
      $('.share-wishlist').css('display', 'block');
    } else {
      list.html("\n                <tr>\n                    <td style=\"margin-top:20px; font-size: 16px\"> No products added to the wishlist </td>\n                <tr>\n            ");
      $('.share-wishlist').css('display', 'none');
    }
  }
});
/*=======Compare List Product========*/

function renderCompare() {
  $('.comparelist.content').empty(); // load defaul

  $('.comparelist.content').append("\n        <tr class=\"remove\">\n            <td class =\"odd\"></td>\n        </tr>\n        <tr class=\"image\">\n            <td class =\"odd\"></td>\n        </tr>\n        <tr class=\"title\">\n            <td class =\"odd\">Title</td>\n        </tr>\n        <tr class=\"price\">\n            <td class =\"odd\">Price</td>\n        </tr>\n        <tr class=\"add\">\n            <td class =\"odd\">Add to cart</td>\n        </tr>\n        <tr class=\"description\">\n            <td class =\"odd\">Description</td>\n        </tr>\n        <tr class=\"sku \">\n            <td class =\"odd\">Sku</td>\n        </tr>\n        <tr class=\"stock \">\n            <td class =\"odd\">Availability</td>\n        </tr>\n        <tr class=\"weight \">\n            <td class =\"odd\">Weight</td>\n        </tr>\n        <tr class=\"dimensions \">\n            <td class =\"odd\">Dimensions</td>\n        </tr>\n        <tr class=\"colors\">\n            <td class =\"odd\">Color</td>\n        </tr>\n        <tr class=\"size \">\n            <td class =\"odd\">Size</td>\n        </tr>\n        \n    ");
  dataCompare.map(function (val, index) {
    $("<td class =\"removeCompareItem ".concat(index % 2 != 1 ? 'odd' : '', "\" data-id=\"").concat(val.id, "\"> &times;</td>")).appendTo(".comparelist.content .remove");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\"><img src=\"").concat(val.img, "\"></td>")).appendTo(".comparelist.content .image");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">").concat(val.name, "</td>")).appendTo(".comparelist.content .title");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">$").concat(val.price, "</td>")).appendTo(".comparelist.content .price");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">\n            <a href=\"#\" data-id=\"").concat(val.id, "\" class=\"btn btn-primary addcartitem\">Add to cart</a>\n            </td>")).appendTo(".comparelist.content .add");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">Summer tops for women<br>\n                Cheetah kimonos ,beach cover ups<br>\n                Lightweight chiffon casual shirts<br>\n                Open front outwear,short sleeve blouse.\n            </td>")).appendTo(".comparelist.content .description");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">FUW243-1</td>")).appendTo(".comparelist.content .sku");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">In stock</td>")).appendTo(".comparelist.content .stock");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">-</td>")).appendTo(".comparelist.content .weight");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">N/A</td>")).appendTo(".comparelist.content .dimensions");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">-</td>")).appendTo(".comparelist.content .colors");
    $("<td class =\"".concat(index % 2 != 1 ? 'odd' : '', "\">-</td>")).appendTo(".comparelist.content .size");
  });
}

$(document).ready(function () {
  renderCompare();
  $(document).on('click', '.action .compare', function (e) {
    e.preventDefault();
    var id = $(this).parents('.product').data('id');
    console.log(id);
    var idxSame = dataCompare.findIndex(function (val) {
      return val.id == id;
    }); // have ID 

    if (idxSame == -1) {
      $('.compare-product').addClass('active');
      var val = products.find(function (val) {
        return val.id == id;
      });
      dataCompare.push(val);
      renderCompare();
      setLocal(dataCompare, 'datasCompare');
    } else {
      $('.compare-product').addClass('active');
    }
  });
  $(document).on('click', '.compare-product-box .close', function (e) {
    $(this).parents('.compare-product').removeClass('active');
  }); // remove item 

  $(document).on('click', '.remove .removeCompareItem', function (e) {
    var id = $(this).data('id');
    var index = dataCompare.findIndex(function (val) {
      return val.id == id;
    });
    dataCompare.splice(index, 1);
    if (dataCompare.length >= 1) renderCompare();else {
      $('.comparelist.content').html("\n                <p style = \"font-size: 30px; text-align: center; margin: 20px\">\n                    No products added in the compare table.\n                </p>\n            ");
    }
    setLocal(dataCompare, 'datasCompare');
  });
});
/**======Quick View */

$(document).ready(function () {
  // add ele from quickview
  $(document).on('click', '.action .addcartitem', function (e) {
    $('.quickview').removeClass('active');
    var id = $(this).parents('.action').data('id');
    var valueCurrent = +$('.InputAmountProduct').val();
    var idxSame = miniCart.findIndex(function (val) {
      return val.id == id;
    });

    if (idxSame != -1) {
      miniCart[idxSame].quantity = valueCurrent;
    } else {
      var ele = _objectSpread({}, products.find(function (val) {
        return val.id == id;
      }), {
        quantity: 1
      });

      ele.quantity = valueCurrent;
      miniCart.push(ele);
    }

    $('.loaded').addClass('active');
    setTimeout(function () {
      renderMiniCart(miniCart);
      changeStatus(miniCart.length);
      $('.cart').addClass('active');
      $('.loaded').removeClass('active');
    }, 2000);
    setLocal(miniCart, 'dataCart');
  }); // viewDetails Quickview

  $(document).on('click', '.action .detail', function (e) {
    var id = $(this).parents('.product').data('id');
    $('.quickview').addClass('active');
    renderQuickView(id);
  });

  function renderQuickView(id) {
    var datas = products.find(function (val) {
      return val.id == id;
    });
    var listImg = getAllimg().find(function (val) {
      return val.id == id;
    });
    var owl = $('#quickviewSl');

    for (var index = 0; index < 5; index++) {
      owl.owlCarousel('remove', index).owlCarousel('update');
    }

    listImg.img.forEach(function (val) {
      owl.trigger('add.owl.carousel', ["\n                <div class=\"item\">\n                    <img src=\"".concat(val, "\" alt=\"\">\n                </div>\n            ")]).trigger("refresh.owl.carousel");
    }); // add ưhen you click details

    $('.modal .item-modal').append("\n            <a href=\"#\" class=\"btn btn-primary viewDetails\" onclick =\"changeUrlDetail(".concat(id, ")\">\n                View Details\n            </a>\n        "));
    $('.modal .content').html("\n            <a href=\"#\">".concat(datas.name, "</a>\n            <div class=\"star\">\n                <i class=\"bi bi-star-fill\"></i>\n                <i class=\"bi bi-star-fill\"></i>\n                <i class=\"bi bi-star-fill\"></i>\n                <i class=\"bi bi-star-fill\"></i>\n                <i class=\"bi bi-star-fill\"></i> (1 customer review)\n            </div>\n            <p class=\"price\">$").concat(datas.price, "</p>\n            <p class=\"des\">\n                .Tailored line. Wool mix fabric. Long design. Long buttoned sleeve. Lapel with notch. \x03Back slit.\n                Two pockets with flaps on the front. Button up. Inner lining. Inner pocket. \x03Back length 95.0\n                cm.<br>\n                Summer tops for women<br>\n                Cheetah kimonos ,beach cover ups<br>\n                Lightweight chiffon casual shirts<br>\n                Open front outwear,short sleeve blouse.<br>\n            </p>\n            <div class=\"action d-flex a-center\" data-id = ").concat(datas.id, ">\n                <div class=\"cotrol-item d-flex a-center\"> \n                    <a class =\"dash-1\" href=\"\"><i class=\"bi bi-dash\"></i></a>\n                    <input type=\"text\"class=\"InputAmountProduct\" value=\"1\">\n                    <a class =\"plus-1\" href=\"\"><i class=\"bi bi-plus\"></i></a>\n                </div>\n                <button class=\"btn a-center d-flex addcartitem\">\n                    <i class=\"bi bi-handbag\"></i> Add To Card \n                </button>\n            </div>\n            <div class=\"sku\">\n                SKU:<br>\n                FUW237-1<br>\n                Categories: Accessories, Fashion, Mens<br>\n                Tag: teapot<br>\n            </div>\n        "));
  }
}); //======Render Checkout============

renderCheckOut(miniCart);

function renderCheckOut() {
  var datas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  $('#ListCheckOut').empty();
  var total = datas.reduce(function (acc, val) {
    $('#ListCheckOut').append("\n            <tr>\n                <td>".concat(val.name, " \xD7 ").concat(val.quantity, "</td>\n                <td>").concat(val.price, "</td>\n            </tr>\n        "));
    return acc + val.quantity * +val.price;
  }, 0);
  $('#ListCheckOut').append("\n        <tr class=\"Subtotal-price item\">\n            <th>Subtotal</th>\n            <td>$".concat(total, ".00</td>\n        </tr>\n        <tr class=\"total-price item\">\n            <th>Total</th>\n            <td>$").concat(total, ".00</td>\n        </tr>\n    "));
} //=====Add animation when webpage scroll======


$(document).scroll(function (e) {
  var scrollheigh = window.scrollY;

  if (scrollheigh > 1240) {
    $('.element').addClass('animation');
  }
});
//# sourceMappingURL=main.dev.js.map
