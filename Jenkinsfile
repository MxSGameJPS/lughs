pipeline {
    agent any
    environment {
        PRESET_NAME = "${env.BRANCH_NAME == "prod" ? "production" : "staging"}"
        SERVER_NAME = "${env.BRANCH_NAME == "prod" ? "no-server-yet" : "no-server-yet"}"
    }
    stages {
        stage('Build') {
            steps{
                script {
                    docker.build("lughworld/site:latest","--build-arg STAGE=${PRESET_NAME} -f Dockerfile .")                
                }
                sh 'docker save lughworld/site:latest | gzip > lughworld-site.tgz'
            }
            post {
                success {
                    archiveArtifacts 'lughworld-site.tgz'
                }
            }
        }
        stage('Deploy') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: "${SERVER_NAME}", 
                            verbose: true,
                            transfers: [
                                sshTransfer(
                                    remoteDirectory: '/root/build/lughworld-site', 
                                    sourceFiles: 'lughworld-site.tgz',
                                    execCommand: 'cd /root/build/lughworld-site && ./rebuild_all.sh', 
                                    execTimeout: 600000
                                )
                            ], 
                        )
                    ]
                )            
            }
        }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '3'))
        timeout(time: 120, unit: 'MINUTES')
    }
}