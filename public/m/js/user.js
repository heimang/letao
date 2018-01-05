/*
* @Author: 姊佽吘
* @Date:   2017-12-31 21:54:49
* @Last Modified by:   姊佽吘
* @Last Modified time: 2017-12-31 23:10:00
*/
$(function(){
	$.ajax({
		url: '/user/queryUserMessage',
		success: function(data){
			if(data.error == 400){
				mui.toast('请登陆',{ duration:1000, type:'div' });
				window.location.href = 'login.html';
			}
			$('.username').text(data.username);
			$('.mobile').text(data.mobile);
		}
	})
	$('.exit a').on('click',function(){
		$.ajax({
			url: '/user/logout',
			success: function(data){
				console.log(data);
				mui.toast('成功退出',{ duration:'3000ms', type:'div' }) //或直接写3000
				setTimeout(function(){
					window.location.href = 'login.html';
				},3000)
				
			}
		});
		
	})
})
