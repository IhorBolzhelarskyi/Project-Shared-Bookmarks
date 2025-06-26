import { urlValidator } from "./urlValidator.js";

describe("urlValidador", () => {
  test("should return true, if URL is correct", () => {
    expect(urlValidator("https://www.google.com/")).toBe(true);
    expect(urlValidator("https://www.reddit.com/r/facebook/")).toBe(true);
    expect(urlValidator("https://github.com/IhorBolzhelarskyi/Project-Shared-Bookmarks")).toBe(true);
    expect(urlValidator("https://www.flashscore.com.ua/")).toBe(true);
    expect(urlValidator("https://www.canva.com/")).toBe(true);
  });
  test("should return false, if URL is incorrect", () => {
    expect(urlValidator("google.com")).toBe(false);
    expect(urlValidator("https:/www.wikipedia.org/")).toBe(false);
    expect(urlValidator("https//www.amazon.co.uk/")).toBe(false);
    expect(urlValidator("htps://www.ebay.co.uk/str/united1stopshop")).toBe(false);
    expect(urlValidator("")).toBe(false);
  });
});
