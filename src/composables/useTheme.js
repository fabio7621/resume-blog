import { ref, watch } from 'vue'

const STORAGE_KEY = 'resume-blog-theme'
const theme = ref(readInitialTheme())

// 沒存過偏好就一律 light，與 index.html 的 no-flash script 保持同一套判斷
function readInitialTheme() {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'dark' ? 'dark' : 'light'
}

function applyTheme(value) {
  const root = document.documentElement
  if (value === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

if (typeof window !== 'undefined') {
  applyTheme(theme.value)
  watch(theme, (value) => {
    applyTheme(value)
    window.localStorage.setItem(STORAGE_KEY, value)
  })
}

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  function set(value) {
    theme.value = value === 'dark' ? 'dark' : 'light'
  }

  return { theme, toggle, set }
}
