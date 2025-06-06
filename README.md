# GenBank Feature Extractor Web App

This is a web application that allows users to upload GenBank (.gb/.gbk) files and extract annotated genomic features such as genes, CDS, mRNA, and UTRs. The extracted data is visualized in a pie chart and displayed in a tabular format.

## 🔬 Features
- Upload GenBank files via a web form
- Extract key biological features using Perl and BioPerl
- Visualize feature distribution using Chart.js
- Display detailed feature information in a scrollable table

## 🚀 Technologies Used
- **Frontend:** HTML, CSS, JavaScript (Chart.js)
- **Backend:** Perl CGI + BioPerl
- **Server:** Apache (XAMPP on localhost)

## 📂 Directory Structure
GenBankParser/
├── index.html
├── script.js
├── backend/
│ ├── parse_genbank.cgi
│ └── .htaccess

## ⚙️ Requirements
- [XAMPP](https://www.apachefriends.org/)
- [Strawberry Perl](https://strawberryperl.com/)
- BioPerl modules (`cpan install Bio::Perl`)

## 📥 How to Run
1. Start Apache server via XAMPP
2. Open `http://localhost/GenBankParser/index.html` in your browser
3. Upload a `.gb` or `.gbk` file to view extracted features

## 📄 License
This project is open-source and available under the MIT License.
