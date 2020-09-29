// showcasing vibration
// window.navigator.vibrate([200, 100, 200]);


//displaying the time to the user 
startTime();

function startTime() {
// Set the date we're counting down to

new_date = new Date();

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// getting the Month, Day and year
get_month = months[new_date.getMonth()];  //getting the month using its index from the months array
todays_date = new_date.getDate();  
current_year = new_date.getFullYear();


hr = new_date.getHours() ;
min = new_date.getMinutes() + 1 ;
sec = new_date.getSeconds() ;

date_string = get_month + " " + todays_date + " , " + current_year +"  " +  hr +" : " + min + " : " + sec;

// "December 16, 2019  20:37:25" 
var countDownDate = new Date(get_month+" "+ todays_date +", "+ current_year+" "+ hr +":"+ min +":" + sec ).getTime();


// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);



  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = hours + " : " + minutes + " : " + seconds ;


  // If the count down is finished, write some text
  if (distance < 0) {
      timeSubmit();
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }

}, 1000);

}


// submitting the user using the time factor
function timeSubmit(){
// sharply submitting the current question too and evaluating the scores too
    //getting the question id here
    serial_id = parseInt($('#serial_id').val()); 
    random_ques_id = parseInt($('#random_ques_id').val()); 

     // question format
     random_ques_format = $('#ques_format').val().trim();
    
    
     var choice_taken = '';
 
              if( random_ques_format == 'g'){ //if german do this
                  choice_taken = $('#german_text_ans').val();
 
              }else{
 
                 //  getting the question 'choice value' and 'choice index'
                 var choice_index = '';
                 choices = document.question_form.options;
                 for(let i = 0 ; i < choices.length; i++ ){
                     if(choices[i].checked){
                         choice_taken = choices[i].value;
                         choice_index = i; 
                     }
                 }  
        }
   

   // perform score me for the current question when the submit button is clicked
   $.ajax({
       url: 'classes/process_exam.php',
       method: 'post',
       data: {'serial_id':serial_id, 'random_ques_id':random_ques_id, 'choice_taken': choice_taken,'score_me':'score_me' },
       
       success: function (response) {
           // do nothing
       },
       error: function(){}
       })


    total_question = 0;

               // getting total question for the user test notification below
      
               $.ajax({
                url: 'classes/process_exam.php?total_questions',
                method: 'get',
        
                success: function (response) {
                    total_question = Number(response);
                    // clearing the locastorage items
                  for(i =1; i<=total_question; i++){
                     localStorage.removeItem(i);
              }
      
          // end of clearing all localstorage
        }
        })

        
    $.ajax({
        url: 'classes/process_exam.php?get_final_answer',
        method: 'get',
    
        success: function (final_score) {
           alert('Weldone User, You scored ' + final_score + " out of " + total_question + " You can leave now..." );
           window.location.href = 'http://localhost/AiziksCbt_Exam/exam.php?logout';        
        },
        error:function(){}
        });  

}


// getting the final answer asynchronously
//ajax request to getting the question count to disable next button when the ques_id  == total_questions in the db
function submitFinal(){
      
    // sharply submitting the current question too and evaluating the scores too
    //getting the question id here
     serial_id = parseInt($('#serial_id').val()); 
     random_ques_id = parseInt($('#random_ques_id').val()); 

       // question format
    random_ques_format = $('#ques_format').val().trim();
    
    
    var choice_taken = '';

             if( random_ques_format == 'g'){ //if german do this
                 choice_taken = $('#german_text_ans').val();

             }else{

                //  getting the question 'choice value' and 'choice index'
                
                var choice_index = '';
                choices = document.question_form.options;
                for(let i = 0 ; i < choices.length; i++ ){
                    if(choices[i].checked){
                        choice_taken = choices[i].value;
                        choice_index = i; 
                    }
                }  
    }

    // perform score me for the current question when the submit button is clicked
    $.ajax({
        url: 'classes/process_exam.php',
        method: 'post',
        data: {'serial_id':serial_id, 'random_ques_id':random_ques_id, 'choice_taken': choice_taken,'score_me':'score_me' },
        
        success: function (response) {
            // do nothing
        },
        error: function(){}
        })




    // submission prompts if the user actually want to submit
    $is_submit = confirm('Are you sure to submit ?');

    if($is_submit){ //if confirm to submit the cbt app

              // getting total question for the user test notification below
      total_question = 0;
      $.ajax({
          url: 'classes/process_exam.php?total_questions',
          method: 'get',
  
          success: function (response) {
              total_question = Number(response);
              // clearing the locastorage items
            for(i =1; i<=total_question; i++){
               localStorage.removeItem(i);
        }

    // end of clearing all localstorage
  }
  })



    $.ajax({
    url: 'classes/process_exam.php?get_final_answer',
    method: 'get',

    success: function (final_score) {
       alert('Weldone User, You scored ' + final_score + " out of " + total_question + " You can leave now..." );
       window.location.href = 'http://localhost/AiziksCbt_Exam/exam.php?logout';        
    },
    error:function(){}
    });


    }


}




