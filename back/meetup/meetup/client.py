import requests
import uuid

import typer

from meetup import models

app = typer.Typer()

_MEETUP_URL = "http://localhost:8080/v1"


@app.command()
def post():
    meetup = models.Meetup(
        title="this is a title",
        image="http://www.example.com",
        address="this is an address",
        description="my super description",
    )
    response = requests.post(f"{_MEETUP_URL}/meetup", data=meetup.json())
    response.raise_for_status()
    print(f"{response.status_code} : {response.json()}")


@app.command()
def get(
    uid: uuid.UUID = typer.Argument(..., help="The UUID corresponding to the Meetup")
):
    response = requests.get(f"{_MEETUP_URL}/meetup/{uid}")
    response.raise_for_status()
    typer.echo(f"{uid=}")
    typer.echo(f"{response.json()}")


@app.command()
def get_all():
    response = requests.get(f"{_MEETUP_URL}/meetups")
    response.raise_for_status()
    typer.echo(f"{response.json()}")


def main():
    app()


if __name__ == "__main__":
    main()
