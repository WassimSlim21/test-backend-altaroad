pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        SONAR_TOKEN = credentials('sonarqube-api')
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
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://localhost:9000 \
                      -Dsonar.login=$SONAR_TOKEN
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-node-app .'
            }
        }

        stage('Deploy Docker Container') {
            steps {
                sh 'docker run -d -p 3000:3000 my-node-app'
            }
        }
    }
}