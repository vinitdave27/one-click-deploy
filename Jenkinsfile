pipeline {
  agent any
  
  stages {
    stage("build") {

      steps {
        dir("one-click-deploy-fns") {
          echo pwd()
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