loadInitialQuestion();
function loadInitialQuestion(){


    $.ajax({
        url: 'classes/process_exam.php?load_first_ques',
        method: 'get',

        success: function (response) {
   
            var data = JSON.parse(response);

            
            if(data.random_ques.format == 'g'){ //if german do this
                        $('#ques_text').html('<span>'+data.serial_id+'</span>.&nbsp;&nbsp; '+ data.random_ques.ques_text); 
                        // serial id
                        $('#serial_id').val(data.serial_id);
                        // random question id
                        $('#random_ques_id').val(data.random_ques.id);
                        // form of the question i.e german or objective
                        $('#ques_format').val(data.random_ques.format);

                        $('#ques_options_div').html('<input class="w3-input mt-3 mb-3" type="text" name="german_text_ans" id="german_text_ans"  placeholder="Enter your answer here... (case insensitive, single word spacing)" size="50"  />');

                       
                        // disabling the previouse button on initial question load
                        $('#prev').attr('disabled',true);

      //             // loading the question indicator as like  Question 1 of 5(total_question_number)
                  $('#ques_n').html(data.serial_id);
      //             // getting the total question
                  $.ajax({
                      url: 'classes/process_exam.php?total_questions',
                      method: 'get',
              
                      success: function (total_question) {
                      
                              $('#ques_total').html(total_question);
      
                    
                      
                  },
                  error:function(){}
              });
                 
              
              
                                // we increment the next ques_id since it has been increased as it goes into the server increased by 1 to fetch the next ques and come back
//             // then we are incrementing the ques_id here to get the right checked choice  
             checked_ques_id = 1;
             for(var key in localStorage){
                 if(localStorage.getItem(checked_ques_id)){
                         $("#german_text_ans").val(localStorage.getItem(checked_ques_id));
                 }
              }


                        // Already loaded buttons below no fear
                    // getting the button elements which in total is the number of questions
            // using the class name to get iterate over all the button elements
            ques_btn = document.ques_btn_form.q_btn;

            // looping through all the button element using the the button class name which is ordered as an array
                     for(i = 0 ; i < ques_btn.length; i++){
                        
                        button_value = i + 1;
    
                        if(localStorage.getItem(button_value)){
                           ques_btn[i].className = ' w3-button w3-green w3-round-large mr-3';
                       }
                }
               //  end of quesion button click event


            }else{  // else if object do this

            $('#ques_text').html('<span>'+data.serial_id+'</span>.&nbsp;&nbsp; '+ data.random_ques.ques_text); 
            
            // serial id
            $('#serial_id').val(data.serial_id);
            // random question id
            $('#random_ques_id').val(data.random_ques.id);

            $('#ques_format').val(data.random_ques.format);
            
            // // loading the DOM  with the questions and options at random fashion
            $('#ques_options_div').html('<input class="w3-radio" type="radio" name="options" id="opt_a"   /> &nbsp;&nbsp; A. <label for="opt_a" id="opt_a_label" ></label><br/>'+
            '<input class="w3-radio" type="radio" name="options" id="opt_b"  /> &nbsp;&nbsp; B. <label for="opt_b" id="opt_b_label" ></label><br/>'+
            '<input class="w3-radio" type="radio" name="options" id="opt_c"   /> &nbsp;&nbsp; C. <label for="opt_c" id="opt_c_label" ></label><br/>'+
            '<input class="w3-radio" type="radio" name="options" id="opt_d"   /> &nbsp;&nbsp; D. <label for="opt_d" id="opt_d_label" ></label><br/>');
        
            $('#opt_a').val(data.random_ques.opt_a);
            $('#opt_a_label').text(data.random_ques.opt_a);
            $('#opt_b').val(data.random_ques.opt_b);
            $('#opt_b_label').text(data.random_ques.opt_b);
            $('#opt_c').val(data.random_ques.opt_c);
            $('#opt_c_label').text(data.random_ques.opt_c);
            $('#opt_d').val(data.random_ques.opt_d);
            $('#opt_d_label').text(data.random_ques.opt_d);

    

//         // end of loading question indicator

 // disabling the previouse button on initial question load
        $('#prev').attr('disabled',true);

 //             // loading the question indicator as like  Question 1 of 5(total_question_number)
             $('#ques_n').html(data.serial_id);
 //             // getting the total question
             $.ajax({
                 url: 'classes/process_exam.php?total_questions',
                 method: 'get',
         
                 success: function (total_question) {
                 
                         $('#ques_total').html(total_question);
 
               
                 
             },
             error:function(){}
         });


//         // prechecking the already checked options in the local storage
        choices = document.question_form.options;
        checked_ques_id = 1;
            for(var key in localStorage){
                if(localStorage.getItem(checked_ques_id)){
                        choices[localStorage.getItem(checked_ques_id)].setAttribute('checked', true);                    
                }
             }

        

        }
    }
    
    });    
   

}








 // getting and loading the next question
