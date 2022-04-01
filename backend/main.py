import os
from typing import List, Optional

from pydantic import BaseModel
from aiohttp import ClientSession, TCPConnector, DummyCookieJar
from fastapi import Cookie, Depends, FastAPI, Request, Response, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from lxml.html import fromstring

from api import *

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://127.0.0.1:4000'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROXY = "http://127.0.0.1:1081"

os.environ["HTTP_PROXY"] = PROXY
os.environ["HTTPS_PROXY"] = PROXY

jar = DummyCookieJar()
connector = TCPConnector(ssl=False)
session = ClientSession(trust_env=True, connector=connector, cookie_jar=jar)


class UserNotLoginError(Exception):
    def __init__(self):
        pass


@app.exception_handler(UserNotLoginError)
async def user_not_login_exception_handler(request: Request, exec: UserNotLoginError):
    return JSONResponse(
        status_code=200,
        content={"code": 401, "message": "User not login"},
    )


def user_cookie_depend(no_login_error=True):
    async def depend(
        pass_hash: Optional[str] = Cookie(None), user_id: Optional[str] = Cookie(None)
    ):
        if not pass_hash or not user_id:
            if no_login_error:
                raise UserNotLoginError()
            else:
                return {"cookie": ""}

        return {"cookie": f"pass_hash={pass_hash};user_id={user_id};"}

    return depend


@app.post("/login")
async def login(response: Response, username: str = Body(None), password: str = Body(None)):
    data = {"user": username, "pass": password, "submit": "Log in"}

    async with session.post(LOGIN_API, headers={}, data=data, allow_redirects=False) as resp:
        cookies = resp.cookies

    if "pass_hash" not in cookies or "user_id" not in cookies:
        return {"code": "401", "message": "Invalid username or password"}

    def parse_cookie_info(cookie, cookie_key):
        keys = ["expires", "path", "max-age"]

        info = {}
        dict_cookie = dict(cookie[cookie_key].items())
        for key in keys:
            info[key.replace("-", "_")] = dict_cookie[key]

        return {"key": cookie_key, "value": cookie[cookie_key].value, **info}

    response.set_cookie(**parse_cookie_info(cookies, "pass_hash"))
    response.set_cookie(**parse_cookie_info(cookies, "user_id"))

    return {
        "code": 200,
        "message": "Login successed",
        "user_id": cookies["user_id"].value,
    }


@app.get("/post")
async def post(
    id: str, cookie_header=Depends(user_cookie_depend(no_login_error=False))
):
    def parse_tags_and_favorite_info(html):
        element = fromstring(html)
        tag_types = ["artist", "character", "copyright", "metadata", "general"]
        tags = {}

        for tag_type in tag_types:
            hrefs = element.xpath(
                f'//li[@class="tag-type-{tag_type}"]/a/@href')
            tag_names = [href[href.rfind("=") + 1:] for href in hrefs]
            tags[tag_type] = tag_names

        favorited = element.xpath('//*[@id="scrollebox"]/a[3]/text()')

        if favorited:
            favorited = favorited[0].lower() == "unfavorite"
        else:
            favorited = False

        return tags, favorited

    async with session.get(
        POST_INFO_API, params={'id': id}, headers=cookie_header
    ) as resp:
        html = await resp.text()

    tags, favorited = parse_tags_and_favorite_info(html)

    return {
        "code": 200,
        "message": "Get post info successed",
        "data": {"tags": tags, "favorited": favorited},
    }


@app.get("/unfavorite")
async def unfavorite(id: str, cookie_header=Depends(user_cookie_depend())):
    async with session.get(
        UNFAVORITE_API, params={'id': id},
        headers=cookie_header, allow_redirects=False
    ) as resp:
        pass

    return {"code": 200, "message": "Unfavorite successed"}


@app.get("/favorite")
async def favorite(id: str, cookie_header=Depends(user_cookie_depend())):

    async with session.get(
        FAVORITE_API, params={'id': id}, headers=cookie_header
    ) as resp:
        fav_state = await resp.text()

    fav_state_map = {
        "1": "Post alreay in your favorites",
        "2": "User not login",
        "3": "Add favorite successed",
    }

    return {
        "code": 200,
        "message": fav_state_map.get(fav_state, f"Unexpected code: {fav_state}"),
    }


class PostModel(BaseModel):
    id: str
    created_at: str
    score: int
    source: str
    owner: str
    creator_id: str
    tags: str
    title: str
    file_url: str
    sample_url: str
    preview_url: str
    width: int
    height: int
    rating: str


class PostsResponse(BaseModel):
    code: int
    message: str
    data: List[PostModel]


@app.get("/", response_model=PostsResponse)
async def load_posts(pid: int, tags: str = None, limit: int = 42):
    params = {"pid": pid, "limit": limit}

    if tags and tags.strip():
        params["tags"] = tags.strip()

    async with session.get(POST_LIST_API, params=params) as resp:
        result = await resp.json()

    return {
        'code': 200,
        'message': 'get post list success',
        'data': result['post'] if 'post' in result else []
    }
