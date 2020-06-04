#!/bin/bash
cd gatsby-site
npm i && npm run build
cd ../cra-site
npm i && npm run build
mv build ../gatsby-site/public/cra
cd ../gatsby-site
# netlify deploy --dir=public --prod
cp ../_redirects public/
