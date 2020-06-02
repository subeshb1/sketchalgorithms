import React, { Component } from "react";
import "./share-bar.css";
import { withRouter } from "react-router-dom";
import { throttle } from "../../utils";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  GooglePlusIcon,
  RedditIcon,
  TumblrIcon,
  PinterestIcon,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  GooglePlusShareButton,
  RedditShareButton,
  TumblrShareButton,
  PinterestShareButton
} from "react-share";

const root = "https://www.SubeshBhandari.com";
const socialComponents = {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  GooglePlusIcon,
  RedditIcon,
  TumblrIcon,
  PinterestIcon,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  GooglePlusShareButton,
  RedditShareButton,
  TumblrShareButton,
  PinterestShareButton
};
const social = [
  {
    name: "Twitter",
    getProps() {
      return {
        title:
          document.querySelector('[property="og:title"]').content ||
          "Learn From Subesh Bhandari",
        via: "sketchalgorithm",
        hashtags: "SubeshBhandari programming algorithms coding game code 100DaysOfCode React javascript html css".split(
          " "
        )
      };
    }
  },
  {
    name: "Facebook",
    getProps() {
      return {
        quote:
          document.querySelector('[property="og:title"]').content ||
          "Learn From Subesh Bhandari",
        hashtag: "#SubeshBhandari"
      };
    }
  },
  {
    name: "Linkedin",
    getProps() {
      return {
        title: "Learn From Subesh Bhandari"
      };
    }
  },
  {
    name: "GooglePlus",
    getProps() {
      return {};
    }
  },
  {
    name: "Reddit",
    getProps() {
      return {
        title:
          document.querySelector('[property="og:title"]').content ||
          "Learn From Subesh Bhandari"
      };
    }
  },
  {
    name: "Tumblr",
    getProps() {
      return {
        posttype: "link",
        title:
          document.querySelector('[property="og:title"]').content ||
          "Learn From Subesh Bhandari",
        tags: "SubeshBhandari programming algorithms coding game code 100DaysOfCode React javascript html css".split(
          " "
        )
      };
    }
  },
  {
    name: "Pinterest",
    getProps() {
      return {
        media: document.querySelector('[property="og:image"]').content,
        description:
          document.querySelector('[property="og:description"]').content ||
          "Learn from Subesh Bhandari, algorithms made easy with visualization."
      };
    }
  }
];

export default withRouter(
  class ShareBar extends Component {
    state = {
      display: false
    };
    ref = React.createRef();

    handleScroll = () => {
      let current = window.scrollY;

      const action = throttle((next, current) => {
        if (next > current) {
          this.setState({ display: false });
        } else {
          this.setState({ display: true });
        }
      }, 250);
      return () => {
        const next = window.scrollY;
        if (next < 100) {
          current = 0;
          this.setState({ display: false });
          return;
        }
        action(next, current);
        current = next;
      };
    };
    componentWillMount() {
      this.handler = this.handleScroll();
      window.addEventListener("scroll", this.handler);
    }
    componentWillUnmount() {
      window.removeEventListener("scroll", this.handler);
    }
    render() {
      const { display } = this.state;
      const {
        location: { pathname }
      } = this.props;
      const shouldRender = Boolean(
        document.querySelector('[property="og:image"]') &&
          document.querySelector('[property="og:title"]') &&
          document.querySelector('[property="og:description"]')
      );
      return (
        (shouldRender && (
          <div className="share-bar">
            {display && (
              <div className="socials">
                {social.map((x, i) => {
                  const name = x.name;
                  const Icon = socialComponents[name + "Icon"];
                  const Button = socialComponents[name + "ShareButton"];
                  return (
                    <div
                      title={"Share on " + name}
                      key={i}
                      style={{ cursor: "pointer" }}
                    >
                      <Button url={root + pathname} {...x.getProps()}>
                        <Icon size={32} round={true} />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )) ||
        null
      );
    }
  }
);
