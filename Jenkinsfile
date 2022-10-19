pipeline {
    agent any 	
	environment {
		
		PROJECT_ID = 'deploy-project-id-1'
                CLUSTER_NAME = 'demo-cluster'
                LOCATION = 'us-central1-a'
                CREDENTIALS_ID = 'kubernetes'		
}
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Build image") {
            steps {
                script {
                    sh "cd beffe"
                    myapp = docker.build("gcr/deploy-project-id-1/hello:${env.BUILD_ID}")
                }
            }
        }

        }        
        stage('Deploy to GKE') {
            steps{
                sh "sed -i 's/hello:latest/hello:${env.BUILD_ID}/g' beffe-deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'beffe-deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }    