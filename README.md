# Tech Challenge FIAP

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Customers](#customers)
  - [Products](#products)
  - [Orders](#orders)
- [Running Stress Tests](#running-stress-tests)
- [Contributing](#contributing)
- [License](#license)

## Overview
Tech Challenge FIAP is a self-service system for a fast-food restaurant, designed to manage orders and payments through a digital interface. The backend is built using Node.js, Express, and MongoDB, following a Hexagonal Architecture.

## Features
- Create, read, update, and delete customers and products.
- MongoDB integration for data storage.
- Dockerized for easy deployment.
- Endpoint to get products by category.
- Endpoint to list orders.
- Endpoint to perform a fake checkout.
- Scalability demonstrated using Kubernetes HPA and k6 for stress testing.

## Technologies
- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Docker**: Containerization platform.
- **Mongoose**: ODM for MongoDB.
- **Kubernetes**: Container orchestration.
- **k6**: Load testing tool.

## Getting Started

### Prerequisites
- Docker
- Docker Compose
- Minikube (for Kubernetes)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/JonissonGomes/tech-challenge-fiap.git
   cd tech-challenge-fiap
2. Create a .env file in the root directory and add the following variables:
   ```env
   MONGO_URI=mongodb://admin:admin@mongo:27017/techchallenge?authSource=admin
   PORT=3000

### Running the Application
1. Build and start the Docker containers:
   ```bash
   docker-compose up --build
2. Verify the application is running:
   ```bash
   docker-compose logs -f
3. Start Minikube:
   ```bash
   minikube start --driver=docker
4. Set kubectl context to Minikube:
   ```bash
   kubectl config use-context minikube
5. Apply Kubernetes manifests:
   ```bash
   kubectl apply -f .k8s/metrics.yaml
   kubectl apply -f .k8s/node-app-database.yaml
   kubectl apply -f .k8s/node-app.yaml
   kubectl apply -f .k8s/node-app-hpa.yaml
6. Verify the Kubernetes resources are running:
   ```bash
   kubectl get pods

### Running Stress Tests
1. Ensure you have the stress-test.js file.
2. Run the stress test:
   ```bash
   k6 run stress-test.js
3. Monitor HPA and pods:
   ```bash
   kubectl get hpa -w
   kubectl get pods -w

## API Endpoints

### Customers
- **Create Customer**
  - **POST** `/api/customers`
  - Body: `{ "cpf": "12345678900", "name": "John Doe", "email": "john.doe@example.com" }`

- **Get All Customers**
  - **GET** `/api/customers`

- **Get Customer by ID**
  - **GET** `/api/customers/:id`

- **Get Customer by CPF**
  - **GET** `/api/customers/cpf/:cpf`

- **Update Customer**
  - **PUT** `/api/customers/:id`
  - Body: `{ "name": "John Updated", "email": "john.updated@example.com" }`

- **Delete Customer**
  - **DELETE** `/api/customers/:id`

### Products
- **Create Product**
  - **POST** `/api/products`
  - Body: `{ "name": "Burger", "category": "Food", "description": "Tasty burger", "price": 5.99, "imageUrl": "http://example.com/burger.jpg" }`

- **Get All Products**
  - **GET** `/api/products`

- **Get Product by ID**
  - **GET** `/api/products/:id`

- **Get Products by Category**
  - **GET** `/api/products/category/:category`

- **Update Product**
  - **PUT** `/api/products/:id`
  - Body: `{ "name": "Burger", "category": "Food", "description": "Updated burger", "price": 6.99, "imageUrl": "http://example.com/burger.jpg" }`

- **Delete Product**
  - **DELETE** `/api/products/:id`

### Orders
- **List Orders**
  - **GET** `/api/orders`

- **Fake Checkout**
  - **POST** `/api/orders/checkout`
  - Body: `{ "items": [...], "total": 100.00 }`

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
3. Commit your changes:
   ```bash
   git commit -am 'Add new feature'
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
5. Create a new Pull Request.

## License
This project is licensed under the MIT License.
