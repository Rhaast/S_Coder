	(function($, doc, $$) {
		$.init();
		$.ready(function() {

		});
	})(mui, document, jQuery);

	// 获取url中的参数
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		} else {
			return null;
		}
	}

	function ifLogin() {
		var userId = localStorage.getItem("userId");
		if (userId == null || userId == undefined || userId == '') {
			mui.alert('请先登陆！', 'S_Coder', function() {
				//var id = this.getAttribute('href');
				var webview_style = {
					popGesture: "close"
				};
				mui.openWindow({
					id: "login",
					url: "login.html",
					styles: webview_style,
					show: {
						aniShow: true
					},
					waiting: {
						autoShow: true
					}
				});
			});
		}
	}

	mui('body').on('tap', 'a', function() {
		var id = this.getAttribute('href');
		var webview_style = {
			popGesture: "close"
		};

		mui.openWindow({
			id: id,
			url: this.href,
			styles: webview_style,
			show: {
				aniShow: 'none'
			},
			waiting: {
				autoShow: false
			}
		});
	})

	function getUserInfo() {

		$.ajax({
			url: "http://112.74.187.146:8080/studyapp/user/findById/" + localStorage.getItem("userId"),
			type: "GET",
			dataType: 'json',
			async: false,
			contentType: "application/json",
			success: function(result) {
				if (result.result == 200) {
					localStorage.setItem("nickName", result.detail.nickName);
					localStorage.setItem("level", result.detail.level);
					localStorage.setItem("score", result.detail.score);
					localStorage.setItem("portrait", result.detail.portrait);
					localStorage.setItem("signCount", result.detail.signCount);
				} else {
					mui.alert("网络错误！");
				}
			}
		});
	}