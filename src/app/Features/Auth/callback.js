import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthCallback = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      // Fetch character data using the token
      fetch(`/api/characters`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Redirect or process user data
          console.log('Character data:', data);
          router.push('/dashboard');
        });
    }
  }, [token, router]);

  return <div>Loading...</div>;
};

export default AuthCallback;
