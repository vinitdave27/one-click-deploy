pipeline {
    agent any

    stages {
        stage('Serverless Build') {
            steps {
                echo 'Building Twilio Serverless Functions...'
                dir("one-click-deploy-fns") {
                    echo pwd()
                    nodejs('Node-14.20.1') {
                        // sh "twilio plugins:install @twilio-labs/plugin-serverless"
                        sh "npm install"
                        //fileOperations([fileDeleteOperation(excludes: '', includes: '.twiliodeployinfo')])
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
                dir("one-click-deploy-fns") {
                    echo pwd()
                    sh "printenv | sort"
                    nodejs('Node-14.20.1') {
                        // sh "twilio serverless:deploy --username=${TWILIO_ACCOUNT_SID} --password=${TWILIO_AUTH_TOKEN}"
                        sh "npm run deploy"
                    }
                }
            }
        }
        stage("Serverless Post Deploy") {
            steps {
                echo "Post Twilio Serverless Functions Deployment..."
                script {
                    def domainMatcher = manager.getLogMatcher(".*domain.*")
                    println(domainMatcher)
                    def domain
                    println('Found Domain in the console output: '+ domainMatcher.matches())
                    if(domainMatcher.matches()) {
                        domain = domainMatcher.group(0).replaceAll("\\s+", " ").split(' ')[1]
                        println('Twilio Serverless Domain: '+ domain)
                        env.ONE_CLICK_DEPLOY_FUNCTIONS_BASE_URL = domain
                    }
                    echo pwd()
                    if(fileExists("/var/jenkins_home/workspace/one-click-deploy/one-click-deploy-fns/.twiliodeployinfo")) {
                        def serverlessDeployInfo = readJSON(file: '/var/jenkins_home/workspace/one-click-deploy/one-click-deploy-fns/.twiliodeployinfo')
                        echo serverlessDeployInfo[TWILIO_ACCOUNT_SID].serviceSid
                        env.ONE_CLICK_DEPLOY_SERVICE_SID = serverlessDeployInfo[TWILIO_ACCOUNT_SID].serviceSid
                    }
                }

            }
        }
        stage("Environment Post Serverless Deployment") {
          steps {
            sh "printenv | sort"
          }
        }
    }
}
