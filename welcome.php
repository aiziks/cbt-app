<?php
    session_start();
    require_once "lib/Database.php";
    require_once "helpers/Format.php";

    $fm = new Format();
    $db = new Database();
    
     
     if(!isset($_SESSION['reg_number'])){
        //  echo "<script>window.location = 'login.php'</script>";
         echo "<script>window.location.href = 'http://localhost/AiziksCbt_Exam/index.php'</script>";
     }


    //  check if the user already start the exam
     $table = "tbl_scores";
        $data = [];
        $data['where'] = ["reg_number"=>$_SESSION['reg_number'] ];
        $data['return_type'] = 'count';
    
        $exam_done = $db->select($table,$data);
    
    
        if($exam_done < 1){
    // insert a user record to initialize the exam once 
     $table = "tbl_scores";
     $data = [];
     $data['reg_number'] = $_SESSION['reg_number'];
     $user_started =  $db->insert($table,$data);
 
     }else{
        //  do  nothing
     }


    //getting the total number of question in the db
    $table = "tbl_question";
    $data = [];
    $data['return_type'] = 'count';

    $question_counts =  $db->select($table,$data);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Aiziks CBT</title>
    <meta name="viewport"  content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/bootstrap.css" />
    <link rel="stylesheet" href="css/cbt.css" />
    <link rel="stylesheet" href="css/w3.css" />
    
    <link rel="manifest" href="./manifest.json">
    <meta name="description" content="Aiziks CBT computer based test">
    <meta name="theme-color" content="#87ceeb" />
    
    <!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
    
</head>
<body>


<div class="w3-container  " >
    <div class="w3-text-blue w3-left" style="width: 150px;height: 40px;position: absolute;top: 10px;left: calc(50%-50px);">
        Aiziks CBT
    </div>

    <div class="w3-row " style="background: white;padding-top: 60px;margin-bottom: 5px;border-radius: 10px">
        <div class="w32-col-12 mb-5 text-center">
            <?php

            if(isset($_SESSION['fullname'])){
                echo "<h2>Welcome <span class='text-primary'>" . $_SESSION['fullname']."  [".$_SESSION['reg_number']."]</span></h2>";
            }
            ?>
        </div>

        <div class="w3-col-12 text-center ">
            <div class="w-100 bg-primary text-white" style="padding:10px"><h3>Please Read The Instructions Properly</h3></div>
            <ol class="text-left">
                <li style="font-weight: bolder" >Number Of Questions: <span id="questionTotal"><?php echo $question_counts;?></span> </li>
                <li style="font-weight: bolder">Question Type: Multiple Choice & German </li>
                <li style="font-weight: bolder">Do not Cheat</li>
                <li style="font-weight: bolder">Test starts immediately you click "Start" button below </li>
                <li style="font-weight: bolder">Test stop immediately your exam time elapses/ when you click the submit button </li>
                <li style="font-weight: bolder">Make sure you click the 'Next'/'Prev' button for grading of each question else won't be graded </li>
                <li style="font-weight: bolder">Don't close the browser/tabs while exam is on else  disqualified, graded and done with the exam </li>
                <li style="font-weight: bolder">Once started no going back and forth/ refreshing of page else disqualified and automatically submit for you </li>
                <li class="text-danger">Don't close your exam page , just click submit when done or it submits automatically when elapse time reached !</li>
            </ol>
            <p class="text-center" style="font-weight: bolder">Best Of Luck!</p>

            <noscript style="color:red"><h1>Sorry Javascript is disabled ... can not do the cbt/ enable javascript or change browser to js enabled </h1></noscript>


            <div class="w3-col-12 text-center" style="background: white;padding: 40px;padding-left: 60px;border-radius: 10px" >
            <button class="btn btn-lg btn-outline-primary" onclick="window.location.href ='http://localhost/AiziksCbt_Exam/exam.php'">Start Test ...</button>
        </div>

        </div>

       

    </div>


<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>

</body>
</html>
