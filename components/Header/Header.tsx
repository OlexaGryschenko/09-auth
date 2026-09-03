import Link from "next/link";
import css from "@/components/Header/Header.module.css";
import { AuthNavigation } from '@/components/AuthNavigation/AuthNavigation';
import { useAuthStore } from '@/lib/store/authStore';


const Header = () => {
  // Виводимо стан прямо всередині тіла компонента, 
  // щоб бачити його актуальне значення при кожному рендері
  console.log('Zustand isAuthenticated:', useAuthStore.getState().isAuthenticated);
  console.log('Zustand User:', useAuthStore.getState().user);
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
