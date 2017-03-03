
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

