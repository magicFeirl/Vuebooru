from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from aiohttp import ClientSession, TCPConnector

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

session = ClientSession(connector=TCPConnector(ssl=False))
POSTS_LIST_API = 'https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1'
PROXY = 'http://127.0.0.1:1081'


@app.get('/')
async def load_posts(pid: int, tags: str = None, limit: int = 42):
    params = {
        'pid': pid,
        'limit': limit
    }

    if tags and tags.strip():
        params['tags'] = tags.strip()

    async with session.get(POSTS_LIST_API, params=params, proxy=PROXY) as resp:
        result = await resp.json()

    return result
