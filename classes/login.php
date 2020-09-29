
<?php
session_start();
require_once "../lib/Database.php";
require_once "../helpers/Format.php";

$fm = new Format();
$db = new Database();

// echo "welcome to php";

if(isset($_GET['reg_number']) || isset($_POST['password']) ) {

    // collecting user data for validation
    $reg_number = $fm->validation($_POST['reg_number']);
    $user_pass = $fm->validation(sha1($_POST['password']));

//   check user of user is in tbl_score
    // $table = "tbl_scores";
    // $data = [];
    // $data['where'] = ["reg_number"=>$reg_number];
    // $data['return_type'] = 'count';

    // $exam_done = $db->select($table,$data);


    // if($exam_done >= 1){
    // // do this

    // $signal = "done";
    //     $msg = "Exam already started or done! Leave the hall please!";

    //     $message = ['signal'=>$signal,'msg'=>$msg];
    //     echo json_encode($message);

        
    // }else{

        // else do this
    $table = "cbt_user";
    $data = [];
    $data['where'] = ["reg_number"=>$reg_number,'password'=>$user_pass];
    $data['return_type'] = 'count';

    $isValid = $db->select($table,$data);


    if($isValid >= 1){

        $data['return_type'] = 'single';
        $getData = $db->select($table,$data);

        
        $_SESSION['logged'] = true;
        $_SESSION['user_id'] = $getData['id'];
        $_SESSION['fullname']  = $getData['fullname'];
        $_SESSION['reg_number'] = $getData['reg_number'];
        $_SESSION['username'] = $getData['username'];
        $_SESSION['email'] = $getData['email'];


        $_SESSION['score'] =  0 ;

        // used to detect if user refresh page in db=> used inside process_exam.php
        $_SESSION['started'] = 0;            


        $signal = "ok";
        $msg = "User Exist";

        $message = ['signal'=>$signal,'msg'=>$msg];
        echo json_encode($message);

        
        

    } else {

        // echo "wrong";

        $signal = "error";
        $msg = "Error! check your credentials";

        $message = ['signal'=>$signal,'msg'=>$msg];
        echo json_encode($message);

      
    }
//
// }
}

