import pinecone
import openai_utils
import openai
import os

def init_pinecone(api_key: str, index_name: str = 'glorifiedctrlf', vector_dim: int = 1536):
    pinecone.init(api_key=api_key, environment='asia-southeast1-gcp')
    if index_name not in pinecone.list_indexes():
        pinecone.create_index(index_name, dimension=vector_dim, metric='cosine')


def upsert_embeddings(index_name: str, embeddings: dict, batch_size: int = 100):
    index = pinecone.Index(index_name)

    items_to_upsert = embeddings

    for chunk in chunks(items_to_upsert, batch_size):
        index.upsert(vectors=chunk)


def query_pinecone(index_name: str, query_vector: list, filters: dict, top_k: int = 1):
    index = pinecone.Index(index_name)

    query_results = index.query(
        vector=query_vector,
        filter=filters,
        top_k=top_k,
        include_metadata=True
    )

    return query_results


def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


if __name__ == "__main__":
    openai.api_key = os.getenv('OPENAI_API_KEY')
    print(query_pinecone(index_name='glorifiedctrlf', query_vector=openai_utils.get_embedding("The Rigol instrument"), top_k=3))