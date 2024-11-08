"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  UserGroupIcon,
  HomeIcon,
  ChartBarSquareIcon,
  DocumentDuplicateIcon,
  TagIcon,
  UsersIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { 
    name: 'Home', 
    href: '/', 
    icon: HomeIcon 
  },
  { 
    name: 'Dashboard', 
    href: '/administrative/dashboard', 
    icon: ChartBarSquareIcon 
  },
  {
    name: 'Products',
    href: '/administrative/products',
    icon: TagIcon,
  },
  {
    name: 'Orders',
    href: '/administrative/orders',
    icon: DocumentDuplicateIcon,
  },
  { 
    name: 'Customers', 
    href: '/administrative/customers', 
    icon: UserGroupIcon 
  },
  { 
    name: 'Users', 
    href: '/administrative/users', 
    icon: UsersIcon 
  },
  { 
    name: 'Settings', 
    href: '/administrative/settings', 
    icon: Cog6ToothIcon 
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
