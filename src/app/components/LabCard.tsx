'use client';

import React from "react";

interface LabCardProp {
  id: number,
  title: string,
  createdAt: Date,
  updatedAt: Date
}

const LabCard: React.FC<LabCardProp> = ({id, title, createdAt, updatedAt}) => {
  return (
    <div>

    </div>
  )
}

export default LabCard;
