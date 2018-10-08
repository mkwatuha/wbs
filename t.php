<?php
$zone='07';
$connection_number='';
$period='06';
$year=2017;
getMSAccData($zone,$connection_number,$period,$year);
function getMSAccData($zone,$connection_number,$period,$year) {
//($zone,$connection_number,$month,$year);
//$year=$year+2010;
$dbName = "C:\KWSS\Frontend\MergeAppNew.mdb";
if (!file_exists($dbName)) {
    die("Could not find database file.");
}
$db = new PDO("odbc:DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=$dbName; Uid=kakai; Pwd=kitale;");

$sql = "SELECT ebill.[Zone number], ebill.[Connection number], ebill.[e-mail Address], 
ebill.Address, ebill.[Billing period], ebill.Year, ebill.[Prev Date],
 ebill.[Prev Reading], ebill.Consumption, ebill.[Reference Date], ebill.[Bill Type], 
 ebill.[Meter Number], ebill.[Meter Size], ebill.Name, ebill.Town,
 ebill.Classification, ebill.Description, 
 ebill.[Cur Reading], ebill.Balance, ebill.Payment, ebill.Adjustments, ebill.Com1, 
 BillingDetails.Billno, BillingDetails.Charge, BillingDetails.ProductID, 
 BillingDetails.BillDate, BillingDetails.Billed
 FROM ebill , BillingDetails where ebill.BillID = BillingDetails.BillID
And  (((ebill.[Zone number])='".$zone."') AND ((ebill.[e-mail Address]) <> '') AND ((ebill.[Billing period])=$period) AND ((ebill.Year)=$year))";

//echo $sql;
 $result = $db->query($sql);  // or die ( $db->errorInfo())
return $row = $result->fetchAll();
}
// $i = 1;
//ebill.Com3, ebill.com4, ebill.Com5, ebill.Com6,ebill.Expr1016, 
// echo "<pre>";
// foreach ($row as $book) {
//     $connectionNum=$book['Connection number'];

//     if($prevConn==){
//          $connectionNum
//     }
//     echo $i . ": " . iconv("windows-1256", "utf-8", $book['e-mail Address'])." ".$book['Date']." ".$book['EntryType']." ".$book['Amount']." ".$book['Cr/Dr']."\n";
//     $prevConn=$connectionNum;
//     $i++;
// }
function addToQueue($bills,$zone,$month,$year,$trackType){

  foreach ($bills as $bill) {
       $emailAddress=str_replace('.com.','.com',trim($bill[2]));
	   $emailAddress=trim(str_replace(' ','',$emailAddress));
       $ConnectionNumber=trim($bill[1]);
	   $trackType=1;
       emailTrack($trackType,$month,$year,$zone,$emailAddress,$ConnectionNumber);
    }
   
}

			
function emailTrack($trackType,$month,$year,$zone,$emailAddress,$ConnectionNumber){
                        
                        $created_by=$_SESSION['my_useridloggened'];
                        $date_created=date('Y-m-d');
                        $uuid=gen_uuid();
						//$billDate=date('Y-m-d',strtotime($billDate));
                        if($trackType==1){
                            $emailArr=explode('@',$emailAddress) ;
                            $myvalidemail=$emailArr[1]  ;
							
					
                            if(sizeof($emailArr)>1){
                               $table='sms_emailhandle';
                            }
                            else{
                              $table='sms_invalidemailaddress';
                            }
                        }

                        if($trackType==2){
                            $table='sms_processedemail';
                        }

                        if($trackType==3){
                            $table='sms_processedfailedemail';
                        }

                        $insertSQl= "Insert into $table (connection_number,billmonth_id,billyear_id,email_address,zone,
                        date_created,
                        changed_by,
                        date_changed,
                        voided,
                        voided_by,
                        date_voided,
                        uuid) values ('$ConnectionNumber','$month','$year','$emailAddress','$zone',
                        '$date_created',
                        '$changed_by',
                        '$date_changed',
                        '$voided',
                        '$voided_by',
                        '$date_voided',
                        '$uuid')";
						
				
                            $connectionExists=checkDuplicatEmails($table,$ConnectionNumber,$month,$year,$emailAddress,$zone);

                                if($connectionExists ==''){
                                $Result1 = mysql_query($insertSQl) or die(mysql_error());
                                if($trackType==2){
                                removeFromMailQueue('sms_emailhandle',$ConnectionNumber,$month,$year,$emailAddress,$zone);
                                }
                                }

                        

                
}

function trackFailedEmails($reasonFailed,$month,$year,$zone,$emailAddress,$ConnectionNumber){
    $insertSQl= " Insert into sms_processedfailedemail (connection_number,billmonth_id,billyear_id,email_address,zone,reason_failed,
                        date_created,
                        changed_by,
                        date_changed,
                        voided,
                        voided_by,
                        date_voided,
                        uuid) values ('$ConnectionNumber','$month','$year','$emailAddress','$zone','$reasonFailed',
                        '$date_created',
                        '$changed_by',
                        '$date_changed',
                        '$voided',
                        '$voided_by',
                        '$date_voided',
                        '$uuid')";

                        $Result1 = mysql_query($insertSQl) or die(mysql_error());
}

function checkDuplicatEmails($table,$conncetionId,$month,$year,$emailAddress,$zone){
//$billDate=date('Y-m',strtotime($billDate));
$sql="select connection_number from $table 
where connection_number like '$conncetionId'
AND billmonth_id = '$month'
AND billyear_id = '$year'
AND email_address like '$emailAddress'
AND zone like '$zone'

";
//echo $sql;
$result = mysql_query($sql) or die(mysql_error());
$connection='';
 while ($rows=mysql_fetch_array($result)){
      $connection=$rows['connection_number'];
	  //echo $connection.'-----------------------------';
}


return trim($connection);

}

function removeFromMailQueue($table,$conncetionId,$month,$year,$emailAddress,$zone){
//$billDate=date('Y-m',strtotime($billDate));
$delSql="delete from $table 
where connection_number like '$conncetionId'
AND billyear_id= '$year'
AND billmonth_id= '$month'
AND email_address like '$emailAddress'
AND zone like '$zone'

";
$result = mysql_query($delSql) or die(mysql_error());
}

?>