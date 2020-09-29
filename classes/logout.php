<?php
session_start();

    if (isset($_GET['logout'])){

    session_destroy();
        echo "<script>window.location ='../index.php'</script>";
    }

?>