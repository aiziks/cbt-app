<?php

session_start();
require_once "../lib/Database.php";
require_once "../helpers/Format.php";

$fm = new Format();
$db = new Database();


// PRINTING THE SESSION IN HUMAN READABLE FORM

// echo "<pre>";
//     print_r($_SESSION);
// echo "</pre>";

// getting the random shuffle numbers using the range function
    function random_shuffle_question_number(){
        $array = range(1,get_total_question_count());
        shuffle($array);

        foreach($array as $key => $val ){
            $unique_random = $key + 1;
            $_SESSION['ques_'.$unique_random] = $val;
    }    
}


// end of getting the random shuffle numbers


// getting the total question from the database
function get_total_question_count(){
    $db = $GLOBALS['db'];
    $table = "tbl_question";
    $data = [];
    $data['return_type'] = 'count';
    $question_count =  $db->select($table,$data);

    return  $question_count;
}
// end of getting the total question from the database

// getting the total question to the tested with the dom to disable the next button
if(isset($_GET['total_questions'])){
    $table = "tbl_question";
    $data = [];
    $data['return_type'] = 'count';
    $question_count =  $db->select($table,$data);

    echo json_encode($question_count);

}



// getting the final answer asynchronously
if(isset($_GET['get_final_answer'])){
    $total_score =  0;

    $table = "tbl_question";
    $data = [];
    $data['return_type'] = 'count';
    $question_count =  $db->select($table,$data);


    // end getting total question count from the function above
   
    for($i = 1 ;$i <= $question_count ; $i++){
    $index = "serial_".$i;

    if(isset($_SESSION[$index])){
    $total_score += $_SESSION[$index];  //acculating session answers
    }
}   

        // storing user detials and final scores for user in the table tbl_scores in database

        $table = "tbl_scores";
        $data = [];
        $data['user_id'] = $_SESSION['user_id'];
        $data['fullname'] = $_SESSION['fullname'];
        // $data['reg_number'] = $_SESSION['reg_number'];
        $data['score'] = $total_score;
        $data['email'] = $_SESSION['email'];

        $cond = [];
        $cond['where'] = ['reg_number' =>$_SESSION['reg_number']] ;

        $question_count =  $db->update($table,$data,$cond);

        session_destroy();
        echo $total_score;
    }
 
    // end of getting the final answer



//getting the the first question loaded from the database 
if(isset($_GET['load_first_ques'])){
    
    $total_question = get_total_question_count();

       
    $serial_id = 1;
    // $rand_num = rand(1,$total_question); //variable to hold the  random values from 1 to size of the questions in the database
    // $random_ques  = $rand_num;  //random number stored in the session variable with ques_id as its key
    
    if(!isset($_SESSION['ques_1'])){
        random_shuffle_question_number();
    }

    
    $random_ques = $_SESSION['ques_'.$serial_id];

    $table = "tbl_question"; //the question table in the database
    $data = []; //data array
    $data['where'] = ['id'=>$random_ques];   
    $data['return_type'] = 'single';      //fetching a single question object
    $single_question =  $db->select($table,$data);   
    

    echo json_encode(['serial_id'=>$serial_id, 'random_ques'=> $single_question ]);   //returning by echoing a JSON encoded value to ajaxs
    
     
}



//getting the posted answer, processing the choice taken and loading the nex question
if(isset($_POST['serial_id']) && isset($_POST['choice_taken']) && isset($_POST['next'])){
    
    $serial_id = $_POST['serial_id'];
        
     $next_serial_id = $serial_id + 1;

     $random_ques = $_SESSION['ques_'.$next_serial_id];

        $table = "tbl_question";
        $data = [];
        $data['where'] = ['id' => $random_ques];
        $data['return_type'] = 'single';
        $single_question =  $db->select($table,$data);

        echo json_encode(['serial_id'=>$next_serial_id, 'random_ques'=> $single_question ]); 
    
     }
// end of the next question loader




// going back to the previous question
//getting the posted answer, processing the choice taken and loading the nex question
if(isset($_POST['serial_id']) && isset($_POST['choice_taken']) && isset($_POST['prev'])){

    $serial_id = $_POST['serial_id'];
        
    $prev_serial_id = $serial_id - 1;

    $random_ques = $_SESSION['ques_'.$prev_serial_id];
    //    fetching the next question to load to the user
        

        $table = "tbl_question";
        $data = [];
        $data['where'] = ['id' => $random_ques];
        $data['return_type'] = 'single';
        $single_question =  $db->select($table,$data);

        echo json_encode(['serial_id'=>$prev_serial_id, 'random_ques'=> $single_question ]); 
        
}
 
// end of previous question loader




//getting the questions loaded when the button is clicked
if(isset($_POST['btn_serial_id']) && isset($_POST['button_q'])){
    

    $serial_id = $_POST['btn_serial_id'];
        
    $button_serial_id = $serial_id;

    $random_ques = $_SESSION['ques_'.$button_serial_id];
    //    fetching the next question to load to the user
        

        $table = "tbl_question";
        $data = [];
        $data['where'] = ['id' => $random_ques];
        $data['return_type'] = 'single';
        $single_question =  $db->select($table,$data);

        echo json_encode(['serial_id'=>$button_serial_id, 'random_ques'=> $single_question ]); 
}






// getting the posted next result and scoring the user
if(isset($_POST['score_me'])){
       
    // $ques_id = $_POST['ques_id'
    $serial_id = $_POST['serial_id'];
    $random_ques_id = $_POST['random_ques_id'];  // the random question value for the real exam scoring
    $choice_taken =  $_POST['choice_taken'];

    

 //Asynchronous answer fetch using the question id which is a foreign key in the answer table
//  scores computing session starts here
        $table = "tbl_answers";
        $data = [];
        $data['where'] = ['ques_id'=>$random_ques_id];
        $data['return_type'] = 'single';
        $single_question =  $db->select($table,$data);

        $correct_answer = strtolower(trim($single_question['answer_text']));

        // $_SESSION['serial_1'] ... is the session storage to store the correct/wrong scores in session 
        (strtolower(trim($choice_taken)) == $correct_answer)? $_SESSION['serial_'.$serial_id] = 1 : $_SESSION['serial_'.$serial_id] = 0;
        
       // scores computing ends here
}



// check if user has started
if(isset($_GET['checker_started'])){

    $_SESSION['started'] += 1;
    $table = "tbl_scores";
    $data = [];
    $data['started'] = $_SESSION['started'];
    $cond = [];
    $cond['where'] = ['reg_number' => $_SESSION['reg_number'] ];
    $question_count =  $db->update($table,$data, $cond);


  $table = "tbl_scores";
     $data = [];
     $data['where'] = ['reg_number' => $_SESSION['reg_number'] ];
     $data['return_type'] = 'single';
     $exam_done = $db->select($table,$data);
     $exam_has_started = $exam_done['started'];
     if($exam_has_started > 1){
     echo 1; 
     }else{
         echo 0;
     }

}

?>
