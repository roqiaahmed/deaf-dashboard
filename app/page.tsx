import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

export default function Home() {
  const { userId } = auth()

  if (userId) {
    redirect(`${userId}`);
  }
  else {
    return(
      <div>
        <h1>eroor</h1>
      </div>
    )
  }
}
