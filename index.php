<?php 
session_start();
require_once "lib/Database.php";
require_once "helpers/Format.php";

$fm = new Format();
$db = new Database();



// if(isset($_SESSION['reg_number'])){
//     // header("location:index.php");
//     echo "<script>window.location = 'welcome.php'</script>";
// }

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
    <meta name="description" content="Aiziks CBT computer based test">
    
    <!-- <link rel="manifest" href="./manifest.json"> -->
    
    <!-- <meta name="theme-color" content="#87ceeb" /> -->
    
    <!-- CODELAB: Add iOS meta tags and icons -->
<!-- <meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png"> -->
    
    
    
</head>
<body>

<noscript style="color:red"><h1>Sorry Javascript is disabled... can not do the cbt/ enable javascript or change browser to js enabled </h1></noscript>

    
    <div class="w3-row  ">
    <div class="w3-container ">
        <div class="w3-quarter   ">&nbsp;</div>    
        <div class="w3-half w3-card-4  " style="padding: 40px;padding-top: 70px;background:rgba(159,159,159,0.5);margin-top: 70px;box-shadow: 2px 2px  " >
            <div class="" style="text-align: center;background:skyblue;padding:20px;margin-top: 70px;height: 100px; width: 100px;border-radius: 100%;position: absolute;top: -50px;left: calc(50% - 50px);border:1px solid grey">Aiziks CBT</div>

        <div class="" id="login_error"></div>
        <form action="classes/login.php" method="post"  id="login_user"  class="form-horizontal" >
            <div class="form-group ">
                <label for="reg_number">Matric Number/Reg. No.</label>
                <input type="text" class="form-control" name="reg_number" id="reg_number" placeholder="reg. number use 'csc/135/099'">
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" class="form-control" id="password" placeholder="password; use '1234'">
            </div>

            <input type="submit" name="login" value="Log-in" class="btn btn-primary pull-right" id="login" >
        </form>
    </div>
    <div class="w3-quarter   ">&nbsp;</div>    
    
    </div>
    </div>
</div>



<script>

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js')
//   .then((reg) => {
//     // registration worked
//     console.log('Registration succeeded. Scope is ' + reg.scope);
//   }).catch((error) => {
//     // registration failed
//     console.log('Registration failed with ' + error);
//   });
// }


</script>



<script src="js/jquery.min.js" type="text/javascript"></script>
<script src="js/bootstrap.js"></script>
<script src="js/user_login.js" type="text/javascript"></script>




</body>
</html>
