'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from "./AuthNavigation.module.css"
import Link from 'next/link';



 export const AuthNavigation = () => {

  const router = useRouter();
  const queryClient = useQueryClient();
  // Отримуємо стан авторизації та дані юзера зі стора
  const { isAuthenticated, clearIsAuthenticated } = useAuthStore();

  /* const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearIsAuthenticated();
      queryClient.clear();
      router.push('/sign-in');
      router.refresh();
    },
  }); */

  
const logoutMutation = useMutation({
  mutationFn: logout,

  onSuccess: () => {
    console.log('LOGOUT SUCCESS');

    clearIsAuthenticated();
    queryClient.clear();
    router.push('/sign-in');
    router.refresh();
  },

  onError: (error) => {
    console.log('LOGOUT ERROR:', error);
  },
});





    return (
    <>
    {isAuthenticated ? (
        // Блок для АВТОРИЗОВАНОГО користувача
        <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <button
          className={css.logoutButton}
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          >
          {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
        </button>        
      </li>
      </>
    ) : (
// Блок для НЕАВТОРИЗОВАНОГО користувача
<>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
      </>
    )}
    </>
  );
};