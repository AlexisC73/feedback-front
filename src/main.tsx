import React from 'react'
import ReactDOM from 'react-dom/client'
import "virtual:uno.css"
import { createRouter } from './router.tsx'
import { RouterProvider } from 'react-router-dom'
import "@/index.css"
import '@unocss/reset/tailwind.css'
import { Provider } from 'react-redux'
import { createStore } from './store/store.ts'
import { InMemoryAccountRepository } from './store/account/infra/in-memory-account.repository.ts'
import { InMemoryFeedbackRepository } from './store/feedbacks/infra/in-memory-feedback.repository.ts'
import { StubIdProvider } from './store/@shared/infra/stub-id-provider.ts'

const store = createStore({
  accountRepository: new InMemoryAccountRepository(),
  feedbackRepository: new InMemoryFeedbackRepository(),
  idProvider: new StubIdProvider()
})

const router = createRouter({store})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
