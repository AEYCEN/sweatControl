def test_app(client):
    resp = client.get("/")

    assert resp.status_code == 200
    assert b"data-test-identifier" in resp.data
