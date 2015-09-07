<?php
	require_once('includes/config.php');
	require_once('includes/function.php');
	
	$top_num    = 5;
	$top_scores = array();
	$rank;
	$user_id;
	$resp_data = array();
	
	$name  = isset($_POST['name']) ? $_POST['name']: '';
	$email = isset($_POST['email'])? $_POST['email']: '';
	$score = isset($_POST['score'])? intval($_POST['score']): '';
	
	if(php_validate($name, $email, $score)){
		
		//query if exist info
		$sql_query_exist = "SELECT * FROM `player_info` WHERE `email` = '".sys2db($email)."'";
		
		if(!$result = $db -> query($sql_query_exist) ){
			die('There was an error running the query [' . $db->error . ']');
			$resp_data['msg'] = 'There was an error running the query [' . $db->error . ']';
			
		} else {
			
			if($result -> num_rows > 0) {
				//submitted before
				$row = $result -> fetch_assoc();
				$user_id = intval($row['id']);
				
				$sql_insert_score = "INSERT INTO `score` (user_id, score, submit_time) VALUES ('".$user_id."', '".$score."', now())";
		
				//insert score
				if(!$result = $db -> query($sql_insert_score) ){
				
					die('There was an error running the query [' . $db->error . ']');
					$resp_data['msg'] = 'There was an error running the query [' . $db->error . ']';
					
				} else {
					$resp_data['msg'] = ' insert score success.';
				}
				
				if( stripslashes($row["name"]) === $name){
					//echo 'same name';
				} else {
					//echo 'not same name';
					
					//update name
					$sql_update_name = "UPDATE `player_info` SET `name`='".sys2db($name)."' WHERE `id`='".$user_id."'";
					if(!$result = $db -> query($sql_update_name) ){

						die('There was an error running the query [' . $db->error . ']');
						$resp_data['msg'] = 'There was an error running the query [' . $db->error . ']';
						
					} else {
						$resp_data['msg'] = ' update name success.';
					}
				}
				
			} else {
				//first submit
				//insert info
				$sql_insert_player = "INSERT INTO `player_info` (name, email) VALUES ('".sys2db($name)."','".sys2db($email)."')";
			
				if(!$result = $db -> query($sql_insert_player) ){
	
					die('There was an error running the query [' . $db->error . ']');
					$resp_data['msg'] = 'There was an error running the query [' . $db->error . ']';
					
				} else {
					$user_id = intval($db->insert_id);
					$resp_data['msg'] = ' insert player info success.';
				}
				//insert score
				$sql_insert_score = "INSERT INTO `score` (user_id, score, submit_time) VALUES ('".$user_id."', '".$score."', now())";
				if(!$result = $db -> query($sql_insert_score) ){

					die('There was an error running the query [' . $db->error . ']');
					$resp_data['msg'] = 'There was an error running the query [' . $db->error . ']';
					
				} else {
					$resp_data['msg'] = ' insert score success.';
				}
				
			}
		}
		
		//query data
		$sql_query  = "SELECT * , @curRank := @curRank + 1 AS `rank` FROM `score` `s`, (SELECT @curRank := 0) `r` ORDER BY `score` DESC, `submit_time` ";
		
		if( $result = $db -> query($sql_query) ){
			while($row = $result -> fetch_assoc()) {
				if(intval($row["user_id"]) === $user_id && intval($row["score"]) === $score ){
					$rank = $row["rank"];
				}
				if( count($top_scores) < $top_num) { 
					$top_scores[$row["rank"]] = $row["score"];
				}
			}
			
			$resp_data['msg'] = 'Here are the top 5 scores and your position.';	
			$resp_data['top_scores'] = $top_scores; 
			$resp_data['rank'] = $rank;

		} else {
			die('There was an error running the query [' . $db->error . ']');
			$resp_data['msg'] = 'There was an error running the query [' . $db->error . ']';
		}
		
		$result -> free();
		$db -> close();
	} 
	
	//phpmailer controls
	include_once('includes/mailer.php');
	
	echo json_encode($resp_data);
?>
