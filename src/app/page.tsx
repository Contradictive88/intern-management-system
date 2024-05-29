import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <Link href="/profile">Click here to go to Profile</Link>
      </div>
    </div>
  );
}
