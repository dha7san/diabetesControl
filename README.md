# XO-GPT: Automated Bathroom-Based Diabetes Screening System

## Overview

**XO-GPT** is a smart healthcare monitoring system designed to detect potential diabetes risk using **non-invasive urine glucose screening integrated into a bathroom environment**.

The system automatically analyzes glucose levels from urine samples using IoT sensors and displays the results on a **web-based health dashboard**. This allows users to monitor glucose trends regularly without painful finger-prick blood tests.

This project aims to improve **early diabetes detection**, especially for elderly individuals and people who avoid regular testing due to discomfort or lack of access to healthcare.

---

## Problem Statement

Diabetes monitoring typically requires frequent blood tests using finger-prick methods, which can be painful and inconvenient. Because of this:

* Many people **skip regular glucose monitoring**
* **Early diabetes detection is often missed**
* Elderly individuals find testing difficult
* Rural populations have limited access to diagnostic tools
* Preventive healthcare becomes less effective

---

## Proposed Solution

XO-GPT introduces a **Smart Bathroom Diabetes Screening System** that automatically checks urine glucose levels during normal bathroom use.

Key idea:

* Detect glucose in urine using sensors
* Automatically capture readings
* Send data to a cloud system
* Display results on a health monitoring dashboard

This enables **passive daily screening** without requiring manual testing.

---

## Key Features

* Non-invasive diabetes screening using urine glucose detection
* IoT-based smart bathroom integration
* Automatic daily glucose monitoring
* Real-time health dashboard
* Glucose trend visualization
* Health alerts for abnormal readings
* User health profile tracking

---

## System Architecture

Smart Bathroom Sensor
↓
IoT Device (Sensor Controller)
↓
Backend API (Node.js / Express)
↓
Database (MongoDB)
↓
React Web Dashboard

---

## Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Recharts (Data Visualization)
* Axios (API Requests)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### IoT / Sensor Layer (Concept)

* Urine glucose detection sensor
* Optical color sensor
* ESP32 / Raspberry Pi

---

## Frontend Features

### Dashboard

Displays:

* Current glucose level
* Health status indicator
* Recent screening results
* Glucose trend graph

### Analytics

Provides:

* 30-day glucose trend
* Average glucose levels
* Risk indicators

### Alerts

Notifies users when abnormal glucose levels are detected.

Example alert:
⚠ High glucose detected. Please consult a doctor.

### Profile

Stores user information such as:

* Name
* Age
* Gender
* Family diabetes history

---

## Project Structure

frontend/
src/
components/
Navbar.jsx
HealthCard.jsx
GlucoseChart.jsx
AlertBox.jsx

pages/
Login.jsx
Dashboard.jsx
Analytics.jsx
Profile.jsx

services/
api.js

utils/
formatDate.js

App.jsx
main.jsx

---

## Demo Simulation

Since real sensors are not available during the hackathon, the system simulates IoT glucose readings.

The backend generates random glucose values between:

80 – 200 mg/dL

These values update the dashboard periodically to demonstrate how real sensor data would appear.

---

## Future Improvements

* Integration with real urine glucose sensors
* AI-based diabetes risk prediction
* Mobile application
* Doctor consultation integration
* Smart home health ecosystem integration

---

## Impact

XO-GPT aims to make diabetes screening **automatic, painless, and accessible**. By integrating monitoring into daily routines, it helps improve **early detection and preventive healthcare**.

---

This project is developed for educational and hackathon purposes.
