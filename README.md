# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Deploying Docker Images

Open a new terminal and enter the following command to log in to your Docker Hub account:

$ docker login
Enter your username and password from Docker Hub and press the Return key or Enter.

Rebuild your image for Linux (to be able to deploy it to Google Cloud later), tag your image with your repository name (replace [USERNAME] with your Docker Hub username), and push it to the repository:

$ docker build --platform linux/amd64 -t blog-frontend .
$ docker tag blog-frontend [USERNAME]/blog-frontend
$ docker push [USERNAME]/blog-frontend
Navigate to backend/ in the terminal and repeat Step 6 for the blog-backend image:

$ cd backend/
$ docker build --platform linux/amd64 -t blog-backend .
$ docker tag blog-backend [USERNAME]/blog-backend
$ docker push [USERNAME]/blog-backend

## Deploying backend Docker image to Google Cloud Run

Go to https://console.cloud.google.com/.
In the search bar at the top, enter Cloud Run and select the Cloud Run – Serverless for containerized applications product.
Press the Create Service button to create a new service.
Note

You may need to first create a project before you can create a service. In that case, just follow the instructions on the website to create a new project with a name of your choice. Afterward, press the Create Service button to create a new service.

Enter [USERNAME]/blog-backend in the Container image URL box.
Enter blog-backend in the Service name box, select a region of your choice, leave CPU is only allocated during request processing selected, and select All – Allow direct access to your service from the Internet and Authentication – Allow unauthenticated invocations.
Expand the Container, Networking, Security section, scroll down to Environment variables, and click on Add Variable.
Name the new environment variable DATABASE_URL and, as the value, enter the connection string from MongoDB Atlas, which you saved earlier.

Note

For simplicity, we are using a regular environment variable here. To make variables that contain credentials more secure, it should instead be added as a secret, which requires enabling the Secrets API, adding the secret to the secret manager, and then referencing the secret and choosing it to be exposed as an environment variable.

Leave the rest of the options as the default options and press Create.
You will get redirected to the newly created service, where the container is currently being deployed. Wait until it finishes deploying, which can take up to a couple of minutes.
When the service finishes deploying, you should see a checkmark and a URL. Click the URL to open the backend and you will see our Hello World from Express! message, which means that our backend was successfully deployed in the cloud!

## Deploying the frontend Docker image to Cloud Run

For the frontend, we first need to rebuild the container to change the VITE_BACKEND_URL environment variable, which is statically built into our project. Let’s do that first:

Open a terminal and run the following command to rebuild the frontend with the environment variable set:

$ docker build --platform linux/amd64 --build-arg "VITE_BACKEND_URL=[URL]/api/v1" -t blog-frontend .
Make sure to replace [URL] with the URL to the backend service deployed on Google Cloud Run.

Tag it with your Docker Hub username and deploy the new version of the image to Docker Hub:

$ docker tag blog-frontend [USERNAME]/blog-frontend
$ docker push [USERNAME]/blog-frontend
Now, we can repeat similar steps as we did to deploy the backend to deploy our frontend as well:

Create a new Cloud Run service, enter [USERNAME]/blog-frontend in the Container image URL box and blog-frontend in the Service name box.
Pick a region of your choice and enable Allow unauthenticated invocations.
Expand Container, Networking, Security and change the container port from 8080 to 80.
Press Create to create the service and wait for it to be deployed.
Open the URL in your browser and you should see the deployed frontend. Adding and listing blog posts also works now by sending a request to the deployed backend, which then stores the posts in our MongoDB Atlas cluster.
