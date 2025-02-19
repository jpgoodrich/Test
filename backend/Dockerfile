# to create our docker image:
#    docker image build -t blog-backend backend/
#
# to run in docker container:
#   docker run -it -e PORT=3030 -e DATABASE_URL=mongodb://host.docker.internal:27017/blog -p 3030:3030 blog-backend
#    -it runs the container in interactive mode (-t to allocate a pseudo Terminal and -i to keep the input stream open).
#    -e PORT=3030 sets the PORT environment variable inside the container to 3030.
#    -e DATABASE_URL=mongodb://host.docker.internal:27017/blog sets the DATABASE_URL environment variable. Here, we replaced localhost with host.docker.internal, 
#       as the MongoDB service runs in a different container on the Docker host (our machine).
#    -p 3030:3030 forwards port 3030 from inside the container to port 3030 on the host (our machine).
#  blog-backend is the name of our image.


FROM node:20

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]