
    
    $("#login_user").submit(function (event) {
        event.preventDefault();
        
        loginUser();
    })
  
// validating user inputs
function validate_login(){
            var valid = true;

            if (
                !$('#reg_number').val().trim() ||
                !$('#password').val().trim()
            ) {
                $('#login_error').fadeIn('3000').css('display', 'block');
                $('#login_error').html('Error! All fields must be filled... ').addClass(' w3-padding text-white w3-center bg-danger w3-margin-bottom');
                valid = false;
            }
        
            return valid;
        }

        function loginUser(){
                
            var valid;
            valid = validate_login();
        
            if (valid) {
                
                $.ajax({
                    url: 'classes/login.php',
                    method: 'POST',
                    data: $('#login_user').serialize(),
                        
                    success: function (response) {
                        var data = JSON.parse(response);

                            
                    if (data.signal == 'ok') {
                               
                        window.location.href= 'http://localhost/AiziksCbt_Exam/welcome.php';
                                
                            } else {
                                $('#login_error').fadeIn('3000').css('display', 'block');
                                $('#login_error').html(data.msg).addClass(' w3-padding text-white w3-center bg-danger w3-margin-bottom');
                            }
                    },
                    
                    error: function () {
                        $('#login_error').fadeIn('3000').css('display', 'block');
                        $('#login_error').html('Server Error ! no internet connection').addClass(' w3-padding text-white w3-center bg-danger w3-margin-bottom');
                   
                    }
                });
            
            }
        }