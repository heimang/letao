/*
* @Author: 姊佽吘
* @Date:   2017-12-31 21:55:00
* @Last Modified by:   姊佽吘
* @Last Modified time: 2017-12-31 23:03:11
*/

$(function(){
		$.ajax({
		url: '/user/queryUserMessage',
		success: function(data){
			console.log(data);
			if(data.error == 400){
				mui.toast('请登陆',{ duration:1000, type:'div' });
				window.location.href = 'login.html';
			}
		}
	})
})