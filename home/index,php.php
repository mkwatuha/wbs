<!DOCTYPE HTML>
<html>
<head>
		<script type="text/javascript" src="../viewdesign/js/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="../viewdesign/js/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="../viewdesign/js/jquery-1.6.2.min.js"></script>
		<script type="text/javascript" src="../viewdesign/js/jquery-ui-1.8.16.custom.min.js"></script>
		<script type="text/javascript">
    <title>Loader</title>
    <style type="text/css">
        div#container {
            width:500px;
            height:500px;
            overflow:auto;
        }
    </style>
    <script type="text/javascript">
var externalpagepart = '#res';
var loadinggif = '/loading.gif';
 
$(document).ready(function(){ 
    // set up the click event
    $('a.loader').live('click', function() {
        var toLoad = '/searchgoogle.php ' + externalpagepart;
        $('.content').slideUp('slow', loadContent);
        $('#load').remove();
        $('#waiting').append('<div id="load"><img src="' + loadinggif + '" alt="Loading" /></div>');
        $('#load').fadeIn('normal');
        function loadContent() {
            $('.content').load(toLoad, '', function(response, status, xhr) {
                if (status == 'error') {
                    var msg = "Sorry but there was an error: ";
                    $(".content").html(msg + xhr.status + " " + xhr.statusText);
                }           
            }).slideDown('slow', hideLoader());
        }
        function hideLoader() {
            $('#load').fadeOut('normal');
        }
        return false;
    });
});
    </script>
</head>
<body>
    <p><a class="loader" href="javascript: null(0);">Load</a></p>
    <div id="container">
        <p id="waiting"></p>
        <div class="content"></div>
    </div> 
</body>
</html>