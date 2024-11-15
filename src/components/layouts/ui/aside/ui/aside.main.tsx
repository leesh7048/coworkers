/* eslint-disable max-len */
import clsx from 'clsx';

import { ASIDE_MENU } from '@/components/layouts/consts/_aside.menu';
import { findHook } from '@/components/layouts/lib/use-find-hook';
import { UnoptimizedImage } from '@/components/next';
import { useMenuStore } from '@/store/useMenuStore';
import AsideNav from './aside.nav';
import AsideToggle from './aside.toggle';

export default function AsideMain() {
  const { hooks } = useMenuStore();
  const isOpen = findHook(hooks, ASIDE_MENU);
  return (
    <aside
      aria-label="menu-down"
      className={clsx(
        'fixed inset-y-0 w-2/3 min-w-32 overflow-y-auto overflow-x-hidden  bg-tertiary',
        'z-40 transition-all duration-500 ease-in-out',
        {
          '-translate-x-full': !isOpen,
          'md:-translate-x-full': isOpen,
        }
      )}
    >
      <div className="mt-16 flex flex-col">
        <AsideToggle className="fixed z-10 self-end bg-tertiary p-4">
          <UnoptimizedImage src="/icons/X.svg" alt="" width={24} height={24} />
        </AsideToggle>
        <AsideNav />
      </div>
    </aside>
  );
}
