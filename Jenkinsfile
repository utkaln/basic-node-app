#!/usr/bin/env groovy
pipeline {
    agent any
    parameters {
        string(name: 'ANSIBLE_SERVER_IP', defaultValue: '', description: 'IP of the EC2 instance')
    }
    stages {
        stage("Copy Files to Ansible Server") {
            steps {
                script {
                    echo "Copying Files to Ansible Server"
                    sshagent(['ansible-server-key']){
                        sh "scp -o StrictHostKeyChecking=no ansible/* ec2-user@${params.ANSIBLE_SERVER_IP}:/home/ec2-user"
                        withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ansible-target', keyFileVariable: 'keyfile', usernameVariable: 'user')]){
                           sh 'scp $keyfile ec2-user@$params.ANSIBLE_SERVER_IP:/home/ec2-user/ssh-key.pem'
                        }
                    }
                }
            }
        }

        stage("Execute ansible playbook") {
            steps {
                script {
                    echo "Executing ansible playbook on ansible server to deploy to EC2 instances"
                    def remoteObj = [:]
                    remoteObj.name = "ansible-server"
                    remoteObj.host = params.ANSIBLE_SERVER_IP
                    remoteObj.allowAnyHosts = true
                    withCredentials([sshUserPrivateKey(credentialsId: 'ansible-server-key', keyFileVariable: 'keyfile', usernameVariable: 'user')]) {
                        remoteObj.user = user
                        remoteObj.identityFile = keyfile
                        sshCommand remote: remoteObj, command: "ansible-playbook node-playbook.yaml"
                    }
                    
                }
            }
        }
    }
}
