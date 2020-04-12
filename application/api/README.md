# e-Tin Api V1

## ![eTin wiki banner](../../docs/src/img/banner.png)

> This application, using SpringBoot Security combined with OAuth, provides a secured RESTFUL API to handle, persist and retrieve business values, mapped from *dtos* to *entities*, in the database configured as requested. More information about the API context and technical stack available in the documentation.

## Getting Started 💪

> These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
> Each folder hold a README for further information

## Prerequisites 📚

| Dependency | version required |
|:-----------|:----------:|
| Maven | 3.6.0 |
| JDK | 13.0.1 |
| SQL Workbench | 8.0.13 |

## Installing 🛠

```shell
cd swear-tin/application/api;
mvn clean install;
mvn spring-boot:run -Dspring-boot.run.profiles=[dev/prod]
```

## Testing & Build 🧪

>Tests are very time consuming and no always worthy. Because this application is mainly a RESTFUL API, tests will be focused around Integration Test. More details about the tests in the documentation.

```shell
cd swear-tin/application/api;
mvn clean install
```

## REST API Resources

> This program provides a RESTFULL Api to handle functionalities needed for build IHM.
> Please follow the guide if you want to do your own request.
> Find below all ressources available:

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

## Further help ☝️

> the following links will help you understand how this project was made:

***

## Contact ✉️

Feel free to [Submit new issue](https://github.com/louiiuol/swear-tin/issues) if you have any suggestions or wish to learn more about certain aspect of this project.
