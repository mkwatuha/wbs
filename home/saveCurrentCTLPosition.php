<?php
restrictaccessMenu();
function restrictaccessMenu(){
if (!isset($_SESSION)) {
  session_start();
}
$MM_authorizedUsers = "";
$MM_donotCheckaccess = "true";

// *** Restrict Access To Page: Grant or deny access to this page
function isAuthorized_menu($strUsers, $strGroups, $UserName, $UserGroup) { 
  // For security, start by assuming the visitor is NOT authorized. 
  $isValid = False; 

  // When a visitor has logged into this site, the Session variable MM_Username set equal to their username. 
  // Therefore, we know that a user is NOT logged in if that Session variable is blank. 
  if (!empty($UserName)) { 
    // Besides being logged in, you may restrict access to only certain users based on an ID established when they login. 
    // Parse the strings into arrays. 
    $arrUsers = Explode(",", $strUsers); 
    $arrGroups = Explode(",", $strGroups); 
    if (in_array($UserName, $arrUsers)) { 
      $isValid = true; 
    } 
    // Or, you may restrict access to only certain users based on their username. 
    if (in_array($UserGroup, $arrGroups)) { 
      $isValid = true; 
    } 
    if (($strUsers == "") && true) { 
      $isValid = true; 
    } 
  } 
  return $isValid; 
}

$MM_restrictGoTo = "../index.php";
if (!((isset($_SESSION['MM_Username'])) && (isAuthorized_menu("",$MM_authorizedUsers, $_SESSION['MM_Username'], $_SESSION['MM_UserGroup'])))) {   
  $MM_qsChar = "?";
  $MM_referrer = $_SERVER['PHP_SELF'];
  if (strpos($MM_restrictGoTo, "?")) $MM_qsChar = "&";
  if (isset($QUERY_STRING) && strlen($QUERY_STRING)>0) 
  $MM_referrer .= "?" . $QUERY_STRING;
  $MM_restrictGoTo = $MM_restrictGoTo. $MM_qsChar . "accesscheck=" . urlencode($MM_referrer);
  header("Location: ". $MM_restrictGoTo); 
  exit;
}
}
?><?php require_once('../Connections/cf4_HH.php');
require_once('../template/functions/menuLinks.php');


$control=$_GET["ctl"];
$currentpos=$_GET["position"];
$table=$_GET["t"];
$uty=$_GET["act"];
$SQL='';
if($uty=='ctl'){
 $SQL=" update admin_controller set control_position='$currentpos' where tablename='$table' and fieldname='$control' ";
}

if($uty=='caption'){
 $SQL=" update admin_controller set caption_position='$currentpos' where tablename='$table' and fieldname='$control' ";
} 
 $ctn_rows='';
 if(($SQL!='')&&($table!='')&&($currentpos!='')&&($control!='')){
  $results = mysql_query($SQL) or die(mysql_error());
  
          //$ctn_rows=mysql_num_rows($results);
		  if($uty=='caption'){
		  echo $control.'  caption Updated';
		  }
		  
		  if($uty=='ctl'){
		  echo $control.' input position updated';
		  }
  }
 

?>