function nextQuestion(){
       
    //getting the serial question id here 
    serial_id = parseInt($('#serial_id').val()); 
    // getting the random question to load the question at random and store the serial and random question in the locastorage 
    next_random_ques_id = parseInt($('#random_ques_id').val()); 

    // question format
    random_ques_format = $('#ques_format').val().trim();
    
    
    var choice_taken = '';

             if( random_ques_format == 'g'){ //if german do this
                 choice_taken = $('#german_text_ans').val();

                    // storing users question number and its choice index in the localstorage ; user can choose and empty choice index which reset the choice to empty value    
                    
                    question_checked_index = localStorage.getItem(serial_id); //getting the stored local storage item
                    if(question_checked_index){  //if it exist re-store it i.e store the current choice again
                        // alert('already stored'); 
                        localStorage.setItem(serial_id,choice_taken);   
                    }else{
                        // alert('stored now'); 
                        localStorage.setItem(serial_id,choice_taken);   //and if the localStorage item doesnt exist store it too
                    }

                }else{
                    //  getting the question 'choice value' and 'choice index'
                    
                    var choice_index = '';
                    choices = document.question_form.options;
                    for(let i = 0; i < choices.length; i++ ){
                        if(choices[i].checked){
                            choice_taken = choices[i].value;
                            choice_index = i;
                            }
                        }  

                        // storing users question number and its choice index in the localstorage ; user can choose and empty choice index which reset the choice to empty value    
                    
                    question_checked_index = localStorage.getItem(serial_id); //getting the stored local storage item
                    if(question_checked_index){  //if it exist re-store it i.e store the current choice again
                        // alert('already stored'); 
                        localStorage.setItem(serial_id,choice_index);   
                    }else{
                        // alert('stored now'); 
                        localStorage.setItem(serial_id,choice_index);   //and if the localStorage item doesnt exist store it too
                    }
        }


   




    //ajax request to getting the question count to disable next button when the ques_id  == total_questions in the db
        $.ajax({
            url: 'classes/process_exam.php?total_questions',
            method: 'get',
    
            success: function (total_question) {
                testing_id = serial_id + 1;
                total_question = parseInt(total_question);
                        // alert(total_question);
                if(testing_id >= total_question){
                    $('#next').attr('disabled',true)
                    $('#prev').attr('disabled',false)
                }else{   
                    $('#next').attr('disabled',false)
                    $('#prev').attr('disabled',false)
                }
                
        },
        error:function(){}
    });


    

    // loading the next question on ajax call
    $.ajax({
        url: 'classes/process_exam.php',
        method: 'post',
        // data: {'ques_id':$('#ques_id').val(),'ques_text_from_form':$('#ques_text_from_form').val(),'choice_taken': choice_taken},
        data: {'serial_id':serial_id,'random_ques_id':next_random_ques_id,'choice_taken': choice_taken,'next':'next', 'score_me':'score_me' },
        
        success: function (response) {

            var data = JSON.parse(response);



            if(data.random_ques.format == 'g'){ //if german do this
                $('#ques_text').html('<span>'+data.serial_id+'</span>.&nbsp;&nbsp; '+ data.random_ques.ques_text); 
                // serial id
                $('#serial_id').val(data.serial_id);
                // random question id
                $('#random_ques_id').val(data.random_ques.id);
                // form of the question i.e german or objective
                $('#ques_format').val(data.random_ques.format);

                $('#ques_options_div').html('<input class="w3-input mt-3 mb-3" type="text" name="german_text_ans" id="german_text_ans"  placeholder="Enter your answer here... (case insensitive, single word spacing)" size="50"  />');

               
              
            // loading the question indicator as like  Question 1 of 5(total_question_number)
            $('#ques_n').html(data.serial_id);
            //             // getting the total question
                        $.ajax({
                            url: 'classes/process_exam.php?total_questions',
                            method: 'get',
                    
                            success: function (total_question) {
                            
                                    $('#ques_total').html(total_question);
            
                                
                        },
                        error:function(){}
                    });
            


                        // we increment the next ques_id since it has been increased as it goes into the server increased by 1 to fetch the next ques and come back
//             // then we are incrementing the ques_id here to get the right checked choice  
             checked_ques_id = serial_id + 1;
             for(var key in localStorage){
                 if(localStorage.getItem(checked_ques_id)){
                         $("#german_text_ans").val(localStorage.getItem(checked_ques_id));
                 }
              }


                //checking if the question button as been answered and loaded changing the button color to green if its answered
               // Already loaded buttons below no fear
             // using the class name to get iterate over all the button elements
            ques_btn = document.ques_btn_form.q_btn;

             // looping through all the button element using the the button class name which is ordered as an array
                     for(i = 0 ; i < ques_btn.length; i++){
                        
                         button_value = i + 1;
    
                         if(localStorage.getItem(button_value)){
                            ques_btn[i].className = ' w3-button w3-green w3-round-large mr-3';
                        }
                 }
               //  end of quesion button click event  
                 






 


    }else{  // else if object do this


            $('#ques_text').html('<span>'+data.serial_id+'</span>.&nbsp;&nbsp; '+ data.random_ques.ques_text); 
            
            // serial id
            $('#serial_id').val(data.serial_id);
            // random question id
            $('#random_ques_id').val(data.random_ques.id);
            $('#ques_format').val(data.random_ques.format);


            // loading the DOM  with the next random question questions and options
            $('#ques_options_div').html('<input class="w3-radio" type="radio" name="options" id="opt_a"   /> &nbsp;&nbsp; A. <label for="opt_a" id="opt_a_label" ></label><br/>'+
            '<input class="w3-radio" type="radio" name="options" id="opt_b"  /> &nbsp;&nbsp; B. <label for="opt_b" id="opt_b_label" ></label><br/>'+
            '<input class="w3-radio" type="radio" name="options" id="opt_c"   /> &nbsp;&nbsp; C. <label for="opt_c" id="opt_c_label" ></label><br/>'+
            '<input class="w3-radio" type="radio" name="options" id="opt_d"   /> &nbsp;&nbsp; D. <label for="opt_d" id="opt_d_label" ></label><br/>');
        
            $('#opt_a').val(data.random_ques.opt_a);
                 $('#opt_a_label').text(data.random_ques.opt_a);
            $('#opt_b').val(data.random_ques.opt_b);
                 $('#opt_b_label').text(data.random_ques.opt_b);
            $('#opt_c').val(data.random_ques.opt_c);
                 $('#opt_c_label').text(data.random_ques.opt_c);
            $('#opt_d').val(data.random_ques.opt_d);
                 $('#opt_d_label').text(data.random_ques.opt_d);

            // disabling the previouse button on initial question load
            


            // loading the question indicator as like  Question 1 of 5(total_question_number)
            $('#ques_n').html(data.serial_id);
//             // getting the total question
            $.ajax({
                url: 'classes/process_exam.php?total_questions',
                method: 'get',
        
                success: function (total_question) {
                
                        $('#ques_total').html(total_question);

                    
            },
            error:function(){}
        });


 
//          // end of loading question indicator

//             // we increment the next ques_id since it has been increased as it goes into the server increased by 1 to fetch the next ques and come back
//             // then we are incrementing the ques_id here to get the right checked choice  
             checked_ques_id = serial_id + 1;
             for(var key in localStorage){
                 if(localStorage.getItem(checked_ques_id)){
                         choices[localStorage.getItem(checked_ques_id)].setAttribute('checked', true);                    
                 }
              }

            //   checking if the question button as been answered and loaded changing the button color to green if its answered
//               // Already loaded buttons below no fear
//             // using the class name to get iterate over all the button elements
                    ques_btn = document.ques_btn_form.q_btn;

//             // looping through all the button element using the the button class name which is ordered as an array
                     for(i = 0 ; i < ques_btn.length; i++){
                        
                         button_value = i + 1;
    
                         if(localStorage.getItem(button_value)){
                            ques_btn[i].className = ' w3-button w3-green w3-round-large mr-3';
                        }
                 }
               //  end of quesion button click event  
                 
            }
        }
    });
}

