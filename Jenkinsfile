pipeline {
    agent any 	
	environment {
		DOCKERHUB_CREDENTIALS=credentials('f47bca7e-ea1c-4370-bcd5-a378d108b47a')
        PROJECT_ID = 'deploy-project-id-1'
        CLUSTER_NAME = 'demo-cluster'
        LOCATION = 'us-central1-a'
        CREDENTIALS_ID = 'gke'


}
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage('Docker Build') {
          steps {
            sh "cd beffe ; ls ; docker build -t ghcr.io/sreenidhize/beffe:${env.BUILD_ID} ."
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login ghcr.io -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            sh "docker push ghcr.io/sreenidhize/beffe:${env.BUILD_ID}"
                }
            }
        // stage("Checkout code") {
        //     steps {
        //         checkout scm
        //     }
        // }
        stage('Deploy to GKE') {
            steps{
                sh "kubectl set image deployment/singlespa-beffe-service singlespa-beffe-service=ghcr.io/sreenidhize:${env.BUILD_ID}"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
   }
}
