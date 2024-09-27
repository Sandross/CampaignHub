import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
    
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
    
  return debouncedValue;
};

// export default function useAuth() {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       router.push('/login');
//     }
//     setCheckingAuth(false);
//   }, [router]);

//   return { isAuthenticated, checkingAuth };
// }

