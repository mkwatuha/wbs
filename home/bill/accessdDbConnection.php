<?php
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
And  (((ebill.[Zone number])='07') AND ((ebill.[e-mail Address]) <> '') AND ((ebill.[Billing period])=3) AND ((ebill.Year)=2017))";

//$sql = "SELECT * from ebill2";
//FROM ebill INNER JOIN BillingDetails ON ebill.BillID = BillingDetails.BillID";
//echo $sql;
$result = $db->query($sql);  // or die ( $db->errorInfo());
// print_r ($result);
$row = $result->fetchAll();
$i = 1;
 //ebill.Com3, ebill.com4, ebill.Com5, ebill.Com6,ebill.Expr1016, 
echo "<pre>";
foreach ($row as $book) {
    echo $i . ": " . iconv("windows-1256", "utf-8", $book['e-mail Address'])." ".$book['Date']." ".$book['EntryType']." ".$book['Amount']." ".$book['Cr/Dr']."\n";
    $i++;
}




?>