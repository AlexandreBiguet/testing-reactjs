import uuid
from typing import Dict, List

from fastapi import FastAPI, APIRouter, Request, status
from fastapi.middleware.cors import CORSMiddleware

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from meetup import models


from fastapi.param_functions import Body


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


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
    )


@v1.get("/meetup/{id}")
async def get_meetup(id: uuid.UUID) -> models.Meetup:
    global _meetups
    return _meetups[id]


@v1.post("/meetup")
async def post_meetup(meetup: models.Meetup) -> uuid.UUID:
    uid = uuid.uuid4()
    _meetups[uid] = meetup
    return uid


@v1.get("/meetups")
def get_all_meetups() -> List[models.Meetup]:
    return list(_meetups.values())


app.include_router(v1)
