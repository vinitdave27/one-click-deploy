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
                        fileOperations([fileDeleteOperation(excludes: '', includes: '.twiliodeployinfo')])
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
                    def serviceSidMatcher = manager.getLogMatcher(".*serviceSid.*")
                    println(serviceSidMatcher)
                    def serviceSid
                    println('Found serviceSid in the console output: '+ serviceSidMatcher.matches())
                    if(serviceSidMatcher.matches()) {
                        serviceSid = serviceSidMatcher.group(0)
                        println('Twilio Serverless Sid: '+ serviceSid)
                        env.ONE_CLICK_DEPLOY_SERVERLESS_SERVICE_SID = serviceSid
                    }
                }
            }
        }
    }
}
