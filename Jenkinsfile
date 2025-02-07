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
        stage('Check Docker Network') {
            steps {
                script {
                    def networkExists = sh(
                        script: "docker network ls | grep -w blog-app-network || echo 'not_found'",
                        returnStdout: true
                    ).trim()

                    if (networkExists == "not_found") {
                        echo " 'blog-app-network' không tồn tại, tạo mới..."
                        sh "docker network create blog-app-network"
                    } else {
                        echo " 'blog-app-network' đã tồn tại!"
                    }
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
