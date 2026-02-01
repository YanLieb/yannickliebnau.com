import Menu from './menu/page';
import { auth } from 'auth'
import { redirect } from "next/navigation"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  if (!session?.user) redirect('/login');
  return (
    <div className="flex">
      <div className="menu">
        <Menu />
      </div>
      <div className="container">
        {children}
      </div>
    </div>
  )

}