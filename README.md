# GPKI 연계 React 샘플
로그인 인증 흐름을 보여주는 간단한 샘플입니다. 자세한 API 명세는 GPKI 가이드를 참고해주세요.

## 세팅
- 샘플 프로젝트를 사용하려면 Node.js 18.0.0 이상의 버전이 필요합니다. 
```
node -v
```

## 실행

   ```sh
   $ git clone https://github.com/privateSaasOperationSupportCenter
   $ cd gpki-saas-sample
   $ npm i
   $ npm run dev 
   ```

## 인증 흐름

1. 'Login' 버튼을 눌러 로그인 페이지로 갑니다. 
2. 'GPKI 로그인' 버튼을 클릭합니다.
3. 실인증서가 있다면, 인증서를 첨부해서 로그인할 수 있습니다. 인증서가 없다면, '개발용 인증서 없이 로그인' 버튼을 클릭합니다.
4. 로그인이 완료되면 지정된 redirect uri로 이동하면서 인가코드를 발급받습니다.
5. 인가코드로 토큰을 요청할 수 있습니다.
6. 발급받은 토큰들로 사용자 정보, 토큰 갱신, 로그아웃과 같은 API를 호출할 수 있습니다.