import uuid
from typing import Dict, List

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from meetup import models

app = FastAPI(title="meetup service", version="0.1.0")

v1 = APIRouter(prefix="/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

_meetups: Dict[uuid.UUID, models.Meetup] = {}


@v1.get("/meetup/{id}")
def get_meetup(id: uuid.UUID) -> models.Meetup:
    global _meetups
    return _meetups[id]


@v1.post("/meetup")
def post_meetup(meetup: models.Meetup) -> uuid.UUID:
    uid = uuid.uuid4()
    _meetups[uid] = meetup
    return uid


@v1.get("/meetups")
def get_all_meetups() -> List[models.Meetup]:
    return list(_meetups.values())


app.include_router(v1)
