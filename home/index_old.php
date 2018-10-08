<!DOCTYPE HTML>
<html>
    <head>
        <title>Loader</title>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function(){
                $('#test').load('random_number.php', '', function(response, status, xhr) {
                    if (status == 'error') {
                        var msg = "Sorry but there was an error: ";
                        $(".content").html(msg + xhr.status + " " + xhr.statusText);
                    }
                });
            });
        </script>
    </head>
    <body>
        <div id="test"></div>
    </body>
</html>