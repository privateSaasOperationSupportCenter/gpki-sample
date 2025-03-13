import { useEffect, useState } from 'react';
import { useAuth } from './contexts/auth'

function App() {

  const { user } = useAuth();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(user 
      ? `'Profile' 버튼을 눌러 사용자 정보를 확인해보세요` 
      : `'Login' 버튼을 눌러 로그인 페이지로 이동해주세요`
    );
  }, [user]);

  return (
    <div className='mt-10'>
      <h2>
        GPKI 연계 SaaS 샘플 프로젝트입니다
      </h2>
      <p className='mt-15'>{message}</p>
    </div>
  )
}

export default App
