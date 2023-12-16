# Start from a Debian-based image with the Go language installed
FROM golang:1.18-buster

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod ./
COPY go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -o server .

# Expose port 5000 to the outside world
EXPOSE 5000

# Command to run the executable
CMD ["./server"]
