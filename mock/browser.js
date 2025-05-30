import { setupWorker } from 'msw/browser'
import { handlers } from './index.js'

export const worker = setupWorker(...handlers)

export default worker