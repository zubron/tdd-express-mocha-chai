pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                label 'fargate-workers'
            }
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            agent {
                label 'fargate-workers'
            }
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            agent {
                label 'fargate-workers'
            }
            steps {
                echo 'Deploying....'
            }
        }
    }
}
