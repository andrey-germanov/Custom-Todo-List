import React, { useState } from 'react';
import s from './InputPlus.module.scss';
import { Select } from 'antd';

const { Option } = Select;

interface InputPlusProps {
    onAdd: (title: string, priority: string) => void;
    t: any;
}
export const InputPlus: React.FC<InputPlusProps> = ({onAdd, t}) => {
    const [value, setValue] = useState('');
    const [priorityTask, setPriorityTask] = useState('Low');

    const addTask = ()=>{
        // if(value.length < 5) return <Error />
        onAdd(value, priorityTask);
        setValue('');
    }
    const handleChange = (value: string) => {
        setPriorityTask(value);
    };
    return (
        <div className={s.todoAddBlock}>
            <input 
                type="text" 
                value={value}
                className={s.inputValueTask}
                onChange={(e)=>setValue(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter') addTask()
                }}
                placeholder="Пиши пиши, не сиди без дела"
            />
            <Select defaultValue={`Low`} style={{ width: 80 }} onChange={handleChange}>
                <Option value={'High'}>{'High'}</Option>
                <Option value={'Medium'}>{'Medium'}</Option>
                <Option value={'Low'}>{'Low'}</Option>
            </Select>
            <button 
                aria-label="Add"
                onClick={addTask}
                className={s.btnAddTask}
            />
        </div>
    )
}
