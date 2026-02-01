import { signIn } from 'auth'

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const params = await searchParams;
  const error = params.error;
  return (
    <div className='w-full h-dvh flex items-center justify-center flex-col gap-12'>
      {error === "ServerError" && (
        <p className="text-red-600">Something went wrong, please try again.</p>

      )}
      {error === "AccessDenied" && (
        <p className="text-red-600">You are not allowed to login to this dashboard. Contact your administrator for further informations</p>
      )}
      <h1 className="text-bold text-3xl">Connexion</h1>
    <form
      action={async () => {
        "use server"
        await signIn("google", {redirectTo: "/dashboard"})
      }}
      >
      <button className="px-4 py-2 bg-red-600 border-2 border-red-600 text-amber-50 font-bold cursor-pointer rounded-4xl transition hover:bg-amber-50 hover:text-black" type="submit">Login with Google</button>
    </form>
      </div>
  )
}