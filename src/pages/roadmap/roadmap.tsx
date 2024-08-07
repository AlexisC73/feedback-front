import { RoadmapColumn } from "@/components/RoadmapColumn/RoadmapColumn";
import { TabBar } from "@/components/TabBar/tab-bar";
import { TabStatusItem } from "@/components/TabBar/TabStatusItem/TabStatusItem";
import { GoBackButton } from "@/components/ui/BoBackButton/GoBackButton";
import { Button } from "@/components/ui/Button/button";
import Layout from "@/Layout";
import { selectFeedbacks } from "@/store/feedbacks/feedback.reducer";
import { FeedbackStatus } from "@/store/feedbacks/models/feedback";
import { useAppSelector } from "@/store/store-hooks";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function RoadmapPage () {
  const {t} = useTranslation()
  const {data: feedbacks} = useAppSelector(selectFeedbacks)
  const [currentStatus, setCurrentStatus] = useState(FeedbackStatus.IN_PROGRESS)

  const handleChangeStatus = (status: FeedbackStatus) => {
    setCurrentStatus(status)
  }

  return (
    <>
      <Helmet>
        <title>{t("pages.roadmap_title")}</title>
      </Helmet>
      <Layout.emptyLayout>
        <header className="flex justify-between bg-#373F68 px-6 h-25 items-center md:mx-10 md:mt-15 md:rounded-2.5 md:h-28.25 md:px-8 xl:w-1110px xl:mx-auto">
          <div>
            <Link to={"/feedbacks"}><GoBackButton style="alt" /></Link>
            <h1 className="text-4.5 text-white -tracking-0.25px font-bold md:text-6 md:-tracking-0.33px">Roadmap</h1>
          </div>
          <Link to={`/feedbacks/new?back=roadmap`}><Button>{t("roadmap_page.add_feedback_button")}</Button></Link>
        </header>
        <div className="md:hidden">
          <TabBar>
            <TabStatusItem currentStatus={currentStatus} feedbacks={feedbacks} setStatus={handleChangeStatus} status={FeedbackStatus.PLANNED} />
            <TabStatusItem currentStatus={currentStatus} feedbacks={feedbacks} setStatus={handleChangeStatus} status={FeedbackStatus.IN_PROGRESS} />
            <TabStatusItem currentStatus={currentStatus} feedbacks={feedbacks} setStatus={handleChangeStatus} status={FeedbackStatus.LIVE} />
          </TabBar>
          <RoadmapColumn feedbacks={feedbacks} status={currentStatus} />
        </div>
        <div className="hidden md:flex px-10 md:gap-x-2.5 xl:gap-x-7.5 md:mt-8 xl:mx-auto xl:px-0 xl:max-w-1110px w-full">
          <RoadmapColumn feedbacks={feedbacks} status={FeedbackStatus.PLANNED} />
          <RoadmapColumn feedbacks={feedbacks} status={FeedbackStatus.IN_PROGRESS} />
          <RoadmapColumn feedbacks={feedbacks} status={FeedbackStatus.LIVE} />
        </div>
      </Layout.emptyLayout>
    </>
  )
}