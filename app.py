import re
import PyPDF2
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Add this line

def clean_text(text):
    text = re.sub(r'http\S+', ' ', text)
    text = re.sub('[%s]' % re.escape('!"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'), ' ', text)
    text = re.sub(r'[^\x00-\x7f]', ' ', text)
    text = re.sub('\s+', ' ', text)
    return text

def preprocess_file(filename):
    if ".pdf" in filename.filename:  # Use filename.filename to access the uploaded file name
        try:
            pdf_reader = PyPDF2.PdfReader(filename)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
            text = text.replace("\\n", " ")
        except UnicodeDecodeError:
            text = ''
    else:
        text = filename.replace("\\n", " ")
    return text

def calculate_similarity(job_description, text, custom_keywords):
    custom_keywords = ' '.join(custom_keywords)
    job_description = job_description + ' ' + custom_keywords
    text = [text, job_description]
    cv = CountVectorizer()
    count_matrix = cv.fit_transform(text)
    match_percent = cosine_similarity(count_matrix)[0][1] * 100
    match_percent = round(match_percent, 2)
    return match_percent

@app.route('/calculate_similarity', methods=['POST'])
def calculate_similarity_route():
    jd = request.form['jd']
    custom_tags = request.form['custom_tags'].split(',')
    resume = request.files['resume']
    
    jd_text = clean_text(jd)
    resume_text = preprocess_file(resume)

    score = calculate_similarity(jd_text, resume_text, custom_tags)
    return jsonify({'score': score})

if __name__ == '__main__':
    app.run(debug=True)