// end of nextQuestion function
















// prevQuestion function starts here
// going back to the previous question
// getting and loading the prev question
function prevQuestion(){
     //getting the serial question id here 
     serial_id = parseInt($('#serial_id').val()); 

     // getting the random question to load the question at random and store the serial and random question in the locastorage 
     prev_random_ques_id = parseInt($('#random_ques_id').val()); 
 
      // question format
      random_ques_format = $('#ques_format').val().trim();

      var choice_taken = '';

      if( random_ques_format == 'g'){ //if german do this
          choice_taken = $('#german_text_ans').val();

                 // storing users question number and its choice index in the localstorage ; user can choose and empty choice index which reset the choice to empty value    
             
             question_checked_index = localStorage.getItem(serial_id); //getting the stored local storage item
             if(question_checked_index){  //if it exist re-store it i.e store the current choice again
                 // alert('already stored'); 
                 localStorage.setItem(serial_id,choice_taken);   
             }else{
                 // alert('stored now'); 
                 localStorage.setItem(serial_id,choice_taken);   //and if the localStorage item doesnt exist store it too
             }

         }   else{
             //  getting the question 'choice value' and 'choice index'
             
             var choice_index = '';
             choices = document.question_form.options;
             for(let i = 0; i < choices.length; i++ ){
                 if(choices[i].checked){
                     choice_taken = choices[i].value;
                     choice_index = i;
                     }
                 }  

                 // storing users question number and its choice index in the localstorage ; user can choose and empty choice index which reset the choice to empty value    
             
             question_checked_index = localStorage.getItem(serial_id); //getting the stored local storage item
             if(question_checked_index){  //if it exist re-store it i.e store the current choice again
                 // alert('already stored'); 
                 localStorage.setItem(serial_id,choice_index);   
             }else{
                 // alert('stored now'); 
                 localStorage.setItem(serial_id,choice_index);   //and if the localStorage item doesnt exist store it too
             }
 }




 
 
     //ajax request to getting the question count to disable prev button when the ques_id  == total_questions in the db
         $.ajax({
             url: 'classes/process_exam.php?total_questions',
             method: 'get',
     
             success: function (total_question) {
                 testing_id = serial_id - 1;
                 total_question = parseInt(total_question);
                         // alert(total_question);
                 if(testing_id < 2){
                     $('#next').attr('disabled',false)
                     $('#prev').attr('disabled',true)
                 }else{   
                     $('#next').attr('disabled',false)
                     $('#prev').attr('disabled',false)
                 }
                 
         },
         error:function(){}
     });
 





     // loading the prev question on ajax call
     $.ajax({
         url: 'classes/process_exam.php',
         method: 'post',
         // data: {'ques_id':$('#ques_id').val(),'ques_text_from_form':$('#ques_text_from_form').val(),'choice_taken': choice_taken},
         data: {'serial_id':serial_id,'random_ques_id':prev_random_ques_id,'choice_taken': choice_taken,'prev':'prev', 'score_me':'score_me' },
         
         success: function (response) {
 
             var data = JSON.parse(response);


             if(data.random_ques.format == 'g'){ //if german do this

                $('#ques_text').html('<span>'+data.serial_id+'</span>.&nbsp;&nbsp; '+ data.random_ques.ques_text); 
                // serial id
                $('#serial_id').val(data.serial_id);
                // random question id
                $('#random_ques_id').val(data.random_ques.id);
                // form of the question i.e german or objective
                $('#ques_format').val(data.random_ques.format);

                $('#ques_options_div').html('<input class="w3-input mt-3 mb-3" type="text" name="german_text_ans" id="german_text_ans"  placeholder="Enter your answer here... (case insensitive,single word spacing)" size="50"  />');

               
              
            // loading the question indicator as like  Question 1 of 5(total_question_number)
            $('#ques_n').html(data.serial_id);
            //             // getting the total question
                        $.ajax({
                            url: 'classes/process_exam.php?total_questions',
                            method: 'get',
                    
                            success: function (total_question) {
                            
                                    $('#ques_total').html(total_question);
            
                                
                        },
                        error:function(){}
                    });


                                // we increment the next ques_id since it has been increased as it goes into the server increased by 1 to fetch the next ques and come back
//             // then we are incrementing the ques_id here to get the right checked choice  
             checked_ques_id = serial_id - 1;
             for(var key in localStorage){
                 if(localStorage.getItem(checked_ques_id)){
                         $("#german_text_ans").val(localStorage.getItem(checked_ques_id));
                 }
              }



                        // Already loaded buttons below no fear
                    // getting the button elements which in total is the number of questions
            // using the class name to get iterate over all the button elements
                ques_btn = document.ques_btn_form.q_btn;

                // looping through all the button element using the the button class name which is ordered as an array
                         for(i = 0 ; i < ques_btn.length; i++){
                            
                            button_value = i + 1;
        
                            if(localStorage.getItem(button_value)){
                               ques_btn[i].className = ' w3-button w3-green w3-round-large mr-3';
                           }
                    }
                   //  end of quesion button click event  



      }else{
            
             $('#ques_text').html('<span>'+data.serial_id+'</span>.&nbsp;&nbsp; '+ data.random_ques.ques_text); 
             
             // serial id
             $('#serial_id').val(data.serial_id);
             // random question id
             $('#random_ques_id').val(data.random_ques.id);

             $('#ques_format').val(data.random_ques.format);
 
 
             // loading the DOM  with the next random question questions and options
                $('#ques_options_div').html('<input class="w3-radio" type="radio" name="options" id="opt_a"   /> &nbsp;&nbsp; A. <label for="opt_a" id="opt_a_label" ></label><br/>'+
             '<input class="w3-radio" type="radio" name="options" id="opt_b"  /> &nbsp;&nbsp; B. <label for="opt_b" id="opt_b_label" ></label><br/>'+
             '<input class="w3-radio" type="radio" name="options" id="opt_c"   /> &nbsp;&nbsp; C. <label for="opt_c" id="opt_c_label" ></label><br/>'+
             '<input class="w3-radio" type="radio" name="options" id="opt_d"   /> &nbsp;&nbsp; D. <label for="opt_d" id="opt_d_label" ></label><br/>');
         
             $('#opt_a').val(data.random_ques.opt_a);
                  $('#opt_a_label').text(data.random_ques.opt_a);
             $('#opt_b').val(data.random_ques.opt_b);
                  $('#opt_b_label').text(data.random_ques.opt_b);
             $('#opt_c').val(data.random_ques.opt_c);
                  $('#opt_c_label').text(data.random_ques.opt_c);
             $('#opt_d').val(data.random_ques.opt_d);
                  $('#opt_d_label').text(data.random_ques.opt_d);
 
             // disabling the previouse button on initial question load
             
 
 
             // loading the question indicator as like  Question 1 of 5(total_question_number)
             $('#ques_n').html(data.serial_id);
 //             // getting the total question
             $.ajax({
                 url: 'classes/process_exam.php?total_questions',
                 method: 'get',
         
                 success: function (total_question) {
                 
                         $('#ques_total').html(total_question);
 
                     
             },
             error:function(){}
         });
 
 
         // end of loading question indicator

        

            // we decrement the next ques_id since it has been increased as it goes into the server decrease by 1 to fetch the next ques and come back
            // then we are decrement the ques_id here to get the right checked choice  
            checked_ques_id = serial_id - 1;
            for(var key in localStorage){
                if(localStorage.getItem(checked_ques_id)){
                        choices[localStorage.getItem(checked_ques_id)].setAttribute('checked', true);                    
                }
             }
            //  end of checked option


            // Already loaded buttons below no fear
                    // getting the button elements which in total is the number of questions
            // using the class name to get iterate over all the button elements
                ques_btn = document.ques_btn_form.q_btn;

         // looping through all the button element using the the button class name which is ordered as an array
                  for(i = 0 ; i < ques_btn.length; i++){
                     
                     button_value = i + 1;
 
                     if(localStorage.getItem(button_value)){
                        ques_btn[i].className = ' w3-button w3-green w3-round-large mr-3';
                    }
             }
            //  end of quesion button click event  
 



        }
    }
    
    });

}
// end of previous button






