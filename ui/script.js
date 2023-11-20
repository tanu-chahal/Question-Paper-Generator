function generateQuestionPaper() {
    const totalMarks = document.getElementById('totalMarks').value;
    const easyPercentage = document.getElementById('easyPercentage').value;
    const mediumPercentage = document.getElementById('mediumPercentage').value;
    const hardPercentage = document.getElementById('hardPercentage').value;
  
    const requestBody = {
      totalMarks: parseInt(totalMarks),
      distribution: {
        Easy: parseInt(easyPercentage),
        Medium: parseInt(mediumPercentage),
        Hard: parseInt(hardPercentage)
      }
    };
  
    fetch('http://localhost:4000/api/questionpaper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => {
        displayOutput(JSON.stringify(data, null, 2));
      })
      .catch(error => {
        displayOutput(`Error: ${error.message}`);
      });
  }
  
  function displayOutput(output) {
    document.getElementById('output').classList.remove('hidden');
    document.getElementById('questionPaperOutput').textContent = output;
  }
  