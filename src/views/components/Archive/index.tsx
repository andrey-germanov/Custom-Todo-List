import React from "react";
import { Task } from "../../../data/stores/UseTodoStore";
import s from "./Archive.module.scss";
import { Tabs } from "antd";
import { t } from "i18next";
import moment from "moment-timezone";

const { TabPane } = Tabs;

interface ArchiveProps {
  deletedTasks: Task[];
  doneTasks: Task[];
}
export const Archive = ({ deletedTasks, doneTasks }: ArchiveProps) => {
  return (
    <div className={s.archiveBlock}>
      <Tabs type="card">
        <TabPane className={s.tab} tab={`${t("deletedTasks")}`} key="1">
          {deletedTasks.map((item, key) => {
            return (
              <p className={`${s.archiveTask} ${s[item.priority]}`} key={key}>
                <span>{item.title}</span>
                <div>
                  <span>
                    {item.priority} priority
                  </span>
                  <span>{`${t('deleted')} `}</span>
                  <span>
                    {moment(moment(item.createdTask).format()).fromNow()}
                  </span>
                </div>
              </p>
            );
          })}
        </TabPane>
        <TabPane className={s.tab} tab={`${t("doneTasks")}`} key="2">
          {doneTasks.map((item, key) => {
            return (
              <p className={`${s.archiveTask} ${s[item.priority]}`} key={key}>
                <span>{item.title}</span>
                <div>
                  <span>
                    {item.priority} priority
                  </span>
                  <span>{`${t('done')} `} </span>
                  <span>
                    {moment(moment(item.createdTask).format()).fromNow()}
                  </span>
                </div>
              </p>
            );
          })}
        </TabPane>
      </Tabs>
      {/* { deletedTasks.length != 0 && <Button onClick={()=>removeArchiveDeletedTasks}>удалить архив</Button>} */}
    </div>
  );
};
