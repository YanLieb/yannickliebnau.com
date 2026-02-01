import Link from 'next/link'
import { signOut } from "auth"
import { Button } from '@/components/Button'

export default function Menu() {
  const logout = async () => {
    "use server"
    await signOut({ redirectTo: "/login" })
  }
  return (
    <div className="w-40 min-h-dvh h-full border-r-1 border-gray-200 p-4 flex flex-col justify-between gap-2">
      <div className="menu__top flex flex-col">
        <Link href="/" target="_blank">Front</Link>
        <Link href="/dashboard/projects">Projects</Link>
        <Link href="/dashboard/categories">Categories</Link>
      </div>
      <div className="menu__bottom">
        <form action={logout}>
          <Button variant="destructive" className="btn btn-primary px-3 py-2 text-white">Logout</Button>
        </form>
      </div>
    </div>
  )
}
