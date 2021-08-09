$(async function () {

    // PORT login 
    $('#login').on('click', function (e) {

        e.preventDefault()
        const url = 'https://api.v2-dev.thuocsi.vn/interview/authorization'

        const datas = {
            "username": $('.login-form #name').val(),
            "password": $('.login-form #pass').val()
        }

        Login(url, datas)
    })

    // PORT REGISTER
    $('.form-register #register').on('click', function (e) {
        e.preventDefault()
        const url = 'https://api.v2-dev.thuocsi.vn/interview/account'

        const datas = {
            "username": $('.form-register #name').val(),
            "displayName": $('.form-register #nameDisplay').val(),
            "email": $('.form-register #email').val(),
            "phone": $('.form-register #phone').val(),
            "sex": $('.form-register #sex').val(),
            "password": $('.form-register #pass').val()
        }


        Register(url, datas)


    });

})

// Function REGISTER
function Register(url, datas) {

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(datas),
        success: function (reponse) {

            $('.err').empty()
            $('.blur').addClass('active');

        },
        error: function (err) {

            const result = JSON.parse(err.responseText)
            $('.err').html(result.message)

        }
    });
}


// Function LOGIN
function Login(url, datas) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(datas),
        success: function (reponse) {

            alert("Đăng nhập thành công!!!")
            $('.err').empty()

        },
        error: function (response) {
            const result = JSON.parse(response.responseText)
            $('.err').append(result.message);
        }
    });
}