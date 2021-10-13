from pydantic import BaseModel, HttpUrl


class Meetup(BaseModel):
    title: str
    image: HttpUrl
    address: str
    description: str

