pipeline {
    agent any 	
	environment {
		DOCKERHUB_CREDENTIALS=credentials('f47bca7e-ea1c-4370-bcd5-a378d108b47a')


}
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage('Docker Build') {
          steps {
            sh "cd beffe ; ls ; sudo docker build -t ghcr.io/sreenidhize/beffe:latest ."
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | sudo docker login ghcr.io -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            sh "sudo docker push ghcr.io/sreenidhize/beffe:latest"
                }
            }
        }

        }        
        // stage('Deploy to GKE') {
        //     steps{
        //         sh "sed -i 's/hello:latest/hello:${env.BUILD_ID}/g' beffe-deployment.yaml"
        //         step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'beffe-deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
        //     }
        // }
    // }    