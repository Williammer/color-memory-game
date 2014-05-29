<?php
require_once("class.phpmailer.php");
require_once("class.smtp.php");
	
	$mail=new PHPMailer();
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	date_default_timezone_set("Asia/Shanghai");
	
	$mail->IsSMTP();
	$mail->SMTPAuth=true;
	$mail->SMTPDebug = 1;
	$mail->SMTPSecure = 'tls';
	$mail->Host="smtp.gmail.com";
	$mail->Port=587; 
	
	$mail->Username="supervegeter@gmail.com";
	$mail->Password="!77janmee";
	$mail->From="supervegeter@gmail.com";
	$mail->FromName="Colour Memory";
	
	$email_content = '<style>.underline {text-decoration:underline; font-size:20px;}.module_result {width: 150px; vertical-align: top; display: inline-block; *display:inline; *zoom:1; _display:inline; _zoom:1;}.rank_color {color:#0074d9;font-size:50px;}.score_color {color:#ffdc00;font-size:50px;}.top_list {text-align:center; font-size:14px; color:#444; border-spacing: 0; border-collapse: collapse;}.top_list th {border:1px solid #888; margin:0; padding:0; padding:6px 10px; border-spacing:1px}.top_list td {border:1px solid #AAA; margin:0; padding:0; border-spacing:1px}.email_wrap{padding:30px 0;background:#F5F5F5; color:#444;}</style>';
	$email_content .= '<center class="email_wrap"><h3><span class="underline">'.$name.'</span>, thank you for your participation in Colour Memory Game.</h3>';
	$email_content .= '<h3><div class="module_result">Your Score: <br/><span class="score_color">'.$score.'</span></div>';
	$email_content .= '<div class="module_result">Your Rank: <br/><span class="rank_color">'.$rank.'</span></div></h3>';
	$email_content .= '<h4>Top 5 scores:</h4><table class="top_list">';
	$email_content .= '<tr><th>Rank</th><th>Score</th></tr>';
	
	foreach($top_scores as $rk => $s){
		$email_content .= '<tr><td>'.$rk.'</td><td>'.$s.'</td></tr>';
	}
	$email_content .= '</table></center>';
	
	//Receiver
	$player_address = $email;
	
	$mail->AddAddress($player_address,"Dear Player");
	$mail->IsHTML(true);
	$mail->Subject='Your record on Memory Game';
	$mail->Body=$email_content;
	if(!$mail->Send()){
		$resp_data['msg'] = "Error in sending record email:".$mail->ErrorInfo;
		
	} else {
			//echo "Email Sent.";
	
		/*****send the feedback content to the administer.***/
		$mail->ClearAddresses();
		$mail->AddAddress("supervegeter@gmail.com","Dear Admin");
		$mail->IsHTML(true);
		$mail->Subject="Confirmation of mail record.";
		$mail->Body='record sent.';
		if(!$mail->Send()){
			$resp_data['msg'] =  "Error in sending confirm email:".$mail->ErrorInfo;
			
		} else {
			//echo "Feedback Sent.";
		}
	}
?>
