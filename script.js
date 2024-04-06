
let processCounter = 1;

let processes = [];

// Add Process Form Submission

document.getElementById('add-process-form').addEventListener('submit', function(e) {

  e.preventDefault();

  let arrivalTime = parseInt(document.getElementById('arrival-time').value);

  let burstTime = parseInt(document.getElementById('burst-time').value);

  processes.push({ id: processCounter++, arrivalTime, burstTime });

  updateProcessTable();

  document.getElementById('arrival-time').value = '';

  document.getElementById('burst-time').value = '';

});




  // Update Process Table

  function updateProcessTable()

    {

        let tableBody = document.getElementById('process-table').getElementsByTagName('tbody')[0];

        let newRow = tableBody.insertRow();

        let lastProcess = processes[processes.length - 1];

        newRow.innerHTML = `<td>${lastProcess.id}</td><td>${lastProcess.arrivalTime}</td><td>${lastProcess.burstTime}</td>`;

  }

// Select Algorithm Form Submission

    document.getElementById('select-algorithm-form').addEventListener('submit', function(e)

    {

        e.preventDefault();

        let algorithm = document.getElementById('algorithm').value;

        if (algorithm === 'fcfs')

        {

            let waitingTime = calculateWaitingTimeForFCFS();

            let turnaroundTime = calculateTurnaroundTimeForFCFS();//CHNGE DONE

            displayResult(waitingTime, turnaroundTime);

            drawGanttChart();

        }

        if (algorithm === 'sjf') 
        {

            let waitingTime = calculateWaitingTimeForSJF();

            let turnaroundTime = calculateTurnaroundTimeForSJF();

            displayResult(waitingTime, turnaroundTime);

            drawGanttChart();

        }
        if (algorithm === 'srtf') 
        {

            let waitingTime = calculateWaitingTimeForSRTF();

            let turnaroundTime = calculateTurnaroundTimeForSRTF();

            displayResult(waitingTime, turnaroundTime);

            drawGanttChart();

        }

        if (algorithm === 'rr') 
        {
            let timeQuantum = 5; // Time Quantum for Round Robin

            let waitingTime = calculateWaitingTimeForRR(timeQuantum);

            let turnaroundTime = calculateTurnaroundTimeForRR();

            displayResult(waitingTime, turnaroundTime);

            drawGanttChart();

        }

        if (algorithm === 'priority') 
        {

            let waitingTime = calculateWaitingTimeForPriority();

            let turnaroundTime = calculateTurnaroundTimeForPriority();

            displayResult(waitingTime, turnaroundTime);

            drawGanttChart();

        }


  // Add conditions for other algorithms if needed

    });

//---------------------------------------FCFS------------------------------------------------

   // Calculate Waiting Time for FCFS

   function calculateWaitingTimeForFCFS()

   {

    let totalWaitingTime = 0;
    let completionTime = processes[0].arrivalTime + processes[0].burstTime; // Completion time of the first process

    for (let i = 1; i < processes.length; i++)

    {
        totalWaitingTime += completionTime - processes[i].arrivalTime;
        completionTime += processes[i].burstTime; // Increment completion time by burst time of the current process
    }
    return totalWaitingTime / processes.length;

    }

   

    function calculateTurnaroundTimeForFCFS()   // Calculate Turnaround Time for FCFS

    {

        let totalTurnaroundTime = 0;
        totalTurnaroundTime += processes[0].burstTime;
        let waiting =0;
        let completionTime = processes[0].arrivalTime + processes[0].burstTime; // Completion time of the first process

        for (let i = 1; i < processes.length; i++)
        {
            waiting = completionTime - processes[i].arrivalTime; // Add waiting time
            totalTurnaroundTime += waiting +  processes[i].burstTime;
            completionTime += processes[i].burstTime; // Increment completion time by burst time of the current process
        }
    return totalTurnaroundTime / processes.length;

    }

   
  

   

