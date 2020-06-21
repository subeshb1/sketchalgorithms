import React from 'react'
import { Link } from 'gatsby'
import { Head } from '../../app/components'
import { images } from '../../assets/images'
const AppDisplayLayout = React.memo(({ data, category }) => {
  const homeData = data.nodes.find(x => x.name === 'home')
  return (
    <div className="app-container">
      {homeData && (
        <>
          <Head data={homeData} />
          <h1>{homeData.title}</h1>
        </>
      )}
      <ul>
        {data.nodes.map((x, i) => {
          return x.name !== 'home' ? <AppDisplay data={x} key={i} /> : null
        })}
      </ul>
    </div>
  )
})

const AppDisplay = ({ data }) => {
  console.log(data)
  return (
    <div>
      <img src={images[data.image] || images['logo.png']} alt={data.title} />
      <Link to={data.url}>{data.title}</Link>
      {data.description}
    </div>
  )
}

export default AppDisplayLayout
