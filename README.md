# Nestjs-account-graphql

NestJS and GraphQL based project simulating an account service with permission control

[![Watch the video](https://i.imgur.com/h1l8t49.png)](https://www.youtube.com/embed/DVKJ5EVNfXY)

### Schema

[![Watch the video](https://i.imgur.com/yfAWYCz.png)](https://i.imgur.com/yfAWYCz.png)

### Features

-   ✅ CRUD Account with relations roles
-   ✅ CRUD Roles with relations actions
-   ✅ CRUD Actions
-   ✅ Login ➡ generate JWT
-   ✅ JWT Guard

#### Requirements

1. Database
2. Configure `ormconfig.json` file with database data
3. Install dependencies `yarn install`
4. Copy `.env.example` to `.env`

#### Setup

1. Run project `yarn start:dev`
2. Access `http://localhost:3000/graphql`
3. Create a account
4. Access login route
5. Set header token for use other routes

```js
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc5YTdhNjgwLTRlMWYtNDU5OC1hNjk1LTExNWEwZTkxM2JlYyIsImVtYWlsIjoiaGVucmlxdWV3ZWlhbmRAZ21haWwuY29tIiwiaWF0IjoxNTg2NjE3OTY1LCJleHAiOjE1ODY2MjE1NjV9.Sqv24CLalMw1YiTeAsPDKeuchIMSHii-N64RMVBV0f8"
}
```

**_Changelog project_**

-   [x] Module account
-   [x] Add AuthGuard on routes
-   [x] Add authentication methods
-   [x] Module Roles
-   [x] Module Actions
-   [ ] Add exceptions
-   [ ] Tests for all features