// <=============================================>

// loading the corresponding question buttons for all the questions
$.ajax({
    url: 'classes/process_exam.php?total_questions',
    method: 'get',
    
    success: function (response) {
        total_question = Number(response);
        
        for(i = 1; i<=total_question; i++){
        $("#ques_btn_div").append('<button class="w3-button w3-grey w3-round-large mr-3" onclick="load_button_questions(this.value)" name="q_btn"  ></button>');
    }
    
    // getting the button elements which in total is the number of questions
    // using the class name to get iterate over all the button elements
         ques_btn = document.ques_btn_form.q_btn;

// looping through all the button element using the the button class name which is ordered as an array
         for(var i = 0 ; i < ques_btn.length; i++){
            
            button_value = i + 1;
            ques_btn[i].value= button_value;
            ques_btn[i].innerHTML = button_value;
            ques_btn[i].id = "btn_serial_"+button_value;
           
                if(localStorage.getItem(button_value)){
                    ques_btn[i].className = ' w3-button w3-green w3-round-large mr-3';                
                }
         }    
    }
})
 // end of loading corresponding question buttons

       
// <=============================================>

// load question by button
function load_button_questions(btn_serial_id){
     

    btn_serial_id = parseInt(btn_serial_id);

    
     //ajax request to getting the question count to enable back the next/prev button when the ques_id is < total_questions
                 testing_id = btn_serial_id;
                 if(testing_id < 2 ){
                     $('#prev').attr('disabled',true)
                     $('#next').attr('disabled',false)
                 }else{
                     
                    // ajax request to getting the question count to enable back the next/prev button when the ques_id is < total_questions
                        $.ajax({
                            url: 'classes/process_exam.php?total_questions',
                            method: 'get',

                            success: function (total_question) {
                                btn_id = btn_serial_id  ;
                                if(btn_id  >= total_question ){
                                    $('#next').attr('disabled',true)
                                    $('#prev').attr('disabled',false)
                                }else{
                                    $('#next').attr('disabled',false)
                                    $('#prev').attr('disabled',false)
                                }
                                
                        },
                        error:function(){}
                    });
                }




//  end of prev disabled button
       
     $.ajax({
         url: 'classes/process_exam.php',
         method: 'post',
         // data: {'ques_id':$('#ques_id').val(),'ques_text_from_form':$('#ques_text_from_form').val(),'choice_taken': choice_taken},
         data: {'btn_serial_id':btn_serial_id,'button_q':'button_q'},
         
         success: function (response) {
             
            data = JSON.parse(response);
 
            if(data.random_ques.format == 'g'){ //if german do this

                $('#ques_text').html('<span>'+data.serial_id+'</span>.&nbsp;&nbsp; '+ data.random_ques.ques_text); 
                // serial id
                $('#serial_id').val(data.serial_id);
                // random question id
                $('#random_ques_id').val(data.random_ques.id);
                // form of the question i.e german or objective
                $('#ques_format').val(data.random_ques.format);

            $('#ques_options_div').html('<input class="w3-input mt-3 mb-3" type="text" name="german_text_ans" id="german_text_ans"  placeholder="Enter your answer here... (case insensitive, single word spacing)" size="50"  />');

               
              
            // loading the question indicator as like  Question 1 of 5(total_question_number)
            $('#ques_n').html(data.serial_id);
            //             // getting the total question
                        $.ajax({
                            url: 'classes/process_exam.php?total_questions',
                            method: 'get',
                    
                            success: function (total_question) {
                            
                                    $('#ques_total').html(total_question);
            
                                
                        },
                        error:function(){}
                    });


                                // we increment the next ques_id since it has been increased as it goes into the server increased by 1 to fetch the next ques and come back
//             // then we are incrementing the ques_id here to get the right checked choice  
             checked_ques_id = btn_serial_id ;
             for(var key in localStorage){
                 if(localStorage.getItem(checked_ques_id)){
                         $("#german_text_ans").val(localStorage.getItem(checked_ques_id));
                 }
              }



                        // Already loaded buttons below no fear
                    // getting the button elements which in total is the number of questions
            // using the class name to get iterate over all the button elements
                ques_btn = document.ques_btn_form.q_btn;

                // looping through all the button element using the the button class name which is ordered as an array
                         for(i = 0 ; i < ques_btn.length; i++){
                            
                            button_value = i + 1;
        
                            if(localStorage.getItem(button_value)){
                               ques_btn[i].className = ' w3-button w3-green w3-round-large mr-3';
                           }
                    }
                   //  end of quesion button click event  



      }else{

            $('#ques_text').html('<span>'+data.serial_id+'</span>.&nbsp;&nbsp; '+ data.random_ques.ques_text); 
             
            // serial id
            $('#serial_id').val(data.serial_id);
            // random question id
            $('#random_ques_id').val(data.random_ques.id);

            // question format
            $('#ques_format').val(data.random_ques.format);


            // loading the DOM  with the next random question questions and options
               $('#ques_options_div').html('<input class="w3-radio" type="radio" name="options" id="opt_a"   /> &nbsp;&nbsp; A.<label for="opt_a" id="opt_a_label" ></label><br/>'+
            '<input class="w3-radio" type="radio" name="options" id="opt_b"  /> &nbsp;&nbsp; B. <label for="opt_b" id="opt_b_label" ></label><br/>'+
            '<input class="w3-radio" type="radio" name="options" id="opt_c"   /> &nbsp;&nbsp; c. <label for="opt_c" id="opt_c_label" ></label><br/>'+
            '<input class="w3-radio" type="radio" name="options" id="opt_d"   /> &nbsp;&nbsp; D. <label for="opt_d" id="opt_d_label" ></label><br/>');
        
            $('#opt_a').val(data.random_ques.opt_a);
                 $('#opt_a_label').text(data.random_ques.opt_a);
            $('#opt_b').val(data.random_ques.opt_b);
                 $('#opt_b_label').text(data.random_ques.opt_b);
            $('#opt_c').val(data.random_ques.opt_c);
                 $('#opt_c_label').text(data.random_ques.opt_c);
            $('#opt_d').val(data.random_ques.opt_d);
                 $('#opt_d_label').text(data.random_ques.opt_d);

            // disabling the previouse button on initial question load
            


            // loading the question indicator as like  Question 1 of 5(total_question_number)
            $('#ques_n').html(data.serial_id);
//             // getting the total question
            $.ajax({
                url: 'classes/process_exam.php?total_questions',
                method: 'get',
        
                success: function (total_question) {
                
                        $('#ques_total').html(total_question);
                    
            },
            error:function(){}
        });

  
          // end of loading question indicator
 
         
            // the radio button index to be checked when the button is clicked to load the next button2
               checked_serial_id = btn_serial_id;  
             for(var key in localStorage){
                 if(localStorage.getItem(checked_serial_id)){
                         choices[localStorage.getItem(checked_serial_id)].setAttribute('checked', true);                    
                 }
              }
            //   end of option checking when button is clicked


             // Already loaded buttons below no fear
                    // getting the button elements which in total is the number of questions
            // using the class name to get iterate over all the button elements
            ques_btn = document.ques_btn_form.q_btn;

            // looping through all the button element using the the button class name which is ordered as an array
                     for(i = 0 ; i < ques_btn.length; i++){
                        
                        button_value = i + 1;
    
                        if(localStorage.getItem(button_value)){
                           ques_btn[i].className = ' w3-button w3-green w3-round-large mr-3';
                       }
                }
               //  end of quesion button click event  

 
         }

        } //close for objective
     
     });


// alert(btn_serial_id);
}

