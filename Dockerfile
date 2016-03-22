FROM meteorhacks/meteord:onbuild
MAINTAINER Etienne Colaitis <ecolaitis@gmail.com>

RUN apt-get update && apt-get install -y \
  pdftk

RUN npm install -g \
  pdffiller@0.1.2 \
  meteor-npm \
  atob

# Run as you wish!
# docker run -d --name pdfapp-db mongo
# docker run -d --link "pdfapp-db:db" -e "MONGO_URL=mongodb://db" \
#   -e "ROOT_URL=http://example.com" -p 7080:80 pdfapp
