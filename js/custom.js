
function validateUserLogin() {


    var valid = true;

    $("#login_message").html("");
    $(".info").html("");

    var matric_num = $("#mat").val();
    var loginpass = $("#pword").val();


    if (matric_num == '') {
        $("#matric_infor").html(" (required)");
        $("#matric_infor").css("color", "red");
        valid = false;
    }

    if (loginpass == '') {
        $("#pass_infor").html(" (required)");
        $("#pass_infor").css("color", "red");
        valid = false;
    }


    return valid;
}



function logUser() {

    var valid;

    valid = validateUserLogin();

    if (valid) {

        var matric_no = $("#mat").val();
        var password = $("#pword").val();

        $.ajax({
            url: "classes/login.php",
            type: 'POST',
            data: {matric: matric_no, password: password},
            success: function (data) {
                if (data == 1) {
                    window.location = "welcome.php";
                } else {
                    $("#login_message").text("Invalid Credentials");
                    $("#login_message").css({
                        "text-align": "center",
                        "color": "red"
                    });
                }
            },
            error:function () {}
        })
    }
}





//user registration using Ajax(Asynchronous Javascript And XML)
$(function () {
    $("#myform").submit(function (event) {
        event.preventDefault();

        $(".info").html("");
        $("#reg_message").text("");

        var fullname = $("#fullname").val();
        var email = $("#email").val();
        var number = $("#phone_no").val();
        var username = $("#username").val();
        var matric_no = $("#matric_no").val();
        var level = $("#level").val();
        var password1 = $("#password1").val();
        var password2 = $("#password2").val();

        if(fullname === ''){
            $("#reg_message").html("Fullname is missing");
            $("#reg_message").css("color","red");

        }else

        if(email === ''){
            $("#reg_message").html("email is missing");
            $("#reg_message").css("color","red");

        }

        else if(!email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
            $("#userEmail-info").html("(invalid)");
            $("#email").css('border-color','red');
            valid = false;
        }
        else
        if(number === ''){
            $("#reg_message").html("Phone number is missing");
            $("#reg_message").css("color","red");

        }else

        if(username === ''){
            $("#reg_message").html("Username is missing");
            $("#reg_message").css("color","red");

        }else

        if(matric_no === ''){
            $("#reg_message").html("Matric number is missing");
            $("#reg_message").css("color","red");

        }else

        if(level === ''){
            $("#reg_message").html("Level is missing");
            $("#reg_message").css("color","red");

        }else

        if(password1 === ''){
            $("#reg_message").html("Password missing");
            $("#password1_info").css("color","red");
            valid = false;
        }else
        if(password2 === ''){
            $("#reg_message").html("Password is missing");
            $("#reg_message").css("color","red");
            valid = false;
        }else

        if(password1 !== password2){

            $("#reg_message").text("Password Not Match!");
            $("#reg_message").css({
                "color" : "red",
                "text-align" : "center",
                "font-family":"tahoma",
            });

        }else {
            $.ajax({
                url: 'classes/register.php',
                type: 'POST',
                data:
                    {
                        fullname: $("#fullname").val(),
                        email: $("#email").val(),
                        number: $("#phone_no").val(),
                        username: $("#username").val(),
                        matric_no: $("#matric_no").val(),
                        level: $("#level").val(),
                        password: $("#password1").val(),
                    },

                success: function (result) {
                    if (result == 1) {
                        $("#reg_message").html("Registration Successfully");
                        alert('Registration Successfull! continue to login');
                        window.location = "welcome.php";
                    }else if(result == 0){
                        $("#reg_message").html("Error: Registration Failed! ");
                    }else{
                        $("#reg_message").html("Matric/Email/username exists !");
                    }
                }
            })
        }
    });

})




