# Build stage
FROM golang:1.24.2-alpine AS builder

WORKDIR /app

# Copy module files first to cache dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main ./cmd/api/main.go

# Final stage
FROM alpine:3.17

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/main .
COPY --from=builder /app/api.env .

EXPOSE 8080

ENTRYPOINT ["/app/main"]
