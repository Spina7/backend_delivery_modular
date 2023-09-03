# Backend Delivery

Backend service for handling delivery operations.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running with Docker](#running-with-docker)
  - [Running Locally](#running-locally)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (Optional if you want to run with Docker)

### Running with Docker

1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Navigate to the project directory:
    ```bash
    Copy code
    cd backend-delivery

3. Build the Docker image:
    ```bash
    Copy code
    docker build -t node-delivery .

4. Run the Docker container:
    ```bash
    Copy code
    docker run --restart always -d -p 3000:3000 node-delivery

    