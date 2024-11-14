// components/Logo.js
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      {/* Displaying logo with transparent background */}
      <Image src="/logo-removebg.png" alt="Dinenit Logo" width={150} height={150} />
      {/* Optionally display the name */}
      {/* <span className="text-2xl font-semibold text-white">Dinenit</span> */}
    </Link>
  );
}
