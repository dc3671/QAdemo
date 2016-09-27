var localStore = [];

function logPush(event_type, event, page) {
	//	console.log(event_type + event);
	localStore.push({
		'event_type': event_type,
		'event': event,
		'page': page
	});
	//    if(localStore.length >= 100){
	//        sendLog();
	//    }
}
function sendLog() {
	logPush('send_log', JSON.stringify({
		'time': (new Date()).toISOString()
	}), window.location.href);
	$.ajax({
		url: '/event',
		data: {
			'event_type': 'multi_event',
			'event': JSON.stringify(localStore),
			'page': window.location.href
		},
		type: 'POST',
		async: false
	});
	localStore = [];
}

$(function() {
	$(window).bind('beforeunload', function(e) {
		if (localStore.length == 0) {
			return;
		} else {
			sendLog();
		}
	});
	console.log('user_track imported...');
});