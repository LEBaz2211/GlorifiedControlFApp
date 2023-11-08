from flask import Flask, request, jsonify
from file_utils import process_file
from pinecone_utils import init_pinecone, query_pinecone
from dotenv import load_dotenv
import pinecone_utils
import openai_utils
import os
import json
from flask import Response
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Pinecone service
index_name = os.getenv('PINECONE_INDEX_NAME')
init_pinecone(os.getenv('PINECONE_API_KEY'))

@app.route('/api/upload', methods=['POST'])
def upload_file():
    # Process the uploaded file
    file = request.files['file']
    embeddings = process_file(file)
    # Store embeddings in Pinecone
    pinecone_utils.upsert_embeddings(index_name=index_name, embeddings=embeddings)  # Specify the index name here
    return jsonify({"message": "File processed and embeddings stored"}), 200

@app.route('/api/search', methods=['GET'])
def search():
    query_text = request.args.get('query')
    filename_filter = request.args.get('filename')

    query_vector = openai_utils.get_embedding(query_text)
    
    filters = {}
    if filename_filter:
        filters["filename"] = {"$eq": filename_filter}
    
    # Query Pinecone for the closest embeddings using the query vector and filters
    results = pinecone_utils.query_pinecone(index_name=index_name, query_vector=query_vector, filters=filters, top_k=3)
    
    res = []
    for result in results["matches"]:
        print(result)
        result_copy = {}
        result_copy["filename"] = result["metadata"]["filename"]
        result_copy["page"] = result["metadata"]["page"]
        res.append(result_copy)
    return jsonify(res), 200

if __name__ == '__main__':
    app.run(debug=True)