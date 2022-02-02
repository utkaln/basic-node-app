#!/usr/bin/env groovy
pipeline {
    agent any
    stages {
        stage("Copy Files to Ansible Server") {
            steps {
                script {
                    echo "Copying Files to Ansible Server"
                    sshagent(['ansible-server-key']){
                        sh "scp -o StrictHostKeyChecking=no ansible/* ec2-user@54.211.9.192:/home/ec2-user"
                        withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ansible-target', keyFileVariable: 'keyfile', usernameVariable: 'user')]){
                            sh "scp ${keyfile} ec2-user@54.211.9.192:/home/ec2-user/ssh-key.pem"
                        }
                    }
                }
            }
        }
    }
}
