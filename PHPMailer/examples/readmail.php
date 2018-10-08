
<style>
div.toggler        { border:1px solid #ccc; background:url(gmail2.jpg) 10px 12px #eee no-repeat; cursor:pointer; padding:10px 32px; }
div.toggler .subject  { font-weight:bold; }
div.read          { color:#666; }
div.toggler .from, div.toggler .date { font-style:italic; font-size:11px; }
div.body          { padding:10px 20px; }

</style>
<script src="jquery-1.2.1.pack.js"></script>
<script>
window.addEvent('domready',function() {
  var togglers = $$('div.toggler');
  if(togglers.length) var gmail = new Fx.Accordion(togglers,$$('div.body'));
  togglers.addEvent('click',function() { this.addClass('read').removeClass('unread'); });
  togglers[0].fireEvent('click'); //first one starts out read
});
</script>
<?php 
include('../class.emailattachment.php');
/* connect to gmail */
$hostname = '{imap.gmail.com:993/imap/ssl}INBOX';
$username = 'clockingsystem@gmail.com';
$password = '2011@#clocking';
$savedirpath='data';
$directorytest=is_dir($savedirpath);
if(!$directorytest){
				mkdir($savedirpath, 0700);
}


/* try to connect */
$inbox = imap_open($hostname,$username,$password) or die('Cannot connect to Gmail: ' . imap_last_error());

/* grab emails */
$emails = imap_search($inbox,'SUBJECT "Request" SINCE "8 August 2011"');

/* if emails are returned, cycle through each... */
if($emails) {
  
  /* begin output var */
  $output = '';
  
  /* put the newest emails on top */
  rsort($emails);
  
  /* for every email... */
  foreach($emails as $email_number) {
    
   /* get information specific to this email */
    $overview = imap_fetch_overview($inbox,$email_number,0);
    $message = imap_fetchbody($inbox,$email_number,2);
    
    /* output the email header information */
    $output.= '<div class="toggler '.($overview[0]->seen ? 'read' : 'unread').'">';
    $output.= '<span class="subject">'.$overview[0]->subject.'</span> ';
    $output.= '<span class="from">'.$overview[0]->from.'</span>';
    $output.= '<span class="date">on '.$overview[0]->date.'</span>';
    $output.= '</div>';
    
    /* output the email body */
    $output.= '<div class="body">'.$message.'</div>';
  }
  
  echo $output;
} 

/* close the connection */
imap_close($inbox);
?>
<?php
/*$conn   = imap_open('{imap.example.com:993/imap/ssl}INBOX', 'foo@example.com', 'pass123', OP_READONLY);

$some   = imap_search($conn, 'SUBJECT "Reason Medically Eligible" SINCE "8 August 2011"', SE_UID);
$msgnos = imap_search($conn, 'ALL');
$uids   = imap_search($conn, 'ALL', SE_UID);

print_r($some);
print_r($msgnos);
print_r($uids);*/
$readAttachment= new ReadAttachment();
$readAttachment->getdata($hostname,$username,$password,$savedirpath,$delete_emails=false);
?>
