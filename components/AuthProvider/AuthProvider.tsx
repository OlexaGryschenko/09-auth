// components/AuthProvider/AuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';




export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearIsAuthenticated } = useAuthStore();

  const { data: user, isError, isSuccess } = useQuery({
    queryKey: ['session'],
    queryFn: checkSession,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && user) {
      setUser(user);
    }
    if (isError) {
      clearIsAuthenticated();
    }
  },
  
  [isSuccess, isError, user, setUser, clearIsAuthenticated]
);

  return(<>{children}</>);
};