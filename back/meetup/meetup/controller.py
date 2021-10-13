from uuid import UUID
import uuid
from fastapi import FastAPI, APIRouter
from uuid import UUID
from typing import Dict, List

from meetup import models

app = FastAPI(title="meetup service", version="0.1.0")

v1 = APIRouter(prefix="/v1")

_meetups: Dict[UUID, models.Meetup] = {}


@v1.get("/meetup/{id}")
def get_meetup(id: UUID) -> models.Meetup:
    global _meetups
    return _meetups[id]


@v1.post("/meetup")
def post_meetup(meetup: models.Meetup) -> UUID:
    uid = uuid.uuid4()
    _meetups[uid] = meetup
    return uid


@v1.get("/meetups")
def get_all_meetups() -> List[models.Meetup]:
    return list(_meetups.values())


app.include_router(v1)
