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
        sh "sudo docker login -u mchekini -p jskabyliE"
        sh "sudo docker tag nounou mchekini/nounou:1.0"
        sh "sudo docker push mchekini/nounou:1.0"
    }
    node("integration-node") {
        stage("deploy nounou ui") {
          println "je m'execute sur le bon node"
        }
    }

}
