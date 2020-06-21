import React from 'react'
import { Link } from 'gatsby'
import { Head } from '../../app/components'
import { images } from '../../assets/images'
import '../../css/components/app-container.scss'

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
      <div className="app-container__list">
        {data.nodes.map((x, i) => {
          return x.name !== 'home' ? (
            <AppDisplay data={x} key={i} homeTitle={homeData.title} />
          ) : null
        })}
      </div>
    </div>
  )
})

const AppDisplay = ({ data, homeTitle }) => {
  console.log(data)
  return (
    <Link to={data.url} className="app-container__item">
      <div className="app-container__image">
        <img src={images[data.image] || images['logo.png']} alt={data.title} />
      </div>
      <div className="app-container__content">
        <h2 className="app-container__title">
          {data.title.replace(` | ${homeTitle}`, '')}
        </h2>
        <div className="app-container__description">
          {data.description.slice(0, 100) + '...'}
        </div>
        {/* <button>Visualize Bubble Sort</button> */}
      </div>
    </Link>
  )
}

export default AppDisplayLayout
