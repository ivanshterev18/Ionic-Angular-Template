# Ionic Angular Template

This is an authentication template using Ionic Angular

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

#### Server

After you clone successfully this repository:

- create `.env` file at root level - for example: 

    ```
    FIREBASE_CREDENTIALS=''
    SERVICE_ACCOUNT=''
    ORIGINS_WHITE_LIST=''
    ``` 

- open the terminal or bash at root level of the server and run the following command:

  ```sh
  $ npm install
  ```

#### Client

##### Having successfully run the server, you can run the application

- navigate to the `ionic` folder

- open the terminal and run the following command:

  ```sh
  $ npm install
  ```

- navigate to the `environments` folder and add your web app's Firebase configuration

## Overview

### Sign In Component

Methods: 
- `async signIn()`

  - Takes email and password from the getters and check if the email is verified and if it is not shows an info alert and continue with getUserData() method which get the user data from the backend and then navigate to home page.

- `private async showErrorAlert(message: string)`

  - Takes message as an argument and shows an error alert.

- `private async showInfoAlert()`

  - Shows an info alert.

### Sign Up Component

Methods: 

- `async signUp()`

  - Takes an email and password from getters and if there is no error calls auth service's sign up method to add the user.

- `private async showErrorAlert(message: string)`

  - Takes message as an argument and shows an error alert.

- `private async showInfoAlert()` 

  - Shows an info alert.

### Forgot Password Component

Methods: 

- `async sendEmail()`

  - Takes an email from getter and sends reset password email to it.

### Verify Email Component

Methods: 

- `constructor`

  - Checks query params and if they contain actionCode calls auth service's verifyEmail method to verify this actionCode.

### Auth Service

Methods: 

- `async createUser(wallet: string, uid: string, email: string)`

  - Makes a POST request to backend api to add a user.

- `async getUserData()`

  - Makes a GET request to backend api to retrieve the user's data;

- `async signUp(email: string, password: string)`

  - Takes the current user by `firebase.auth().createUserWithEmailAndPassword(email, password)` method.

  - Sends email verification to the current user.

  - Creates random wallet and encrypts it with the user's password.

  - Retrieves user's data by getUserData method and updates the subject with that user's data.

- `async checkUserEmailVerified(email: string, password: string)`

  - Signs in the user and checks if the user's email has been verified and returns true of false.

- `async verifyPasswordResetCode(code: string)`

  - Takes the code as an argument and verifies it.

- `async resetPassword(newPassword: string, code: string, email: string)`

  - Verifies the code and the password.

  - Creates new wallet and encrypts it with the new password.

  - Updates the user with `resetWallet` method.

- `async resetWallet(uid: string, wallet: string)`

  - Makes a PUT request to update a user with new wallet.

- `async logout()`

  - Removes the user from the local storage.

  - Updates the user's subject with null.

  - Calls firebase's sign out method.

- `async sentResetPasswordEmail(email: string)`

  - Calls firebase's built in `sendPasswordResetEmail` method.

- `async verifyEmail(actCode: string)`

  - Calls firebase's built in applyActionCode method with the actCode as an argument.

  - Calls `logout()` method.


## Built With

* [Ionic Framework](https://ionicframework.com/) - UI toolkit for building high-quality mobile and desktop apps using web technologies.
* [Angular](https://angular.io/) - App-design framework and development platform for creating single-page apps.
* [Express](https://expressjs.com/) - Minimal and flexible Node.js web application framework 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
- async sentResetPasswordEmail(email: string) {
    await firebase.auth().sendPasswordResetEmail(email);
  }