//-----------------------------------SJF---------------------------------------    

    function calculateTurnaroundTimeForSJF() 
    {
        let totalTurnaroundTime = 0;
        let waitingTime = 0;
        let completionTime = 0;

        // Sort processes based on burst time
        processes.sort((a, b) => a.burstTime - b.burstTime);

        // Calculate waiting time and turnaround time for each process
        for (let i = 0; i < processes.length; i++) 
        {
            waitingTime += processes[i].arrivalTime - completionTime;
            completionTime += processes[i].burstTime;
            processes[i].waitingTime = waitingTime;
            processes[i].turnaroundTime = waitingTime + processes[i].burstTime;
            totalTurnaroundTime += processes[i].turnaroundTime;
    }

    return totalTurnaroundTime / processes.length;
    }

    function calculateWaitingTimeForSJF()
    {
        let totalWaitingTime = 0;
        let waitingTime = 0;
        let completionTime = 0;

        // Sort processes based on burst time
        processes.sort((a, b) => a.burstTime - b.burstTime);

        // Calculate waiting time and turnaround time for each process
        for (let i = 0; i < processes.length; i++) 
        {
            waitingTime += processes[i].arrivalTime - completionTime;
            completionTime += processes[i].burstTime;
            processes[i].waitingTime = waitingTime;
            processes[i].turnaroundTime = waitingTime + processes[i].burstTime;
            totalWaitingTime += waitingTime;
        }
    return totalWaitingTime / processes.length;
    }

//-----------------------------------------------RR-----------------------------------------
    function calculateWaitingTimeForRR(timeQuantum) 
    {
        let remainingTime = [];
        let waitingTime = 0;

        // Initialize remaining time for all processes
        for (let i = 0; i < processes.length; i++) {
            remainingTime.push(processes[i].burstTime);
        }

        let currentTime = 0;
        let queue = [];

        while (true) {
            let done = true;

            // Traverse all processes
            for (let i = 0; i < processes.length; i++) {
            if (remainingTime[i] > 0) {
                done = false;

                // If burst time is greater than time quantum, process for time quantum
                if (remainingTime[i] > timeQuantum) {
                currentTime += timeQuantum;
                remainingTime[i] -= timeQuantum;
                queue.push(i); // Move the process to the end of the queue
                } else {
                // If burst time is smaller than or equal to time quantum, process it completely
                currentTime += remainingTime[i];
                waitingTime += currentTime - processes[i].burstTime;
                remainingTime[i] = 0;
                }
            }
            }

            // If all processes are done
            if (done === true) {
            break;
            }

            // If there are processes in the queue, process them
            if (queue.length > 0) {
            let index = queue.shift();
            waitingTime += currentTime - processes[index].burstTime;
            remainingTime[index] = 0;
            }
        }

        return waitingTime / processes.length;
        // Implement waiting time calculation logic for RR algorithm

    }

    // Calculate Turnaround Time for RR
    function calculateTurnaroundTimeForRR(timeQuantum)
    {
        let remainingTime = [];
        let turnaroundTime = 0;

        // Initialize remaining time for all processes
        for (let i = 0; i < processes.length; i++) {
            remainingTime.push(processes[i].burstTime);
        }

        let currentTime = 0;
        let queue = [];

        while (true) {
            let done = true;

            // Traverse all processes
            for (let i = 0; i < processes.length; i++) {
            if (remainingTime[i] > 0) {
                done = false;

                // If burst time is greater than time quantum, process for time quantum
                if (remainingTime[i] > timeQuantum)
                {
                    currentTime += timeQuantum;
                    remainingTime[i] -= timeQuantum;
                    queue.push(i); // Move the process to the end of the queue
                } 
                else 
                {
                // If burst time is smaller than or equal to time quantum, process it completely
                    currentTime += remainingTime[i];
                    turnaroundTime += currentTime - processes[i].arrivalTime;
                    remainingTime[i] = 0;
                }
            }
            }

            // If all processes are done
            if (done === true) {
            break;
            }

            // If there are processes in the queue, process them
            if (queue.length > 0) 
            {
                let index = queue.shift();
                turnaroundTime += currentTime - processes[index].arrivalTime;
                remainingTime[index] = 0;
            }
        }

    return turnaroundTime / processes.length;
    }

//-------------------------------------PRIORITY-------------------------------
    function calculateWaitingTimeForPriority()
    {

        // Implement waiting time calculation logic for Priority Scheduling algorithm

    }
    function calculateTurnaroundTimeForPriority()
    {
        
    }
