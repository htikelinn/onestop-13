FROM eclipse-temurin:25-jdk AS build

RUN apt-get update && apt-get install -y maven \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY pom.xml .
COPY clinic-domain/pom.xml ./clinic-domain/
COPY clinic-commons/pom.xml ./clinic-commons/
COPY clinic-api/pom.xml ./clinic-api/

RUN mvn -B dependency:go-offline

COPY clinic-domain/src ./clinic-domain/src
COPY clinic-commons/src ./clinic-commons/src
COPY clinic-api/src ./clinic-api/src

RUN mvn -B -T 1C clean package -DskipTests


FROM eclipse-temurin:25-jre-alpine AS runtime

RUN addgroup -S springgroup && adduser -S -G springgroup springuser

WORKDIR /app
COPY --from=build /workspace/clinic-api/target/*.jar ./app.jar

EXPOSE 8080

USER springuser

ENTRYPOINT ["java", "-jar", "/app/app.jar"]