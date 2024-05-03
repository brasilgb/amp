import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { IoTime } from 'react-icons/io5';

interface KpiTesteProps {
  icon: any;
  title: string;
  value: string;
  textcolor: string;
  bgcolor: string;
  iconcolor: string;
}

export const Kpi = (props: KpiTesteProps) => {

  return (
    
      <div className="flex flex-col bg-white rounded-md shadow-sm ">
        <div className="flex items-center justify-between p-4">

          <div className="flex flex-1 flex-col items-start justify-between">
            <div className="text-base text-gray-400 ">{props.title}</div>
            <div className="text-2xl font-bold text-gray-800 ">{props.value}</div>
          </div>
          <div className={`flex items-center justify-center ${props.iconcolor}`}>
            {props.icon}
          </div>
        </div>
        <div className="text-xs text-gray-400 px-4 py-2 border-t border-gray-100">
          <span className={`px-2 py-0.5  ${props.textcolor}  ${props.bgcolor} font-bold rounded`}>+15%</span> que no mês anterior
        </div>
      </div>
  )

}
