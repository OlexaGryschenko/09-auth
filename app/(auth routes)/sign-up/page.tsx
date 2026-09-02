'use client';

import { useRouter } from 'next/navigation';

import css from "./SignUpPage.module.css"
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';

import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/clientApi';





export default function SignUpPage() {

const router = useRouter();
const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data: User) => {
      setUser(data);
      router.push('/profile');
    },
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    mutation.mutate({ email, password });
  };


/* return (     

<main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} onSubmit={handleSubmit}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

    <p className={css.error}>Error</p>
  </form>
</main>

) */

// ... (імпорти та логіка компонента залишаються без змін)

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign up</h1>
        
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            autoComplete="email"
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
            autoComplete="new-password"
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
            {mutation.isPending ? 'Registering...' : 'Register'}
          </button>
        </div>

        {mutation.isError && (
          <p className={css.error}>Registration failed</p>
        )}
      </form>
    </main>
  );
}

