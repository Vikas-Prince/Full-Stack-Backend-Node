# Backend Application - MERN Stack with DevOps Integration

Welcome to the backend repository for the MERN stack project! This repository contains the source code for a RESTful API built with **Node.js**, **Express.js**, and **MongoDB**. The application is designed to interact with a **sharded MongoDB cluster** and supports real-time data handling. This repository also includes CI/CD pipeline configurations and Dockerization to ensure smooth and automated deployment.

## Overview

This project follows a modular approach where each layer of the application is handled separately, providing individual deployments for the **Backend**, **Frontend**, and **Database**. The backend communicates with a MongoDB Sharded Cluster and is fully integrated with **DevOps tools** for continuous integration and continuous delivery.

Key components of this project:

- **Node.js / Express.js**: Backend API
- **MongoDB**: Sharded Cluster (deployed on Kubernetes)
- **CI/CD Pipeline**: Jenkins for automation, SonarQube for code quality checks
- **Containerization**: Docker for backend application
- **Deployment**: Managed through **ArgoCD** and **GitOps** for Kubernetes deployment.

## Project Structure

This repository is focused solely on the backend application. For the other parts of the infrastructure, please refer to the following repositories:

- [**MongoDB Configuration and K8s Setup**](https://github.com/Vikas-Prince/mongo-sharded-cluster-on-k8s)
- [**Frontend Application**](https://github.com/Vikas-Prince/Food-Delivery-Frontend-React)
- [**GitOps Repository** (ArgoCD)](https://github.com/Vikas-Prince/Food-Delivery-GitOps)

### Backend Repository

The **Backend** repository contains:

- **Application Code**: RESTful APIs built using Node.js and Express.js.
- **Dockerfile**: Used to Dockerize the application for consistent deployment across environments.
- **Jenkinsfile**: Automation script for the Jenkins CI/CD pipeline that runs:
  - Unit and integration tests
  - Trivy scan for security vulnerabilities in dependencies and Docker images
  - SonarQube code quality checks and quality gates
  - Docker image build and vulnerability scans
  - Pushing the image to Docker Hub
  - Automating update docker tags into GitOps repository
  - Email notification along with Build status, Build logs, and Reports

## Features

### 1. **RESTful API Development**

- Designed and implemented real-time API endpoints using **Node.js** and **Express.js**.
- MongoDB database interactions are optimized for scalability and performance.

### 2. **Dockerization**

- The backend application is packaged as a **Docker image** for portability and consistency across development, testing, and production environments.
- Docker image is built and scanned for vulnerabilities during the CI pipeline.

### 3. **Continuous Integration and Deployment (CI/CD)**

- **Jenkins** is used to automate the build, test, and deployment pipeline.
- Security scans are implemented with **Trivy** to check both the filesystem and Docker images.
- **SonarQube** is integrated to analyze code quality and enforce quality gates before allowing further deployment.
- The backend application is pushed to **Docker Hub** after a successful build and test process.

### 4. **Deployment Automation**

- The deployment of the backend API is fully automated through **ArgoCD** using GitOps principles.
- Once the Docker image is pushed, ArgoCD automatically triggers the deployment in the Kubernetes cluster (EKS).
- The application is accessible via a LoadBalancer URL, which will be shared for frontend integration.

## Setup Instructions

### Prerequisites

To get this project running locally or in a development environment, you need:

- **Node.js** (v18 or above)
- **MongoDB** (Sharded Cluster Setup)
- **Docker** (for containerization)
- **Jenkins** (for CI/CD pipeline)
- **SonarQube** (for code quality checks)
- **Trivy** (for vulnerability scanning)
- **ArgoCD** (for GitOps deployment)
- **Kubernetes (EKS)** (for production deployment)

### Clone the repository:

```bash
git clone <Backend_Repo_Link>
cd <Repository_Directory>
```

### Deployment with ArgoCD

Once the application is built and pushed to the Docker registry, it is automatically deployed to **Kubernetes (EKS)** using **ArgoCD**. The deployment is managed as part of the GitOps workflow, which ensures that the deployed application is always in sync with the code in the repository.

1. **Automated Deployment**:
   - After the successful completion of the Jenkins pipeline (including Docker image build and scan), the updated application is pushed to the **GitOps repository**.
   - **ArgoCD** watches for changes in this GitOps repository and automatically applies those changes to the Kubernetes cluster.
2. **Kubernetes Deployment**:

   - The backend application is deployed on a Kubernetes cluster (EKS).
   - ArgoCD ensures that all configurations, such as services, deployments, and ingress resources, are correctly applied and maintained in the cluster.
   - ArgoCD continuously syncs the state of the deployed application with the Git repository to guarantee consistency and track any changes made.

3. **Accessing the Application**:

   - Once the backend API is successfully deployed to the Kubernetes cluster, a **LoadBalancer URL** will be provided.
   - This URL is used for frontend integration, enabling communication between the frontend and backend applications.

   > **Note**: Please refer to the [GitOps Repository](https://github.com/Vikas-Prince/Food-Delivery-GitOps) for detailed instructions on the ArgoCD setup and EKS deployment configuration.

### Accessing the Application

After the backend API is deployed successfully via ArgoCD, you will be able to access the application using the **LoadBalancer URL**. This URL will be provided as part of the deployment process and can be used to connect the frontend application to the backend.

> The frontend repository will consume this API by calling the appropriate endpoints via the provided URL. Please refer to the [Frontend Application Repository](https://github.com/Vikas-Prince/Food-Delivery-Frontend-React) for more details on how to connect with the backend.

---

## References

- For more information on **MongoDB Sharded Cluster setup**, refer to the [MongoDB Kubernetes Configuration Repository](https://github.com/Vikas-Prince/mongo-sharded-cluster-on-k8s/).
- For frontend integration and details, refer to the [Frontend Application Repository](https://github.com/Vikas-Prince/Food-Delivery-Frontend-React).
- For **ArgoCD** and **GitOps** setup, refer to the [GitOps Repository](https://github.com/Vikas-Prince/Food-Delivery-GitOps).

## Contributing

Feel free to contribute to this repository! Open a pull request or create an issue if you find a bug or have suggestions for improvements.
