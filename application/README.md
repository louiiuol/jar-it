# e.Tin Application

## ![eTin wiki banner](../docs/src/img/banner.png)

## Getting Started 💪

> These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
> Each folder hold a README for further information

## Prerequisites 📚

| Dependency | version required |
|:-----------|:----------:|
| Maven | 3.6.0 |
| JDK | 13.0.1 |
| Node.js | 10.16.0 |
| Angular CLI | 9.1.0 |
| SQL Workbench | - |

## Installing 🛠

### Server API

```shell
cd swear-tin/application/api;
mvn clean install;
mvn spring-boot:run -Dspring-boot.run.profiles=[dev/test/prod]
```

### Web App

```shell
cd swear-tin/application/web-ui;
npm install;
ng serve
```

## Testing🧪

### Server API

```shell
cd swear-tin/application/api;
mvn clean install
```

### Web App

```shell
cd swear-tin/application/web-ui;
npm install;
ng test
```

## Authors 🖊

> * **Louis Godlewski** - [louiiuol](https://github.com/louiiuol)