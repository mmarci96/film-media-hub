FROM node:18-alpine AS client

WORKDIR /usr/app

COPY ./client/package*.json .

RUN npm install

COPY ./client/ .

RUN npm run build

FROM golang:1.24.2-alpine AS builder

WORKDIR /app

COPY ./go-reverse-proxy/go.mod ./go-reverse-proxy/go.sum ./

RUN go mod download

COPY ./go-reverse-proxy/ .

COPY --from=client /usr/app/dist /app/internal/html/dist

RUN mv /app/data/docker_config.yaml /app/data/config.yaml

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main ./cmd/main.go

EXPOSE 80

ENTRYPOINT ["/app/main"]
