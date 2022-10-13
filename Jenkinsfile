pipeline {
  agent any
  
  stages {
    stage("build") {

      steps {
        dir("one-click-deploy-fns") {
          echo pwd()
          nodejs('Node-14.20.1') {
            sh "twilio version"
          }
          echo "this is build"
        }
      }
    }
    stage("test") {
      steps {
        echo "this is test"
      }
    }
    stage("deploy") {
      steps {
        echo "this is deploy"
      }
    }
  }
}
