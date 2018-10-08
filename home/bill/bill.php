<?php

require('fpdf.php');
class PDF extends FPDF
{
//Page header
function LoadData($data)
{

$ZoneNumber=$data[0][0];
$ConnectionNumber=$data[0][1];
$emailAddress=$data[0][2];
$Address=$data[0][3];
$Billingperiod=$data[0][4];
$Year=$data[0][5];
$PrevDate=$data[0][6];
$PrevReading=$data[0][7];
$Consumption=$data[0][8];
$ReferenceDate=$data[0][9];
$BillType=$data[0][10];
$MeterNumber=$data[0][11];
$MeterSize=$data[0][12];
$Name=$data[0][13];
$Town=$data[0][14];
$Classification=$data[0][15];
$Description=$data[0][16];
$CurReading=$data[0][17];
$Balance=$data[0][18];
$Payment=$data[0][19];
$Adjustments=$data[0][20];
$Com1=$data[0][21];
$BillNo=$data[0][22];
$Charge=$data[0][23];
$ProductID=$data[0][24];
$BillDate=$data[0][25];
$Billed=$data[0][26];
$custID=$data[0][27];

$this->SetFont('Times','B',18);
// $this->SetTextColor(0, 92, 179);
$this->SetTextColor(22, 59, 179);
$this->cell(0,8,'NZOIA WATER SERVICES COMPANY LIMITED',0,1,'C');
$this->SetTextColor(0,0,0);
$this->SetDrawColor(0,0,125);
$this->SetFont('Times','',8);
$this->setXY(130,20);
$this->cell(0,3,'Head Office: P.O Box 1010-50205',0,1,'L');
$this->setX(130);
$this->cell(10,3,'Webuye, Kenya',0,1,'L');
$this->setXY(15,20);
$this->SetTextColor(255,0,0);
$this->Ln(2);
$this->cell(18,2,"For enquiries, please contact",0,1,'L');
$this->SetTextColor(0,0,0);
$this->SetFont('Times','',8);
$this->setXY(34,25);
$this->MultiCell(60,4,"Phone Number: 0774484801\nEmail: webscustomercare@nzoiawater.or.ke,\nOr Visit Webuye regional office",0,'L',0);
$this->setXY(130,35);
$this->cell(24,3,'INVOICE:',0,0,'L');
$this->cell(18,3,$BillNo,0,1,'L');
$this->setXY(130,39);
$this->cell(24,3,'DATE OF ISSUE:',0,0,'L');
$this->cell(18,3,date('d-m-Y', strtotime($BillDate)),0,1,'L');
$this->SetTextColor(255,0,0);
$this->Ln(5);
$this->cell(48,3,'THIS WATER BILL is due on or before:',0,0,'L');
$this->SetTextColor(0,0,0);
$this->SetFont('Times','B',8);
$this->cell(30,3,payBefore($BillDate),0,1,'L');
$this->Ln(3);
$this->SetFont('Times','',8);
// $this->SetFillColor(100,200,130);
$this->SetFillColor(230,232,227); 
$this->SetFont('Times','B',8);
$this->cell(0,4,'WATER BILL',1,1,'C',1);
$this->Ln(1);
$this->SetFont('Times','',8);
$this->Rect(10,53,190,23);
$this->Line(105,58,105,75);
$this->MultiCell(80,3,"To:\n$Name\n$Address\n$Town\n",0,'L',0);
$this->setXY(110,58);
$this->SetFont('Times','',7);
$this->cell(25,4,"BILLING PERIOD:",0,0,'L');
$this->cell(20,4,$Billingperiod,0,1,'L');
$this->setX(110);
$this->cell(25,4,'CONNECTION No:',0,0,'L');
$this->cell(25,4,$ConnectionNumber,0,1,'L');
$this->setX(110);
$this->cell(25,4,'METER No:',0,0,'L');
$this->cell(30,4,$MeterNumber,0,0,'L');
$this->cell(7,4,'Cust:',0,0,'L');
$this->cell(30,4,$custID,0,1,'L');
$this->setX(110);
$this->cell(25,4,'CATEGORY:',0,0,'L');
$this->cell(30,4,$Description,0,0,'L');
$this->cell(7,4,'SIZE:',0,0,'L');
$this->cell(30,4,$MeterSize,0,1,'L');
$this->Ln(10);
$this->SetFont('Times','B',7);
$this->SetFillColor(230,232,227); 
$this->cell(30,4,'PREVIOUS READING ',1,0,'C',1);
$this->cell(35,4,'PREVIOUS READING DATE ',1,0,'C',1);

$this->cell(30,4,'CURRENT READING ',1,0,'C',1);
$this->cell(35,4,'CURRENT READING DATE ',1,0,'C',1);

$this->cell(30,4,'CONSUMPTION(M3) ',1,0,'C',1);
$this->cell(30,4,'ESTIMATE(M3)',1,1,'C',1);
$this->SetFont('Times','',10);
$this->cell(30,4,number_format($PrevReading,0),1,0,'C');
$this->cell(35,4,date('d-m-Y', strtotime($PrevDate)),1,0,'C');

$this->cell(30,4,number_format($CurReading,0),1,0,'C');
$this->cell(35,4,date('d-m-Y', strtotime($ReferenceDate)),1,0,'C');

$this->cell(30,4,number_format($Consumption,0),1,0,'C');
$this->cell(30,4,'0',1,1,'C');
$this->SetFont('Times','B',7);
$this->SetTextColor(0,0,0);
$this->cell(130,4,'ACCOUNTS DETAILS:',1,0,'C',1);
$this->SetTextColor(0,0,0);
$this->cell(60,4,'AMOUNT IN KSH',1,1,'R',1);
$this->SetFont('Times','',8);
$this->cell(130,4,"                                                                 BALANCE B/F FROM LAST BILL",1,0,'C');
$this->cell(60,4,number_format($Balance,2),1,1,'R');
$balAfterPayments=handleBF($Payment,$Balance);
$this->cell(130,4,'                                                                                  PAYMENTS CREDITED SINCE LAST BILL',1,0,'C');
$this->cell(60,4,number_format($Payment,2),1,1,'R');

$this->cell(130,4,'                                                    ACCOUNT BALANCE B/F',1,0,'C');
$this->cell(60,4,number_format($balAfterPayments,2),1,1,'R');

//Padding
            $this->cell(130,3,'','RL',0,'R');
            $this->cell(60,3,'','RL',1,'R');
//End padding
$inputArray[0]="";
$totals="";
$this->SetFont('Arial','',9);
$formattedBillDate=date('M-Y', strtotime($ReferenceDate));
for ($col = 0;$col<sizeof($data); $col++) {
            $this->cell(130,4,str_replace('Month of','Month of '.$formattedBillDate,$data[$col][24]),'RL',0,'R'); //$ProductID
            $totals=calculateCharges($totals,$data[$col][23]); //$Charge)
            $this->cell(60,4,number_format(removeCurrency($data[$col][23]),2),'RL',1,'R');
			
			
            
      }

         
            $this->cell(130,3,'Adjustments','RL',0,'R');
            $this->cell(60,3,number_format($Adjustments,2),'RL',1,'R');
//Padding
            $afterBal=handleBalance($totals,$Adjustments);
            $afterBal=handleBalance($afterBal,$balAfterPayments);
            $this->cell(130,3,'','RL',0,'R');
            $this->cell(60,3,'','RL',1,'R');
//End padding
$this->SetFont('Times','B',10);
$this->cell(130,4,'TOTAL CHARGES','RLB',0,'R');
$this->cell(60,4,number_format($totals,2),'RLB',1,'R');
$this->cell(130,4,'TOTAL DUE','RLB',0,'R');
$this->cell(60,4,number_format($afterBal,2),'RLB',1,'R');
$this->SetFont('Times','B',9);
$this->SetTextColor(255,0,0);
$this->Ln(10);
$this->cell(60,8,'Message to Consumer',0,1,'L');
$this->SetTextColor(0,0,0);
$this->MultiCell(0,8,"$Com1\n",1,'L',0);
///addd
$this->Ln(10);
$this->SetTextColor(255,0,0);
$this->SetFont('Times','B',8);
$this->cell(60,3,'Complete this portion, tear off and attach to the payment deposit slip when payments is made or use cheque payments',0,1,'L');
$this->Ln(2);
$this->SetTextColor(0,0,0);
$this->SetFont('Times','',10);
$this->cell(90,8,'',1,0,'L');
$this->cell(50,8,'Invoice No.','RLTB',0,'R');
$this->cell(50,8,$BillNo,'RLT',1,'R');

$this->cell(90,8,'Connection No/Account No.'.$ConnectionNumber,1,0,'L');
$this->cell(50,8,'Total Due','RLB',0,'R');
$this->cell(50,8,number_format($afterBal,2),'RLBT',1,'R');

$this->cell(90,8,'Deposit Slip No.',1,0,'L');
$this->cell(50,8,'Amount Paid',1,0,'R');
$this->cell(50,8,'',1,1,'R');

$this->SetTextColor(255,0,0);
$this->SetFont('Times','B',10);
$this->cell(70,8,'Your Fixed Deposit',0,0,'L');
$this->cell(60,8,'Receipt Number:',0,0,'L');
$this->cell(50,8,'Receipt Date',0,1,'L');



$this->Ln(15);
$this->SetTextColor(255,0,0);
$this->SetFont('Times','',8);
//end

}
//Page footer
function Footer()
{

   //Position at 1.5 cm from bottom
    $this->SetY(-15);
    //Arial italic 8
    $this->SetFont('Courier','B',16);
    //Page number
    
    $this->cell(0,4,'NZOIA CLUSTER',0,0,'C');
	 }
 


}

