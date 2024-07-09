pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('<sonar-token-credential-id>')
        DOCKER_REGISTRY = '<docker-registry-url>'
        IMAGE_NAME = 'my-node-app'
        CONTAINER_PORT = 3000
    }

    tools {
        nodejs 'NodeJS' // Ensure 'NodeJS' matches the NodeJS installation defined in Jenkins global tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'devops-integration', url: 'https://github.com/WaassimDev/proj-x-gsheet.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                    sonar-scanner \
                      -Dsonar.projectKey=my-node-app \
                      -Dsonar.projectName=My Node App \
                      -Dsonar.projectVersion=1.0 \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://localhost:9000 \
                      -Dsonar.login=$SONAR_TOKEN
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}")
                    dockerImage.push()
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                sh 'docker run -d -p ${CONTAINER_PORT}:${CONTAINER_PORT} ${DOCKER_REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER}'
            }
        }
    }

    post {
        success {
            echo 'Pipeline successfully executed! Deployment complete.'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}