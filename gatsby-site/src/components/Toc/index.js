import React, { useEffect } from 'react'

export default function Toc() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id')
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          document
            .querySelector(`.table-of-contents li a[href="#${id}"]`)
            .classList.add('active')
        } else {
          document
            .querySelector(`.table-of-contents li a[href="#${id}"]`)
            .classList.remove('active')
        }
      })
    })

    // Track all sections that have an `id` applied
    document
      .querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
      .forEach(section => {
        observer.observe(section)
      })
    return () =>
      document
        .querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
        .forEach(section => {
          observer.unobserve(section)
        })
  }, [])
  return <div></div>
}
