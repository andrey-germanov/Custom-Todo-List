import React from "react";
import ReactECharts from 'echarts-for-react';
import { Task } from "../../../data/stores/UseTodoStore";
import moment from 'moment-timezone';

interface IChartBoard {
    tasks: Task[],
    deletedTasks: Task[],
    doneTasks: Task[],
}

const findUniqueDates = (tasks:Task[], deletedTasks:Task[], doneTasks:Task[]): string[] => {
  let date:string[] = [];
  tasks.map(item => {
    date.push(moment(item.createdTask).format('YYYY-MM-DD'))
  })
  deletedTasks.map(item => {
    date.push(moment(item.createdTask).format('YYYY-MM-DD'))
  })
  doneTasks.map(item => {
    date.push(moment(item.createdTask).format('YYYY-MM-DD'))
  })
  let uniqueChars = date.filter((element, index) => {
    return date.indexOf(element) === index;
  });
  return uniqueChars.reverse()
}

export const ChartBoard = ({ tasks, deletedTasks, doneTasks }: IChartBoard ) => {
  if (!tasks || !deletedTasks || !doneTasks) return <>Statistics loading...</>

  const uniqueDates = findUniqueDates(tasks, deletedTasks, doneTasks);

  const option = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Удаленные задачи', 'Выполненные задачи', 'Активные задачи']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: uniqueDates
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Удаленные задачи',
          type: 'line',
          stack: 'Total',
          data:''
        },
        {
          name: 'Выполненные задачи',
          type: 'line',
          stack: 'Total',
          data: ''
        },
        {
          name: 'Активные задачи',
          type: 'line',
          stack: 'Total',
          data: ''
        }
  ]
    };
      
  return (
    <div>
        <ReactECharts
            option={option}
        //   notMerge={true}
        //   lazyUpdate={true}
          theme={"dark"}
        //   onChartReady={this.onChartReadyCallback}
        //   onEvents={EventsDict}
        //   opts={}
        />
    </div>
  );
};