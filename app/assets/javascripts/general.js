
///// New League Form Interactivity /////

// league-name changer
$('#league_league_name').focusout(function(e){
	var leagueName = $('#league_league_name').val()
	if (!!leagueName) $('.league-name').text(leagueName)
})
// award-name changer
$('#league_award_name').focusout(function(e){
	var awardName = $('#league_award_name').val()
	console.log(awardName)
	if (!!awardName) $('.award-name').html(awardName)
})

///// Copy Link /////
$(document).ready(function() {
var clip = new ZeroClipboard($("#copy-button"))
})

///// View Ballots /////
// Existing Ballots Hover Effect

$('.back-panel').on('mouseover', function(e){
	$(this).attr({
		x:"3.51",
		y:"31.32"
	});	
})

$('.back-panel').on('mouseout', function(e){
	$(this).attr({
		x:"19.6",
		y:"23.22"
	});	
})

// New Button Hover Effect

$newButton = $("#new-button")

$newButton.find('.new-panel').on('mouseover', function(e){
	$newButton.find('.new-frame').attr({
		x:"3.51",
		y:"31.32",
	    rx:"0",
	    width:'150',
	    height:'150'
	});
	$newButton.find('.new-name').attr({
	    fill:"#fff"
	});		
})

$newButton.find('.new-panel').on('mouseout', function(e){
	$newButton.find('.new-frame').attr({
		x:"20",
		y:"49",
	    rx:"100",
	    width:'115',
	    height:'115'
	});
	$newButton.find('.new-name').attr({
	    fill:"#9a2c22"
	});		
})

$newButton.find('.new-icon').on('mouseover', function(e){
	$newButton.find('.new-frame').attr({
		x:"3.51",
		y:"31.32",
	    rx:"0",
	    width:'150',
	    height:'150'
	});
	$newButton.find('.new-name').attr({
	    fill:"#fff"
	});		
})

$newButton.find('.new-icon').on('mouseout', function(e){
	$newButton.find('.new-frame').attr({
		x:"20",
		y:"49",
	    rx:"100",
	    width:'115',
	    height:'115'
	});	
	$newButton.find('.new-name').attr({
	    fill:"#9a2c22"
	});		
})

$(document).on('load', function(e){
	$newButton.find('.new-frame').attr({
		x:"20",
		y:"49",
	    rx:"100",
	    width:'115',
	    height:'115'
	});
	$newButton.find('.new-name').attr({
	    fill:"#9a2c22"
	});		
})