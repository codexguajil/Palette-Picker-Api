# Palette Picker

### Heroku URL: ```https://em-ja-palette-picker-api.herokuapp.com```
#### Heroku endpoints: ```/api/v1/projects```, ```/api/v1/palettes```

Frontend repo: ```https://github.com/JakeAdmire/JA-EM--PalettePicker```

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

## Palettes

## GET ```/api/v1/palettes```

#### Response

#### Status 200 OK

#### Link: ```http://localhose:3000/api/v1/palettes```

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
  }.
  {
    "color1" : "pistachio",
    "color2" : "fuchsia pink",
    "color3" : "chateau green",
    "id" : 12,
    "color4" : "keppel",
    "color5" : "white",
    "created_at" : "2019-05-08 13:43:54.278753-06",
    "project_id" : 15,
    "updated_at" : "2019-05-08 13:43:54.278753-06",
    "name" : "House Decor"
  }.
  {
    "color1" : "screaming orange",
    "color2" : "banana",
    "color3" : "blood red",
    "id" : 4,
    "color4" : "royal purple",
    "color5" : "white",
    "created_at" : "2019-05-08 13:43:54.278753-06",
    "project_id" : 14,
    "updated_at" : "2019-05-08 13:43:54.278753-06",
    "name" : "Autumnal Palettes"
  }.
]
```

## GET ```/api/v1/palettes/:id```

#### Response

#### Status OK

#### Link: ```http://localhost/3000/api/v1/palettes/2```

```
[
  {
    "color1" : "screaming orange",
    "color2" : "banana",
    "color3" : "blood red",
    "id" : 2,
    "color4" : "royal purple",
    "color5" : "white",
    "created_at" : "2019-05-08 13:43:54.278753-06",
    "project_id" : 14,
    "updated_at" : "2019-05-08 13:43:54.278753-06",
    "name" : "Autumnal Palettes"
  }.
]
```

#### Response

#### Status 404 NOT FOUND

#### Link: ```http://localhost/3000/api/v1/palettes/929```

```
{
    "error": "Could not find a palette with id 929"
}
```

## POST ```http://localhost/3000/api/v1/palettes```

#### Required Parameters

| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | `the palette name` |
| `color1` | `string` | `first color name` |
| `color2` | `string` | `second color name` |
| `color3` | `string` | `third color name` |
| `color4` | `string` | `fourth color name` |
| `color5` | `string` | `fifth color name` |

#### Example:

```
{ 
        name: 'Test palette', 
        color1: 'red', 
        color2: 'green', 
        color3: 'orange', 
        color4: 'purple', 
        color5: 'white'
}
```

#### Response

#### Status 201 Created

#### Link: ```http://localhost/3000/api/v1/palettes```

```
{
  "id": 2
}
```

#### Response

#### Status 422 Unprocessable Entity

#### Link: ```http://localhost/3000/api/v1/palettes```

#### Example:

```
{ 
    name: 'Test palette', 
    color1: 'red'
}
```

```
{
  "error": "Expected format: { name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>}. You're missing a \"color2\" property."
}
```

## Delete ```http://localhost/3000/api/v1/projects/:id```

#### Response

#### Status 204 No Content

#### Link ```http://localhost/3000/api/v1/projects/1```

#### Response

#### Status 404 NOT FOUND

#### Link ```http://localhost/3000/api/v1/projects/200```

```
{
  "error": "Could not find a project with id 200"
}
```

## Delete ```http://localhost/3000/api/v1/palettes/:id```

#### Response

#### Status 204 No Content

#### Link ```http://localhost/3000/api/v1/palettes/2```

#### Response

#### Status 404 NOT FOUND

#### Link ```http://localhost/3000/api/v1/palettes/1000```

```
{
  "error": "Could not find a palette with id 1000"
}
```
## PATCH ```/api/v1/projects/:id```

#### Required Parameters

| Name | Type | Description |
| --- | --- | --- |
| `title` | `string` | `the new project title` |

#### Example:

```{ "title": "Artist Palette" }```

#### Response

#### Status 203 Updated

#### Link: ```http://localhost:3000/api/v1/projects/:14```

```
{
  "update project title"
}
```
#### Response

#### Status 404 Unprocessable Entity

#### Link: ```http://localhost:3000/api/v1/projects/:99```

#### Example:

```
{ error: `Could not find a project with id ${request.params.id}` }
```
