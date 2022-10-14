pipeline {
  
  agent any

  stages {
    stage("Serverless Build") {
      steps {
        echo "Building Twilio Serverless Functions..."
        echo "TWILIO API KEY: ${TWILIO_API_KEY}"
        dir("one-click-deploy-fns") {
          echo pwd()
          nodejs('Node-14.20.1') {
            sh "npm install"
          }
        }
      }
    }

    stage("Serverless Test") {
      steps {
        echo "Testing Twilio Serverless Functions..."
      }
    }
    
    stage("Serverless Deploy") {
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

    stage("Serverless Post Deploy") {
      steps {
        echo "Executing Post Deploy script..."
        script {
          def domainMatcher = manager.getLogMatcher(".*domain.*")
          def serverlessDomain
          println('Found Domain in the console output:', domainMatcher.matches())
          if(domainMatcher.matches()) {
              serverlessDomain = domainMatcher.group(0).replaceAll("\\s+", " ").split(' ')[1]
              println('Twilio Serverless Domain: ', serverlessDomain)
              env.ONE_CLICK_DEPLOY_FUNCTIONS_BASE_URL = serverlessDomain
          }
        }
      }
    }

        stage("Plugin Build") {
      steps {
        echo "Executing plugin build script..."
        echo "ONE_CLICK_DEPLOY_FUNCTIONS_BASE_URL: ${env.ONE_CLICK_DEPLOY_FUNCTIONS_BASE_URL}"
      }
    }
  }
}
