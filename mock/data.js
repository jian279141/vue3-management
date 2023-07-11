import Mock from "mockjs";

const List = [];

for (let i = 0; i < 20; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "mock data",
      content: "baseContent",
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      image_uri: '@image("200x100", "#50B347", "#FFF", "Mock.js")',
      platforms: ["a-platform"],
    })
  );
}

console.log(List);
