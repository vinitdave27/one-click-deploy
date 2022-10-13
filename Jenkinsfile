pipeline {
  
  agent any

  stages {
    stage("build") {
      steps {
        echo "Building Twilio Serverless Functions..."
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
        dir("one-click-deploy-fns") {
          echo pwd()
          nodejs('Node-14.20.1') {
            sh "twilio login ${TWILIO_ACCOUNT_SID} --auth-token=${TWILIO_AUTH_TOKEN}"
            sh "twilio plugins:install @twilio-labs/plugin-serverless"
            sh "twilio serverless:deploy"
          }
        }
      }
    }
  }
}
