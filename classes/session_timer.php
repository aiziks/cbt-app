<?php
if(isset($_POST['hr']) && isset($_POST['min']) && isset($_POST['sec'])  ){
    $hr = $_POST['hr'];
    $min = $_POST['min'];
    $sec = $_POST['sec'];


    $table = "tbl_timer";
    $data = [];
    $data['where'] = ['user_id' => $_SESSION['user_id']];
    $data['return_type'] = 'count';
    $user_timer_exist =  $db->select($table,$data);

    if($user_timer_exist > 0){
        // update user timer
    
    $table = "tbl_timer";
    $data = [];
    $data['hr'] =  $hr;
    $data['min'] =  $min;
    $data['sec'] =  $sec;
    $cond = [];
    $cond['where'] = ['user_id' => $_SESSION['user_id']];
    $user_timer_update =  $db->update($table,$data,$cond);
    
        }else{
// insert new user timer
             
    $table = "tbl_timer";
    $data = [];
    $data['user_id'] = $_SESSION['user_id'];
    $data['hr'] =  $hr;
    $data['min'] =  $min;
    $data['sec'] =  $sec;

    $insert_timer =  $db->insert($table,$data);

        }


        $table = "tbl_timer";
    $data = [];
    $data['where'] = ['user_id' => $_SESSION['user_id']];
    $user_timer_select =  $db->select($table,$data);

     $hr = $user_timer_select['hr'];
     $min = $user_timer_select['min'];
     $sec = $user_timer_select['sec'];
    
        echo json_encode['hr'=>$hr,'min'=>$min,'sec' => $sec];
    
}

?>