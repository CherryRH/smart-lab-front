// 实验
export interface Lab {
  id: number,
  title: string,
  testTubeRacks: TestTubeRack[],
  createdAt: Date,
  updatedAt: Date
}

// 试管架
export interface TestTubeRack {
  id: number,
  label: string,
  x: number,
  y: number,
  z: number,
  testTubes: TestTube[],
  createdAt: Date,
  updatedAt: Date
}

export interface TestTube {
  id: number,
  label: string,
  indexInRack: number,
  type: string,
  color: string,
  x: number,
  y: number,
  z: number,
  createdAt: Date,
  updatedAt: Date
}

export enum LabItemType {
  TestTubeRack
}

export interface LabItem {
  type: LabItemType,
  label: string,
  item: TestTubeRack
}