//------------------------------------SRTF--------------------------------
    function calculateWaitingTimeForSRTF() 
    {
      let totalWaitingTime = 0;
      let remainingTime = [];
      let completed = 0;
      let currentTime = 0;

      processes.forEach(process => {        
                                    remainingTime.push(process.burstTime);  });

      while (completed < processes.length) 
      {
        let shortest = processes.length - 1;
        for (let i = 0; i < processes.length; i++) 
        {
          if (processes[i].arrivalTime <= currentTime && remainingTime[i] < remainingTime[shortest] && remainingTime[i] > 0) 
          {
            shortest = i;
          }
        }
        remainingTime[shortest]--;
        currentTime++;

        if (remainingTime[shortest] === 0) 
        {
          completed++;
          totalWaitingTime += currentTime - processes[shortest].arrivalTime - processes[shortest].burstTime;
        }
      }

      return totalWaitingTime / processes.length;
    }

    function calculateTurnaroundTimeForSRTF() 
    {
        let totalTurnaroundTime = 0;
        let remainingTime = [];
        let completed = 0;
        let currentTime = 0;

        processes.forEach(process => {
            remainingTime.push(process.burstTime);
        });

        while (completed < processes.length) {
            let shortest = processes.length - 1;
            for (let i = 0; i < processes.length; i++) {
            if (processes[i].arrivalTime <= currentTime && remainingTime[i] < remainingTime[shortest] && remainingTime[i] > 0) {
                shortest = i;
            }
            }
            remainingTime[shortest]--;
            currentTime++;

            if (remainingTime[shortest] === 0) {
            completed++;
            totalTurnaroundTime += currentTime - processes[shortest].arrivalTime;
            }
        }

        return totalTurnaroundTime / processes.length;
    }


 // ----------------------------------------Calculate WAITING TIME FOR ALLLLLL ALGOOSS----------------------

    function calculateWaitingTime(algorithm)

    {

        let totalWaitingTime = 0;

        switch  (algorithm)

        {

            case 'fcfs':

                totalWaitingTime=calculateWaitingTimeForFCFS(); // FCFS algorithm: Waiting time is CT - BT - AT (Completion Time - Burst Time - Arrival Time)
                break;

            case 'sjf':
                
                totalWaitingTime = calculateWaitingTimeForSJF();
                break;

            case 'srtf':
    
                totalWaitingTime = calculateWaitingTimeForSRTF();  // SRTF algorithm: Waiting time is the difference between the completion time and the arrival time of each process.
                break;

            case 'rr':

                totalWaitingTime = calculateWaitingTimeForRR();     // RR algorithm: Waiting time is calculated differently based on the round robin logic.
                break;

            case 'priority':

                totalWaitingTime = calculateWaitingTimeForPriority();   // Priority Scheduling algorithm: Waiting time is calculated based on priority and arrival time.
                break;

        }

    return totalWaitingTime ;// Calculate average waiting time
    }

// ------------------------------------------------Calculate  TURN AROUND TIME FOR ALLLLLL ALGOOSS-----------------------------

function calculateTurnaroundTime(algorithm)

{

  let totalTurnaroundTime = 0;  // Turnaround time is the sum of waiting time and burst time for each process.
  switch (algorithm)
  {

    case 'fcfs':

        totalTurnaroundTime = calculateTurnaroundTimeForFCFS();
        break;

    case 'sjf':

        totalTurnaroundTime = calculateTurnaroundTimeForSJF();
        break;

    
    case 'srtf':
    
        totalTurnaroundTime = calculateTurnaroundTimeForSRTF();
        break;   
    

    case 'rr':
    
        totalTurnaroundTime = calculateTurnaroundTimeForRR();
        break;   
    

    case 'priority':
    
        totalTurnaroundTime = calculateTurnaroundTimeForPriority();
        break;   

    return totalTurnaroundTime ;// Calculate average turnaround time

    }
}


// Display Result

function displayResult(waitingTime, turnaroundTime) 
{

  document.getElementById("waiting-time").textContent = `Waiting Time: ${waitingTime}`;

  document.getElementById("turnaround-time").textContent = `Turnaround Time: ${turnaroundTime}`;

  document.getElementById("result-container").style.display = "block";

    if (waitingTime === calculateWaitingTimeForFCFS()) 
    {

        document.getElementById("waiting-time").textContent = `Waiting Time: ${calculateWaitingTimeForFCFS()}`; 
        document.getElementById("turnaround-time").textContent = `Turnaround Time: ${calculateTurnaroundTimeForFCFS()}`;

    }


    if (waitingTime === calculateWaitingTimeForSJF()) 
    {

        document.getElementById("waiting-time").textContent = `Waiting Time: ${calculateWaitingTimeForSJF()}`;
        document.getElementById("turnaround-time").textContent = `Turnaround Time: ${calculateTurnaroundTimeForSJF()}`;

    }

    if (waitingTime === calculateWaitingTimeForSRTF()) 
    {

        document.getElementById("waiting-time").textContent = `Waiting Time: ${calculateWaitingTimeForSRTF()}`;
        document.getElementById("turnaround-time").textContent = `Turnaround Time: ${calculateTurnaroundTimeForSRTF()}`;

    }

    if (waitingTime === calculateWaitingTimeForRR()) 
    {

        document.getElementById("waiting-time").textContent = `Waiting Time: ${calculateWaitingTimeForRR()}`;
        document.getElementById("turnaround-time").textContent = `Turnaround Time: ${calculateTurnaroundTimeForRR()}`;

    }

    if (waitingTime === calculateWaitingTimeForPriority()) 
    {

        document.getElementById("waiting-time").textContent = `Waiting Time: ${calculateWaitingTimeForPriority()}`;
        document.getElementById("turnaround-time").textContent = `Turnaround Time: ${calculateTurnaroundTimeForPriority()}`;

    }

}
   

    // Draw Gantt Chart
