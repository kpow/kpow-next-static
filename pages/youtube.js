import Head from 'next/head'
import Layout from '@components/Layout';


const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const API_KEY = process.env.YOUTUBE_API_KEY

export async function getServerSideProps() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLLnMxi7_aEL6HF2dfo7L8lZVrOvintxRM&key=${API_KEY}`)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  return (
    <Layout pageTitle="youtube" description="youtube">
    <div>
      <main>
        <ul>
          {data.items.map(({ id, snippet = {} }) => {
            const { title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium } = thumbnails;
            return (
              <li key={id}>
                <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
                  <p>
                    <img width={medium.width} height={medium.height} src={medium.url} alt="" />
                  </p>
                  <h3>{ title }</h3>
                </a>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
    </Layout>
  )
}
