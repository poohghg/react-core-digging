import { render } from '@/libs/myReact'
import App from '@/src/app.tsx'
import { getApp } from '@/libs/myReact/libs/utils.ts'

render(<App />, getApp())