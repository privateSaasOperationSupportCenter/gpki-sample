import { useAuth } from "../contexts/auth";

export default function Profile() {

  const { user } = useAuth();

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-md rounded-2xl p-6 max-w-sm w-full mt-10">
          <h2>회원 정보</h2>
          <div className="mt-5 text-gray-600">
            <p>이름 : {user?.name}</p>
            <p>CN : {user?.cn}</p>
            <p>기관코드 : {user?.instCode}</p>
          </div>
        </div>
      </div>
      {
        user && (
          <p className="mt-10">
            'Logout' 버튼을 누르시면 세션과 토큰이 만료됩니다. <br />
            그리고 이용신청 시 입력하셨던 post_logout_redirect_uri로 이동합니다.
          </p>
        )
      }
    </>
  );
}