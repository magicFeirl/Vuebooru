from pydantic import BaseModel
from typing import List

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


class CommonResponse(BaseModel):
    code: int
    message: str

class PostsResponse(CommonResponse):
    data: List[PostModel]
