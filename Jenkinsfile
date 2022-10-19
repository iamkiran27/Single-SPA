pipeline {
    agent any 	
	environment {
		
		PROJECT_ID = 'deploy-project-id-1'
                CLUSTER_NAME = 'demo-cluster'
                LOCATION = 'us-central1-a'
                CREDENTIALS_ID = 'kubernetes'		
	}

	   
	   stage('Build Docker Image') { 
		steps {
		   sh 'whoami'
           sh 'cd beffe'
                   script {
		      myimage = docker.build("ghcr.io/sreenidhize/beffe:${env.BUILD_ID}")
                   }
                }
	   }
	   
           stage('Deploy to K8s') { 
                steps{
                   echo "Deployment started ..."
		   sh 'ls -ltr'
		   sh 'pwd'
           sh 'cd deployment'
		   sh "sed -i 's/tagversion/${env.BUILD_ID}/g' beffe-deployment.yaml"
                   step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, location: env.LOCATION, manifestPattern: 'beffe-deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
		   echo "Deployment Finished ..."
            }
	   }
    }
}