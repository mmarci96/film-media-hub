FROM golang:1.19.5-alpine3.17 as build

ENV GOPATH /go

WORKDIR $GOPATH/src/app

COPY web-server.go .

RUN go mod init

RUN go get github.com/gin-gonic/gin@latest

RUN go build -ldflags "-s -w" -o website

RUN chmod +x website

FROM alpine:3.17

COPY --from=build go/src/app/website /

EXPOSE 8080

ENTRYPOINT [ "/website" ]
