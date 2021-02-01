# twitter_clone

twitter clone coding with ReactJS and firebase styled w/Tailwind CSS

1. setup
    - npx create-react-app
        - modify config files
        - modify src
        - modify jsconfig.js for easy imports
    - install firebase via cdn
        - secure keys via environment variables (.env)
    - install tailwind CSS

2. structure app
    1. setup router
        - install react-router-dom
    2. setup components
        - App
        - Router
        - Navigator

3. Authentication
    - import firebase/auth
    - set newAccount ? logIn:signIn
        - set create account / login form via (email || facebook || ...)
        - set persistence
        - set initialize -> load page when login is verified
    - set social login
        - set provider
    - set log out

4. Tweet
    - setup form
    - setup database - cloud firestorage
        - import firebase/firestore
        - setup CRUD
    - check tweets, createdAt
    - check author
    


