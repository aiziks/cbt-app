

<?php


    class Database{

        private $dbhost = "localhost";
        private $dbuser = "root";
        private $dbpass = "";
        private $dbname = "aiziks_cbt";

        public $pdo;

        public function __construct()
        {
            $this->connectDB();
        }

        private function connectDB(){

            if(!isset($this->pdo)){

                try{
                    $link = new PDO("mysql:host=".$this->dbhost.";dbname=".$this->dbname,$this->dbuser,$this->dbpass);
                    $link->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    $link->exec("SET CHARACTER SET UTF8");

                    $this->pdo=$link;

                }catch (PDOException $e){
                   die("Failed to connect with Database".$e->getMessage());
                }

            }
        }

        //Read data
        /*$sql = select * from student where id=:id,email=:email limit 2,5;
                   * $query = $this->pdo->prepare($sql);
                   * $query->bindValue(":$key",$value);
                   * $query->bindValue(":$key",$value);
                   * $query->execute();
                   * $query->fetchAll(PDO::FETCH_ASSOC);
                   */

        public  function select($table,$data=array()){

            $sql = "select ";

            if(array_key_exists('select',$data)){
                $k = 0;

                foreach ($data['select'] as $key=>$value) {
                    $add = ($k > 1)?",":"";
                    $sql .= $add. " " .$key;
                    $k++;
                }

            }else{
                $sql .= " * ";  
            }

            $sql .= " from " . $table;

            if(array_key_exists('where',$data)){
                $sql .= " where ";

                $i = 0;
                foreach ($data['where'] as $key => $value) {
                    $add = ($i > 0) ? " AND " : "";
                    $sql .= "$add" . "$key=:$key";
                    $i++;
                }
            }

            if(array_key_exists('order_by',$data)){

                $sql .= ' order by '. $data['order_by'];

            }

            if(array_key_exists("start",$data) && array_key_exists('limit',$data)){
                $sql .= " limit ". $data['start']. ','. $data['limit'];
            }else if(array_key_exists("start",$data) && array_key_exists('limit',$data)){
                $sql .= 'Limit '.$data['limit'];
            }

            $query = $this->pdo->prepare($sql);

            // so we bind calues to the :val placeholders if array key 'where' exists
            if(array_key_exists('where',$data)){
                foreach ($data['where'] as $key => $value) {
                   $query->bindValue(":$key",$value);
                }
            }

            $query->execute();

            // if one of this exist
            if(array_key_exists('return_type',$data)){
                switch ($data['return_type']){
                    case 'count':
                        $value = $query->rowCount();
                        break;
                    case  'single':
                        $value = $query->fetch(PDO::FETCH_ASSOC);
                        break;

                    default :
                        $value = '';
                        break;
                }
            }else{

                // getting and returning the real data for use by the developer
                if($query->rowCount() > 0){
                    $value = $query->fetchAll(PDO::FETCH_ASSOC);
                }
            }

            return !empty($value)?$value:"false";
        }

        //insert data
//        $$sql = "insert into table(name,email) values(:name,:email,:phone)";
//             $query = $this->pdo->prepare($sql);
//             $query->bindValue(":name",$name);
//             $query->bindValue(":email",$email);
//             $query->bindValue(":phone",$phone);
//             $result = $query->execute();


        public  function insert($table,$data){

            if(!empty($data) && is_array($data)) {
                $keys = '';
                $values = '';

                $i = 0 ;
                 $keys .= implode(',',array_keys($data));
                 $values .= ':'.implode(', :',array_keys($data));

//                if(array_key_exists('date', $data)){
//                    $data['date'] = date("Y-m-d H:i:s");
//                }

                $sql = "insert into ".$table." ( ".$keys.") values (".$values.")";

                 $query = $this->pdo->prepare($sql);

                 foreach ($data as $key => $value){
                     $query->bindValue(":$key",$value);
                 }

                  $inserted = $query->execute();
                 if($inserted){
                     $lastId = $this->pdo->lastInsertId();
                     return $inserted;
                 }else{
                     return false;
                 }
            }
        }


    /*//update data
     * update tablename set name=:name,email=:email where id=:id
     */
        public  function update($table,$data,$cond){

            if(!empty($data) && is_array($data)){
                $keyvalue = '';
                $whereCond = '';

                $i = 0;

                foreach ($data as $key => $value){
                    $add = ($i>0 )?  ' , ' :'';
                   $keyvalue .= " $add "." $key=:$key ";
                    $i++;
                }

                if(!empty($cond) && is_array($cond)){
                $i = 0;
                $whereCond .= " WHERE ";
                foreach ($cond['where'] as $key =>$value) {
                    $add = ($i > 0) ? ' AND ' : '';
                    $whereCond .= " $add "." $key=:$key ";
                    $i++;
                }
                }
                $sql = " UPDATE " .$table ." SET " . $keyvalue.$whereCond;

                 $query = $this->pdo->prepare($sql);

                 foreach ($data as $key => $value){
                     $query->bindValue(":$key",$value);
                 }

                 foreach ($cond['where'] as $key => $value){
                     $query->bindValue(":$key",$value);
                 }
                  $updated = $query->execute();

              if($updated){
                  return $updated;
              }else{
                  return false;}

            }

        }

//        delete data
//delete from tablename where id=:id and email=:email
        public  function delete($table,$data){
            if(!empty($data) && is_array($data)) {
                $whereCond = ' WHERE ';
                $i = 0 ;
                foreach ($data['where'] as $key => $values){
                     $add = ($i> 0)? ' AND ' : '';
                    $whereCond .= "$add"."$key=:$key";
                    $i++;
                }

                $sql = "DELETE FROM ".$table.$whereCond;

                     $query = $this->pdo->prepare($sql);

                     foreach($data['where'] as $key =>$value){
                         $query->bindValue(":$key",$value);
                     }

                      $deleted =$query->execute();

                     if($deleted){
                         return true;
                     }else{
                         return false;
                     }
            }

        }


    }


?>