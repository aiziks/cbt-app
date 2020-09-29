
function getJson(){

    // var obj = { "name":"John", "age":30, "city":"New York"};
    // var myJSON = JSON.stringify(obj);
    // document.write(typeof myJSON);

//     $.getJSON('js/file.json',function(json) {
// // Set the states...
//         $.each(
//             json.states,
//             function (id, state) {
//                 $('select#states').append(
//                     $('<option/>')
//                         .attr('value', id)
//                         .text(state.name)
//                 );
//             }
//         );
//     });

    //
    $.ajax({
        url:'js/file.json',
        dataType:'json',
        method:'get',
        success:function (data) {
            // var myObject  = JSON.parse(data);

            $.each(data.states,function (key, value) {

                $("select#states").append(
                    $("<option />")
                        .attr('value',key)
                        .text(value)
                );
            });
        },
        error:function () {}
    });

}