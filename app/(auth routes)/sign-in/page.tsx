'use client';

// import { FormEvent } from 'react';
import type { User } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api/clientApi';
import css from './SignInPage.module.css';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignInPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: User) => {
      setUser(data);
      router.push('/profile');
    },
  });

/* Передаємо логін з api

export const login = async
(payload: AuthPayload): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', payload);
  return data;
};
................iiiiii......................
*/

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    mutation.mutate({ email, password });
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Logging in...' : 'Log in'}
          </button>
        </div>

        {mutation.isError && (
          <p className={css.error}>
            {mutation.error.message || 'Login failed'}
          </p>
        )}
      </form>
    </main>
  );
}