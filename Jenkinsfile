pipeline {
    agent {
        label 'fargate-workers'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'docker --version'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
