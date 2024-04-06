      //document.addEventListener('DOMContentLoaded', function() {

      function addProcessFields() 
      {
          const processCount = parseInt(document.getElementById('process-count').value);
          const processFieldsDiv = document.getElementById('process-fields');
          processFieldsDiv.innerHTML = '';
      
          for (let i = 1; i <= processCount; i++) 
          {
              const processDiv = document.createElement('div');
              const arrivalLabel = `<label for="arrival-time-${i}"><b>PROCESS ${i}</b> </label>`;
              const inputs = `
                  <label for="arrival-time-${i}"> Arrival Time:</label>
                  <input type="number" id="arrival-time-${i}" class="arrival-time">
                  <label for="burst-time-${i}">Burst Time:</label>
                  <input type="number" id="burst-time-${i}" class="burst-time">
                  <br>
                  <label for="priority-${i}">Priority:</label>
                  <input type="number" id="priority-${i}" class="priority">
              `;
              processDiv.innerHTML = arrivalLabel + inputs;
              processFieldsDiv.appendChild(processDiv);
          }
      }
      
      function toggleTQ() 
      {
          const algorithm = document.getElementById('algorithm').value;
          const TQInput = document.getElementById('time-quantum');
      
          if (algorithm === 'rr') 
          {
              TQInput.disabled = false;
          }
          else 
          {
              TQInput.disabled = true;
          }
      }

      function runAlgorithm() 
      {
          const algorithm = document.getElementById('algorithm').value;
          let resultClass = '';
      
          switch (algorithm) 
          {
              case 'fcfs':
                  resultClass = 'result-fcfs';
                  runFCFS();
                  break;
      
              case 'sjf':
                  resultClass = 'result-sjf';
                  runSJF();
                  break;
      
              case 'rr':
                  resultClass = 'result-rr';
                  const TQ = parseInt(document.getElementById('time-quantum').value);
                  runRR(TQ);
                  break;
      
              case 'srtf':
                  resultClass = 'result-srtf';
                  runSRTF(); // Call the SRTF function
                  break;
      
              case 'priority':
                  resultClass = 'result-priority';
                  runPriority();
                  break;
      
          }
      
          document.getElementById('result').className = resultClass;
         
             
      }
      //------------------------------FUNCTIONSS-------------------    
      
      //-------------1. FCFS--------------
      function runFCFS() 
      {
          const arrivalTimes = document.querySelectorAll('.arrival-time');
          const burstTimes = document.querySelectorAll('.burst-time');
          let contextSwitch=0;
          let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
          if( c !== 0)
            {
                contextSwitch=c;
            }
          // INITIALISE VARIABLESS
          let totaltime = 0;
          let waitng = 0;
          let tatime = 0;
          let executionorder = [];
         // Create an array to hold objects representing processes
          const processes = [];

          for (let i = 0; i < arrivalTimes.length; i++) 
          {
              processes.push({
                  arrivalTime: parseInt(arrivalTimes[i].value),
                  burstTime: parseInt(burstTimes[i].value),
                  process: i + 1
                  });
          }
          // Sort processes based on their arrival times
          processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
      
          // Execute processes in FCFS order
          for (const process of processes) 
          {
              const completionTime = Math.max(process.arrivalTime, totaltime) + process.burstTime +  contextSwitch;
              const waiting = Math.max(0, totaltime - process.arrivalTime);
              waitng += waiting;
              tatime += completionTime - process.arrivalTime;
              totaltime = completionTime;
      
              executionorder.push({ process: process.process, waiting });
          }
      
          // Call the FCFS-specific Gantt chart generation function
        
      
          const avgWT = waitng / arrivalTimes.length;
          const avgTAT = tatime / arrivalTimes.length;
          displayResults(executionorder, avgWT, avgTAT);
      }
      
      
      //-------------2. SJF--------------
      function runSJF() 
      {
          const arrivalTimes = document.querySelectorAll('.arrival-time');
          const burstTimes = document.querySelectorAll('.burst-time');
          let contextSwitch=0;
          let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
          if( c !== 0)
            {
                contextSwitch=c;
            }
          let totaltime = 0;
          let waitng = 0;
          let tatime = 0;
          let executionorder = [];
      
          // Convert  and sort processes by burst time
          const processes = Array.from(burstTimes).map((b, index) => ({
              process: index + 1,
              arrivalTime: parseInt(arrivalTimes[index].value),
              burstTime: parseInt(b.value)
          })).sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime);
      
          for (const process of processes) 
          {
              const completionTime = Math.max(process.arrivalTime, totaltime) + process.burstTime+contextSwitch;
              const waiting = Math.max(0, totaltime - process.arrivalTime);
              waitng += waiting;
              tatime += completionTime - process.arrivalTime;
              totaltime = completionTime;
      
              executionorder.push({ process: process.process, waiting });
          }
      
          const avgWT = waitng / processes.length;
          const avgTAT = tatime / processes.length;
          displayResults(executionorder, avgWT, avgTAT);
      }
      
      //-------------3. RR--------------
      function runRR(TQ) 
      {
          const arrivalTimes = document.querySelectorAll('.arrival-time');
          const burstTimes = document.querySelectorAll('.burst-time');
          let contextSwitch=0;
          let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
          if( c !== 0)
            {
                contextSwitch=c;
            }
          let totaltime = 0;
          let waitng = 0;
          let tatime = 0;
          let executionorder = [];
      
          const processes = Array.from(burstTimes).map((b, index) => ({
              process: index + 1,
              arrivalTime: parseInt(arrivalTimes[index].value),
              burstTime: parseInt(b.value),
              remainingBurstTime: parseInt(b.value)
          }));
      
          while (processes.some(process => process.remainingBurstTime > 0)) 
          {
              for (const process of processes) 
              {
                  if (process.remainingBurstTime === 0) continue;
                  const quantum = Math.min(TQ, process.remainingBurstTime);
                  const completionTime = Math.min(process.arrivalTime + totaltime + quantum, totaltime + process.remainingBurstTime)+contextSwitch;
                  const waiting = Math.max(0, totaltime - process.arrivalTime);
                  waitng += waiting;
                  tatime += completionTime - process.arrivalTime;
                  totaltime = completionTime;
      
                  executionorder.push({ process: process.process, waiting });
      
                  process.remainingBurstTime -= quantum;
              }
          }
      
          const avgWT = waitng / processes.length;
          const avgTAT = tatime / processes.length;
          displayResults(executionorder, avgWT, avgTAT);
      }
      
      //-------------4. SRTF--------------
      function runSRTF() 
      {
                  const arrivalTimes = document.querySelectorAll('.arrival-time');
                  const burstTimes = document.querySelectorAll('.burst-time');
                  let contextSwitch=0;
                  let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
                  if( c !== 0)
                    {
                        contextSwitch=c;
                    }
                  let totaltime = 0;
                  let waitng = 0;
                  let tatime = 0;
                  let executionorder = [];
      
                  // Convert NodeList to array and sort processes by remaining burst time
                  const processes = Array.from(burstTimes).map((burstTime, index) => ({
                      process: index + 1,
                      arrivalTime: parseInt(arrivalTimes[index].value),
                      burstTime: parseInt(burstTime.value),
                      remainingBurstTime: parseInt(burstTime.value)
                  })).sort((a, b) => a.remainingBurstTime - b.remainingBurstTime || a.arrivalTime - b.arrivalTime);
      
                  while (processes.some(process => process.remainingBurstTime > 0)) {
                      let shortestProcessIndex = -1;
                      let shortestBurstTime = Infinity;
      
                      for (let i = 0; i < processes.length; i++) 
                      {
                          if (processes[i].arrivalTime <= totaltime && processes[i].remainingBurstTime < shortestBurstTime && processes[i].remainingBurstTime > 0) 
                          {
                              shortestBurstTime = processes[i].remainingBurstTime;
                              shortestProcessIndex = i;
                          }
                      }
      
                      if (shortestProcessIndex === -1) 
                      {
                          totaltime++;
                          continue;
                      }
      
                      const process = processes[shortestProcessIndex];
                      const completionTime = totaltime + contextSwitch+ 1;
                      const waiting = totaltime - process.arrivalTime;
                      waitng += waiting;
                      tatime += completionTime - process.arrivalTime;
                      totaltime = completionTime;
      
                      executionorder.push({ process: process.process, waiting });
      
                      process.remainingBurstTime--;
      
                      if (process.remainingBurstTime === 0) 
                      {
                          // Remove completed process from the array
                          processes.splice(shortestProcessIndex, 1);
                      }
                  }
      
                  const avgWT = waitng / (arrivalTimes.length - processes.length);
                  const avgTAT = tatime / (arrivalTimes.length - processes.length);
                  displayResults(executionorder, avgWT, avgTAT);
              }
      
      //-------------5. PRIORIRTY--------------
          function runPriority() 
          {
              const arrivalTimes = document.querySelectorAll('.arrival-time');
              const burstTimes = document.querySelectorAll('.burst-time');
              const priorities = document.querySelectorAll('.priority');
              let contextSwitch=0;
              let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
              if( c !== 0)
                {
                    contextSwitch=c;
                }
              let totaltime = 0;
              let waitng = 0;
              let tatime = 0;
              let executionorder = [];
      
              // Convert NodeList to array and sort processes by priority
              const processes = Array.from(burstTimes).map((burstTime, index) => ({
                  process: index + 1,
                  arrivalTime: parseInt(arrivalTimes[index].value),
                  burstTime: parseInt(burstTime.value),
                  priority: parseInt(priorities[index].value)
              })).sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
      
              for (const process of processes) 
              {
                  const completionTime = Math.max(process.arrivalTime, totaltime) + process.burstTime+contextSwitch;
                  const waiting = Math.max(0, totaltime - process.arrivalTime);
                  waitng += waiting;
                  tatime += completionTime - process.arrivalTime;
                  totaltime = completionTime;
      
                  executionorder.push({ process: process.process, waiting });
              }
      
              const avgWT = waitng / processes.length;
              const avgTAT = tatime / processes.length;
              displayResults(executionorder, avgWT, avgTAT);
          }
      //------------------END OF ALGOOOSSSSS-------------------------    
      //----------------GANTT-----------------
      function toggleGantt() 
      {
          const ganttChart = document.getElementById('gantt-chart');
          const checkbox = document.getElementById('show-gantt-checkbox');
      
          if (checkbox.checked) 
          {
              ganttChart.style.display = 'block';
          }
          else 
          {
              ganttChart.style.display = 'none';
          }
      }
      
      //*************** FCFS - GANTT ******************
      
      function GanttFCFS(executionorder, arrivalTimes, burstTimes) 
      {
        const ganttChartDiv = document.getElementById('gantt-chart');
        let totaltime = 0;
        let contextSwitch=0;
        let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
        if( c !== 0)
          {
              contextSwitch=c;
          }
        let ganttChartHTML = `
        <table>
            <tr>
               
        `;
    
        for (let i = 0; i < executionorder.length; i++) 
        {
            const processNumber = executionorder[i].process;
            const arrivalTime = parseInt(arrivalTimes[processNumber - 1].value);
            const burstTime = parseInt(burstTimes[processNumber - 1].value);
            const startTime = Math.max(totaltime, arrivalTime);
            const endTime = startTime + burstTime;
            totaltime = endTime;
    
            ganttChartHTML += `
            <th colspan=2>Process ${processNumber}</th>
            <th colspan=2 class="cpu">CPU Switch</th>
            `;
        }
    
        ganttChartHTML += `</tr><tr>`;
    
        totaltime = 0;
        for (let i = 0; i < executionorder.length; i++) 
        {
            const processNumber = executionorder[i].process;
            const arrivalTime = parseInt(arrivalTimes[processNumber - 1].value);
            const burstTime = parseInt(burstTimes[processNumber - 1].value);
            const startTime = Math.max(totaltime, arrivalTime);
            const endTime = startTime + burstTime;
            totaltime = endTime;
    
            // Duration for the process
        const processDuration = burstTime;

        ganttChartHTML += `
            <td>${startTime}</td>
            <td>${endTime}</td>
            <td colspan=2>${contextSwitch}</td>
            `;
        }
    
        ganttChartHTML += `</tr></table>`;
        ganttChartDiv.innerHTML = ganttChartHTML;
    }
    
      
      //*************** SJF - GANTT******************
      
      function GanttSJF(executionorder, arrivalTimes, burstTimes) 
{
    const ganttChartDiv = document.getElementById('gantt-chart');
    let totaltime = 0;
    let contextSwitch=0;
    let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
    if( c !== 0)
      {
          contextSwitch=c;
      }
    let ganttChartHTML = `
    <table>
        <tr>
    `;

    // Sort processes by burst time
    const sortedProcesses = executionorder.slice().sort((a, b) => {
        return parseInt(burstTimes[a.process - 1].value) - parseInt(burstTimes[b.process - 1].value);
    });

    for (let i = 0; i < sortedProcesses.length; i++) 
    {
        const processNumber = sortedProcesses[i].process;
        const arrivalTime = parseInt(arrivalTimes[processNumber - 1].value);
        const burstTime = parseInt(burstTimes[processNumber - 1].value);
        const startTime = Math.max(totaltime, arrivalTime);
        const endTime = startTime + burstTime;
        totaltime = endTime;

        ganttChartHTML += `
            <th colspan=2>Process ${processNumber}</th>
            <th colspan=2 class="cpu">CPU Switch</th>
        `;
    }

    ganttChartHTML += `</tr><tr>`;

    totaltime = 0;
    for (let i = 0; i < sortedProcesses.length; i++) 
    {
        const processNumber = sortedProcesses[i].process;
        const arrivalTime = parseInt(arrivalTimes[processNumber - 1].value);
        const burstTime = parseInt(burstTimes[processNumber - 1].value);
        const startTime = Math.max(totaltime, arrivalTime);
        const endTime = startTime + burstTime;
        totaltime = endTime;

        ganttChartHTML += `
            <td>${startTime}</td>
            <td>${endTime}</td>
            <td colspan=2>${contextSwitch}</td>
        `;
    }

    ganttChartHTML += `</tr></table>`;
    ganttChartDiv.innerHTML = ganttChartHTML;
}


      //*************** SRTF - GANTT******************
      function GanttSRTF(executionorder, arrivalTimes, burstTimes) 
      {
          const ganttChartDiv = document.getElementById('gantt-chart');
          let totaltime = 0;
          let contextSwitch=0;
          let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
          if( c !== 0)
            {
                contextSwitch=c;
            }
          let ganttChartHTML = `
          <table>
              <tr>
          `;
      
          // Sort processes by arrival time and burst time (SRTF)
          const sortedProcesses = executionorder.slice().sort((a, b) => {
              const arrivalDiff = arrivalTimes[a.process - 1].value - arrivalTimes[b.process - 1].value;
              if (arrivalDiff === 0) 
              {
                  return burstTimes[a.process - 1].value - burstTimes[b.process - 1].value;
              }
              return arrivalDiff;
          });
      
          for (let i = 0; i < sortedProcesses.length; i++) 
          {
              const processNumber = sortedProcesses[i].process;
              const arrivalTime = parseInt(arrivalTimes[processNumber - 1].value);
              const burstTime = parseInt(burstTimes[processNumber - 1].value);
              const startTime = Math.max(totaltime, arrivalTime);
              const endTime = startTime + burstTime;
              totaltime = endTime;
      
              ganttChartHTML += `
                  <th colspan=2>Process ${processNumber}</th>
                  <th colspan=2 class="cpu">CPU Switch</th>
              `;
          }
      
          ganttChartHTML += `</tr><tr>`;
      
          totaltime = 0;
          for (let i = 0; i < sortedProcesses.length; i++) 
          {
              const processNumber = sortedProcesses[i].process;
              const arrivalTime = parseInt(arrivalTimes[processNumber - 1].value);
              const burstTime = parseInt(burstTimes[processNumber - 1].value);
              const startTime = Math.max(totaltime, arrivalTime);
              const endTime = startTime + burstTime;
              totaltime = endTime;
      
              ganttChartHTML += `
                  <td>${startTime}</td>
                  <td>${endTime}</td>
                  <td colspan=2>${contextSwitch}</td>
              `;
          }
      
          ganttChartHTML += `</tr></table>`;
          ganttChartDiv.innerHTML = ganttChartHTML;
      }
      
      //*************** RR - GANTT******************
      function GanttRR(executionorder, arrivalTimes, burstTimes, quantum) {
        let totaltime = 0;
        let contextSwitch=0;
          let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
          if( c !== 0)
            {
                contextSwitch=c;
            }
        let remainingBT = [];
        let completedProcesses = [];
    
        // Initialize remaining burst times
        for (let i = 0; i < burstTimes.length; i++) {
            remainingBT.push(parseInt(burstTimes[i].value));
        }
    
        let currTime = 0;
        let currentProcess = 0;
        let timeSlice = quantum;
        let ganttChartHTML = `
            <table>
                <tr>
                    <th>Process</th>
        `;
    
        // Add headers for each process
        for (let i = 0; i < executionorder.length; i++) {
            ganttChartHTML += `
                <th colspan="2">Process ${executionorder[i].process}</th>
                <th colspan="2" class="cpu">CPU Switch</th>
            `;
        }
    
        ganttChartHTML += `</tr><tr>`;
    
        while (completedProcesses.length < executionorder.length) {
            if (remainingBT[currentProcess] <= timeSlice && remainingBT[currentProcess] > 0) {
                totaltime = currTime + remainingBT[currentProcess];
                currTime = totaltime;
                remainingBT[currentProcess] = 0;
                completedProcesses.push(executionorder[currentProcess]);
            } else if (remainingBT[currentProcess] > 0) {
                totaltime = currTime + timeSlice;
                currTime = totaltime;
                remainingBT[currentProcess] -= timeSlice;
            }
    
            // Add start and end time for the current process
            ganttChartHTML += `
                <td>${currTime - remainingBT[currentProcess]}</td>
                <td>${currTime}</td>
                <td colspan="2">${contextSwitch}</td>
            `;
    
            let nextProcess = (currentProcess + 1) % executionorder.length;
            while (nextProcess !== currentProcess && remainingBT[nextProcess] === 0) {
                nextProcess = (nextProcess + 1) % executionorder.length;
            }
            currentProcess = nextProcess;
        }
    
        ganttChartHTML += `</tr></table>`;
    
        // Return the Gantt chart HTML
        return ganttChartHTML;
    }
    
      

      //*************** Priority - GANTT******************
      function GanttPriority(executionorder, arrivalTimes, burstTimes) 
      {
          const ganttChartDiv = document.getElementById('gantt-chart');
          let totaltime = 0;
          let contextSwitch=0;
          let c = parseInt(document.getElementById('context').value); // Retrieve context switch value
          if( c !== 0)
            {
                contextSwitch=c;
            }
          let ganttChartHTML = `
          <table>
              <tr>
          `;
      
          for (let i = 0; i < executionorder.length; i++) 
          {
              const processNumber = executionorder[i].process;
              const arrivalTime = parseInt(arrivalTimes[processNumber - 1].value);
              const burstTime = parseInt(burstTimes[processNumber - 1].value);
              const startTime = Math.max(totaltime, arrivalTime);
              const endTime = startTime + burstTime;
              totaltime = endTime;
      
              // Add the process and CPU switch columns horizontally
              ganttChartHTML += `
                  <th colspan=2>Process ${processNumber}</th>
                  <th colspan=2 class="cpu">CPU Switch</th>
              `;
          }
      
          ganttChartHTML += `</tr><tr>`;
      
          totaltime = 0;
          for (let i = 0; i < executionorder.length; i++) 
          {
              const processNumber = executionorder[i].process;
              const arrivalTime = parseInt(arrivalTimes[processNumber - 1].value);
              const burstTime = parseInt(burstTimes[processNumber - 1].value);
              const startTime = Math.max(totaltime, arrivalTime);
              const endTime = startTime + burstTime;
              totaltime = endTime;
      
              // Print the start time, end time, and CPU switch
              ganttChartHTML += `
                  <td>${startTime}</td>
                  <td>${endTime}</td>
                  <td colspan=2>${contextSwitch}</td>
              `;
          }
      
          ganttChartHTML += `</tr></table>`;
          ganttChartDiv.innerHTML = ganttChartHTML;
      }
      

      //-----------------DISPLAY---------------
      function displayResults(executionorder, avgWT, avgTAT) 
      {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = `
          <div class="step">Execution Order:</div>
              <div class="execution-order">
                  ${executionorder.map((i, index) => `<div>Step ${index + 1}: Process ${i.process} (Waiting Time: ${i.waiting})</div><br>`).join('')}
              </div>
              <div class="average-times">
                  <div>Average Waiting Time: ${avgWT.toFixed(2)}</div>
                  <div>Average Turnaround Time: ${avgTAT.toFixed(2)}</div>
              </div>   
          `;
          // Generate and display Gantt chart
      
          const algorithm = document.getElementById('algorithm').value;
          // Retrieve the values of arrivalTimes and burstTimes from the DOM
          const arrivalTimes = document.querySelectorAll('.arrival-time');
          const burstTimes = document.querySelectorAll('.burst-time');
          switch (algorithm) 
          {
              case 'fcfs':
                  GanttFCFS(executionorder, arrivalTimes, burstTimes);
                  break;
              case 'sjf':
                  GanttSJF(executionorder, arrivalTimes, burstTimes);
                  break;
              case 'rr':
                  const TQ = parseInt(document.getElementById('time-quantum').value);
                  GanttRR(executionorder, arrivalTimes, burstTimes, TQ);
                  break;
              case 'srtf':
                  GanttSRTF(executionorder, arrivalTimes, burstTimes);
                  break;
              case 'priority':
                  GanttPriority(executionorder, arrivalTimes, burstTimes);
                  break;
          }
      }
      
      
      
      
      
      //});
