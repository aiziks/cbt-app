// var contact_form = document.my_contact

$("#my_contact").submit(function (ev) {
            ev.preventDefault();
        // sendContact();
})


//validating contact form
function validateContact() {
    var valid = true;

    if (
        !$('#name').val().trim() ||
        !$('#email').val().trim() ||
        !$('#subject').val().trim() ||
        !$('#message').val().trim()
    ) {
        $('#contact_response').fadeIn('3000').css('display', 'block');
        $('#contact_response')
            .html('Error! All fields must be filled... ')
            .addClass('  w3-red ');
        valid = false;
    }

    if (!$('#email').val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
        $('#emailerror').css('display', 'inline-block');
        // $('#email').addClass(" error ");
        $('#emailerror').html('Invalid email address').addClass(' w3-text-red ');

        valid = false;
    }

    return valid;
}

function sendContact(contact_form) {

    var valid;
    valid = validateContact();

    if (valid) {
        $.ajax({
            url: 'classes/contact.php',
            method: 'POST',
            data: contact_form.serialize(),
            beforeSend: function (xhr) {
                $('#contact_submitter').html(
                    '\'<input type="submit" name="submit" value="please wait..." disabled="disabled" class="w3-button w3-amber w3-text-white w3-hover-green" style="background-color: rgba(17, 100 , 200)  " >\''
                );
            },

            success: function (contact_response) {
                var data = JSON.parse(contact_response);

                setTimeout(getMessage, 1000);

                function getMessage() {
                    alert("Message Sent! Thanks for contacting us....")
                    if (data.signal == 'ok') {
                        $('#contact_response')
                            .addClass('  w3-green ')
                            .fadeIn('3000')
                            .css('display', 'block')
                            .html(data.msg)
                            .removeClass(' w3-red');
                        $('#contact_submitter').html(
                            '<input type="submit" name="submit" value="Send Message" class="w3-button w3-amber w3-text-white w3-hover-green" style="background-color: rgba(17, 100 , 200)  " >'
                        );
                    } else {
                        $('#contact_response')
                            .addClass('  w3-danger ')
                            .css('display', 'block')
                            .html(data.msg);
                             $('#contact_submitter').html(
                            '<input type="submit" name="submit" value="Send Message" class="w3-button w3-amber w3-text-white w3-hover-green" style="background-color: rgba(17, 100 , 200)  " >'
                        );
                    }
                }
            },
            error: function () {
                $('#contact_response')
                    .css('display', 'block')
                    .html('Server Error ! no internet connection')
                    .addClass(' w3-red  ');
                    $('#contact_submitter').html(
                        '<input type="submit" name="submit" value="Send Message" class="w3-button w3-amber w3-text-white w3-hover-green" style="background-color: rgba(17, 100 , 200)  " >'
                    );
            }
        });
    }
}


//quote

