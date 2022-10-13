pipeline {
  
  agent any

  stages {
    stage("build") {
      steps {
        echo "Building Twilio Serverless Functions..."
        echo "TWILIO API KEY: ${TWILIO_API_KEY}"
        nodejs('Node-14.20.1') {
            sh "npm install"
          }
      }
    }

    stage("test") {
      steps {
        echo "Testing Twilio Serverless Functions..."
      }
    }
    
    stage("deploy") {
      steps {
        echo "Deploying Twilio Serverless Functions..."
        echo "TWILIO API KEY: ${TWILIO_API_KEY}"
        dir("one-click-deploy-fns") {
          echo pwd()
          nodejs('Node-14.20.1') {
            sh "npm run deploy"
          }
        }
      }
    }
  }
}
