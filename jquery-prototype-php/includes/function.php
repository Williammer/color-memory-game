<?php
	
	function sys2db($str){
	
		return trim(addslashes($str));
	}
	
	function php_validate($n, $e, $s){
	
		if(!preg_match("/^[\d-_'a-z\P{Han}]{1,30}$/i", $n)){
		
			$resp_data['msg'] = "Invalid name characters.";
			return false;
			
		} else if(!preg_match("/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/", $e)) {
			
			$resp_data['msg'] = "Invalid email address.";
			return false;
			
		} else if(!preg_match("/^[\d]{1,5}$/", $s)){
		
			$resp_data['msg'] = "Invalid scores.";
			return false;
			
		} else {
			return true;
		}
	}

?>
