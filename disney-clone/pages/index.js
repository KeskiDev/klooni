import {gql, GraphQLClient} from "graphql-request"
import Section from "../components/Section"

export const getStaticProps = async () =>{
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url,{
    headers: {
      "Authorization" : `Bearer ${process.env.GRAPH_CMS_TOKEN}`
    }
  })

  const videosQuery = gql`
    query {
      videos {
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(videosQuery)
  const videos = data.videos
  return {
    props: {
      videos,
    }
  }
}





const Home = ({videos})=> {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos =(videos,genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }


  return (
    <>
      <div className='app'>
        <div className='main-video'>
          <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title}/>
        </div>

        <div className='video-feed'>
          <Section genre={'Family'} videos={filterVideos(videos, 'family')}/>
          <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')} />
          <Section genre={'Classic'} videos={filterVideos(videos, 'classic')} />
          <Section genre={'Pixar'} videos={filterVideos(videos, 'pixar')}/>
          <Section genre={'Marvel'} videos={filterVideos(videos, 'marvel')}/>
          <Section genre={'National Geographic'} videos={filterVideos(videos, 'nationalgeographic')}/>
          <Section genre={'Disney'} videos={filterVideos(videos, 'disney')}/>
          <Section genre={'Star Wars'} videos={filterVideos(videos, 'starwars')}/>
        </div>
      </div>




    </>
  )
}

export default Home