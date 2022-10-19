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
        stage("Checkout code2") {
            steps {
                checkout scm
            }
        }
        stage('Deploy to GKE') {
            steps{
                sh "cd deployment ; ls ; sed -i 's/beffe:tagversion/beffe:${env.BUILD_ID}/g' beffe-deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'beffe-deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
                sh 'kubectl get pods'  
            }
        }

//         {
//         stage('List pods') {
//            withKubeConfig([credentialsId: 'gke']) {
//               sh 'curl -LO "https://storage.googleapis.com/kubernetes-release/release/v1.20.5/bin/linux/amd64/kubectl"'  
//               sh 'chmod u+x ./kubectl'  
//               sh './kubectl get pods'
//     }
//   }
// }
   }
}
