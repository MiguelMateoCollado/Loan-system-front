import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-24">
      <Link
        href="/clients"
        className="bg-black flex items-center gap-2 text-lg text-white p-3 rounded-md"
      >
        Clients
        <Icon icon="ph:user-circle-plus-fill" />
      </Link>
      <Link
        href="/loans"
        className="bg-black flex items-center gap-2 text-lg text-white p-3 rounded-md"
      >
        Loans
        <Icon icon="ph:credit-card-bold" />
      </Link>
    </main>
  );
}
