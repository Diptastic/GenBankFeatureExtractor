document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  if (!fileInput.files[0]) return;

  const formData = new FormData();
  formData.append('genbank_file', fileInput.files[0]);

  try {
    const response = await fetch('/GenBankParser/backend/parse_genbank.cgi', {
      method: 'POST',
      body: formData
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      alert("Server didn't return valid JSON:\n" + text);
      return;
    }

    console.log("FEATURES:", data.features);

    // 🧬 Render Pie Chart
    if (data.counts && typeof data.counts === 'object') {
      const labels = Object.keys(data.counts);
      const values = Object.values(data.counts);
      const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#af7aa1', '#edc948'];

      new Chart(document.getElementById('chartCanvas').getContext('2d'), {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            backgroundColor: colors,
            data: values
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'GenBank Feature Distribution'
            },
            legend: {
              position: 'right'
            }
          }
        }
      });
    }

    // 📋 Render Feature Table
    renderFeatureTable(data.features.slice(0, 100)); // Display top 100 features

  } catch (err) {
    alert('Error: ' + err.message);
  }
});

function renderFeatureTable(features) {
  const container = document.getElementById('featureTableContainer');

  if (!Array.isArray(features) || features.length === 0) {
    container.innerHTML = "<p><em>No features found to display.</em></p>";
    return;
  }

  let tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Location</th>
          <th>Gene</th>
          <th>Product</th>
        </tr>
      </thead>
      <tbody>
  `;

  features.forEach(feat => {
    tableHTML += `
      <tr>
        <td>${feat.type || ''}</td>
        <td>${feat.location || ''}</td>
        <td>${feat.gene || ''}</td>
        <td>${feat.product || ''}</td>
      </tr>
    `;
  });

  tableHTML += `</tbody></table>`;
  container.innerHTML = tableHTML;
}
