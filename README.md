
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://www.interviewbit.com">
    <img src="https://i0.wp.com/blog.interviewbit.com/wp-content/uploads/2017/11/cropped-logo-transparent4.png?ssl=1" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Interview Scheduler</h3>

  <p align="center">
    A Full Stack Interview Scheduler.
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

![screenshot](https://i.ibb.co/qjp7kwN/Capture.png)

This project is a part of an interview assignment assigned by InterviewBit.
The project is called Interview Scheduler. This scheduler is a solution to all the basic requirement of an interviewer. 

Here's what it does : 
✅ Schedule interviews.
✅ List all the Upcoming and Completed interviews.
✅ Validating each interview request.
✅ Sending emails on updation and creation of the interview.

### Built With

The project is a full stack. It is build on the latest front-end and back-end technologies: 
* [Tailwind CSS]
* [JQuery]
* [Laravel-Mix]
* [EJS Template]
* [NodeJS]
* [MongoDB]



<!-- GETTING STARTED -->
## Getting Started

Let's get started with the project. Follow the steps :

### Prerequisites

* You need to install MongoDB Atlas on your PC and create a database with your desired name and a collection within it with name **users**.
* Import the **users.json** file in the collection **users**.
* Create a `.env` file and put the following details in it. 
```sh
    COOKIE_SECRET = 'YOUR COOKIE SECRET'
    EMAIL = 'YOUR GMAIL ID'
    PASS = 'YOUR GMAIL PASSWORD'
    MONGO_URL = 'YOUR MONGODB URL'
```

### Installation

1. Run command to install all the dependencies
   ```sh
   yarn add
   ```
2. Run command to start the `laravel-mix wrapper`
   ```JS
   yarn watch
   ```
3. Run command to start the `server at PORT = 3000`
   ```JS
   yarn dev
   ```



<!-- USAGE EXAMPLES -->
## Usage

The project is useful for the interviewers who will to schedule the interviews for future and maintain a record of them.



<!-- CONTACT -->
## Contact

Abhishek Sheoran - abhisheksheoran2000@gmail.com
