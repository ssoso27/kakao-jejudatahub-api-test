function KakaoApi(appKey) {
	Kakao.init(appKey)
	var accessToken = undefined; // 로그인하면 생성됨 (api 호출시 계속 필요)
	
	function login() { // 로그인
		Kakao.Auth.loginForm({
			success: function(result) {
				accessToken = result.access_token;
				console.log(accessToken);	
			},
			fail: function(err) {
			  alert("[ERROR]"+JSON.stringify(err));
			}
		  });
	}

	function userInfo() {
		Kakao.API.request({
			url: '/v1/user/me', // 로그인 한 사람의 정보를 내놔라
			success: function(result) {
				alert("[success]"+JSON.stringify(result));
				$("#profileImg").attr("src", result.properties.thumbnail_image); // 프로필이미지에 썸네일 추가
			}, 
			fail: function(err) {
				alert("[ERROR]"+JSON.stringify(err));
			}
		});
	}

	return { // 함수 리턴
		onClickLoginBt: function(){ // 로그인버튼 클릭시 실행
			login()
		},
		onClickUserInfoBt: function() { // userInfo 가져옴
			userInfo()
		}
	}
}