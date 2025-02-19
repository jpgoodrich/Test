# to create docker image from this file
#   docker build -t blog-frontend .
# to run the front-end container
#    docker run -it -p 3000:80 blog-frontend

FROM node:20 AS build

# While the ARG instruction defines an environment variable that can be changed at build time using the --build-arg flag, the ENV 
# instruction sets the environment variable to a fixed value, which will persist when a container is run from the resulting image. 
# So, if we want to customize environment variables during build time, we should use the ARG instruction. However, if we want to 
# customize environment variables during runtime, ENV is better suited.
ARG VITE_BACKEND_URL=http://localhost:3030/api/v1

# Set the working directory to /build for the build stage
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

# create a static build of our Vite app
RUN npm run build

#  We use the FROM instruction again to create the final stage. This time, we base it off the nginx image, which runs an nginx web server:
FROM nginx AS final

# We set the working directory for this stage to /var/www/html, which is the folder that nginx serves static files from:
WORKDIR /usr/share/nginx/html

# Lastly, we copy everything from the /build/dist folder (which is where Vite puts the built static files) from the build stage into the final stage:
COPY --from=build /build/dist .