FROM golang:1.19.5-alpine3.17 as build

ENV GOPATH /go

WORKDIR $GOPATH/src/app

COPY . .

RUN go mod init

RUN go build cmd/api/main.go

RUN chmod +x main

FROM alpine:3.17

COPY --from=build go/src/app/main /

EXPOSE 8080

ENTRYPOINT [ "/main" ]
