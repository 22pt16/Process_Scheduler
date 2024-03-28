<script>
  // Sample process data for FCFS and RR
 const fcfsProcesses =
 [
    { processId: 'P1', arrivalTime: 0, burstTime: 5 },
    { processId: 'P2', arrivalTime: 2, burstTime: 3 },
    { processId: 'P3', arrivalTime: 4, burstTime: 2 },
 ];

 const rrProcesses =
 [
    { processId: 'P1', arrivalTime: 0, burstTime: 4, timeQuantum: 2 },
    { processId: 'P2', arrivalTime: 1, burstTime: 3, timeQuantum: 2 },
    { processId: 'P3', arrivalTime: 2, burstTime: 5, timeQuantum: 2 },
 ];

  // Function to generate table rows for FCFS
  function generateFcfsRows()
  {
    const table = document.getElementById('fcfs-table');
    for (let i = 0; i < fcfsProcesses.length; i++) {
      const row = table.insertRow();
      const processIdCell = row.insertCell(0);
      const arrivalTimeCell = row.insertCell(1);
      const burstTimeCell = row.insertCell(2);

      processIdCell.innerHTML = fcfsProcesses[i].processId;
      arrivalTimeCell.innerHTML = fcfsProcesses[i].arrivalTime;
      burstTimeCell.innerHTML = fcfsProcesses[i].burstTime;
    }
  }

  // Function to generate table rows for RR
  function generateRrRows() {
    const table = document.getElementById('rr-table');
    for (let i = 0; i < rrProcesses.length; i++) {
      const row = table.insertRow();
      const processIdCell = row.insertCell(0);
      const arrivalTimeCell = row.insertCell(1);
      const burstTimeCell = row.insertCell(2);
      const timeQuantumCell = row.insertCell(3);

      processIdCell.innerHTML = rrProcesses[i].processId;
      arrivalTimeCell.innerHTML = rrProcesses[i].arrivalTime;
      burstTimeCell.innerHTML = rrProcesses[i].burstTime;
      timeQuantumCell.innerHTML = rrProcesses[i].timeQuantum;
    }
  }

  // Call the functions to generate table rows
  generateFcfsRows();
  generateRrRows();
</script>
