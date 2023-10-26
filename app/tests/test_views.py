import pytest
from app import create_app


@pytest.fixture
def client():
    app = create_app()
    with app.test_client() as client:
        yield client


def test_app(client):
    resp = client.get("/")

    assert resp.status_code == 200
    assert b"data-test-identifier" in resp.data
