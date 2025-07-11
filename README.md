# MCP Weather Tool

MCP (Model Context Protocol) server that provides weather information for cities using the Open-Meteo API.

## Description

MCP server that implements a `fetch-weather` tool to get current weather data for any city. It uses the Open-Meteo geocoding API to find coordinates and then retrieves weather information including temperature, precipitation and rain.

## Requirements

- Node.js >= 22.17.0
- npm or yarn

## Installation

```bash
npm install
```

## Usage

```bash
node main.ts
```

## Technologies

- **@modelcontextprotocol/sdk**: MCP SDK for server implementation
- **node-fetch**: HTTP client for API requests
- **zod**: Schema validation for parameters
- **TypeScript**: Programming language
