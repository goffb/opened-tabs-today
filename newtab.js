const count = document.querySelector("#count");
const reset = document.querySelector("#reset");

const now = new Date();
const today = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0")
].join("-");

browser.storage.local.get(["date", "count"]).then((data) => {
  const currentCount = data.date === today ? data.count + 1 : 1;

  browser.storage.local.set({
    date: today,
    count: currentCount
  });

  count.textContent = currentCount;
});

browser.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.count) {
    count.textContent = changes.count.newValue;
  }
});

reset.addEventListener("click", () => {
  browser.storage.local.set({
    date: today,
    count: 0
  });

  count.textContent = 0;
});
