import { fetch } from "bun";

async function postAnswer(answer: number) {
  const url = "https://adventofcode.com/2024/day/1/answer";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Sec-Fetch-Site": "same-origin",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Sec-Fetch-Mode": "navigate",
    Host: "adventofcode.com",
    Origin: "https://adventofcode.com",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1.1 Safari/605.1.15",
    Referer: "https://adventofcode.com/2024/day/1",
    Connection: "keep-alive",
    "Sec-Fetch-Dest": "document",
    Cookie: "session=dont-steal-my-cookie",
  };

  const body = new URLSearchParams({
    level: "1",
    answer: answer.toString(),
  }).toString();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    console.log(`Answer: ${answer}, Response: ${text}`);
    if (text.includes("That's the right answer!")) {
      console.log(`Correct answer found: ${answer}`);
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return false;
}

async function goodAnswerFinder() {
  for (let answer = 1; answer <= Number.MAX_SAFE_INTEGER; answer++) {
    const isCorrect = await postAnswer(answer);
    if (isCorrect) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
  }
}

goodAnswerFinder();