function getBillDoc($data){
$pdf=new PDF('P','mm','A4');

$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetFont('Arial','',12);
$pdf->LoadData($data);
$pdf->SetFont('Arial','',8);

return $pdf->Output('', 'S');
 //return $pdf->Output();
}

function removeCurrency($amount){
    $amount = strtoupper(trim($amount));
    $amount=str_replace(',','',$amount);
    if (strpos($amount, 'KSH.') !== false) {
         $amount=str_replace('KSH.','',$amount);
    }

    return $amount;
}
function calculateCharges($p,$add){

    $p = strtoupper(trim($p));
    $add = strtoupper(trim($add));
    if (strpos($p, 'KSH.') !== false) {
         $p=substr($p,4);
    }

    if (strpos($add, 'KSH.') !== false) {
         $add=substr($add,4);
    }
    $p=str_replace(',','',$p);
    $add=str_replace(',','',$add);
    return $p+$add;
}

function handleBalance($bill,$bf){
     $bf = strtoupper(trim($bf));
    if (strpos($bf, '(') !== false) {

         $bf=str_replace('(','',$bf);
         $bf=str_replace(')','',$bf);
         $bf=str_replace(',','',$bf);

         return $bill-$bf;
    } else{
        return $bill+$bf;
    }
}

function handleBF($payments,$bf){
     $bf = strtoupper(trim($bf));
     $payments = removeCurrency($payments);
     
    if (strpos($bf, '(') !== false) {

         $bf=str_replace('(','',$bf);
         $bf=str_replace(')','',$bf);
         $bf=str_replace(',','',$bf);

         return -$bf-$payments;
    } else{
        return $bf-$payments;
    }
}
function payBefore($Date){
return date('d-m-Y', strtotime($Date. ' + 14 days'));
}


function calculateTotalBill($data){
   $Adjustments=$data[0][20];
   $Payment=$data[0][19];
   $Balance=$data[0][18];
     
     for ($col = 0;$col<sizeof($data); $col++) {
            $totals=calculateCharges($totals,$data[$col][23]);           	
            
      }

      $afterBal=handleBalance($totals,$Adjustments);
      $balAfterPayments=handleBF($Payment,$Balance);
      $afterBal=handleBalance($afterBal,$balAfterPayments);
      return $afterBal;
}

?>