# Build a Docker image using the current directory's Dockerfile and tag it as 'node-delivery'
docker build -t node-delivery .

# Run a new container from the 'node-delivery' image
# The container will restart automatically if it stops
# It will run in detached mode (in the background)
# Port 3000 on the host is mapped to port 3000 inside the container
docker run --restart always -d -p 3000:3000 node-delivery
