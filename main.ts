import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fetch from "node-fetch";

const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

server.tool("fetch-weather", "Tool to fetch the weather of a city", {
  city: z.string().describe("City name"),
}, async ({ city }) => {
  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`)
  const data = await response.json() as any

  if (data.results.length === 0) {

    return {
      content: [
        {
          type: "text",
          text: `No results found for ${city}`,
        }
      ]
    }
  }

  const { latitude, longitude } = data.results[0]
  const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,rain,is_day`)
  const weatherData = await weatherResponse.json() as any

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(weatherData, null, 2),
      }
    ]
  }
});

const transport = new StdioServerTransport();
await server.connect(transport); 4