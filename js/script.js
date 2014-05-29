var $j = jQuery.noConflict();

	$j(document).ready(function() {
		
		var colors = ['colour1','colour1','colour2','colour2','colour3','colour3','colour4','colour4',
					 'colour5','colour5','colour6','colour6','colour7','colour7','colour8','colour8'];
		var firstLookTime = 2000, flipTime = 500, game_on = true, is_first = true; 
		var colorFirst, colorSecond, pairOpened, frozenCount, userScore, lock_click, shuffledCards, alerting;
		var $gameBoard = $j('.game_board'), $scorePanel = $j('.score_panel');

		function log(s){
			console.log(s);
		}

		function shuffle(o){ //Fisher–Yates Shuffle Algorithm
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		}
		
		function flip(className, state){
			var obj = $j("."+className);
				
			if(state === 0){
				obj.removeClass('flipfront').addClass('flipback').addClass('card_bg');
				obj.removeClass(className);
				state = 1;
				
			} else if(state === 1){
				obj.removeClass('card_bg').removeClass('flipback').addClass('flipfront');
				state = 0;
			}
		}
		
		function updatePanel(score){
			$scorePanel.html('Score: <h3>'+score+'</h3>');
		}
		
		function validate(name, email){
			
			var name_pattern = /^[\d-_'a-z\u4e00-\u9eff]{1,30}$/i;
			var email_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if(!name_pattern.test(name)){	
				if(!alerting){
					alerting = true;
					Boxy.alert("Please input valid name.", null, {title: "Validation Problem", afterHide: function(){alerting = false;}} );
				}
				return false;
			} else if(!email_pattern.test(email)){
				if(!alerting){
					alerting = true;
					Boxy.alert("Please provide a valid email.", null, {title: "Validation Problem", afterHide: function(){alerting = false;}});
				}
				return false;
			} else {
				return true;
			}
		}
		
		function start() {
			$j('.restart').click(function(){
				 Init();  
			});
		}
		start();
		//Submit
		var Submit = function($form_boxy){
			
			$j('#win_form').submit(function(e){
			
				e.preventDefault();
				$player_name  = $j('.name').val();
				$player_email = $j('.email').val();
				
				if(validate($player_name, $player_email)){
				
					if (request) {
						request.abort();
					}
					
					var request = $j.ajax({
						type: "POST",
						url: "processor.php",
						data: { name: $player_name, email: $player_email, score: userScore },
						beforeSend: function(){
							//loading
							$form_boxy.setContent('<center class="win_form"><div class="loader"></div><br/><span class="ajax_msg">Submiting...</span><br/><br/><br/></center>');
						}
					});
					request.done(function (response, textStatus, jqXHR){
						
							if(response){
								if(typeof response !== 'string'){
									response = JSON.stringify(response);
								}
								try {
									var data = $j.parseJSON(response);
									$form_boxy.setContent('<center class="win_form"><in class="icon_ok close"></in><span class="ajax_msg">Submit Success!</span><br/><h5 class="mb10">You can try a better score</h5><input type="button" class="btn btn_gray btn_restart_pop restart close" id="restart_pop" value="Restart" /></center>');
									start();
								} catch(e) {
									Boxy.alert("Error, may have error in server configuration.", null, {title: "Error"});
									$form_boxy.setContent('<center class="win_form"><span class="ajax_msg">Submit Fail.</span></center>');
								}
							} else {
								$form_boxy.setContent('<center class="win_form"><span class="ajax_msg">No data received. textStatus: '+textStatus+'; jqXHR:'+jqXHR+'</span></center>');
							}
					});

					request.fail(function(jqXHR, textStatus, errorThrown){
						Boxy.alert('Ajax request error.'+textStatus, errorThrown);
						$form_boxy.setContent('<center class="win_form"><span class="ajax_msg">Submit Failed.</span></center>');
					});

				}
			});

		},
		// Game
		Game = function(){
			
			$j('.card').hover(function(){
					$j(this).addClass('on_focus').siblings('.card').removeClass('on_focus');
			},function(){
				//stay to last focus
			}).eq(0).addClass('on_focus');
			
			if(is_first){
				var keyHandler = function (e) {
					var key = e.which || e.keyCode;
					switch (key) {
						case Event.KEY_LEFT:
							e.stop(); 
							if($j('.on_focus').prev().get(0)){
								$j('.on_focus').removeClass('on_focus').prev().addClass('on_focus').end();
							} 
							break;
						case Event.KEY_RIGHT:
							e.stop();
							if($j('.on_focus').next().get(0)){
								$j('.on_focus').removeClass('on_focus').next().addClass('on_focus').end();
							}
							break;
						case Event.KEY_UP:
							e.stop();
							if($j('.on_focus').prev().prev().prev().prev().get(0)){
								$j('.on_focus').removeClass('on_focus').prev().prev().prev().prev().addClass('on_focus').end();
							}
							break;
						case Event.KEY_DOWN:
							e.stop();
							if($j('.on_focus').next().next().next().next().get(0)){
								$j('.on_focus').removeClass('on_focus').next().next().next().next().addClass('on_focus').end();
							}
							break;
						case Event.KEY_RETURN:
							e.stop();
							$j('.on_focus').trigger('click');
							break;
					}
				}
				
				$(document).observe('keydown', keyHandler);
				is_first = false;
			}	
			
			$j('.card').click(function(){
				
				if(lock_click){
					return;
				}
					
				if(!$j(this).hasClass('frozen') && !$j(this).hasClass('opened'+(pairOpened))){ 
					++pairOpened; 
					colorSecond = $j(this).attr('class').substr(10,7);
					$j(this).addClass('opened'+pairOpened);
					flip('opened'+pairOpened, 1);
					
					if(pairOpened > 1 ){
						
						if(colorFirst === colorSecond){
							//log('same');
							$j('.'+colorFirst).addClass('frozen').removeClass('opened1');
							$j('.'+colorSecond).addClass('frozen').removeClass('opened2');
							frozenCount += pairOpened;
							pairOpened = 0;
							userScore = userScore + 1;
							updatePanel(userScore);
							
						} else {
							//log('NOT same');
							lock_click = true;
							pairOpened = 0;
							userScore = userScore - 1;
							updatePanel(userScore);

							var tFlipBack = setTimeout(function(){
								flip('opened1', 0);
								flip('opened2', 0);
								lock_click = false;
							}, flipTime);
						}
						if(frozenCount === 16){
							//log('win');
							var $form_boxy = new Boxy("<form id='win_form' class='win_form'><h3>Congratulations! You win!</h3><h4>Your Score is: <span class='score_result'></span></h4><h5>Want to see top scores and your rank?<br/>Just submit your Name and Email:</h5><div class='input_wrap'><label class='label' for='name'>Name: <input type='text' name='name' class='name' id='name' value='' maxlength='30' /></label><label class='label' for='email'>Email: <input type='text' name='email' class ='email' id='email' value='' maxlength='40'/></label><input type='submit' id='submit' class='btn btn_dark submit' value='Submit' /></div></form>",
							{	draggable: false,
								closeable: true,
								fixed: true,
								modal:true,
								title: 'Congratulations!',
								unloadOnHide: true
							});
							$j('.score_result').text(userScore);
							Submit($form_boxy);
						}
						
					} else {
						//log('first card opened');
						colorFirst = colorSecond;
					}
					
				} else {
					return;
					}
			});
			
		},
		//Init
		Init = function(){
			if(game_on){
				game_on = false;
				colorFirst = 0, colorSecond = 0, pairOpened = 0, frozenCount = 0, userScore = 0,
				lock_click = false, shuffledCards = shuffle(colors);
				
				//insert cards into DOM
				$gameBoard.html('');
				for(var i = 0; i < colors.length; i++) {
					$gameBoard.append('<div class="card flip ' + shuffledCards[i] + '">' + '</div>');
				}
				$scorePanel.html('<span class="before"><a class="red">2</a> Seconds Glimpse...</span>');
				
				setTimeout(function() {
					$scorePanel.html('<span class="before"><a class="red">1</a> Seconds Glimpse...</span>');
				}, firstLookTime/2);
				//first look.
				setTimeout(function() {
						updatePanel(userScore);	
						$j('.card').addClass('flipback card_bg');
							Game();
							game_on = true;
				}, firstLookTime);
			}
		}
		
		Boxy.confirm("Are you ready to start Colour Memory Game? You will have 2 seconds to look at all the color cards.", function() { Init(); });
		$j('.boxy-btn1').focus();
	});
		