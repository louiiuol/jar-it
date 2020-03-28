# e.Tin REST API

> This application, using SpringBoot Security combined with OAuth, provides a secured RESTFUL API to handle, persist and retrieve business values, mapped as entities, in the database configured as requested. More information about the API context and technical stack available in the documentation.

## Controllers

> Provides the following resources:

### Users

description | action | url | param | authentication |
|--------|--------|-----|:-----:|:--------------:|
| Register | POST | "auth/signup" | UserCreateDto | - |
| User's information | GET | "secure/users/{id}" | Long | USER |
| User's details | GET | "secure/users/{id}/details" | Long | USER |
| update information | PUT | "secure/users/{id}/details" | UserUpdateDto | USER + validRequester |
| delete user | DELETE | "secure/users/{id}/details" | - | USER + validRequester |
| All user's information | GET | "secure/users" | - | USER |
| authenticated user | GET | "secure/whoami" | - | USER |

*ValidRequester: Spring Security checks if the user requested is the same as the authenticated one.

## Models

> FInd below most relevant models of the API

### User

| field | type | size | constraints |
|-------|:----:|:----:|:------------:|
| username | String | 0-12 | UQ - NN |
| email | String | 0-100 | UQ - NN |
| password | String | - | NN |
| avatar | String | - | NN |
| roles | Set< Role > | - | - |
| enabled | boolean | 1 | ENUM('T', 'F') NN |
| accountNonExpired | boolean | 1 | ENUM('T', 'F') NN |
| accountNonLocked | boolean | 1 | ENUM('T', 'F') NN |
| credentialsNonExpired | boolean | 1 | ENUM('T', 'F') NN |

## Tests

>Tests are very time consuming and no always worthy. Because this application is mainly a RESTFUL API, tests will be focused around Integration Test. More details about the tests in the documentation.
