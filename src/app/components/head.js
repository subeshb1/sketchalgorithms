import React from "react";
import { Helmet } from "react-helmet";
import { images } from "../../assets/images";

const root = "https://www.subeshbhandari.com";
export default class Head extends React.Component { 
  render() {
    const {
      data: {
        url = "/",
        title = "Subesh Bhandari",
        ogTitle = title,
        description = "Personal blog and pet projects of Subesh Bhandari. Learn javascript, React, AWS, Go and much more. Use different open source tools and online apps dedicated for visualization and increasing productivity.",
        ogDescription = description, 
        image = "logo.png"
      }
    } = this.props;
    const img = images[image] || images["logo.png"];
    return (
      <Helmet>
        {/* Facebook */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:url" content={root + url} />
        <meta property="og:type" content={"website"} />
        <meta
          property="og:description"
          content={ogDescription || description} 
        />
        <meta property="og:image" content={root + img} />
        {/* Twitter */}
        <meta name="twitter:card" content={"summary"} />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:url" content={root + url} />
        <meta name="twitter:image" content={root + img} />
        <meta name="twitter:description" content={ogDescription} />
        <meta charSet="utf-8" />
        {/* SEO */}
        <title>{title} | Subesh Bhandari</title>
        <meta name="description" content={description} />
      </Helmet>
    );
  }
}
