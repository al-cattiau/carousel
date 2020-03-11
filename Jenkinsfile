pipeline {
  agent {
    docker {
      image 'alpine'
    }

  }
  stages {
    stage('error') {
      agent {
        docker {
          image 'alpine'
        }

      }
      steps {
        input(message: 'm', id: 'k', ok: 'k')
      }
    }
  }
}