import React from 'react'
import ReactDOM from 'react-dom/client'
import "virtual:uno.css"
import { createRouter } from './router.tsx'
import { RouterProvider } from 'react-router-dom'
import "@/index.css"
import '@unocss/reset/tailwind.css'
import { Provider } from 'react-redux'
import { createStore } from './store/store.ts'
import { InMemoryFeedbackRepository } from './store/feedbacks/infra/in-memory-feedback.repository.ts'
import { StubIdProvider } from './store/@shared/infra/stub-id-provider.ts'
import { SortFilterCtxProvider } from './Context/SortFilter/SortFilter.tsx'
import { TagFilterCtxProvider } from './Context/TagFilter/TagFilterCtx.tsx'
import { InMemoryCommentRepository } from './store/comments/infra/in-memory-comment.repository.ts'
import { AccountApiRepository } from './store/account/infra/account-api.repository.ts'

const store = createStore({
  accountRepository: new AccountApiRepository(),
  feedbackRepository: new InMemoryFeedbackRepository(),
  idProvider: new StubIdProvider(),
  commentRepository: new InMemoryCommentRepository()
})

const router = createRouter({store})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TagFilterCtxProvider>
        <SortFilterCtxProvider>
          <RouterProvider router={router} />
        </SortFilterCtxProvider>
      </TagFilterCtxProvider>
    </Provider>
  </React.StrictMode>,
)
