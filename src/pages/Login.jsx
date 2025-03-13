import { useAuth } from "../contexts/auth";

export default function Login() {

  const { redirectToLogin } = useAuth();

  return (
    <>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h2>로그인</h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm text-secondary text-left">이메일</label>
              <div className="mt-2">
                <input id="email" type="email" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm text-secondary">비밀번호</label>
                <div className="text-sm">
                  <a href="#">비밀번호 찾기</a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" type="password" />
              </div>
            </div>
            <div>
              <button className="bg-secondary hover:bg-secondary-hover"> 로그인</button>
            </div>
          </form>
          <hr className="border-t-1 border-gray-300 my-6" />
          <div className="mt-5 flex justify-center items-center">
            <button className="bg-primary hover:bg-primary-hover" onClick={redirectToLogin}> GPKI 로그인</button>
          </div>
          <p className='mt-15'>GPKI 로그인 버튼을 클릭합니다. <br/>인가 코드를 GPKI 연계 SaaS 서버에 요청합니다.</p>
        </div>
      </div>
    </>
  )
}