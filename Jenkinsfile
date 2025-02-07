pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout the repository containing your services and Docker Compose file
                git branch: 'main', url: 'https://github.com/lthaibinh/tech-blog-fe.git'
            }
        }
        stage('down docker-compose') {
            steps {
                script {
                    // Build Docker images for all services using Docker Compose
                    sh 'docker-compose down'
                }
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    // Build Docker images for all services using Docker Compose
                    sh 'docker-compose build'
                }
            }
        }
        stage('start docker-compose') {
            steps {
                script {
                    // Build Docker images for all services using Docker Compose
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
