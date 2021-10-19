# Backend API Reference

## Images

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Path</th>
            <th>Description</th>
            <th>Params</th>
            <th>Response</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>GET</td>
            <td>
                <code>/images</code>
            </td>
            <td>
                Fetches the full list of images.
                <br />
                <br />
                The images count starts at 100 and resets when there are more than 300.
            </td>
            <td></td>
            <td>
                <pre>
[
    {
        "id": 1,
        "urls": {
            "48": "https://picsum.photos/id/1/48/48",
            "400": "https://picsum.photos/id/1/400/400",
            "800": "https://picsum.photos/id/1/800/800",
            "1280": "https://picsum.photos/id/1/1280/1280"
        },
        "meta": {
            "location": "Amsterdam",
            "keywords": "cupiditate earum quia",
            "datetime": "2020-11-19"
        }
    },
    (...)
]<!--
             --></pre>
            </td>
        </tr>
        <tr>
            <td>GET</td>
            <td>
                <code>/images/:id</code>
            </td>
            <td>Fetches an image by id.</td>
            <td>
                <code>:id</code>
                <code>width</code>
                <code>height</code>
            </td>
            <td>
                <pre>
{
    "id": 1,
    "urls": {
        "48": "https://picsum.photos/id/1/48/48",
        "400": "https://picsum.photos/id/1/400/400",
        "800": "https://picsum.photos/id/1/800/800",
        "1280": "https://picsum.photos/id/1/1280/1280"
    },
    "meta": {
        "location": "Amsterdam",
        "keywords": "cupiditate earum quia",
        "datetime": "2020-11-19"
    }
}<!--
             --></pre>
            </td>
        </tr>
        <tr>
            <td>WS</td>
            <td>
                <code>/images-ws</code>
            </td>
            <td>Fetches uploaded images in real time through a web socket.</td>
            <td></td>
            <td>
                (JSON.stringify)
                <pre>
"{
    \"id\": 1,
    \"urls\": {
        \"48\": \"https://picsum.photos/id/1/48/48\",
        \"400\": \"https://picsum.photos/id/1/400/400\",
        \"800\": \"https://picsum.photos/id/1/800/800\",
        \"1280\": \"https://picsum.photos/id/1/1280/1280\"
    },
    \"meta\": {
        \"location\": \"Amsterdam\",
        \"keywords\": \"cupiditate earum quia\",
        \"datetime\": \"2020-11-19\"
    }
}"<!--
             --></pre>
            </td>
        </tr>
    </tbody>
</table>
