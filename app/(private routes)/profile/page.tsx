// app/(private routes)/profile/edit/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  
  const { user, setUser } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: (data: User) => {
      setUser(data);
      router.push('/profile');
    },
  });

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUsername = formData.get('username') as string;

    mutation.mutate({ username: newUsername });
  };

  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar || '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user.username}
              className={css.input}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button 
              type="submit" 
              className={css.saveButton} 
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : 'Save'}
            </button>
            <button 
              type="button" 
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
              disabled={mutation.isPending}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}