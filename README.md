# 📝 Vi-Notes

Vi-Notes is a **MERN Stack** application that helps verify the authenticity of written content by analyzing how a document is written rather than just what is written. The platform monitors real-time writing behavior, detects pasted content, and generates an authenticity report based on various writing metrics.

## ✨ Features

* User Authentication
* Create, edit, save, and manage notes
* Real-time typing behavior tracking
* Detection of copied and pasted content
* Typing speed analysis
* Confidence Score generation
* Authentication Score generation
* Personalized feedback based on writing behavior
* Downloadable writing authenticity report

## Tech Stack

### Frontend

* React.js
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Other Tools

* Mongoose
* jsPDF (Report Generation)

## 📖 How It Works

1. Users sign in to the application.
2. A writing session begins when the user starts typing.
3. The system continuously records writing behavior such as:

   * Typing speed
   * Editing activity
   * Paste events
4. Once the session is complete, Vi-Notes analyzes the collected data.
5. An authenticity report is generated containing:

   * Confidence Score
   * Authentication Score
   * Typing statistics
   * Paste detection results
   * Overall feedback

## 📊 Generated Report

The report includes:

* Confidence Score
* Authentication Score
* Average Typing Speed
* Paste Detection Status
* Writing Statistics
* Personalized Feedback

## 📂 Project Structure

```text
Vi-Notes/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
├── README.md
└── package.json
```

## 🎯 Future Enhancements

* AI-assisted writing detection
* Advanced keystroke dynamics analysis
* Multi-document comparison
* Teacher/Admin dashboard
* Analytics dashboard

