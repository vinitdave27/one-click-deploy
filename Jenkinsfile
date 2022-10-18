pipeline {
    agent any

    stages {
        stage("Serverless") {
            stages {
                stage("Build") {
                    steps {
                        echo "Building..."
                        dir("one-click-deploy-fns") {
                            echo pwd()
                            nodejs("Node-14.20.1") {
                                sh "twilio plugins:install @twilio-labs/plugin-serverless"
                                // sh "npm install"
                            }
                        }
                    }
                }
                stage("Test") {
                    steps {
                        echo "Testing..."
                        dir("one-click-deploy-fns") {
                            echo pwd()
                        }
                    }
                }
                stage("Deploy") {
                    steps {
                        echo "Deploying..."
                        dir("one-click-deploy-fns") {
                            echo pwd()
                            nodejs("Node-14.20.1") {
                                sh "twilio serverless:deploy --username=${TWILIO_ACCOUNT_SID} --password=${TWILIO_AUTH_TOKEN}  --override-existing-project --production"
                                // sh "npm run deploy" 
                            }
                        }
                    }
                }
            }
        }
        stage("Setup") {
            steps {
                echo "Configuring Envronment Post Serverless Deployment"
                script {
                    def matcher = manager.getLogMatcher(".*domain.*")
                    def domain
                    if(matcher.matches()) {
                        env.ONE_CLICK_DEPLOY_BASE_URL = matcher.group(0).replaceAll("\\s+", " ").split(" ")[1]
                    }
                }
                dir("one-click-deploy-fns") {
                    script {
                        if(fileExists(".twiliodeployinfo")) {
                            def twilioDeployInfo = readJSON(file:".twiliodeployinfo");
                            env.ONE_CLICK_DEPLOY_FNS_SERVICE_SID = twilioDeployInfo[TWILIO_ACCOUNT_SID].serviceSid
                        }
                    }
                }
            }
        }
        stage("Flex") {
            stages {
                stage("Build") {
                    steps {
                        echo "Building..."
                        dir("plugin-one-click-deploy") {
                            echo pwd()
                            nodejs("Node-14.20.1") {
                                sh "twilio plugins:install @twilio-labs/plugin-flex"
                                sh "npm install"
                                sh "twilio flex:plugins:build"
                            }
                        }
                    }
                }
                stage("Test") {
                    steps {
                        echo "Testing..."
                        dir("plugin-one-click-deploy") {
                            echo pwd()
                        }
                    }
                }
                stage("Deploy") {
                    steps {
                        echo "Deploying..."
                        dir("plugin-one-click-deploy") {
                            echo pwd()
                            nodejs("Node-14.20.1") {
                                sh "twilio flex:plugins:deploy --major --changelog 'One-Click-Deploy' --description 'Sample OOTB Twilio Flex Plugin"
                                script {
                                    def packageJSON
                                    if(fileExists("package.json")) {
                                        packageJSON = readJSON(file:"package.json");
                                    }
                                 }
                                 echo packageJSON.version
                                //sh "twilio flex:plugins:release --plugin example-plugin@1.0.0 --plugin additional-plugin@2.1.0 --name 'Example 1' --description 'Demonstrating use of twilio flex:plugins:release'"
                            }
                        }
                    }
                }
                stage("Post Deploy") {
                    steps {
                        echo "Post Deployment"
                    }
                }
            }
        }
    }
}