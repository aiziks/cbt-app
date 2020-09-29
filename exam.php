<?php
  session_start();
  require_once "lib/Database.php";
  require_once "helpers/Format.php";

  $fm = new Format();
  $db = new Database();


if(!isset($_SESSION['logged']) || !isset($_SESSION['reg_number'])){
    session_destroy();
    echo "<script>window.location.href = 'http://localhost/AiziksCbt_Exam/index.php'</script>";    
}

if(isset($_GET['logout'])){
    session_destroy();
    echo "<script>window.location.href = 'http://localhost/AiziksCbt_Exam/index.php'</script>";    
}




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
          <!--pwa-->
          <link rel="manifest" href="/manifest.json">
          <!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
          
        </head>

        
<body>


        <div class="w3-row " style="padding: 10px;background: darkgrey"  id="exam">
            <div class="w3-container w3-left w3-text-white" style="margin-bottom:3px,background: white;padding: 10px;width: 100px;height: 50px;position: absolute;top: 10px;left: calc(50%-50px);">
                    Aiziks CBT
            </div>

            <div class="w3-container " style="background: white;padding: 10px;margin-top: 30px;margin-bottom: 10px;border-radius: 10px">
                <div class="w3-col-3 p-2 w3-border-right w3-left">
                    Name: <?php  echo "<span class='text-primary'>" . $_SESSION['fullname']."</span></h2>"; ?></b>
                </div>

                <div class="w3-col-3 p-2  w3-border-right w3-left">
                    Reg. No: <?php echo "<span class='text-primary'>" . $_SESSION['reg_number']."</span></h2>"; ?></b>
                </div>
                <div class="w3-col-3 p-2  w3-border-right w3-left">
                    Course: <span id="matric-no"><b>CSC 505</b></span>
                </div>
                <!-- <div class="col-md-2 text-center">
                    Type : <span id="matric-no"><b>A</b></span>
                </div> -->
                <div class="w3-col-22 p-2  w3-border-right w3-left">
                    Timer: <b><span id="timer"></span></b>
                </div>
                <div class="w3-col-1 p-2 w3-left">
                    <!-- <a href="?logout" class='w3-button w3-red' style="text-decoration:none" onclick="return confirm('Are you sure to end test now?')">Logout</a> -->
                    <input type="button" value="submit" id="submit" onclick="submitFinal()" class="w3-button w3-green mr-3  w3-left">
                </div>
            </div>




<!--            loading the question in the form-->
            <div class="row" style=" margin-bottom: 20px">

                <div class="col-md-12 "   style="background: white;padding: 20px;padding-left: 60px;border-radius: 10px" >

                    <div  class="w3-container w3-padding">
                            
                        <p class='' id='ques_text'></p>


                          <form action="classes/process_exam.php" id="question_form" name='question_form'  method="post" onsubmit='return false'   >                   

                          <input type="hidden" name='serial_id' id='serial_id' value=''  >
                          <input type="hidden" name='random_ques_id' id='random_ques_id' value='' >
                          <input type="hidden" name='ques_format' id='ques_format' value='' >

                          <!-- <input type="hidden" name='ques_text_from_form' id='ques_text_from_form' value=''  >  -->

                        <!--the div element to display the radio button element and their labels  -->
                         <div id="ques_options_div">

                         </div>
                          


                         <div class="w3-bar w3-margin-top" style='margin-bottom:40px'>
                         <input type="submit" value="<< Prev" id="prev" onclick="prevQuestion()" class="w3-button w3-blue mr-3  w3-left"> 
                         <input type="submit" onclick="nextQuestion()" id="next" value="Next >>" class="w3-button w3-blue mr-3  w3-right" >
                          </div>

                          <div class="w3-bar w3-center" style='margin-bottom:40px'> Question: <span id="ques_n"></span> of <span id="ques_total"></span> </div>


                        </div> 
                     </form>



                    <form action="" name="ques_btn_form" onsubmit="return false">
                    
                    <div id="ques_btn_div"></div>

                    </form>
    
                    
                    <noscript style="color:red"><h1>Sorry Javascript is not Enabled here... can not do the cbt</h1></noscript>

                    </div>
                    
                </div>
        </div>

        


        <!-- <div class="container" id="content"></div> -->

        <!--footer-->
        <div class="container">
            <div class="row text-right mt-5">
                <div class="container text-center">
                    <div class="col-md-12 bg-white">
                        &copy; AiziksInfoTech 2015 - <?php echo date('Y'); ?>
                    </div>
                </div>
            </div>
        </div>
 

<script src="js/jquery.min.js"></script>
<script src="js/process_exam.js"></script>



</body>
</html>

