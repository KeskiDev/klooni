import {gql, GraphQLClient} from "graphql-request"
import NavBar from "../components/NavBar"
import Section from "../components/Section"
import Link from 'next/link'
import Image from 'next/image'
import disneyLogo from '../public/disney-button.png'
import marvelLogo from '../public/marvel-button.png'
import pixarLogo from '../public/pixar.png'
import starwarsLogo from '../public/star-wars-button.png'

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

  const accountQuery = gql`
    query{
      account(where: {id: "ckuiy0zeo8kqt0c73a8anjcjg"}){
        username,
        avatar{
          url
        }
      }
    }
  `

  const data = await graphQLClient.request(videosQuery)
  const videos = data.videos
  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account

  return {
    props: {
      videos,
      account
    }
  }
}

const Home = ({videos, account})=> {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos =(videos,genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
  }

  const seenVideos = (videos) =>{
    return videos.filter(video => video.seen == true)
  }

  return (
    <>
      <NavBar account={account}></NavBar>

      <div className='app'>
        <div className='main-video'>
          <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title}/>
        </div>

        <div className='video-feed'>
          <Link href='#disney'>
            <div className='franchise' id='disney'>
              <Image src={disneyLogo} />
            </div>
          </Link>

          <Link href='#marvel'>
            <div className='franchise' id='marvel'>
              <Image src={marvelLogo} />
            </div>
          </Link>

          <Link href='#pixar'>
            <div className='franchise' id='pixar'>
              <Image src={pixarLogo} />
            </div>
          </Link>

          <Link href='#star-wars'>
            <div className='franchise' id='star-wars'>
              <Image src={starwarsLogo} />
            </div>
          </Link>

        </div>

        
        <Section genre={'Recommended for you'} videos={unSeenVideos(videos)}/> 
        <Section genre={'Watch again'} videos={seenVideos(videos)}/> 
        <Section genre={'Family'} videos={filterVideos(videos, 'family')}/>
        <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')} />
        <Section id='pixar' genre={'Pixar'} videos={filterVideos(videos, 'pixar')}/>
        <Section id='marvel' genre={'Marvel'} videos={filterVideos(videos, 'marvel')}/>
        <Section id='disney' genre={'Disney'} videos={filterVideos(videos, 'disney')}/>
        <Section id='star-wars' genre={'Star Wars'} videos={filterVideos(videos, 'starwars')}/>
        
      
        </div>



    </>
  )
}

export default Home