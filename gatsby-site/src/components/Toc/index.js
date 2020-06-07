import React, { useEffect } from 'react'

export default function Toc({ tableOfContents }) {
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion)')

    const TableOfContents = {
      container: document.querySelector('.table-of-contents'),
      links: null,
      headings: null,
      intersectionOptions: {
        rootMargin: '0px',
        threshold: 1,
      },
      previousSection: null,
      observer: null,

      init() {
        if (!this.container) return
        this.findLinksAndHeadings()
        if (!this.links.length) return
        this.handleObserver = this.handleObserver.bind(this)
        this.setUpObserver()
        this.observeSections()

        this.links.forEach(link => {
          link.addEventListener('click', this.handleLinkClick.bind(this))
        })
      },

      handleLinkClick(evt) {
        evt.preventDefault()
        let id = evt.target.getAttribute('href').replace('#', '')

        let section = this.headings.find(heading => {
          return heading.getAttribute('id') === id
        })

        section.setAttribute('tabindex', -1)
        section.focus()

        window.scroll({
          behavior: 'instant',
          top: section.offsetTop - 60,
          block: 'start',
        })

        if (this.container.classList.contains('active')) {
          this.container.classList.remove('active')
        }
      },

      handleObserver(entries, observer) {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id')
          let href = `#${id}`,
            link = this.links.find(l => l.getAttribute('href') === href)
          if (entry.isIntersecting && entry.intersectionRatio >= 1) {
            link.classList.add('is-visible')
            this.previousSection = id
          } else {
            link.classList.remove('is-visible')
          }
          this.highlightFirstActive()
        })
        if (
          entries.length === 1 &&
          this.links[1] &&
          `#${entries[0].target.getAttribute('id')}` ===
            this.links[0].getAttribute('href')
        ) {
          this.previousSection = this.links[1]
            .getAttribute('href')
            .replace('#', '')
        }
      },

      highlightFirstActive() {
        let firstVisibleLink = this.container.querySelector('.is-visible')
        this.links.forEach(link => {
          link.classList.remove('active')
        })

        if (firstVisibleLink) {
          firstVisibleLink.classList.add('active')
        }

        if (!firstVisibleLink && this.previousSection) {
          this.container
            .querySelector(`a[href="#${this.previousSection}"]`)
            .classList.add('active')
        }
      },

      observeSections() {
        this.headings.forEach(heading => {
          this.observer.observe(heading)
        })
      },

      setUpObserver() {
        this.observer = new IntersectionObserver(
          this.handleObserver,
          this.intersectionOptions
        )
      },

      findLinksAndHeadings() {
        this.links = [...this.container.querySelectorAll('a')]
        this.headings = this.links.map(link => {
          let id = link.getAttribute('href')
          return document.querySelector(id)
        })
      },
    }
    TableOfContents.init()
  }, [])
  return (
    <div className="table-of-contents">
      <h2>TABLE OF CONTENTS</h2>
      <div dangerouslySetInnerHTML={{ __html: tableOfContents }}></div>
    </div>
  )
}
