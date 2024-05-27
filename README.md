# 🖥️ Process Scheduler

Welcome to my **Web CPU Process Scheduler**! This project simulates various CPU scheduling algorithms and provides visual results, including average waiting and turnaround time, along with Gantt charts.

## 📋 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [CPU Scheduling Algorithms](#cpu-scheduling-algorithms)
- [Known Issues](#known-issues)
- [Contributing](#contributing)


## 👋 Introduction
Hello! Welcome to our **CPU Process Scheduler**. This scheduler has been implemented using HTML, CSS, and JavaScript to help visualize and understand different CPU scheduling algorithms.

## ✨ Features
- 👥 **First-Come, First-Served (FCFS)**
- 🕒 **Shortest Job First (SJF)**
- ⏳ **Shortest Remaining Time First (SRTF)**
- 🔄 **Round Robin (RR)**
- 🎖️ **Priority Scheduling**
- 📊 Visual results of average waiting and turnaround time
- 🖼️ Gantt charts for each scheduling algorithm

## 🚀 Getting Started

### Prerequisites
To run this project locally, you'll need:
- A modern web browser (e.g., Chrome, Firefox, Safari)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/22pt16/process-scheduler.git
    ```
2. Navigate to the project directory:
    ```bash
    cd process-scheduler
    ```

3. Open `index.html` in your preferred web browser:
    ```bash
    open index.html
    ```

## 🛠️ Usage
1. Open the **CPU Process Scheduler** in your web browser.
2. Select a scheduling algorithm from the provided options.
3. Input the required process details (arrival time, burst time, priority, etc.).
4. Click the "Schedule" button to view the results.
5. Visual results will display the average waiting time, turnaround time, and Gantt chart.

Or check out the project working from the deployment link: [https://22pt16.github.io/Process_Scheduler/](https://22pt16.github.io/Process_Scheduler/)

## 🧠 CPU Scheduling Algorithms

### 📌 First-Come, First-Served (FCFS)
Processes are scheduled in the order they arrive in the ready queue.

### ⏱️ Shortest Job First (SJF)
Processes with the shortest burst time are scheduled first.

### 🕒 Shortest Remaining Time First (SRTF)
Preemptive version of SJF where the process with the shortest remaining time is scheduled next.

### 🔄 Round Robin (RR)
Each process is assigned a fixed time slice (quantum) and processes are scheduled in a cyclic order.

### 🎖️ Priority Scheduling
Processes are scheduled based on their priority. Higher priority processes are scheduled first.

## 🐞 Known Issues
- There is currently an issue with the Round Robin (RR) Gantt charts. If you encounter any problems or have suggestions for improvement, please open an issue or contribute a fix.

## 🤝 Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

---

Thank you for exploring the **Web CPU Process Scheduler**! If you have any questions or feedback, feel free to open an issue.
Happy scheduling! 🕹️

---
