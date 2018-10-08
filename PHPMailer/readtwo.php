<?php 

$gmail_username = 'kwatuha@gmail.com';
$gmail_password = 'josephkwatuha';


$imap = imap_open ("{imap.gmail.com:993/imap/ssl}INBOX", $gmail_username, $gmail_password) or die("can't connect: " . imap_last_error());
$savefilepath = 'images_folder/'; //absolute path to images directory
$imagefilepath = 'imagesw/'; //relative path to images directory

$directorytest=is_dir($savefilepath);
if(!$directorytest){
				mkdir($savefilepath, 0700);
}

$directorytest=is_dir($imagefilepath);
if(!$directorytest){
				mkdir($imagefilepath, 0700);
}

$headers = imap_headers($imap);
foreach ($headers as $mail) {
    $flags = substr($mail, 0, 4);
    //Check for unread msgs, get their UID, and queue them up
    if (strpos($flags, "U")) {
        preg_match('/[0-9]+/',$mail,$match);
        $new_msg[] = implode('',$match);     
    }
}

if ($new_msg) {
    foreach ($new_msg as $result) {
        $structure = imap_fetchstructure($imap,$result);
        $parts = $structure->parts;
        foreach ($parts as $part) {
            if ($part->parameters[0]->attribute == "NAME") {
                //Generate a filename with format DATE_RANDOM#_ATTACHMENTNAME.EXT
                $savefilename = date("m-d-Y") . '_' . mt_rand(rand(), 6) . '_' . $part->parameters[0]->value;
                save_attachment(imap_fetchbody($imap,$result,2),$savefilename,$savefilepath,$savethumbpath);
                imap_fetchbody($imap,$result,2); //This marks message as read
            } 
        }
    }
}

imap_close($imap);

function save_attachment( $content , $filename , $localfilepath, $thumbfilepath ) {
    if (imap_base64($content) != FALSE) {   
        $file = fopen($localfilepath.$filename, 'w');
        fwrite($file, imap_base64($content));
        fclose($file);
    }
}
?>
