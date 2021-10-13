# Backend API Reference

## Images

| Method | Path          | Description                                                                                       | Params                   | Response                                                                |
| ------ | ------------- | ------------------------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------- |
| GET    | `/images`     | Fetches the full list of images. The count starts at 100 and resets when there are more than 300. |                          | `[{ "id": 1, "url": "https://picsum.photos/id/1/200/200" }, (...)]`     |
| GET    | `/images/:id` | Fetches an image.                                                                                 | `:id`, `width`, `height` | `{ "id": 1, "url": "https://picsum.photos/id/1/200/200" }`              |
| WS     | `/images-ws`  | Fetches uploaded images in real time through a web socket.                                        |                          | `"{ "id": 1, "url": \"https://picsum.photos/id/1/200/200\" }"` (string) |
