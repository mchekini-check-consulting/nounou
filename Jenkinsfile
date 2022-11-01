node("ci-node") {
    stage("checkout") {
        checkout([$class: 'GitSCM', branches: [[name: '*/develop']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/mchekini-check-consulting/nounou-ui.git']]])
    }
    stage("build") {
        sh "npm install"
        sh "ng build --configuration production"
    }
    stage("build docker image") {
        sh "sudo docker build -t nounou ."
    }
    stage("push docker image") {

    }
    stage("deploy nounou ui") {

    }
}
