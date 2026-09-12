const themeToggle = document.querySelector("#theme-toggle");
const root = document.documentElement;

function getCurrentTheme() {
  if (root.dataset.theme === "light" || root.dataset.theme === "dark") {
    return root.dataset.theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeButton(theme) {
  const isDark = theme === "dark";
  themeToggle.textContent = isDark ? "화이트 모드" : "다크 모드";
  themeToggle.setAttribute("aria-label", isDark ? "화이트 모드로 전환" : "다크 모드로 전환");
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

updateThemeButton(getCurrentTheme());

themeToggle.addEventListener("click", () => {
  const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  updateThemeButton(nextTheme);

  try {
    localStorage.setItem("portfolio-theme", nextTheme);
  } catch (error) {
    console.warn("테마 설정을 저장하지 못했습니다.", error);
  }
});
