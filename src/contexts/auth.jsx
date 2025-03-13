import { useState, useCallback, useContext, createContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// 아래 문서를 참고해주세요.
// @docs https://github.com/privateSaasOperationSupportCenter/develop/blob/main/linkService/gpki/gpki.md

function AuthProvider(props) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('oauth2_userinfo');
    return storedUser ? JSON.parse(storedUser) : undefined;
  });

  const [loading] = useState(false);
  const navigate = useNavigate();

  // clientId는 연계서비스ID에 해당합니다. 포털에 접속해서 확인해주세요. 
  // 아래 authorizationServerUri는 개발 서버 URI 입니다. (테스트 및 개발용) - 실제 서비스 운영 시에는 "https://saas.go.kr/gpki" 로 호출해주세요
  // redirectUri 와 logOutRedirectUri 는 이용신청 시 입력하신 값으로 지정하시면 됩니다. 
  // 아래 값들은 시연 가능한 테스트용 정보입니다. 
  const authorizationServerUri = "https://saas.go.kr/gpki-stg"
  const clientId = "testclient"
  const clientSecret = "testsecretkey"
  const redirectUri = "http://localhost:5173/oauth2/callback"
  const logOutRedirectUri = "http://localhost:5173"
  const state = "abc123"

  // 인가 코드 요청 및 리다이렉트
  const redirectToLogin = useCallback(() => {
    const url = `${authorizationServerUri}/oauth2/authorize?response_type=code&client_id=${clientId}&scope=openid&state=${state}&redirect_uri=${redirectUri}`;
    window.location.assign(url);
  }, []);

  // 토큰 요청
  const getAccessToken = useCallback((code) => {
    const data = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`;
    axios.post(`${authorizationServerUri}/oauth2/token`, data)
      .then(response => {
        storeTokens(response);
        getUserInfo()
      });
  }, [user]);

  // 토큰 갱신
  const refreshToken = useCallback(() => {
    const refresh = localStorage.getItem('oauth2_refresh_token');
    const data = `client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${refresh}`;
    axios.post(`${authorizationServerUri}/oauth2/token`, data)
      .then(response => {
        if (!response.data.access_token) {
          navigate('/error-page?errorCode=002');
          return;
        }
        storeTokens(response);
      }).catch(error => {
        console.log(error);
      });
  }, [user]);

  // 사용자 정보
  const getUserInfo = () => {
    const access_token = localStorage.getItem('oauth2_access_token');
    const url = `${authorizationServerUri}/userinfo`;
    axios.get(url, {
      headers: {
        authorization: `Bearer ${access_token}`
      },
    }).then(response => {
      localStorage.setItem("oauth2_userinfo", JSON.stringify(response.data));
      setUser(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  // 로그아웃
  const logout = useCallback(() => {
    const idToken = localStorage.getItem('oauth2_id_token');
    if (idToken) {
      const logoutUrl = `${authorizationServerUri}/connect/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${logOutRedirectUri}`;
      localStorage.removeItem('oauth2_access_token');
      localStorage.removeItem('oauth2_refresh_token');
      localStorage.removeItem('oauth2_id_token');
      localStorage.removeItem('oauth2_userinfo');

      window.location.assign(logoutUrl);
    }
  }, [user]);
  
  // 로컬스토리지에 토큰들 저장
  const storeTokens = (response) => {
    const {access_token, refresh_token, id_token} = response.data;
    localStorage.setItem('oauth2_access_token', access_token);
    localStorage.setItem('oauth2_refresh_token', refresh_token);
    localStorage.setItem('oauth2_id_token', id_token);
  }

  return (
    <AuthContext.Provider value={{user, redirectToLogin, loading, logout, setUser, getUserInfo, refreshToken, getAccessToken}} {...props}/>
  );
}

const AuthContext = createContext(false);
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
