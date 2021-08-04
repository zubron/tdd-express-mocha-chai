pipeline {
    agent {
        label 'fargate-workers'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'docker build . | tee /tmp/docker.output'
                script {
                    // Grep image ID from "Successfully built 6ca788eba7b9"
                    IMAGE_ID = sh(
                        script: 'cat /tmp/docker.output | grep "Successfully built" | cut -d" " -f3',
                        returnStdout: true
                    ).trim()
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh "docker run --rm ${IMAGE_ID} npm run test"
            }
        }
    }
    post {
        always {
            // collect and publish test result..'
            echo 'placeholder for collecting test results.'
        }
    }
}
