# Palette Picker

## Projects

## GET ```/api/v1/projects```

#### Response

#### Status: 200 OK

#### Link: ```http://localhost:3000/api/v1/projects```

```
[
  {
    "id": 14,
    "title: "House Decor",
    "created_at": "2019-05-08 13:43:54.276527-06",
    "updated_at": "2019-05-08 13:43:54.276527-06"
  },
  {
    "id": 11,
    "title: "Autumnal",
    "created_at": "2019-05-07 3:33:24.272527-01",
    "updated_at": "2019-05-07 3:33:24.272527-01"
  }
]
```

## GET ```/api/v1/projects/:id```

#### Response

#### Status: 200 OK

#### Link: ```http://localhost:3000/api/v1/projects/2```

```
[
  {
    "id": 2,
    "title: "Inspiration",
    "created_at": "2019-05-07 3:33:24.272527-01",
    "updated_at": "2019-05-07 3:33:24.272527-01"
  }
]
```

#### Status: 404 NOT FOUND

#### Link: ```http://localhost:3000/api/v1/projects/101```

```
{
    "error": "Could not find a project with id 101"
}
```

## GET ```/api/v1/projects/:id/palettes```

#### Response

#### Status: 200 OK

#### Link: ```http://localhost:3000/api/v1/projects/14/palettes```

```
[
  {
    "color1" : "red",
    "color2" : "green",
    "color3" : "orange",
    "id" : 14,
    "color4" : "purple",
    "color5" : "white",
    "created_at" : "2019-05-08 13:43:54.278753-06",
    "project_id" : 15,
    "updated_at" : "2019-05-08 13:43:54.278753-06",
    "name" : "House Decor"
  }
]
```

#### Status: 404 NOT FOUND

#### Link: ```http://localhost:3000/api/v1/projects/140/palettes```

```
{
    "error": "Could not find palettes with project id 140"
}
```

## POST ```/api/v1/projects```

#### Required Parameters

| Name | Type | Description |
| --- | --- | --- |
| `title` | `string` | `the project title` |

#### Example:

```{ "title": "Artist Palette" }```

#### Response

#### Status 201 Created

#### Link: ```http://localhost:3000/api/v1/projects```

```
{
  "id": 11
}
```
#### Response

#### Status 422 Unprocessable Entity

#### Link: ```http://localhost:3000/api/v1/projects```

#### Example:

```{ "title": "" }```

```
{
  error: `Expected format: { title: <String> }. You're missing a title property.` }
}
```

