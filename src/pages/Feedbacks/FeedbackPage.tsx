import { SortFilterCtx } from "@/Context/SortFilter/SortFilter";
import { TagFilterCtx } from "@/Context/TagFilter/TagFilterCtx";
import Layout from "@/Layout";
import { SuggestionFeedbackList } from "@/store/feedbacks/app/SuggestionsList/SuggestionListComponent";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export function FeedbackPage () {
  const { currentFilter: currentSortFilter } = useContext(SortFilterCtx)
  const { currentFilter: currentTagFilter } = useContext(TagFilterCtx)
  const {t} = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('pages.suggestions_title')}</title>
      </Helmet>
      <Layout.withHeader>
        <SuggestionFeedbackList sortFilter={currentSortFilter} tagFilter={currentTagFilter} />
      </Layout.withHeader>
    </>
  )
}
