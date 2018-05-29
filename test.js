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

	function share(keywords) { // 공유하기
		alert(JSON.stringify(keywords));
			Kakao.Link.sendDefault({
			  objectType: 'feed',
			  content: {
				title: '딸기 치즈 케익',
				description: '#케익 #딸기 #삼평동 #카페 #분위기 #소개팅',
				imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
				link: {
				  mobileWebUrl: 'https://developers.kakao.com',
				  webUrl: 'https://developers.kakao.com'
				}
			  },
			  social: {
				likeCount: 286,
				commentCount: 45,
				sharedCount: 845
			  },
			  buttons: [
				{
				  title: '웹으로 보기',
				  link: {
					mobileWebUrl: 'https://developers.kakao.com',
					webUrl: 'https://developers.kakao.com'
				  }
				},
				{
				  title: '앱으로 보기',
				  link: {
					mobileWebUrl: 'https://developers.kakao.com',
					webUrl: 'https://developers.kakao.com'
				  }
				}
			  ]
			});
	}

	return { // 함수 리턴
		onClickLoginBt: function(){ // 로그인버튼 클릭시 실행
			login()
		},
		onClickUserInfoBt: function() { // userInfo 가져옴
			userInfo()
		},
		share: function(jqxhr) { // promise (제이쿼리)
			jqxhr.done(function(result) { // 제이쿼리의 success
				share(result.data)
			})
		}
	}
}

function JejuApi(appKey) {
	return {
		getKeywords: function() {
			return $.get('https://gw.jejudatahub.net/api/proxy/39b8d232dbb011e79252394919cf6a6f/'
			+ appKey
			+ '?endDate=2018-01-14')
		}
	}
}