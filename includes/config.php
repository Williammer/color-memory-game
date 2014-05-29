<?php
	header( 'Content-Type: text/html; charset=UTF-8' );
	header( 'Expires: Sat, 26 Jul 1997 05:00:00 GMT' ); 
	header( 'Last-Modified: ' . gmdate( 'D, d M Y H:i:s' ) . ' GMT' ); 
	header( 'Cache-Control: no-store, no-cache, must-revalidate' ); 
	header( 'Cache-Control: post-check=0, pre-check=0', false ); 
	header( 'Pragma: no-cache' );
 
	//config
	define('HOSTNAME', 'localhost');
    define('USERNAME', 'root');
    define('PASSWORD', '');
    define('DATABASE', 'memory_game');

	 function dbConnect($host,$user,$pass,$dbname) {

	    @$mysqli = new mysqli($host,$user,$pass,$dbname);

	    if($mysqli->connect_error) {
	    	die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
		} else {
			//echo 'Connect success.';
			return $mysqli;
		}
	}
	
	$db = dbConnect(HOSTNAME,USERNAME,PASSWORD,DATABASE);


?>
