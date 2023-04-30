import Head from 'next/head'

const fetchShop = async (accessToken: string) => {
  try {
    const response = await fetch('/api/store/getByAccessToken', { method: 'POST',  headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken }), });
    if (response.ok) {
      const shopData = await response.json();
      console.log(shopData);
    } else {
      console.log(`Error fetching store data: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching store data: ${error}`);
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Generator</title>
        <meta name="description" content="gernerator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form onSubmit={(event) => {
          event.preventDefault();
          const accessToken = (event.target as HTMLFormElement).accessToken.value;
          fetchShop(accessToken);
        }}>
          <label htmlFor="accessToken">Access token</label>
          <input type="password" id="accessToken" name="accessToken" />
          <button type="submit">Fetch store info</button>
        </form>
      </main>
    </>
  )
}