// end of question from clicked button


   $.ajax({
   url: 'classes/process_exam.php?checker_started',
   method: 'get',

   success: function (response) {
        
    if(response == 1){
        // alert(response);
        for(i =1; i<=total_question; i++){
                    localStorage.removeItem(i);
             }

        $.ajax({
               url: 'classes/process_exam.php?get_final_answer',
               method: 'get',
            
               success: function (final_score) {
                  alert('Weldone User, You scored ' + final_score + " out of " + total_question + " You can leave now..." );
                  window.location.href = 'http://localhost/AiziksCbt_Exam/exam.php?logout';        
               },
               error:function(){}
               });

    }else{
        //do nothing
    }
   },
   error:function(){}
   });


 





// if(!localStorage.getItem('loaded')){
//     localStorage.setItem("loaded", 0 );
// }else{
//     localStorage.setItem("loaded", 1 );
// }

// if(localStorage.getItem("loaded") > 0){
//     alert('You are told not to refresh the page/open new tab, Good Bye!');
    
//     localStorage.removeItem("loaded");
//     for(i =1; i<=total_question; i++){
//         localStorage.removeItem(i);
//  }

//    $.ajax({
//    url: 'classes/process_exam.php?get_final_answer',
//    method: 'get',

//    success: function (final_score) {
//       alert('Weldone User, You scored ' + final_score + " out of " + total_question + " You can leave now..." );
//       window.location.href = 'http://localhost/AiziksCbt_Exam/exam.php?logout';        
//    },
//    error:function(){}
//    });
// }




// var reallys = false;
// var allows = true;

// window.onbeforeunload = function(){
//     if(allows){
//         if(!reallys && true){
//             reallys = true;
//             alert('in cond');
//             var msg = "Are your sure to clode the tab ?";        
//             return msg 
//         }
//     }else{
//         allows = true;
//         alert('hello');
//     }
// }