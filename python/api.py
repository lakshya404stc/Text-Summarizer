from flask import Flask, request, jsonify
from transformers import pipeline, SummarizationPipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

summarizer: SummarizationPipeline = pipeline("summarization")

@app.route('/api/summarize', methods=['POST'])
def summarize_api():
    try:
        data = request.json
        text = data.get('text', 'No text provided')
        
        summary = summarizer(text, max_length=150, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True)
        
        print("Complete Summary Object:", summary)

        if isinstance(summary, list) and summary:
            summary_text = summary[0].get('summary_text', 'No summary available')
        elif isinstance(summary, str):
            summary_text = summary
        else:
            summary_text = 'Unexpected summary format'

        return jsonify({'summary': summary_text.strip()})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=False)
