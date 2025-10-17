FROM eclipse-temurin:21-jdk AS build

RUN apt-get update && apt-get install -y maven \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY pom.xml .
COPY clinic-domain/pom.xml ./clinic-domain/
COPY clinic-commons/pom.xml ./clinic-commons/
COPY clinic-api/pom.xml ./clinic-api/

RUN mvn -B dependency:go-offline

COPY ./ ./