/*
    function drawGanttChart()

    {

            let ganttChart = document.getElementById('gantt-chart');

            let table = document.createElement('table');

            let headerRow = table.insertRow();

            headerRow.innerHTML = '<th>Process ID</th><th>Start Time</th><th>End Time</th>';

            let completionTime = processes[0].arrivalTime;

        // Initialize completion time with the arrival time of the first process

        for (let i = 0; i < processes.length; i++)

        {

            let row = table.insertRow();

            let idCell = row.insertCell();

            let startTimeCell = row.insertCell();

            let endTimeCell = row.insertCell();

            idCell.textContent = processes[i].id;

            startTimeCell.textContent = completionTime;

            completionTime += processes[i].burstTime; // Increment completion time by burst time of the current process

            endTimeCell.textContent = completionTime;

            row.classList.add('process'); // Apply 'process' class to the entire row

        }

    ganttChart.innerHTML = '';
    ganttChart.appendChild(table);

    }*/
    function drawGanttChart() 
    {
        let ganttChart = document.getElementById('gantt-chart');
        let table = document.createElement('table');
        let headerRow = table.insertRow();
        headerRow.innerHTML = '<th>Process ID</th><th>Start Time</th><th>End Time</th>';

        let completionTime = 0;
        let processOrder = []; // Array to hold the order of processes
        let algorithm = document.getElementById('algorithm').value;

        // Select processes order based on algorithm
        switch (algorithm) {
            case 'fcfs':
                processOrder = processes.slice().sort((a, b) => a.arrivalTime - b.arrivalTime);
                break;
            case 'sjf':
                processOrder = processes.slice().sort((a, b) => a.burstTime - b.burstTime);
                break;
            case 'srtf':
                // In SRTF, we need to simulate preemptive execution, so we will need to iterate through time
                let remainingTime = Array.from(processes, p => p.burstTime);
                while (processes.length > 0) {
                    let shortestIndex = -1;
                    let shortestTime = Infinity;
                    for (let i = 0; i < processes.length; i++) 
                    {
                        if (processes[i].arrivalTime <= completionTime && remainingTime[i] < shortestTime && remainingTime[i] > 0) {
                            shortestIndex = i;
                            shortestTime = remainingTime[i];
                        }
                    }
                    if (shortestIndex === -1) 
                    {
                        completionTime++;
                    } 
                    else 
                    {
                        let currentProcess = processes[shortestIndex];
                        let startTime = Math.max(completionTime, currentProcess.arrivalTime);
                        let endTime = startTime + 1;
                        completionTime = endTime;
                        remainingTime[shortestIndex]--;
                        if (remainingTime[shortestIndex] === 0) {
                            processes.splice(shortestIndex, 1);
                        }
                        let row = table.insertRow();
                        row.insertCell().textContent = currentProcess.id;
                        row.insertCell().textContent = startTime;
                        row.insertCell().textContent = endTime;
                    }
                }
                break;
            default:
                break;
        }

        // For FCFS and SJF, we can draw the Gantt chart directly from the sorted process order
        if (algorithm !== 'srtf') {
            processOrder.forEach(process => {
                let row = table.insertRow();
                let startTime = Math.max(completionTime, process.arrivalTime);
                let endTime = startTime + process.burstTime;
                completionTime = endTime;
                row.insertCell().textContent = process.id;
                row.insertCell().textContent = startTime;
                row.insertCell().textContent = endTime;
            });
        }

        ganttChart.innerHTML = '';
        ganttChart.appendChild(table);
    }


    // Draw Gantt chart when the page is loaded
    window.onload = drawGanttChart;
