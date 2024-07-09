pipeline {
  agent any

  environment {
    // Path to Python installation
    PYTHON = '/usr/bin/python3'
    // Add Python to PATH
    PATH = "/usr/bin/python3:${env.PATH}"
  }

  tools {
    nodejs 'NodeJS' // Name of the NodeJS tool configuration in Jenkins
  }

  stages {
    stage('Tool Install') {
      steps {
        script {
          def nodeHome = tool name: 'NodeJS', type: 'NodeJSInstallation'
          env.PATH = "${nodeHome}/bin:${env.PATH}"
        }
      }
    }

    stage('Checkout') {
      steps {
        git url: 'https://github.com/WaassimDev/proj-x-gsheet.git', branch: 'devops-integration'
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
          sh 'npm run sonar'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("myapp:${env.BUILD_ID}")
        }
      }
    }

    stage('Deploy Docker Container') {
      steps {
        script {
          dockerImage.run('-p 3000:3000')
        }
      }
    }
  }

  post {
    always {
      junit 'test-results/**/*.xml'
      archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
    }
    success {
      echo 'Build completed successfully'
    }
    failure {
      echo 'Build failed'
    }
  }
}