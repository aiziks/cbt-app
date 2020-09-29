    <?php
    $filepath = realpath(dirname(__FILE__));
    include $filepath."/../lib/Session.php";
    include $filepath."/../lib/Database.php";
    include $filepath."/../helpers/Format.php";
    ?>


<?php

    class Admin
    {
        public $db;
        public $fm;

        public function __construct()
        {
            $this->db = new Database();
            $this->fm = new Format();
        }

        public function validateAdminInput($data)
        {

            $admin_data = [];
            $username = $this->fm->validation($data['admin_username']);
            $password = $this->fm->validation(($data['admin_password']));

            $admin_data['return_type'] = "single";
            $admin_data['where'] = ['admin_username'=>$username,'admin_password'=>sha1($password)];


            $table = "admin_login";
            $dataFetch = $this->db->select($table,$admin_data);

            if($dataFetch){

                Session::init();
                Session::set('login',true);
                Session::set('admin_username',$dataFetch['admin_username']);
                Session::set('admin_email',$dataFetch['admin_email']);

                header("location:admin.php");


            } else {
                $msg = "<span style='color: red;'>Username not matched!!!</span>";

                return $msg;
            }
        }

        public function addQuestion($data = array()){
            $array_data = [];
            $array_data['entity'] = $data['query'];
            $array_data['response'] = $data['answer'];

            if(empty($array_data['entity']) && empty($array_data['response'])){
                return "<p class='alert alert-danger'>Error! problem Adding data</p>";
            }else{

                $table = "intent_entity";
                $inserted = $this->db->insert($table, $array_data);

                if ($inserted) {
                    return " <p class='alert alert-success'>Success! Data Inserted Successfully</p>";
                } else {
                    return " <p class='alert alert-danger'>Error! problem Adding data</p>";
                 }
        }}

        public function addStudent($data){

            $data = [];
            $data['fullname'] = $this->fm->validation($_POST['fullname']);
            $data['email'] = $this->fm->validation($_POST['email']);
            $data['number'] = $this->fm->validation($_POST['number']);
            $data['username'] = $this->fm->validation($_POST['username']);
            $data['matric_no'] = $this->fm->validation($_POST['matric_no']);
            $data['level'] = $this->fm->validation($_POST['level']);
            $data['password'] = $this->fm->validation($_POST['password']);

            if($data['fullname'] ==''||$data['email']==''||$data['number']==''||$data['username']==''||$data['matric_no']==''||$data['level']==''||$data['password']==''){
                return "<p class='text-danger'>Error! All fields must be filled...</p>";
            }else {
                $tableName = "students";
                $studentAdded = $this->db->insert($tableName, $data);

                if ($studentAdded) {
                    return "<p class='text-success'>Success! Student Added Successfully...</p>";
                } else {
                    return "<p class='text-danger'>Error! unable to add student....</p>";
                }
            }

        }

        public  function getQuestionList(){

            $sql = "select * from intent_entity";
            $result = $this->db->select($sql);

            if($result){
                return $result;
            }else{
                return false;
            }
        }

//        public  function deleteQuestion($id){
//
//            $del = $this->db->delete('intent_entity',$id);
//            if($del){
//                return true;
//            }else{
//                return false;
//            }
//        }


    }


?>