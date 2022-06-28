# Headline
## AnonymousFeedback

This repo stands for the project of the subject in Innopolis University "Software Project"

---
Team members: 
* Arsen Mutalapov
* Chibuoyim Ogbonna Faith Wilson
* Rail Sayfeev
* Maksim Baranov
* Elizaveta Arzamasova


# Project Description

## About this project
* The main goal of this project was to allow students anonymously send their opinion to a teacher during a class.
* This is an implementation of web application for creating and managing anonymous feedback sessions. 
* It has simple and user-friendly interface as well as clear functionality. Teacher can start collecting feedback immediately enterging as a guest. 
* Students can send feedback in a text and emoji format with choosen delay after following the link or entering 3 symbol code word on the main page. 
* Among functional requirements for our project from a customer were: instant messaging, sound notifications, ability to refresh the page without lose of data in a guest mode, have a generated link to share a specific session, ability to enter to the session with the short code word.

## Demo
Video with testing [MVP 1](https://youtu.be/RfRrq97B8vw).

## How to use
Basically, there are the most essintial page: Dashboard for a teacher and Feedback page for students. 
* On the first, a teacher can copy the link for sharing, see incoming messages, fill in his/her name and the title of feedback session.
* On the second one, students can see who will receive messages, input feedback, choose emoji indicating the level of satisfaction, and choose the delay of sending the message.
## Features 
1. **Anonymity**: Some students might not be very comfortable sharing details about classes openly, so the project will help them easily and anonymously write whatever they want to a teacher and be heard.

2. **Instant feedback**: Teachers will be able to get immediate feedback from students to make sure no one is left behind during the period of their course.

3. **Guest account**: Teachers do not need to sign in the application to obtain feedback. All they have to do is to click on *Guest* button and get a link for the students to receive feedback.

4. **Sound notifications**: Teachers are able to receive instant sound alerts when feedback is given by students, this helps them react to feedback immediately.

5. **Satisfactory criterion**: Additionally, classes can be rated by students using emojis indicating the level of satisfaction.

# Installation
> Make sure you have installed recommended verion of [NodeJS](https://nodejs.org/en/).

```
git clone https://github.com/InnoSWP/AnonymousFeedback.git
cd AnonymousFeedback
npm install
npm run buildTeacher
npm run buildFeedback
npm start
```

## Technology Stack
* JavaScript
* Socket.IO and Socket.IO-client
* Node JS Express server
* HTML + CSS
* MongoDB with mongoose handling

![example workflow](https://github.com/InnoSWP/AnonymousFeedback/actions/workflows/node.js.yml/badge.svg)

# Licence
See [MIT License](LICENSE) for details.
> Copyright (c) 2022 InnoSWP
